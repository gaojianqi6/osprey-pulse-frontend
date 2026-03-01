/**
 * On Next.js web, Apollo is provided by ApolloWrapper (ApolloNextAppProvider)
 * in apps/next/app/layout.tsx. This is a no-op to avoid double-providing.
 */
export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
