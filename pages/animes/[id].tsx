import { useRouter } from 'next/router'
import {
  useGetAnimeDetailsQuery,
  useGetAnimeScreenshotsQuery,
  getAnimeDetails,
  getAnimes,
  getRunningQueriesThunk,
  getAnimeScreenshots,
} from '@services/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { makeStore, wrapper } from '@services/store'
import AnimeDetails from '@components/AnimeDetails'
import AnimeInfo from '@components/AnimeInfo'
import ScreenshotsSection from '@components/ScreenshotsSection'
import VideosSection from '@components/VideosSection'
import AnimeDescription from '@components/AnimeDescription'

// import styles from './Anime.module.scss'

export default function Anime() {
  const router = useRouter()
  const id = router.query.id as string
  const result = useGetAnimeDetailsQuery(Number(id) as number, {
    skip: router.isFallback,
  })
  const screenshotsOriginal = useGetAnimeScreenshotsQuery(Number(id) as number, {
    skip: router.isFallback,
  })

  if (router.isFallback || !result.data || !screenshotsOriginal.data) {
    return <div>Loading...</div>
  }
  return (
    <Container>
      <Row>
        <Col xxl={2} xl={3} lg={3} md={4} sm={5} xs={5}>
          <AnimeDetails image={result.data.image} />
        </Col>
        <Col xxl={10} xl={9} lg={9} md={8} sm={7} xs={6}>
          <AnimeInfo
            kind={result.data.kind}
            name={result.data.name}
            score={result.data.score}
            duration={result.data.duration}
            episodes={result.data.episodes}
            genres={result.data.genres}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <AnimeDescription description={result.data.description} />
        </Col>
      </Row>
      <Row>
        <Col md={5} sm={6} xs={12}>
          <ScreenshotsSection
            screenshotsPreview={result.data.screenshots}
            screenshotsOriginal={screenshotsOriginal.data}
          />
        </Col>
        <Col md={{ span: 5, offset: 2 }} sm={6} xs={12}>
          <VideosSection
            videos={result.data.videos}
          />
        </Col>
      </Row>
    </Container>
  )
}

export async function getStaticPaths() {
  const store = makeStore()
  const result = await store.dispatch(getAnimes.initiate(1))

  const paths = result.data?.map((item) => ({
    params: { id: item.id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  const id = context.params?.id as string | undefined
  if (id) {
    store.dispatch(getAnimeDetails.initiate(Number(id)))
    store.dispatch(getAnimeScreenshots.initiate(Number(id)))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
