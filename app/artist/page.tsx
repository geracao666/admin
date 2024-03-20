'use client'

import { Badge, Table } from "react-daisyui";
import { PageHeader } from "../components/page";
import useAxios from "axios-hooks";

export default function ArtistPage() {
  const [{ data: artists = [], loading }] = useAxios({
    url: '/api/artist',
    params: {
      page: 1,
      limit: 15
    }
  })

  return (
    <div>
      <PageHeader title="Artistas" />

      <Table pinRows>
        <thead>
          <tr className="bg-zinc-950 text-neutral-100">
            <th><span>Nome</span></th>
            <th><span>Origem</span></th>
            <th><span>Tags</span></th>
            <th><span>Última atualização</span></th>
          </tr>
        </thead>

        <Table.Body>
          {artists.data?.map(artist => (
            <Table.Row key={artist.id} className="hover:bg-gray-200 transition ease-out">
              <span>{artist.name}</span>
              <span>{artist.origin}</span>
              <span className="flex flex-wrap max-w-64 gap-1">
                {artist.tags.map(tag => (
                  <Badge
                    key={tag.id}
                    color="neutral"
                    className="inline-flex"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </span>
              <span>{artist.updatedAt}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}