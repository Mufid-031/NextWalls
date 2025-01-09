import Image from "next/image"

interface ImageCardProps {
  src: string
  resolution: string
}

function ImageCard({ src, resolution }: ImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt="Wallpaper"
        width={400}
        height={225}
        className="h-[225px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {resolution}
      </div>
    </div>
  )
}

export function ImageGrid() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="1920x1080" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="2560x1440" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="3840x2160" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="1920x1080" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="2560x1440" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="3840x2160" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="1920x1080" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="2560x1440" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="3840x2160" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="1920x1080" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="2560x1440" />
        <ImageCard src="/placeholder.svg?height=225&width=400" resolution="3840x2160" />
      </div>
    </div>
  )
}

