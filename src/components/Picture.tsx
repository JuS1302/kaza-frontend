import Image from 'next/image'

type PictureProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function Picture({ src, alt, width, height, className = '' }: PictureProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-[10px] object-cover ${className}`}
    />
  )
}
