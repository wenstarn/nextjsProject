/* eslint-disable consistent-return */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import {
  AnimeApiResult, AnimeItem, AnimeDetail, AnimeDetailsApiResult,
} from '@models/anime'

export const animeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shikimori.one/api/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getAnimes: builder.query<AnimeItem[], number | void>({
      query: (limit = 50) => `animes?limit=${limit}`,
      transformResponse: (response: AnimeApiResult[]) => response.map((anime) => ({
        name: anime.russian,
        image: `https://shikimori.one${anime.image.original}`,
        id: anime.id,
      })),
    }),
    getAnimeDetails: builder.query<AnimeDetail, number>({
      query: (id) => `animes/${id}`,
      transformResponse: (response: AnimeDetailsApiResult) => ({
        id: response.id,
        image: `https://shikimori.one${response.image.original}`,
        name: response.russian,
        description: response.description,
        kind: response.kind,
        score: response.score,
        status: response.status,
        episodes: response.episodes,
        episodes_aired: response.episodes_aired,
        videos: response.videos,
        duration: response.duration,
        genres: response.genres.map((genre) => ({
          name: genre.russian,
          id: genre.id,
        })),
        screenshots: response.screenshots.map((screenshot) => (`https://shikimori.one${screenshot.preview}`)),
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetAnimesQuery,
  useGetAnimeDetailsQuery,
  util: { getRunningQueriesThunk },
} = animeApi

// export endpoints for use in SSR
export const { getAnimes, getAnimeDetails } = animeApi.endpoints
