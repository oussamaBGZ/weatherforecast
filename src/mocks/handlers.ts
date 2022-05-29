// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [

    rest.get('https://api.openweathermap.org/data/2.5/forecast', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(require('./resTunis.json'))
        )
    }),

]