export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="p-4 m-4 bg-red-50 border border-red-300 rounded-lg text-red-700 flex justify-between items-center">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="ml-4 px-3 py-1 bg-red-600 text-white rounded">
          Réessayer
        </button>
      )}
    </div>
  );
}