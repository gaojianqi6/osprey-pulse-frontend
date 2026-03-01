import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

/**
 * GraphQL URL. For React Native:
 * - iOS Simulator: leave unset (localhost works).
 * - Android Emulator: set EXPO_PUBLIC_GRAPHQL_URL=http://10.0.2.2:5018/graphql (e.g. in apps/expo/.env).
 * - Physical device / ngrok: set EXPO_PUBLIC_GRAPHQL_URL in apps/expo/.env (Expo only loads .env from apps/expo).
 */
// const uri =
//   process.env.NEXT_PUBLIC_GRAPHQL_URL ??
//   process.env.EXPO_PUBLIC_GRAPHQL_URL ??
//   'http://localhost:5018/graphql'
console.log('process.env.GRAPHQL_URL', process.env.EXPO_PUBLIC_GRAPHQL_URL, process.env.NEXT_PUBLIC_GRAPHQL_URL)
const uri = 'https://1a5d-49-224-231-99.ngrok-free.app/graphql'

/** ngrok free tier returns an HTML interstitial unless this header is sent; safe to send for all requests. */
const headers: Record<string, string> = {
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

