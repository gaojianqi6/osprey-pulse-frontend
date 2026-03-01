import { View, Text, Image, Pressable } from 'react-native'
import type { NbaTodayCompetition } from 'app/types/nba'

type GamesTodaysCompetitionProps = {
  competitions: NbaTodayCompetition[]
  onSeeMore?: () => void
}

const VISIBLE_GAMES = 3

function formatGameStatus(comp: NbaTodayCompetition): string {
  const { homeScore, awayScore, startTime } = comp
  const hasScores =
    typeof homeScore === 'number' && typeof awayScore === 'number'
  if (!hasScores) {
    const date = new Date(startTime)
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
      })
    }
    return 'Scheduled'
  }
  const start = new Date(startTime).getTime()
  const now = Date.now()
  const threeHours = 3 * 60 * 60 * 1000
  return now - start > threeHours ? 'Final' : 'LIVE'
}

function isFinal(comp: NbaTodayCompetition): boolean {
  const { homeScore, awayScore, startTime } = comp
  if (typeof homeScore !== 'number' || typeof awayScore !== 'number')
    return false
  const start = new Date(startTime).getTime()
  return Date.now() - start > 3 * 60 * 60 * 1000
}

export function GamesTodaysCompetition({
  competitions,
  onSeeMore,
}: GamesTodaysCompetitionProps) {
  const visible = competitions.slice(0, VISIBLE_GAMES)
  const moreCount = Math.max(0, competitions.length - VISIBLE_GAMES)

  return (
    <View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold tracking-tight text-slate-100">
          Today&apos;s Games
        </Text>
        <View className="rounded-full bg-primary/20 px-2 py-1">
          <Text className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Live
          </Text>
        </View>
      </View>

      <View className="gap-3">
        {visible.map((comp) => (
          <GameCard key={comp.externalId} competition={comp} />
        ))}
      </View>

      {moreCount > 0 && (
        <Pressable
          onPress={onSeeMore}
          className="mt-4 flex-row items-center justify-center gap-2 py-2"
        >
          <Text className="text-sm font-bold text-primary">
            See {moreCount} more competitions
          </Text>
          <Text className="text-base font-bold text-primary">→</Text>
        </Pressable>
      )}
    </View>
  )
}

function GameCard({ competition }: { competition: NbaTodayCompetition }) {
  const { homeTeam, awayTeam, homeScore, awayScore } = competition
  const status = formatGameStatus(competition)
  const final = isFinal(competition) && status !== 'LIVE'
  const scoreText =
    typeof homeScore === 'number' && typeof awayScore === 'number'
      ? `${homeScore} - ${awayScore}`
      : '–'

  return (
    <View className="w-full max-w-full flex-row items-center justify-between rounded-xl border border-primary/10 bg-primary/5 p-4">
      <TeamBlock team={homeTeam} />
      <View className="items-center">
        <Text
          className={`text-2xl font-extrabold ${final ? 'text-slate-400' : 'text-primary'}`}
        >
          {scoreText}
        </Text>
        <Text className="mt-0.5 text-[10px] font-medium uppercase text-slate-500">
          {status}
        </Text>
      </View>
      <TeamBlock team={awayTeam} />
    </View>
  )
}

function TeamBlock({
  team,
}: {
  team: NbaTodayCompetition['homeTeam']
}) {
  return (
    <View className="w-24 flex-col items-center gap-1">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-slate-800 p-2">
        {team.logoUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- React Native Image uses accessibilityLabel
          <Image
            source={{ uri: team.logoUrl }}
            className="h-10 w-10 rounded-full"
            resizeMode="contain"
            accessibilityLabel={team.nickname || team.name}
          />
        ) : (
          <Text className="text-xl text-primary" selectable={false}>
            ●
          </Text>
        )}
      </View>
      <Text
        className="text-center text-xs font-bold text-slate-100"
        numberOfLines={1}
      >
        {team.nickname || team.name}
      </Text>
    </View>
  )
}
