import { useState } from 'react'
import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import Carousel from 'react-bootstrap/Carousel'
import styles from './ScreenshotsSection.module.scss'

interface Props {
  screenshotsPreview: string[]
  screenshotsOriginal: string[]
}

export default function ScreenshotsSection({ screenshotsPreview, screenshotsOriginal }: Props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <section className='text-light'>
      <h1>Кадры</h1>
      <div className={styles.imagesContainer}>
        {screenshotsPreview.map((screenshot) => (
          <Image
            onClick={handleShow}
            className={styles.image}
            key={screenshot}
            alt='image'
            width={256}
            height={143}
            src={screenshot}
          />
        ))}
      </div>
      <Modal size={'xl'} show={show} onHide={handleClose} centered>
        <Carousel>
          {screenshotsOriginal.map((screenshot) => (
              <Carousel.Item key={screenshot}>
                <Image
                  className={styles.screenshotOriginal}
                  alt='image'
                  width={1280}
                  height={720}
                  src={screenshot}
                />
              </Carousel.Item>
          ))}
        </Carousel>
      </Modal>
    </section>
  )
}
