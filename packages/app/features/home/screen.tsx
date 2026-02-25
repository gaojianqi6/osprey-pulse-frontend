import { useMemo } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { useNbaTodayCompetitions } from 'app/api/nba'

type NbaTeam = {
  id: string
  name: string
  nickname: string
  code: string
  city: string
  logoUrl?: string | null
}

type NbaCompetition = {
  externalId: string
  startTime: string
  homeTeam: NbaTeam
  awayTeam: NbaTeam
  homeScore: number | null
  awayScore: number | null
}

export function HomeScreen() {
  const { data, loading, error, refetch } = useNbaTodayCompetitions()

  const competitions: NbaCompetition[] = useMemo(
    () => data?.nbaTodayCompetitions ?? [],
    [data]
  )

  return (
    <View className="flex-1 bg-slate-950">
      <View className="px-4 pt-14 pb-4 md:px-10 md:pt-16 md:pb-6">
        <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Osprey Pulse
        </Text>
        <Text className="mt-1 text-3xl font-extrabold text-slate-50 md:text-4xl">
          NBA Channel
        </Text>
        <Text className="mt-2 max-w-xl text-sm text-slate-400 md:text-base">
          Today&apos;s games, live scores, and momentum pulses across the league.
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-sm text-slate-400">Loading today&apos;s slate…</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="mb-3 text-center text-sm text-red-400">
            We couldn&apos;t load today&apos;s NBA games.
          </Text>
          <Text
            className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100"
            onPress={() => {
              refetch()
            }}
          >
            Retry
          </Text>
        </View>
      ) : competitions.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-center text-sm text-slate-400">
            No NBA competitions scheduled for today.
          </Text>
        </View>
      ) : (
        <FlatList
          data={competitions}
          keyExtractor={(item) => item.externalId}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 24,
            paddingTop: 4,
          }}
          renderItem={({ item }) => <CompetitionCard competition={item} />}
        />
      )}
    </View>
  )
}

function CompetitionCard({ competition }: { competition: NbaCompetition }) {
  const { homeTeam, awayTeam, homeScore, awayScore, startTime } = competition

  const isLive =
    typeof homeScore === 'number' &&
    typeof awayScore === 'number' &&
    (homeScore > 0 || awayScore > 0)

  const tipoffTime = new Date(startTime)

  const timeLabel = isNaN(tipoffTime.getTime())
    ? 'TBD'
    : tipoffTime.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
      })

  const homeLeading =
    typeof homeScore === 'number' &&
    typeof awayScore === 'number' &&
    homeScore > awayScore

  return (
    <View className="mb-3 rounded-3xl bg-slate-900/80 px-4 py-3.5 shadow-md shadow-black/40 md:mb-4 md:px-5 md:py-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {timeLabel}
        </Text>
        <View className="rounded-full bg-emerald-500/10 px-2 py-1">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
            {isLive ? 'Live' : 'Scheduled'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between gap-3">
        <TeamColumn
          align="left"
          team={awayTeam}
          score={awayScore}
          dim={homeLeading}
        />
        <View className="items-center justify-center">
          <Text className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            at
          </Text>
        </View>
        <TeamColumn
          align="right"
          team={homeTeam}
          score={homeScore}
          dim={!homeLeading && isLive}
        />
      </View>
    </View>
  )
}

function TeamColumn({
  align,
  team,
  score,
  dim,
}: {
  align: 'left' | 'right'
  team: NbaTeam
  score: number | null
  dim?: boolean
}) {
  const isScoreKnown = typeof score === 'number'

  return (
    <View
      className={`flex-1 flex-row items-center gap-3 ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      {team.logoUrl ? (
        <Image
          source={{ uri: team.logoUrl }}
          className="h-11 w-11 rounded-2xl bg-slate-800"
        />
      ) : (
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-slate-800">
          <Text className="text-xs font-semibold text-slate-200">
            {team.code}
          </Text>
        </View>
      )}
      <View
        className={`flex-1 ${align === 'right' ? 'items-end' : 'items-start'}`}
      >
        <Text
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            dim ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {team.city}
        </Text>
        <Text
          className={`mt-0.5 text-base font-semibold ${
            dim ? 'text-slate-400' : 'text-slate-50'
          }`}
          numberOfLines={1}
        >
          {team.nickname || team.name}
        </Text>
      </View>

      <View className="items-center">
        <Text
          className={`text-xl font-extrabold tabular-nums ${
            dim ? 'text-slate-500' : 'text-slate-50'
          }`}
        >
          {isScoreKnown ? score : '–'}
        </Text>
      </View>
    </View>
  )
}
