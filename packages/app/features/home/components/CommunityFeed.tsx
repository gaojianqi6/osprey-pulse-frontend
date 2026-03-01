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
  const color = '#ff4400'
  switch (type) {
    case 'NEWS':
      return <Text style={{ color, fontSize: 22 }} selectable={false}>📄</Text>
    default:
      return <Text style={{ color, fontSize: 22 }} selectable={false}>🏛</Text>
  }
}

export function CommunityFeed({ posts, onPostPress }: CommunityFeedProps) {
  return (
    <View className="gap-4" style={{ gap: 16 }}>
      <Text className="text-2xl font-bold tracking-tight text-slate-100" style={{ fontSize: 24, fontWeight: '700', color: '#f1f5f9' }}>
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
      style={{ overflow: 'hidden', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,68,0,0.08)', backgroundColor: 'rgba(35,20,15,0.6)', width: '100%', maxWidth: '100%' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', padding: 16 }}>
        <View style={{ flex: 1, marginRight: 16, minWidth: 0 }}>
          <Text
            numberOfLines={3}
            style={{ fontSize: 18, fontWeight: '700', color: '#f1f5f9', lineHeight: 22 }}
          >
            {post.title}
          </Text>
          {post.shortDescription ? (
            <Text
              numberOfLines={2}
              style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, lineHeight: 18 }}
            >
              {post.shortDescription}
            </Text>
          ) : null}
        </View>
        <View style={{ marginLeft: 8, flexShrink: 0 }}>{postIcon(post.type)}</View>
      </View>

      <View className="relative h-48 bg-slate-800" style={{ height: 192, backgroundColor: '#1e293b', position: 'relative' }}>
        {post.previewImg ? (
          <>
            <Image
              source={{ uri: post.previewImg }}
              style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(35,20,15,0.4)' }} />
          </>
        ) : (
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b' }}>
            <Text style={{ color: '#64748b', fontSize: 14 }}>No image</Text>
          </View>
        )}
      </View>

      <View
        className="flex-row items-center justify-between border-t border-primary/5 p-4"
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,68,0,0.08)', padding: 16 }}
      >
        <View className="flex-row items-center gap-4" style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View className="flex-row items-center gap-1" style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#94a3b8', fontSize: 14 }} selectable={false}>💬</Text>
            <Text className="text-xs font-medium text-slate-400" style={{ fontSize: 12, color: '#94a3b8' }}>
              — comments
            </Text>
          </View>
          <View className="flex-row items-center gap-1" style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#94a3b8', fontSize: 14 }} selectable={false}>👍</Text>
            <Text className="text-xs font-medium text-slate-400" style={{ fontSize: 12, color: '#94a3b8' }}>—</Text>
          </View>
        </View>
        <Text className="text-[10px] font-medium text-slate-400" style={{ fontSize: 10, color: '#94a3b8' }}>
          {timeAgo(post.createdAt)}
        </Text>
      </View>
    </Pressable>
  )
}
