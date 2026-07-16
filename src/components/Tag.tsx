type TagProps = {
  label: string
  onRemove?: () => void
}

export default function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-2 bg-grey-light text-black text-label px-3 py-1 rounded-lg">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Supprimer ${label}`}
          className="text-grey-dark hover:text-black"
        >
          ✕
        </button>
      )}
    </span>
  )
}
