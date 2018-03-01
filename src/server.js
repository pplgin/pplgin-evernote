import Koa from 'koa'
import { PORT } from './config'
const app = new Koa();
import session from 'koa-session'

app.keys=['pplgin-evernote']

const cookconf = {
  key: 'evernote:auth',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};


// 加载路由配置
const middlewares = require('./middlewares')

app.use(session(cookconf, app))
app.use(middlewares)

app.listen(PORT, () => {
  console.log(`server is running at! http://0.0.0.0:${PORT}`);
})