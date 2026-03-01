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
    <View
      style={{
        flex: 1,
        backgroundColor: '#23140f',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Header />
      <ChannelNavs activeId="nba" />

      {loading ? (
        <View className="flex-1 items-center justify-center py-20" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80 }}>
          <ActivityIndicator size="large" color="#ff4400" />
          <Text className="mt-3 text-sm text-slate-400" style={{ marginTop: 12, fontSize: 14, color: '#94a3b8' }}>
            Loading…
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-4 py-20" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 80 }}>
          <Text className="mb-3 text-center text-sm text-red-400" style={{ marginBottom: 12, fontSize: 14, color: '#f87171' }}>
            We couldn&apos;t load the homepage.
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2"
            style={{ borderRadius: 9999, borderWidth: 1, borderColor: '#475569', backgroundColor: '#1e293b', paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-100" style={{ fontSize: 12, fontWeight: '600', color: '#f1f5f9' }}>
              Retry
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, minWidth: 0, minHeight: 0, maxWidth: '100%' }}
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
          <View style={{ marginBottom: 32 }}>
            <GamesTodaysCompetition competitions={competitions} />
          </View>
          <CommunityFeed posts={posts} />

          <View
            className="mt-6 items-center gap-4 border-t border-primary/5 pt-6"
            style={{ marginTop: 24, alignItems: 'center', gap: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,68,0,0.08)', paddingTop: 24 }}
          >
            <Text className="text-xs font-medium text-slate-400" style={{ fontSize: 12, color: '#94a3b8' }}>
              Osprey Pulse © 2024
            </Text>
            <View className="flex-row gap-6" style={{ flexDirection: 'row', gap: 24 }}>
              <Pressable><Text style={{ fontSize: 12, color: '#64748b' }}>Terms</Text></Pressable>
              <Pressable><Text style={{ fontSize: 12, color: '#64748b' }}>Privacy</Text></Pressable>
              <Pressable><Text style={{ fontSize: 12, color: '#64748b' }}>Support</Text></Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
