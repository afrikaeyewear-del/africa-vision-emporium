// Initialize scroll-triggered animations for elements with animate-on-scroll class
export const initScrollAnimations = () => {
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

  // Observe all elements with animate-on-scroll class
  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
};

