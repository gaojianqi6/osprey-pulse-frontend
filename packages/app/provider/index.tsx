'use client'

import { SafeArea } from 'app/provider/safe-area'
import { ApolloProvider } from './apollo'
import { NavigationProvider } from './navigation'
import { ReduxProvider } from 'app/store'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <ApolloProvider>
        <ReduxProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </ReduxProvider>
      </ApolloProvider>
    </SafeArea>
  )
}
