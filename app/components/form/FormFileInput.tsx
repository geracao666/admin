'use client'

import { FileInput } from "react-daisyui"
import { Controller, useFormContext } from "react-hook-form"
import { FormLabel } from "."

export default function FormFileInput({
  name,
  label
}: {
  name: string,
  label: string
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string
  const color = errorMessage ? 'error' : 'primary'

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ...attrs } }) => (
        <FormLabel title={label} error={errorMessage}>
          <FileInput
            className="rounded-none"
            {...attrs}
            color={color}
            value={value?.fileName}
            onBlur={onBlur}
            onChange={(event) => {
              const file = event.target.files?.item(0) ?? null
              onChange(file)
            }}
          />
        </FormLabel>
      )}
    />
  )
}