/** NBA team (homepage/competitions) */
export type NbaTeam = {
  id: number
  name: string
  nickname: string
  code: string
  city: string
  logoUrl?: string | null
}

/** Single today's competition with home/away and scores */
export type NbaTodayCompetition = {
  externalId: string
  startTime: string
  homeTeam: NbaTeam
  awayTeam: NbaTeam
  homeScore: number | null
  awayScore: number | null
}

/** Community feed post (NBA news etc.) */
export type NbaPost = {
  id: number
  title: string
  shortDescription: string | null
  previewImg: string | null
  externalId: string
  type: string
  createdAt: string
  lastBumpedAt: string
}

/** Homepage GraphQL response shape */
export type HomepageData = {
  homepage: {
    nbaTodayCompetitions: NbaTodayCompetition[]
    nbaPosts: NbaPost[]
  }
}
