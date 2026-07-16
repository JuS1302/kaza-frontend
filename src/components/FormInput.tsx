'use client'

type FormInputProps = {
  label: string
  type?: 'text' | 'email' | 'password' | 'textarea' | 'checkbox'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onAdd?: () => void
  onClear?: () => void
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  name?: string
}

const inputBase = 'w-full border border-grey-light rounded-lg px-3 py-2 text-body-md placeholder:text-grey-dark bg-white focus:outline-none focus:border-red-main'

export default function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onAdd,
  onClear,
  checked,
  onCheckedChange,
  name,
}: FormInputProps) {

  // Checkbox : layout horizontal
  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="w-4 h-4 border border-grey-light rounded accent-red-dark cursor-pointer"
        />
        <span className="text-body-md">{label}</span>
      </label>
    )
  }

  // Textarea : champ multi-lignes
  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-body-md font-medium">{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={5}
          className={`${inputBase} resize-y`}
        />
      </div>
    )
  }

  // Input avec bouton + ou croix ✕
  if (onAdd || onClear) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-body-md font-medium">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={inputBase}
          />
          {onAdd && (
            <button
              onClick={onAdd}
              aria-label="Ajouter"
              className="flex items-center justify-center w-10 h-10 bg-red-dark text-white rounded-[10px] shrink-0"
            >
              +
            </button>
          )}
          {onClear && (
            <button
              onClick={onClear}
              aria-label="Supprimer"
              className="text-red-main shrink-0"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    )
  }

  // Input texte simple (défaut)
  return (
    <div className="flex flex-col gap-1">
      <label className="text-body-md font-medium">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputBase}
      />
    </div>
  )
}
