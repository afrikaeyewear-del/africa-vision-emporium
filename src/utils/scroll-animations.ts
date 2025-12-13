// Initialize scroll-triggered animations for elements with animate-on-scroll class
export const initScrollAnimations = () => {
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {}; // Return empty cleanup function
  }

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver is not supported');
    return () => {}; // Return empty cleanup function
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Function to observe elements
  const observeElements = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      try {
        observer.observe(el);
      } catch (error) {
        console.error('Error observing element:', error);
      }
    });
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
  } else {
    // DOM is already ready
    observeElements();
  }

  // Also observe new elements that might be added dynamically
  let mutationObserver: MutationObserver | null = null;
  
  if (document.body) {
    mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  return () => {
    observer.disconnect();
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    document.removeEventListener('DOMContentLoaded', observeElements);
  };
};

