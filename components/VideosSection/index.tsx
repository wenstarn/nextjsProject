import { useState } from 'react'
import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import styles from './VideosSection.module.scss'

interface Props {
  videos: {
    id: number
    url: string
    preview: string
  }[]
}

export default function VideosSection({ videos }: Props) {
  const [show, setShow] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<null | string>(null)

  const handleClose = () => {
    setShow(false)
    setCurrentVideo(null)
  }
  const showVideo = (url: string) => {
    setCurrentVideo(() => url)
    setShow(() => true)
  }

  return (
    <section className='text-light'>
      <h1>Видео</h1>
      <Modal size={'xl'} show={show} onHide={handleClose} centered>
        <div className='auto-resizable-iframe'>
          <div>
            <iframe
              width='560'
              height='315'
              src={currentVideo || ''}
              title='YouTube video player'
            ></iframe>
          </div>
        </div>{' '}
      </Modal>

      <div className={styles.imagesContainer}>
        {videos.map((video) => (
            <Image
            key={video.id}
              onClick={() => {
                showVideo(video.url)
              }}
              className={styles.image}
              alt='image'
              width={256}
              height={143}
              src={video.preview}
            />
        ))}
      </div>
    </section>
  )
}
