'use client'

import { PageHeader } from "@/app/components/page";
import { Form, FormInput, FormButton, FormFileInput } from "@/app/components/form";
import { useForm } from "react-hook-form";
import { Artist, artistSchema } from "../artist.schema";
import { resolver } from '@/app/lib/yup'

export default function ArtistCreatePage() {
  const context = useForm<Artist>({
    ...resolver(artistSchema)
  })

  const onSubmit = async (data: any) => {
    // await fetch('/api/artist', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // })
  }

  return (
    <div>
      <PageHeader title="Adicionar artista" />

      <Form context={context} onSubmit={onSubmit}>
        <FormInput label="Nome do artista/banda" name="name" />
        <FormFileInput label="Imagem da capa" name="cover" />
        <FormInput label="País de origem" name="origin" />

        <FormButton>Salvar</FormButton>
      </Form>
    </div>
  )
}