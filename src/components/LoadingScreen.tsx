const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-foreground/60 font-light">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

