'use client'

import { Badge, Button, Checkbox, Divider, Loading, Table } from "react-daisyui";
import { PageHeader } from "../components/page";
import useAxios from "axios-hooks";
import { Pagination } from "../components/pagination";
import { PaginationProps } from "../components/pagination/Pagination.d";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ArtistPage() {
  const router = useRouter()
  const [pagination, setPagination] = useState<PaginationProps>({
    page: 1,
    limit: 10
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

  const editArtist = (slug: string) => () => {
    router.push(`/artist/${slug}/edit`)
  }

  return (
    <div>
      <PageHeader title="Artistas" />

      <Table size="sm" pinRows>
        <thead>
          <tr className="bg-zinc-950 text-neutral-100">
            <th><span>Publicado?</span></th>
            <th><span>Nome</span></th>
            <th><span>Origem</span></th>
            <th><span>Tags</span></th>
            <th><span>Última atualização</span></th>
            <th><span></span></th>
          </tr>
        </thead>

        <Table.Body>
          {artists.data?.map(artist => (
            <tr key={artist.id} className="hover:bg-gray-200 transition ease-out">
              <td><span><Checkbox color="success" checked /></span></td>
              <td><span className="font-bold">{artist.name}</span></td>
              <td><span>{artist.origin}</span></td>
              <td className="w-96">
                <span className="flex flex-wrap gap-1">
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
              </td>
              <td><span>{dayjs(artist.updatedAt).format('DD/MM/YYYY HH:mm')}</span></td>
              <td>
                <span>
                  <Button
                    color="ghost"
                    className="text-2xl p-1"
                    onClick={editArtist(artist.slug)}
                  >
                    <MdEdit />
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>

      {loading && (
        <div className="flex justify-center w-full p-8">
          <Loading size="lg" />
        </div>
      )}

      {!loading && (
        <>
          <Divider />
          <div className="flex w-full justify-center">
            <Pagination {...pagination} onPageSelected={handlePageSelected} />
          </div>
        </>
      )}
    </div>
  )
}