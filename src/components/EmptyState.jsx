function EmptyState({ message, cta }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-800 p-8 text-center bg-gray-900">
      <p className="text-gray-200 font-medium">{message}</p>
      {cta && <p className="text-sm text-gray-500 mt-2">{cta}</p>}
    </div>
  );
}

export default EmptyState;
