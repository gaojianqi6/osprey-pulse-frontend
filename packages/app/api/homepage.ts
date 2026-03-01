import { gql, useQuery } from '@apollo/client'
import type { HomepageData } from 'app/types/nba'

export const HOMEPAGE_QUERY = gql`
  query Homepage {
    homepage(postsLimit: 20) {
      nbaTodayCompetitions {
        externalId
        startTime
        homeTeam {
          id
          name
          nickname
          code
          city
          logoUrl
        }
        awayTeam {
          id
          name
          nickname
          code
          city
          logoUrl
        }
        homeScore
        awayScore
      }
      nbaPosts {
        id
        title
        shortDescription
        previewImg
        externalId
        type
        createdAt
        lastBumpedAt
      }
    }
  }
`

export function useHomepage() {
  return useQuery<HomepageData>(HOMEPAGE_QUERY)
}
