import { useEffect, useRef, useState } from 'react'
import { ImagePreviewProps } from './ImagePreview.d'
import { useFileReader } from '@/app/hooks'

export default function ImagePreview({
  crop,
  imageRef,
  exportWidth = 0,
  exportHeight = 0,
  onChange = () => {},
  ...props
}: ImagePreviewProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [imageBlob, setImageBlob] = useState<Blob>()
  const { result: imageDataUrl } = useFileReader(imageBlob)

  const canvas = ref.current
  const image = imageRef.current

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!canvas || !image) {
      return
    }

    const cropX = (image.naturalWidth / 100) * crop.x
    const cropY = (image.naturalHeight / 100) * crop.y

    ctx.translate(-cropX, -cropY)
    ctx.drawImage(
      image,
      0, 0, image.naturalWidth, image.naturalHeight,
      0, 0, image.naturalWidth, image.naturalHeight
    )

    handleChange()
  }

  const handleChange = async () => {
    if (!canvas) {
      return
    }

    const offscreen = new OffscreenCanvas(
      exportWidth || canvas.width,
      exportHeight || canvas.height
    )

    const ctx = offscreen.getContext('2d')
    ctx?.drawImage(
      canvas,
      0, 0, canvas.width, canvas.height,
      0, 0, offscreen.width, offscreen.height
    )

    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
      quality: 1
    })
    
    setImageBlob(blob)
  }

  useEffect(() => {
    const context = canvas?.getContext('2d')

    if (canvas && image) {
      canvas.width = Math.floor((image.naturalWidth / 100) * crop.width)
      canvas.height = Math.floor((image.naturalHeight / 100) * crop.height)
    }

    context && draw(context)
  })

  useEffect(() => {
    imageDataUrl && onChange(imageDataUrl)
  }, [imageDataUrl, onChange])

  return <canvas ref={ref} {...props} />
}