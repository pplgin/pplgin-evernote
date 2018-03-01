import views from 'koa-views'
import { resolve } from 'path'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import compose from 'koa-compose'

import mLog from './m-log.js'
import mRoute from './m-route.js'
import routesConf from '../routes'


const middlewares = [
  mLog,
  bodyParser(),
  views(resolve('src/views'), {
    map: {
      html: 'swig',
      swig: 'swig'
    },
    extension: 'swig'
  }),
  serve(resolve('src/static')),
  mRoute(routesConf)
]

module.exports = compose(middlewares)