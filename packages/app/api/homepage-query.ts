import { gql } from '@apollo/client'

/**
 * Shared query for homepage data. Used by both RSC (Next.js) and client (useHomepage).
 * Kept separate from homepage.ts to avoid pulling useQuery into RSC bundle.
 */
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
