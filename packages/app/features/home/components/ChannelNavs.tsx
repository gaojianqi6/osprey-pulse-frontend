import { ScrollView, Text, Pressable, View } from 'react-native'

const CHANNELS = [
  { id: 'nba', label: 'NBA' },
  { id: 'lol', label: 'LOL' },
  { id: 'rugby', label: 'Rugby' },
  { id: 'football', label: 'Football' },
  { id: 'chat', label: 'Chat' },
] as const

type ChannelNavsProps = {
  activeId?: string
  onChannelPress?: (id: string) => void
}

export function ChannelNavs({ activeId = 'nba', onChannelPress }: ChannelNavsProps) {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,68,0,0.06)', backgroundColor: '#23140f', width: '100%', maxWidth: '100%' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 24,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        {CHANNELS.map((ch) => {
          const isActive = ch.id === activeId
          return (
            <Pressable
              key={ch.id}
              onPress={() => onChannelPress?.(ch.id)}
              className="shrink-0 flex-col items-center gap-1"
            >
              <Text
                className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-slate-400'}`}
                style={{ fontSize: 14, fontWeight: '700', color: isActive ? '#ff4400' : '#94a3b8' }}
              >
                {ch.label}
              </Text>
              <View
                className={isActive ? 'bg-primary' : 'bg-transparent'}
                style={{ height: 4, width: 24, borderRadius: 2, backgroundColor: isActive ? '#ff4400' : 'transparent' }}
              />
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
