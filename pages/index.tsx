/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { wrapper } from '@services/store'
import { getAnimes, getRunningQueriesThunk, useGetAnimesQuery } from '@services/api'
import { useRouter } from 'next/router'
import AnimesList from '@components/AnimesList'

export default function Home() {
  const router = useRouter()
  const result = useGetAnimesQuery(undefined, {
    skip: router.isFallback,
  })
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello world</div>
      {result.data && <AnimesList items={result.data}/>}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getAnimes.initiate())
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  return {
    props: {},
  }
})