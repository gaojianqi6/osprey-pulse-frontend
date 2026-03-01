import { View, Text, Pressable } from 'react-native'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

export function Header() {
  const { top } = useSafeArea()
  return (
    <View
      className="min-h-14 w-full max-w-full flex-row items-center justify-between border-b border-primary-subtle bg-background-dark/95 px-4 py-3"
      style={{ paddingTop: top + 12 }}
    >
      {/* Left: logo + title, can shrink so user icon always fits */}
      <View className="min-w-0 flex-1 flex-row items-center gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary p-1">
          <Text selectable={false} className="text-xl text-white">
            🦅
          </Text>
        </View>
        <Text
          numberOfLines={1}
          className="shrink text-xl font-bold text-slate-100"
        >
          Osprey Pulse
        </Text>
      </View>
      {/* Right: user icon, fixed size, never wraps */}
      <Pressable className="ml-2 h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary-subtle">
        <Text selectable={false} className="text-lg text-primary">
          👤
        </Text>
      </Pressable>
    </View>
  )
}
