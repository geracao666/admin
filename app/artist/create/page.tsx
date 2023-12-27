'use client'

import { Form, Input } from "react-daisyui";

export default function ArtistCreatePage() {
  return (
    <div>
      {/* TODO: Create page header component */}
      <h2 className="text-2xl font-bold">
        Adicionar artista
      </h2>

      <Form className="max-w-xs">
        {/* TODO: Create page input component with react-hook-form and zod integration */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nome do artista/banda</span>
          </div>

          <Input type="text" className="rounded-none" placeholder="Nome do artista/banda" />
        </label>
      </Form>
    </div>
  )
}