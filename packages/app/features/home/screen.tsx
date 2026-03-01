'use client'

import { TextLink } from 'solito/link'
import { Text, View } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center p-4 gap-8">
      <H1>Welcome to Solito.</H1>
      <View className="max-w-[600px] gap-4">
        <Text className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </Text>
        <Text className="text-center">
          Solito is made by{' '}
          <TextLink
            href="https://twitter.com/fernandotherojo"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Fernando Rojo
          </TextLink>
          .
        </Text>
      </View>
      <View className="flex-row gap-8">
        <TextLink
          href="/users/fernando"
          className="text-base font-bold text-blue-500"
        >
          Link
        </TextLink>
      </View>
    </View>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <Text className="font-extrabold text-2xl">{children}</Text>
}
