import { gql, useQuery } from '@apollo/client'

export const NBA_TODAY_COMPETITIONS_QUERY = gql`
  query NbaTodayCompetitions {
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
  }
`

export function useNbaTodayCompetitions() {
  return useQuery(NBA_TODAY_COMPETITIONS_QUERY)
}

