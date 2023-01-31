import type { ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import { useAppSelector, useAppDispatch } from 'hooks/redux'
import {
  changeCategory,
  changeWatchedEpisodes,
  changeScore,
} from '@services/store/myAnimesListSlice'
import { MyAnimeListItem } from '@models/anime'
import styles from './AnimeDetails.module.scss'

interface Props {
  id: number
  image: string
  name: string
  episodes: number
}

export default function AnimeDetails({
  image, id, name, episodes,
}: Props) {
  const myAnimeListItem = useAppSelector((state) =>
    state.myAnimesList.animes.find((anime) => anime.id === id))
  const dispatch = useAppDispatch()
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCategory({ id, name, category: event.target.value }))
  }
  const router = useRouter()
  const handleAddButton = () => {
    const watchedEpisodes = myAnimeListItem?.watchedEpisodes as number
    if (watchedEpisodes + 1 <= episodes) {
      dispatch(
        changeWatchedEpisodes({
          id,
          watchedEpisodes: watchedEpisodes + 1,
        }),
      )
    }
    if (watchedEpisodes + 1 === episodes) {
      dispatch(changeCategory({ id, name, category: 'watched' }))
    }
  }
  const handleRemoveButton = () => {
    const myAnimeListItemExisted = myAnimeListItem as MyAnimeListItem
    if ((myAnimeListItem?.watchedEpisodes as number) > 0) {
      dispatch(
        changeWatchedEpisodes({
          id,
          watchedEpisodes: (myAnimeListItem?.watchedEpisodes as number) - 1,
        }),
      )
    }
    if (
      myAnimeListItemExisted.watchedEpisodes - 1 < episodes &&
      myAnimeListItemExisted.category === 'watched'
    ) {
      dispatch(changeCategory({ id, name, category: 'watching' }))
    }
  }
  const handleScoreInput = (event: ChangeEvent<any>) => {
    dispatch(changeScore({ id, score: event.target.value }))
  }
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <Image width={220} height={300} src={image} alt='anime image' />
      <Form.Select
        className={styles.select}
        onChange={handleSelectChange}
        value={myAnimeListItem ? myAnimeListItem.category : 'noCategory'}
        aria-label='Default select example'
      >
        <option value='noCategory'>Нет категории</option>
        <option value='scheduled'>Запланировано</option>
        <option value='watching'>Смотрю</option>
        <option value='watched'>Просмотрено</option>
        <option value='dropped'>Брошено</option>
      </Form.Select>
      {myAnimeListItem && (
        <>
          <div className={`${styles.info} text-light`}>
            <span>
              Эпизоды: {myAnimeListItem.watchedEpisodes}/{episodes}
            </span>
            {myAnimeListItem.category !== 'watched' && (
              <ButtonGroup aria-label='Basic example'>
                <Button onClick={handleRemoveButton} variant='danger'>
                  -
                </Button>
                <Button onClick={handleAddButton} variant='success'>
                  +
                </Button>
              </ButtonGroup>
            )}
          </div>
          <div className={`${styles.info} text-light`}>
            <span>Оценка</span>
            <InputGroup className={styles.estimate}>
              <InputGroup.Text id='basic-addon1'>
                <i className='bi bi-star-fill'></i>
              </InputGroup.Text>
              <Form.Control
                onChange={handleScoreInput}
                value={myAnimeListItem.score}
                max='10'
                min='0'
                onKeyDown={(event) => {
                  event.preventDefault()
                }}
                aria-label='Username'
                aria-describedby='basic-addon1'
                type='number'
              />
            </InputGroup>
          </div>
        </>
      )}
    </div>
  )
}
