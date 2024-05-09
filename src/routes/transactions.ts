import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', checkSessionIdExists) adicionando para todos os endpoints
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies
      const transactions = await knex('transactions')
        .where({ session_id: sessionId })
        .select()

      return {
        transactions,
      }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { sessionId } = req.cookies
      const { id } = getTransactionParamsSchema.parse(req.params)

      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()

      return {
        transaction,
      }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies
      const summary = await knex('transactions')
        .where({ session_id: sessionId })
        .sum('amount', { as: 'amount' })
        .first()

      return {
        summary,
      }
    },
  )

  app.post('/', async (req, rep) => {
    const createTransactionBodySchema = z.object({
      amount: z.number(),
      description: z.string(),
      type: z.enum(['credit', 'debit']),
    })

    const { description, amount, type } = createTransactionBodySchema.parse(
      req.body,
    )

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      rep.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      description,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return rep.status(201).send()
  })
}
