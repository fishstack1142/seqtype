import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { userRouter } from './routers/user.router'
import { sequelize } from './instances/sequelize'

import { tokenGuard } from './middlewares/token-guard'

const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', userRouter)

app.get('/', (req, res, next) => {
    res.json('Hello World')
})

app.get('/home', (req, res, next) => {
    sequelize
    res.json('This is my home. And you?')
})

app.use(tokenGuard())

app.get('/protected', (req, res, next) => {
    res.json('Protected Hello World')
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})