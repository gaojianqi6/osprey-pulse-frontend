import type { HomepageData } from 'app/types/nba'
import { query } from './ApolloClient'
import { HomeScreen } from 'app/features/home/screen.web'

import { HOMEPAGE_QUERY } from 'app/api/homepage-query'

export default async function HomePage() {
  const { data } = await query<HomepageData>({
    query: HOMEPAGE_QUERY,
  })
  return <HomeScreen initialData={data ?? null} />
}
