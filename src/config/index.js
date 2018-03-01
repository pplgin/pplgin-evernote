import dev from './config.dev.js'
import prod from './config.prod.js'

const config = process.env.NODE_ENV === 'develop' ? dev : prod

module.exports = {
  ...config
}