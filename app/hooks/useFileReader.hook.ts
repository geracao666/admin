'use client'

import { useEffect, useState } from "react"

export default function useFileReader(file?: File | Blob) {
  const [result, setResult] = useState<string>('')
  
  useEffect(() => {
    const reader = new FileReader()
    const listener = () => setResult(reader.result as string)
  
    if (file) {
      reader.addEventListener('load', listener)
      reader.readAsDataURL(file)
    }

    return () => reader.removeEventListener('load', listener)
  })

  return { result }
}