import { HTMLAttributes, RefObject } from "react"
import { Crop, PercentCrop } from "react-image-crop"

export type ImagePreviewProps = Omit<HTMLAttributes<HTMLCanvasElement>, 'width' | 'height' | 'onChange'> & {
  imageRef: RefObject<HTMLImageElement>,
  percentCrop: PercentCrop,
  exportWidth?: number,
  exportHeight?: number,
  onChange?: (dataUrl: string) => void
}