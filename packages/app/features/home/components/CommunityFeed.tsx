import { View, Text, Image, Pressable } from 'react-native'
import type { NbaPost } from 'app/types/nba'

type CommunityFeedProps = {
  posts: NbaPost[]
  onPostPress?: (post: NbaPost) => void
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  return `${diffDays} days ago`
}

function postIcon(type: string) {
  switch (type) {
    case 'NEWS':
      return <Text className="text-primary text-[22px]" selectable={false}>📄</Text>
    default:
      return <Text className="text-primary text-[22px]" selectable={false}>🏛</Text>
  }
}

export function CommunityFeed({ posts, onPostPress }: CommunityFeedProps) {
  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold tracking-tight text-slate-100">
        Community Feed
      </Text>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPress={() => onPostPress?.(post)}
        />
      ))}
    </View>
  )
}

function PostCard({
  post,
  onPress,
}: {
  post: NbaPost
  onPress?: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full max-w-full overflow-hidden rounded-xl border border-primary-border-subtle bg-background-dark/60"
    >
      <View className="flex-row items-start justify-between p-4">
        <View className="min-w-0 flex-1 pr-4">
          <Text
            numberOfLines={3}
            className="text-lg font-bold leading-[22px] text-slate-100"
          >
            {post.title}
          </Text>
          {post.shortDescription ? (
            <Text
              numberOfLines={2}
              className="mt-1.5 text-[13px] leading-[18px] text-slate-400"
            >
              {post.shortDescription}
            </Text>
          ) : null}
        </View>
        <View className="ml-2 shrink-0">{postIcon(post.type)}</View>
      </View>

      <View className="relative h-48 bg-slate-800" style={{ height: 192 }}>
        {post.previewImg ? (
          <>
            <Image
              source={{ uri: post.previewImg }}
              className="absolute inset-0 h-full w-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-background-dark/40" />
          </>
        ) : (
          <View className="absolute inset-0 items-center justify-center bg-slate-800">
            <Text className="text-sm text-slate-500">No image</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between border-t border-primary-border-subtle p-4">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-slate-400" selectable={false}>💬</Text>
            <Text className="text-xs font-medium text-slate-400" selectable={false}>
              — comments
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm text-slate-400" selectable={false}>👍</Text>
            <Text className="text-xs font-medium text-slate-400" selectable={false}>—</Text>
          </View>
        </View>
        <Text className="text-[10px] font-medium text-slate-400">
          {timeAgo(post.createdAt)}
        </Text>
      </View>
    </Pressable>
  )
}
