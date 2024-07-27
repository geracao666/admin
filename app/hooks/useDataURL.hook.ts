import { useEffect, useState } from "react";
import { useFileReader } from ".";
import useAxios from "../lib/axios";

export default function useDataURL(source?: string | File) {
  const [blob, setBlob] = useState<Blob>()
  const { result } = useFileReader(blob)
  const [{ loading, error }, fetchBlob] = useAxios({
    url: source as string,
    responseType: 'blob'
  }, { manual: true })  

  useEffect(() => {
    if (typeof source !== 'string') {
      setBlob(source)
      return
    }

    if (source.startsWith('http')) {
      fetchBlob().then(response => setBlob(response.data))
      return
    }
  }, [source, fetchBlob])

  return { result, loading, error }
}