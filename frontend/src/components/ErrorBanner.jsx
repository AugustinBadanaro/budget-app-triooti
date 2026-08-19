export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="p-4 m-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-800 flex justify-between items-center shadow-md font-medium">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="ml-4 px-3 py-1.5 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition">
          Réessayer
        </button>
      )}
    </div>
  );
}