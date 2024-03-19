'use client'

import { PageHeader } from "@/app/components/page";
import { Form, FormInput, FormButton, FormFileInput, FormAutocomplete } from "@/app/components/form";
import { useForm } from "react-hook-form";
import { Artist, artistSchema } from "../artist.schema";
import { resolver } from '@/app/lib/yup'
import useAxios from "@/app/lib/axios";
import { Tag } from "@prisma/client";
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css";
import { useRef, useState } from "react";
import { useFileReader } from "@/app/hooks";
import classNames from "classnames";
import { remapRange } from "@/app/utils/math";
import { ImagePreview } from "@/app/components/image";

export default function ArtistCreatePage() {
  const context = useForm<Artist>({
    ...resolver(artistSchema)
  })

  const {
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = context

  const imgRef = useRef<HTMLImageElement>(null)
  const [{ data: tags = [], loading }] = useAxios<string[]>('/api/tag/index.json')
  const { result: coverDataUrl } = useFileReader(watch('cover') as File)
  
  const [cropWidth, cropHeight] = [400, 400]

  const [minWidth, setMinWidth] = useState<number>(0)
  const [minHeight, setMinHeight] = useState<number>(0)
  const [cropDataUrl, setCropDataUrl] = useState<string>('')
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

    setMinWidth(pxWidth)
    setMinHeight(pxHeight)
    setCrop({ ...crop, width: pxWidth, height: pxHeight })
    setPercentCrop({ ...percentCrop, width: percentWidth, height: percentHeight })
  }

  // TODO: Move image validations to a better place
  if (!errors.cover && imgRef.current?.naturalWidth as number < 400) {
    setError('cover', { type: 'imageWidth', message: 'A imagem deve ter pelo menos 400px de largura.' })
  } else if (!errors.cover && imgRef.current?.naturalHeight as number < 400) {
    setError('cover', { type: 'imageHeight', message: 'A imagem deve ter pelo menos 400px de altura.' })
  } else if (errors.cover && (imgRef.current?.naturalWidth as number >= 400) && (imgRef.current?.naturalHeight as number >= 400)) {
    clearErrors('cover')
  }

  const onSubmit = async (data: any) => {
    const [_, cover] = cropDataUrl.split(';base64,')
    const payload = JSON.stringify({ ...data, cover })

    await fetch('/api/artist', { method: 'POST', body: payload })
  }

  return (
    <div>
      <PageHeader title="Adicionar artista" />

      <Form context={context} onSubmit={onSubmit}>
        <FormInput label="Nome do artista/banda" name="name" />

        <FormFileInput label="Imagem da capa" name="cover" />
        {coverDataUrl && <ReactCrop
          keepSelection
          aspect={1}
          crop={crop}
          minWidth={minWidth}
          minHeight={minHeight}
          className={classNames('mb-4', { '!hidden': !!errors.cover })}
          onChange={(crop, percentCrop) => {
            setPercentCrop(percentCrop)
            setCrop(crop)
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Artist cover preview"
            ref={imgRef}
            src={coverDataUrl}
            onLoad={onImageLoad}
          />
        </ReactCrop>}

        {coverDataUrl && !errors.cover && <ImagePreview
          className="mb-4"
          imageRef={imgRef}
          crop={percentCrop}
          exportWidth={cropWidth}
          exportHeight={cropHeight}
          onChange={setCropDataUrl}
        />}

        <FormInput label="País de origem" name="origin" />

        <FormAutocomplete
          name="tags"
          label="Tags"
          items={
            tags.map((tag: string) => ({
              label: tag,
              value: tag
            }))
          }
          disabled={loading}
          loading={loading}
          multiple
        />

        <FormButton>Salvar</FormButton>
      </Form>
    </div>
  )
}