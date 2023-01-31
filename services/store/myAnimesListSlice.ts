import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MyAnimeListItem } from '@models/anime'

export type IItem = {
  id: string
  index: number
}

export interface MyAnimesListState {
  animes: MyAnimeListItem[]
  cache: {
    lastId: number | null
    lastIndex: number | null
  }
}

const initialState: MyAnimesListState = {
  animes: [],
  cache: {
    lastId: null,
    lastIndex: null,
  },
}

const myAnimesListSlice = createSlice({
  name: 'myAnimesList',
  initialState,
  reducers: {
    changeCategory(
      state,
      action: PayloadAction<{ id: number; category: string; name: string; episodes: number }>,
    ) {
      const animeIndex = state.animes.findIndex((anime) => anime.id === action.payload.id)
      if (animeIndex === -1) {
        if (action.payload.category !== 'noCategory') {
          state.animes.push({
            id: action.payload.id,
            category: action.payload.category,
            name: action.payload.name,
            watchedEpisodes: 0,
            score: 0,
            episodes: action.payload.episodes,
          })
        }
      } else if (action.payload.category === 'noCategory') {
        state.animes.splice(animeIndex, 1)
      } else {
        state.animes[animeIndex].category = action.payload.category
      }
    },
    changeWatchedEpisodes(state, action: PayloadAction<{ id: number; watchedEpisodes: number }>) {
      const animeIndex = state.animes.findIndex((anime) => anime.id === action.payload.id)
      if (animeIndex !== -1) {
        state.animes[animeIndex].watchedEpisodes =
          action.payload.watchedEpisodes > 0 ? action.payload.watchedEpisodes : 0
      }
    },
    changeScore(state, action: PayloadAction<{ id: number; score: number }>) {
      const animeIndex = state.animes.findIndex((anime) => anime.id === action.payload.id)
      if (animeIndex !== -1) {
        state.animes[animeIndex].score = action.payload.score
      }
    },
  },
})

export const { changeCategory, changeScore, changeWatchedEpisodes } = myAnimesListSlice.actions
export default myAnimesListSlice.reducer
