import { useFormContext } from "react-hook-form"
import { FormFileInput } from "."
import { useEffect, useRef, useState } from "react"
import ReactCrop, { Crop, PercentCrop } from "react-image-crop"
import classNames from "classnames"
import { remapRange } from "@/app/utils/math"
import { ImagePreview } from "../image"
import "react-image-crop/dist/ReactCrop.css";
import { Loading } from "react-daisyui"
import { useDataURL } from "@/app/hooks"

export default function FormImageInput({
  name,
  label,
  cropWidth = 400,
  cropHeight = 400
}: {
  name: string
  label: string
  cropWidth?: number
  cropHeight?: number
}) {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext()

  const { result: imageDataURL, loading } = useDataURL(watch(name))
  const imgRef = useRef<HTMLImageElement>(null)
  const [minWidth, setMinWidth] = useState<number>(0)
  const [minHeight, setMinHeight] = useState<number>(0)

  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

  const [percentCrop, setPercentCrop] = useState<PercentCrop>({
    ...crop,
    unit: '%'
  })

  const onImageLoad = () => {
    if (!imgRef.current) {
      return
    }

    const [pxWidth, pxHeight] = [
      remapRange(
        cropWidth,
        0, imgRef.current.naturalWidth,
        0, imgRef.current.width
      ),
      remapRange(
        cropHeight,
        0, imgRef.current.naturalHeight,
        0, imgRef.current.height
      )
    ]

    const percentWidth = (cropWidth * 100) / imgRef.current.naturalWidth
    const percentHeight = (cropHeight * 100) / imgRef.current.naturalHeight
    const pxMinWidth = Math.min(imgRef.current.width, pxWidth)
    const pxMinHeight = Math.min(imgRef.current.height, pxHeight)

    setMinWidth(pxMinWidth)
    setMinHeight(pxMinHeight)
    setCrop({ ...crop, width: pxMinWidth, height: pxMinHeight })
    setPercentCrop({ ...percentCrop, width: percentWidth, height: percentHeight })
  }

  // useEffect(() => {
  //   if (!errors[name] && imgRef.current?.naturalWidth as number < cropWidth) {
  //     setError(name, { type: 'imageWidth', message: `A imagem deve ter pelo menos ${cropWidth}px de largura.` })
  //   } else if (!errors[name] && imgRef.current?.naturalHeight as number < cropHeight) {
  //     setError(name, { type: 'imageHeight', message: `A imagem deve ter pelo menos ${cropHeight}px de altura.` })
  //   } else if (errors[name] && (imgRef.current?.naturalWidth as number >= cropWidth) && (imgRef.current?.naturalHeight as number >= cropHeight)) {
  //     clearErrors(name)
  //   }
  // }, [imgRef, cropHeight, cropWidth, errors, name, setError, clearErrors])

  // useEffect(() => {
  //   setValue(name, imageDataURL)
  // }, [name, imageDataURL, setValue])

  // TODO: Put the image preview on a modal.

  return (
    <>
      <FormFileInput
        name={name}
        label={label}
      />

      {imageDataURL && (
        <ReactCrop
          keepSelection
          aspect={1}
          crop={crop}
          minWidth={minWidth}
          minHeight={minHeight}
          className={classNames('mb-4', { '!hidden': !!errors[name] })}
          onChange={(crop, percentCrop) => {
            setPercentCrop(percentCrop)
            setCrop(crop)
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Artist cover image"
            ref={imgRef}
            src={imageDataURL}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {imageDataURL && !errors[name] && <ImagePreview
        className="mb-4"
        imageRef={imgRef}
        percentCrop={percentCrop}
        exportWidth={cropWidth}
        exportHeight={cropHeight}
        // onChange={(dataURL) => console.log('crop data url', dataURL)}
      />}

      {loading && (
        <div className="flex justify-center w-full p-4">
          <Loading size="md" />
        </div>
      )}
    </>
  )
}