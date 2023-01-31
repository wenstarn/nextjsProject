/* eslint-disable consistent-return */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import {
  AnimeApiResult,
  AnimeItem,
  AnimeDetail,
  AnimeDetailsApiResult,
  ScreenshotApiResult,
  AnimeDate,
  AnimeDateApiResult,
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
      transformResponse: (response: AnimeApiResult[]) =>
        response.map((anime) => ({
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
        videos: response.videos.map((video) => ({
          id: video.id,
          url: video.player_url,
          preview: video.image_url,
        })),
        duration: response.duration,
        genres: response.genres.map((genre) => ({
          name: genre.russian,
          id: genre.id,
        })),
        screenshots: response.screenshots.map(
          (screenshot) => `https://shikimori.one${screenshot.preview}`,
        ),
      }),
    }),
    getAnimeScreenshots: builder.query<string[], number>({
      query: (id) => `animes/${id}/screenshots`,
      transformResponse: (response: ScreenshotApiResult[]) =>
        response.map((screenshot) => `https://shikimori.one${screenshot.original}`),
    }),
    getAnimesCalendar: builder.query<AnimeDate[], void>({
      query: () => 'calendar',
      transformResponse: (response: AnimeDateApiResult[]) => {
        const transformedResponse: AnimeDate[] = []
        response.forEach((animeDate, index) => {
          const anime = {
            name: animeDate.anime.russian,
            image: `https://shikimori.one${animeDate.anime.image.original}`,
            id: animeDate.anime.id,
          }
          const currentDate = new Date(animeDate.next_episode_at).toLocaleString('ru-ru', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })

          if (index !== 0) {
            const oldDate = new Date(response[index - 1].next_episode_at).toLocaleString('ru-ru', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
            if (currentDate === oldDate) {
              transformedResponse[transformedResponse.length - 1].animes.push(anime)
            } else {
              transformedResponse.push({
                date: currentDate,
                animes: [anime],
              })
            }
          } else {
            transformedResponse.push({
              date: currentDate,
              animes: [anime],
            })
          }
        })
        return transformedResponse
      },
    }),
  }),
})

export const {
  useGetAnimesQuery,
  useGetAnimeDetailsQuery,
  useGetAnimeScreenshotsQuery,
  useGetAnimesCalendarQuery,
  util: { getRunningQueriesThunk },
} = animeApi

// export endpoints for use in SSR
export const {
  getAnimes, getAnimeDetails, getAnimeScreenshots, getAnimesCalendar,
} = animeApi.endpoints
