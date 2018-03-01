module.exports = {
  name: 'koa-decorator',
  script: 'src/server.js',
  exec_interpreter: 'babel-node',
  watch: false,
  env: {
    NODE_ENV: 'production',
    PORT: 1111
  },
  env_production: {
    NODE_ENV: 'production'
  },
  exec_mode: 'fork'
}