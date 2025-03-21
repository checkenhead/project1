import { useEffect, useState } from 'react'

const useFileUrl = () => {
  const [filesInfo, setFilesInfo] = useState<Array<{ name?: string; size: number; url: string }>>([])

  const setFiles = (fileList: Array<File | Blob>) => {
    setFilesInfo(
      fileList.map((file) => {
        const name = 'name' in file ? { name: file.name } : {}
        return { ...name, size: file.size, url: URL.createObjectURL(file) }
      })
    )
  }

  useEffect(() => {
    return () => {
      filesInfo.forEach(({ url }) => URL.revokeObjectURL(url))
    }
  }, [filesInfo])

  return { filesInfo, setFiles }
}

export default useFileUrl
