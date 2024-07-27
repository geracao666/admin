import { PageHeader } from "@/app/components/page";
import ArtistForm from "../../ArtistForm";

export default function ArtistEditPage({ params }: {
  params: { slug: string }
}) {
  return (
    <div>
      <PageHeader title="Editar artista" />
      <ArtistForm slug={params.slug} />
    </div>
  )
}