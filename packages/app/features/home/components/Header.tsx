import { View, Text, Pressable } from 'react-native'

export function Header() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(35,20,15,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,68,0,0.1)',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {/* Left: logo + title, can shrink so user icon always fits */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          flex: 1,
          minWidth: 0,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: '#ff4400',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text selectable={false} style={{ color: '#fff', fontSize: 20 }}>🦅</Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: '#f1f5f9',
            fontSize: 20,
            fontWeight: '700',
            flexShrink: 1,
          }}
        >
          Osprey Pulse
        </Text>
      </View>
      {/* Right: user icon, fixed size, never wraps */}
      <Pressable
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,68,0,0.2)',
          backgroundColor: 'rgba(255,68,0,0.1)',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 8,
          flexShrink: 0,
        }}
      >
        <Text selectable={false} style={{ color: '#ff4400', fontSize: 18 }}>👤</Text>
      </Pressable>
    </View>
  )
}
