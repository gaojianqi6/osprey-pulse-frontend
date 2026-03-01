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
    <View className="w-full max-w-full border-b border-primary/6 bg-background-dark">
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
              >
                {ch.label}
              </Text>
              <View
                className={`h-1 w-6 rounded-sm ${isActive ? 'bg-primary' : 'bg-transparent'}`}
              />
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
