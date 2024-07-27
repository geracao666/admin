import { useCallback, useEffect, useRef, useState } from 'react'
import { ImagePreviewProps } from './ImagePreview.d'
import { useFileReader } from '@/app/hooks'

export default function ImagePreview({
  percentCrop,
  imageRef,
  exportWidth = 0,
  exportHeight = 0,
  onChange = () => {},
  ...props
}: ImagePreviewProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [imageBlob, setImageBlob] = useState<Blob>()
  const { result: imageDataURL } = useFileReader(imageBlob)

  // console.log(imageDataURL)

  const canvas = ref.current
  const image = imageRef.current

  const handleChange = useCallback(async () => {
    if (!canvas) {
      return
    }

    // TODO: remove this
    console.log(exportWidth, image?.width)
    console.log(exportHeight, image?.height)

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
  }, [canvas, exportHeight, exportWidth])

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!canvas || !image) {
      return
    }

    const offscreen = new OffscreenCanvas(
      Math.floor((image.naturalWidth / 100) * percentCrop.width),
      Math.floor((image.naturalHeight / 100) * percentCrop.height)
    )

    const offctx = offscreen.getContext('2d')
    const cropX = (image.naturalWidth / 100) * percentCrop.x
    const cropY = (image.naturalHeight / 100) * percentCrop.y

    offctx?.save()
    offctx?.translate(-cropX, -cropY)
    offctx?.drawImage(
      image,
      0, 0, image.naturalWidth, image.naturalHeight,
      0, 0, image.naturalWidth, image.naturalHeight
    )
    offctx?.restore()

    ctx.drawImage(
      offscreen.transferToImageBitmap(),
      0, 0, offscreen.width, offscreen.height,
      0, 0, Math.min(offscreen.width, exportWidth), Math.min(offscreen.height, exportHeight)
    )

    handleChange()
  }, [image, canvas, exportHeight, exportWidth, percentCrop, handleChange])

  useEffect(() => {
    // TODO: Remove this.
    console.log('effect called')
    const context = canvas?.getContext('2d')

    if (canvas && image) {
      canvas.width = exportWidth
      canvas.height = exportHeight
    }

    context && draw(context)
  }, [image, canvas, exportHeight, exportWidth, draw])

  useEffect(() => {
    imageDataURL && onChange(imageDataURL)
  }, [imageDataURL, onChange])

  return <canvas ref={ref} {...props} />
}