import { useQuery } from '@apollo/client/react'
import type { HomepageData } from 'app/types/nba'
import { HOMEPAGE_QUERY } from './homepage-query'

export { HOMEPAGE_QUERY }

export function useHomepage() {
  return useQuery<HomepageData>(HOMEPAGE_QUERY)
}
