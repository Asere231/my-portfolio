export function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-16 w-16",
    large: "h-24 w-24",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-b-2 border-white ${sizeClasses[size]} mb-4`}
      />
      {text && (
        <p className="text-white text-center" role="status" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
}
