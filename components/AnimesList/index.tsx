/* eslint-disable no-unused-vars */
import { AnimeItem as AnimeItemType } from '@models/anime'
import AnimeItem from '@components/AnimesList/AnimeItem'
import styles from './AnimesList.module.scss'

interface Props {
  items: AnimeItemType[]
  lastItemRef?: (node: any) => void
}

export default function AnimesList({ items, lastItemRef }: Props) {
  return (
    <div className={styles.container}>
      {items.map(({ name, image, id }, index) => {
        if (index === items.length - 1 && lastItemRef !== undefined) {
          return (
            <div key={index} ref={lastItemRef}>
              <AnimeItem name={name} image={image} id={id} />
            </div>
          )
        }
        return <AnimeItem key={index} name={name} image={image} id={id} />
      })}
    </div>
  )
}
