'use client'

import React, { useMemo } from 'react'
import { Text, View, Pressable, ActivityIndicator } from 'react-native'
import { useHomepage } from 'app/api/homepage'
import type { HomepageData } from 'app/types/nba'
import {
  Header,
  ChannelNavs,
  GamesTodaysCompetition,
  CommunityFeed,
} from './components'

type HomeScreenProps = {
  /** Server-fetched data for SEO; when present, skip loading state on first render */
  initialData?: HomepageData | null
}

/**
 * Web home: one scrollable container (100vh + overflow-y: auto) so the
 * browser handles mouse wheel. RN ScrollView doesn't on web.
 */
export function HomeScreen({ initialData }: HomeScreenProps) {
  const { data, loading, error, refetch } = useHomepage()

  // Prefer server data when available; fall back to client data
  const resolvedData = initialData ?? data
  const showLoading = !resolvedData && loading
  const showError = !resolvedData && error

  const competitions = useMemo(
    () => resolvedData?.homepage?.nbaTodayCompetitions ?? [],
    [resolvedData]
  )
  const posts = useMemo(
    () => resolvedData?.homepage?.nbaPosts ?? [],
    [resolvedData]
  )

  const mainContent = showLoading ? (
    <View className="min-h-[280px] items-center justify-center py-20">
      <ActivityIndicator size="large" color="#ff4400" />
      <Text className="mt-3 text-sm text-slate-400">
        Loading…
      </Text>
    </View>
  ) : showError ? (
    <View className="min-h-[280px] items-center justify-center px-4 py-20">
      <Text className="mb-3 text-center text-sm text-red-400">
        We couldn&apos;t load the homepage.
      </Text>
      <Pressable
        onPress={() => refetch()}
        className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2"
      >
        <Text className="text-xs font-semibold text-slate-100">
          Retry
        </Text>
      </Pressable>
    </View>
  ) : (
    <View className="w-full max-w-full self-center px-4 pb-8 pt-4">
      <View className="mb-8">
        <GamesTodaysCompetition competitions={competitions} />
      </View>
      <CommunityFeed posts={posts} />

      <View className="mt-6 items-center gap-4 border-t border-primary-border-subtle pt-6">
        <Text className="text-xs text-slate-400">
          Osprey Pulse © 2024
        </Text>
        <View className="flex-row gap-6">
          <Pressable><Text className="text-xs text-slate-500">Terms</Text></Pressable>
          <Pressable><Text className="text-xs text-slate-500">Privacy</Text></Pressable>
          <Pressable><Text className="text-xs text-slate-500">Support</Text></Pressable>
        </View>
      </View>
    </View>
  )

  // Native <div> with overflow-y: auto so browser handles mouse wheel (RN ScrollView doesn't on web)
  return (
    <div className="flex h-screen max-w-full flex-col overflow-y-auto overflow-x-hidden bg-background-dark w-full">
      <Header />
      <ChannelNavs activeId="nba" />
      {mainContent}
    </div>
  )
}
