import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from 'app/features/home/screen'
import { View, Text } from 'react-native'
import { Home, LineChart, Plus, User } from 'lucide-react-native'

type RootTabParamList = {
  home: undefined
  rates: undefined
  plus: undefined
  me: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <Text className="text-base text-slate-200">{label}</Text>
    </View>
  )
}

export function NativeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopColor: '#1f2937',
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2.5} />
          ),
        }}
      />
      <Tab.Screen
        name="rates"
        children={() => <PlaceholderScreen label="Rates" />}
        options={{
          title: 'Rates',
          tabBarIcon: ({ color, size }) => (
            <LineChart color={color} size={size} strokeWidth={2.5} />
          ),
        }}
      />
      <Tab.Screen
        name="plus"
        children={() => <PlaceholderScreen label="Create" />}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Plus color={color} size={size} strokeWidth={2.5} />
          ),
        }}
      />
      <Tab.Screen
        name="me"
        children={() => <PlaceholderScreen label="Me" />}
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2.5} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
