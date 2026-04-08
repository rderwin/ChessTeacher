"use client";

interface BoardControlsProps {
  onReset: () => void;
  onFlip?: () => void;
}

export default function BoardControls({ onReset, onFlip }: BoardControlsProps) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-stone-700 text-stone-100 rounded-lg hover:bg-stone-600 transition-colors text-sm font-medium"
      >
        Restart
      </button>
      {onFlip && (
        <button
          onClick={onFlip}
          className="px-4 py-2 bg-stone-700 text-stone-100 rounded-lg hover:bg-stone-600 transition-colors text-sm font-medium"
        >
          Flip Board
        </button>
      )}
    </div>
  );
}
