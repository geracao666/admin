'use client'

import { PageHeader } from "@/app/components/page";
import { Form, FormInput, FormButton, FormFileInput, FormAutocomplete } from "@/app/components/form";
import { useForm } from "react-hook-form";
import { Artist, artistSchema } from "../artist.schema";
import { resolver } from '@/app/lib/yup'
import useAxios from "axios-hooks";
import { Genre } from "@prisma/client";

export default function ArtistCreatePage() {
  const context = useForm<Artist>({
    ...resolver(artistSchema)
  })

  const [{ data: genres = [], loading }] = useAxios('/api/genre')

  const onSubmit = async (data: any) => {
    const reader = new FileReader()
    const saveArtist = async () => {
      const dataUrl = reader.result as string
      const [_, coverBase64] = dataUrl?.split(';base64,')
      const payload = JSON.stringify({
        ...data,
        cover: coverBase64
      })

      await fetch('/api/artist', { method: 'POST', body: payload })
      reader.removeEventListener('load', saveArtist)
    }

    reader.addEventListener('load', saveArtist)
    reader.readAsDataURL(data.cover)
  }

  return (
    <div>
      <PageHeader title="Adicionar artista" />

      <Form context={context} onSubmit={onSubmit}>
        <FormInput label="Nome do artista/banda" name="name" />
        <FormFileInput label="Imagem da capa" name="cover" />
        <FormInput label="País de origem" name="origin" />
        <FormAutocomplete
          name="genres"
          label="Gêneros musicais"
          items={
            genres.map((genre: Genre) => ({
              label: genre.name,
              value: genre.name
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