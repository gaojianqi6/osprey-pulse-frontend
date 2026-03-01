import { useMemo } from 'react'
import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { useHomepage } from 'app/api/homepage'
import {
  Header,
  ChannelNavs,
  GamesTodaysCompetition,
  CommunityFeed,
} from './components'

export function HomeScreen() {
  const { data, loading, error, refetch } = useHomepage()

  const competitions = useMemo(
    () => data?.homepage?.nbaTodayCompetitions ?? [],
    [data]
  )
  const posts = useMemo(() => data?.homepage?.nbaPosts ?? [], [data])

  return (
    <View className="w-full max-w-full flex-1 bg-background-dark">
      <Header />
      <ChannelNavs activeId="nba" />

      {loading ? (
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color="#ff4400" />
          <Text className="mt-3 text-sm text-slate-400">
            Loading…
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-4 py-20">
          <Text className="mb-3 text-center text-sm text-red-400">
            We couldn&apos;t load the homepage.
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2"
          >
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Retry
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          className="min-h-0 min-w-0 max-w-full flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 32,
            paddingTop: 16,
            maxWidth: '100%',
            width: '100%',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="mb-8">
            <GamesTodaysCompetition competitions={competitions} />
          </View>
          <CommunityFeed posts={posts} />

          <View className="mt-6 items-center gap-4 border-t border-primary-border-subtle pt-6">
            <Text className="text-xs font-medium text-slate-400">
              Osprey Pulse © 2024
            </Text>
            <View className="flex-row gap-6">
              <Pressable><Text className="text-xs text-slate-500">Terms</Text></Pressable>
              <Pressable><Text className="text-xs text-slate-500">Privacy</Text></Pressable>
              <Pressable><Text className="text-xs text-slate-500">Support</Text></Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
