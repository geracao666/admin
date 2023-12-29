import yup, { file } from '@/app/lib/yup'

export const artistSchema = yup.object({
  name: yup.string().label('Nome do artista/banda').required(),
  cover: file({
    maxSize: '2MB',
    allowedFormats: ['jpg', 'png']
  }).label('Imagem da capa').required(),
  origin: yup.string().label('País de origem').required(),
  genres: yup.array(yup.string()).label('Gêneros musicais').optional(),
})

export type Artist = yup.InferType<typeof artistSchema>
