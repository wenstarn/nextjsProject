import { MyAnimeListItem } from '@models/anime'
import MyAnimesListItem from './MyAnimesListItem'

interface Props {
  animes: MyAnimeListItem[]
}

const Table = ({ animes }: Props) => (
    <table className='table table-dark'>
      <thead>
        <tr>
          <th className='index' scope='col'>
            #
          </th>
          <th className='name' scope='col'>
            Название
          </th>
          <th className='episodes' scope='col'>
            Количество Эпизодов
          </th>
          <th className='grade' scope='col'>
            Оценка
          </th>
        </tr>
      </thead>
      <tbody>
        {animes.map((anime, index) => (
          <tr key={anime.id}>
            <th className='index' scope='row'>
              {index + 1}
            </th>
            <MyAnimesListItem anime={anime} />
          </tr>
        ))}
      </tbody>
    </table>
)

export default function MyAnimesList({ animes }: Props) {
  const scheduled = animes.filter((anime) => anime.category === 'scheduled')
  const watching = animes.filter((anime) => anime.category === 'watching')
  const watched = animes.filter((anime) => anime.category === 'watched')
  const dropped = animes.filter((anime) => anime.category === 'dropped')

  return (
    <>
      <h1 className='text-light text-center'>Запланированное</h1>
      <Table animes={scheduled} />
      <h1 className='text-light text-center'>Смотрю</h1>
      <Table animes={watching} />
      <h1 className='text-light text-center'>Просмотрено</h1>
      <Table animes={watched} />
      <h1 className='text-light text-center'>Брошено</h1>
      <Table animes={dropped} />
    </>
  )
}
