'use client'

import { Input } from "react-daisyui"
import { useFormContext } from "react-hook-form"
import { FormLabel } from "."

export default function FormInput({
  name,
  label
}: {
  name: string,
  label: string
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string
  const color = errorMessage ? 'error' : 'primary'

  return (
    <FormLabel title={label} error={errorMessage}>
      <Input
        type="text"
        className="rounded-none"
        placeholder={label}
        color={color}
        {...register(name)}
      />
    </FormLabel>
  )
}