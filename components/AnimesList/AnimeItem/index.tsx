/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import styles from './AnimeItem.module.scss'

interface Props {
  image: string
  name: string
  id: number
}

export default function AnimeItem({ name, image, id }: Props) {
  return (
    <Link prefetch={false} href={`/animes/${id}`} style={{ textDecoration: 'none' }}>
    <div className={styles.container}>
      <Image className={styles.image} width={220} height={300} src={image} alt='anime image' />
      <footer className={`${styles.footer} text-light`}>{name}</footer>
    </div>
    </Link>
  )
}
