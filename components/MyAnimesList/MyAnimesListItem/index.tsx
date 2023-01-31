import Link from 'next/link'
import { MyAnimeListItem } from '@models/anime'

interface Props {
  anime: MyAnimeListItem
}

export default function MyAnimesListItem({ anime }: Props) {
  return <>
      <td className='name'>
        <Link href={`/animes/${anime.id}`}>{anime.name}</Link>
      </td>
      <td className='episodes'>
        <div className='content-wrapper'>
          <input
            className='my-list-item-stats'
            type='text'
            value={anime.watchedEpisodes}
          />
        </div>
      </td>
      <td className='grade'>
        <div className='content-wrapper'>
          <input
            className='my-list-item-stats'
            type='text'
            value={anime.score}
          />
        </div>
      </td>
    </>
}
