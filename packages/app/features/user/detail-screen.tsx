import { View, Text, Pressable } from 'react-native'
import { useRouter, useSearchParams } from 'solito/navigation'

export function UserDetailScreen() {
  const router = useRouter()
  const params = useSearchParams()
  return (
    <View className="flex-1 justify-center items-center">
      <Pressable onPress={() => router.back()}>
        <Text>👈 welcome, {params?.get('id')}! (press me to go back)</Text>
      </Pressable>
    </View>
  )
}
