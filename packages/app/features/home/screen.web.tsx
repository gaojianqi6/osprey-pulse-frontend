'use client'

import React, { useMemo } from 'react'
import { Text, View, Pressable, ActivityIndicator } from 'react-native'
import { useHomepage } from 'app/api/homepage'
import {
  Header,
  ChannelNavs,
  GamesTodaysCompetition,
  CommunityFeed,
} from './components'

/**
 * Web home: one scrollable container (100vh + overflow-y: auto) so the
 * browser handles mouse wheel. RN ScrollView doesn't on web.
 */
export function HomeScreen() {
  const { data, loading, error, refetch } = useHomepage()

  const competitions = useMemo(
    () => data?.homepage?.nbaTodayCompetitions ?? [],
    [data]
  )
  const posts = useMemo(() => data?.homepage?.nbaPosts ?? [], [data])

  const mainContent = loading ? (
    <View
      style={{
        minHeight: 280,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
      }}
    >
      <ActivityIndicator size="large" color="#ff4400" />
      <Text style={{ marginTop: 12, fontSize: 14, color: '#94a3b8' }}>
        Loading…
      </Text>
    </View>
  ) : error ? (
    <View
      style={{
        minHeight: 280,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 80,
      }}
    >
      <Text style={{ marginBottom: 12, fontSize: 14, color: '#f87171' }}>
        We couldn&apos;t load the homepage.
      </Text>
      <Pressable
        onPress={() => refetch()}
        style={{
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: '#475569',
          backgroundColor: '#1e293b',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#f1f5f9' }}>
          Retry
        </Text>
      </Pressable>
    </View>
  ) : (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 16,
        maxWidth: '100%',
        width: '100%',
        alignSelf: 'center',
      }}
    >
      <View style={{ marginBottom: 32 }}>
        <GamesTodaysCompetition competitions={competitions} />
      </View>
      <CommunityFeed posts={posts} />

      <View
        style={{
          marginTop: 24,
          alignItems: 'center',
          gap: 16,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,68,0,0.08)',
          paddingTop: 24,
        }}
      >
        <Text style={{ fontSize: 12, color: '#94a3b8' }}>
          Osprey Pulse © 2024
        </Text>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Pressable>
            <Text style={{ fontSize: 12, color: '#64748b' }}>Terms</Text>
          </Pressable>
          <Pressable>
            <Text style={{ fontSize: 12, color: '#64748b' }}>Privacy</Text>
          </Pressable>
          <Pressable>
            <Text style={{ fontSize: 12, color: '#64748b' }}>Support</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )

  // Native <div> with overflow-y: auto so browser handles mouse wheel (RN ScrollView doesn't on web)
  const scrollContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#23140f',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div style={scrollContainerStyle}>
      <Header />
      <ChannelNavs activeId="nba" />
      {mainContent}
    </div>
  )
}
