import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import mime from 'mime-types'
import bytes from 'bytes'

/**
 * i18n translations.
 */
yup.setLocale({
  mixed: {
    required: '${label} é obrigatório.'
  }
})

/**
 * react-hook-form resolver.
 */
export const resolver = (schema: yup.AnyObjectSchema) => ({
  resolver: yupResolver(schema)
})

/**
 * File validation helper.
 */
export const file = ({
  maxSize = -1,
  allowedFormats = []
}: {
  maxSize?: number | string, // in bytes if number
  allowedFormats?: string[]
} = {}) => {
  const formattedMaxSize = typeof maxSize === 'number' ? bytes.format(maxSize) : maxSize

  return yup.mixed()
    .test(
      'fileSize',
      `Arquivo muito grande. Tamanho máximo permitido: ${formattedMaxSize}`,
      (value) => {
        if (!(value instanceof File)) {
          return false
        }

        if (typeof maxSize === 'number') {
          return maxSize === -1 || value.size <= maxSize
        }

        return value.size <= bytes.parse(maxSize)
      }
    )
    .test(
      'fileFormat',
      `Arquivo inválido. Formatos permitidos: ${allowedFormats.join(', ')}`,
      (value) => {
        if (!(value instanceof File)) {
          return false
        }

        const allowedTypes = allowedFormats.map(mime.lookup)
        return allowedFormats.length === 0 || allowedTypes.includes(value.type)
      }
    )
}

export default yup