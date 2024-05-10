import { env } from './env'
import { app } from './app'

const port = env.PORT || 10000 // Definindo a porta com base em env.PORT ou 10000 como padrão

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`)
})
