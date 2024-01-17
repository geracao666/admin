import { HTMLAttributes, RefObject } from "react"
import { PercentCrop } from "react-image-crop"

export type ImagePreviewProps = Omit<HTMLAttributes<HTMLCanvasElement>, 'width' | 'height' | 'onChange'> & {
  imageRef: RefObject<HTMLImageElement>,
  crop: PercentCrop,
  exportWidth?: number,
  exportHeight?: number,
  onChange?: (dataUrl: string) => void
}