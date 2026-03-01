import './global.css'
import { cssInterop } from 'nativewind'
import { TextLink } from 'solito/link'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'

// TextLink renders as Text but needs cssInterop for className (incl. text color) on native
cssInterop(TextLink, { className: 'style' })

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
