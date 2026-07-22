import Image from 'next/image'

// Union discriminée : fill=true → pas de width/height requis ; fill=false → width+height obligatoires
type PictureBase = { src: string; alt: string; className?: string }
type PictureFill = PictureBase & { fill: true; width?: never; height?: never }
type PictureFixed = PictureBase & { fill?: false; width: number; height: number }
type PictureProps = PictureFill | PictureFixed

export default function Picture(props: PictureProps) {
  const { src, alt, className = '' } = props

  if (props.fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`rounded-[10px] object-cover ${className}`}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      className={`rounded-[10px] object-cover ${className}`}
    />
  )
}
