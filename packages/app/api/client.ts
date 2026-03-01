import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

/**
 * GraphQL URL. For React Native:
 * - iOS Simulator: leave unset (localhost works).
 * - Android Emulator: set EXPO_PUBLIC_GRAPHQL_URL=http://10.0.2.2:5018/graphql (e.g. in apps/expo/.env).
 * - Physical device / ngrok: set EXPO_PUBLIC_GRAPHQL_URL in apps/expo/.env (Expo only loads .env from apps/expo).
 */
export const uri =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  process.env.EXPO_PUBLIC_GRAPHQL_URL ??
  'http://localhost:5018/graphql'
  
/** ngrok free tier returns an HTML interstitial unless this header is sent; safe to send for all requests. */
export const headers: Record<string, string> = {
  'ngrok-skip-browser-warning': '1',
}

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  // eslint-disable-next-line no-console
  console.log('[Apollo] GraphQL URI:', uri)
}

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri,
    headers,
  }),
  cache: new InMemoryCache(),
})

