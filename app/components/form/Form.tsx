'use client'

import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form"
import { Form as FormComponent } from 'react-daisyui'
import React from "react"

export default function Form<T extends FieldValues>({
  children,
  context,
  onSubmit = () => {}
}: {
  children: React.ReactNode,
  context: UseFormReturn<T>,
  onSubmit?: SubmitHandler<T>
}) {
  const internalOnSubmit = (data: T, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault()
    onSubmit(data, event)
  }

  return (
    <FormProvider {...context}>
      <FormComponent
        className="max-w-xs"
        onSubmit={context.handleSubmit(internalOnSubmit)}
      >
        {children}
      </FormComponent>
    </FormProvider>
  )
}