import Icon from '@/components/Icon'
import type { IconName } from '@/components/Icon'

type RedBlockProps = {
  icon?: IconName
  title: string
  description: string
}

export default function RedBlock({ icon, title, description }: RedBlockProps) {
  return (
    <div className="flex flex-col gap-[17px] bg-red-dark text-white rounded-[10px] border border-white/20 py-[44px] px-[22px] h-[199px]">
      {icon && <Icon name={icon} size={32} />}
      <h3 className="text-body-lg">{title}</h3>
      <p className="text-caption">{description}</p>
    </div>
  )
}
