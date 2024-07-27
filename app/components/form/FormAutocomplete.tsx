'use client'

import { Controller, useFormContext } from "react-hook-form"
import { FormLabel } from "."
import { Autocomplete } from "../autocomplete"
import { AutocompleteItem } from "../autocomplete/Autocomplete.d"

export default function FormAutocomplete({
  name,
  label,
  items,
  loading = false,
  disabled = false,
  multiple = false,
}: {
  name: string,
  label: string,
  items: AutocompleteItem[],
  loading?: boolean,
  disabled?: boolean,
  multiple?: boolean
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const errorMessage = errors[name]?.message as string
  const color = errorMessage ? 'error' : 'neutral'

  return (
    <FormLabel title={label} error={errorMessage}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Autocomplete
            items={items}
            placeholder={label}
            color={color}
            loading={loading}
            disabled={disabled}
            multiple={multiple}
            loadingVariant="dots"
            {...field}
          />
        )}
      />
    </FormLabel>
  )
}