import { useAppSelector } from 'hooks/redux'
import MyAnimesList from '@components/MyAnimesList'

export default function Collection() {
  const animes = useAppSelector((state) => state.myAnimesList.animes)
  return <MyAnimesList animes={animes}/>
}
