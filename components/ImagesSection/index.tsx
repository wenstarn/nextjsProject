import Image from 'next/image'
import styles from './ImagesSection.module.scss'

interface Props {
  images: string[]
}

export default function ImagesSection({ images }: Props) {
  return (
    <section className='text-light'>
      <h1>Кадры</h1>
      <div className={styles.imagesContainer}>
        {images.map((image) => (
          <Image className={styles.image} key={image} alt='image' width={100} height={100} src={image} />
        ))}
      </div>
    </section>
  )
}
