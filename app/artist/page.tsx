'use client'

import { Badge, Divider, Table } from "react-daisyui";
import { PageHeader } from "../components/page";
import useAxios from "axios-hooks";
import { Pagination } from "../components/pagination";
import { PaginationProps } from "../components/pagination/Pagination.d";
import { useEffect, useState } from "react";

export default function ArtistPage() {
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    limit: 15
  })

  const [{ data: artists = [], loading }] = useAxios({
    url: '/api/artist',
    params: {
      page: pagination.page,
      limit: pagination.limit
    }
  })

  useEffect(() => {
    setPagination(current => ({
      ...current,
      total: artists.total
    }))
  }, [artists])

  const handlePageSelected = (page: number) => {
    setPagination((pagination) => ({ ...pagination, page }))
  }

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

      <Divider />

      <div className="flex w-full justify-center">
        <Pagination {...pagination} onPageSelected={handlePageSelected} />
      </div>
    </div>
  )
}