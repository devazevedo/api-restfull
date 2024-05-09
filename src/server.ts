import { env } from './env'
import { app } from './app'

const port = env.PORT || 3333; // Definindo a porta com base em env.PORT ou 3333 como padrão

app
  .listen({ port })
  .then(() => {
    console.log(`Server is running on port ${port}`);
  });
