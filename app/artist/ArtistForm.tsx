'use client'

import useAxios from "@/app/lib/axios";
import { ArtistFormProps } from "./ArtistForm.d";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Artist, artistSchema } from "./artist.schema";
import { resolver } from '@/app/lib/yup'
import { Form, FormAutocomplete, FormButton, FormImageInput, FormInput } from "../components/form";
import { APP_IMAGE_BASE_URL } from "../config";

export default function ArtistForm({
  slug
}: ArtistFormProps) {
  const [{ data: tags = [], loading: loadingTags }] = useAxios<string[]>('/api/tag/index.json')
  const [{ data: artist }, fetchArtist] = useAxios({
    url: `/api/artist/${slug}`,
    method: 'GET'
  }, {
    manual: true
  })

  const context = useForm<Artist>({
    ...resolver(artistSchema)
  })

  useEffect(() => {
    if (slug) {
      fetchArtist()
    }
  }, [slug, fetchArtist])

  useEffect(() => {
    if (artist) {
      context.reset({
        ...artist,
        cover: `${APP_IMAGE_BASE_URL}${artist.cover}`
      })
    }
  }, [artist, context])

  console.log('form', context.getValues())

  return (
    <Form context={context}>
      <div className="grid grid-cols-1 max-w-sm">
        <div>
          <FormInput label="Nome do artista/banda" name="name" />
          <FormInput label="País de origem" name="origin" />
          <FormImageInput label="Imagem da capa" name="cover" />

          <FormAutocomplete
            name="tags"
            label="Tags"
            items={
              tags.map((tag: string) => ({
                label: tag,
                value: tag
              }))
            }
            disabled={loadingTags}
            loading={loadingTags}
            multiple
          />
        </div>

        <div className="flex flex-row gap-1">
          <FormButton variant="outline" className="w-1/2">Cancelar</FormButton>
          <FormButton type="submit" className="w-1/2" disabled>Salvar</FormButton>
        </div>
      </div>
    </Form>
  )
}