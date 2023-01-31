import styles from './AnimeInfo.module.scss'

interface Props {
  name: string
  score: string
  episodes: number
  duration: number
  kind: string
  genres: {
    id: number
    name: string
  }[]
}

export default function AnimeInfo({
  name, score, episodes, duration, kind, genres,
}: Props) {
  return (
    <div className={`${styles.container} text-light`}>
      <h1 className=''>{name}</h1>
      <h5 className=''>Информация: </h5>
      <ul className={styles.list}>
        <li>Рейтинг: <span className="text-secondary">{score}</span></li>
        <li>Тип: <span className="text-secondary">{kind}</span></li>
        <li>Эпизоды: <span className="text-secondary">{episodes}</span></li>
        <li>Длительность эпизода: <span className="text-secondary">{duration}</span></li>
        <li>Жанры: {genres.map((genre) => <span key={genre.id} className="text-secondary">{genre.name}, </span>)}</li>
      </ul>
    </div>
  )
}
