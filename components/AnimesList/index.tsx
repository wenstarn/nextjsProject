import { AnimeItem as AnimeItemType } from '@models/anime'
import AnimeItem from '@components/AnimesList/AnimeItem'
import styles from './AnimesList.module.scss'

interface Props {
  items: AnimeItemType[]
}

export default function AnimesList({ items }: Props) {
  return (
    <div className={styles.container}>
      {items.map(({ name, image, id }) => (
        <AnimeItem key={id} name={name} image={image} id={id} />
      ))}
    </div>
  )
}
