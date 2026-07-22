type TagProps = {
  label: string
  onRemove?: () => void
}

export default function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-2 bg-grey-light text-grey-dark text-caption px-4 py-2 rounded-[5px]">
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
