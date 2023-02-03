/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { selectAnimes } from '@services/api'
import { useAppSelector } from './redux'

const useInfiniteScroll = <DataType>(
  getData: (limit: number, offset: number) => Promise<DataType[]>,
  limit = 50,
) => {
  const [combinedData, setCombinedData] = useState<DataType[]>([])

  const initialState = useAppSelector(selectAnimes)
  const router = useRouter()
  const [isFirstRender, setIsFirstRender] = useState(true)

  const [isNextPage, setIsNextPage] = useState(true)
  const [isTrigged, setTrigger] = useState(false)
  const [isAdditionalLoading, setIsAdditionalLoading] = useState(false)
  const [isFirstLoading, setIsFirstLoading] = useState(false)

  useEffect(() => {
    setIsNextPage(true)
    setIsFirstLoading(true)
    if (isFirstRender) {
      setIsFirstRender(false)
      setCombinedData((prev) => [...prev, ...(initialState as any)])
      setIsFirstLoading(false)
    } else {
      getData(limit, 1)
        .then((res) => {
          setCombinedData(() => [...res])
          if (res.length !== limit) {
            setIsNextPage(false)
          }
        })
        .finally(() => setIsFirstLoading(false))
    }
  }, [getData, router.isFallback])

  const readMore = () => {
    setTrigger(true)
  }

  useEffect(() => {
    if (isTrigged) {
      if (isNextPage) {
        setIsAdditionalLoading(true)
        getData(limit, combinedData.length / 50)
          .then((res) => {
            if (res.length === 0) {
              setIsNextPage(false)
            } else {
              setCombinedData((prev) => [...prev, ...res])
            }
          })
          .finally(() => setIsAdditionalLoading(false))
      }

      setTrigger(false)
    }
  }, [isTrigged])

  return {
    combinedData,
    readMore,
    isFirstLoading,
    isAdditionalLoading,
  }
}

export default useInfiniteScroll
