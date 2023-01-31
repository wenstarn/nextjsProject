import { wrapper } from '@services/store'
import { useRouter } from 'next/router'
import AnimesList from '@components/AnimesList'
import { getAnimesCalendar, getRunningQueriesThunk, useGetAnimesCalendarQuery } from '@services/api'
import styles from './Calendar.module.scss'

export default function Calendar() {
  const router = useRouter()
  const calendar = useGetAnimesCalendarQuery(undefined, {
    skip: router.isFallback,
  })

  if (router.isFallback || !calendar.data) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${styles.container} text-light`}>
      <h1>Календарь</h1>
      {calendar.data.map((animeDate, index) => (
        <div className={styles.row} key={index}>
          <h5>{animeDate.date}</h5>
          <div className={styles.listContainer}>
          <AnimesList items={animeDate.animes} />
          </div>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getAnimesCalendar.initiate())
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  return {
    props: {},
  }
})
