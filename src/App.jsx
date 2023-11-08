import { AppRouter } from "./AppRouter"
//Context
import { PokemonProvider } from "./context/PokemonProvider"

function App() {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  )
}

export default App
