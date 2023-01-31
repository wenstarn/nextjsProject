export interface AnimeApiResult {
    id: number,
    name: string,
    russian: string,
    image: {
      original: string,
      preview: string,
      x96: string,
      x48: string
    },
    url: string,
    kind: string,
    score: string,
    status: string,
    episodes: number,
    episodes_aired: number,
    aired_on: string | null,
    released_on: string | null
}

export interface AnimeItem {
    id: number,
    name: string,
    image: string
}

export interface ScreenshotApiResult {
  original: string
  preview: string
}

export interface Video {
  id: number
  url: string
  image_url: string
  player_url: string
  name: string
  kind: string
  hosting: string
}

export interface AnimeDetailsApiResult extends AnimeApiResult{
  rating: string,
  english: Array<string | null>,
  japanese: Array<string | null>,
  synonyms: Array<string | null>,
  license_name_ru: string | null,
  duration: number,
  description: string | null,
  description_html: string | null,
  description_source: string | null
  franchise: string | null,
    favoured: boolean,
    anons: boolean,
    ongoing: boolean,
    thread_id: number,
    topic_id: number,
    myanimelist_id: number,
    rates_scores_stats: {
      name: number
      value: number
    }[],
    rates_statuses_stats: {
      name: string
      value: number
    }[],
    updated_at: string | null
    next_episode_at: string | null,
    fansubbers: string[],
    fandubbers: string[]
    licensors: string[],
    genres: {
      id: number
      name: string
      russian: string
      kind: string
    }[],
    studios: {
      id: number
      name: string
      filtered_name: string
      real: boolean
      image: string | null
    }[],
    videos: Video[],
    screenshots: {
      original: string
      preview: string
    }[],
    user_rate: number | null
}

export interface AnimeDetail extends AnimeItem{
  description: string | null,
  kind: string,
  score: string,
  status: string,
  episodes: number,
  episodes_aired: number,
  videos: {
    id: number,
    url: string,
    preview: string
  }[],
  duration: number
  genres: {
    id: number
    name: string
  }[],
  screenshots: string[],
}

export interface AnimeDateApiResult {
  next_episode: number
  next_episode_at: string
  duration: number
  anime: AnimeApiResult
}

export interface AnimeDate {
  date: string
  animes: AnimeItem[]
}
