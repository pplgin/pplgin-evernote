/**
 * [exports 路由模板]
 * @type {Array}
 */
module.exports = [{
  url: '/api/user/login',
  method: 'post',
  controller: 'home::index',
  template: 'home',
  middleware: [(ctx, next) => {
    console.log('log111 -midd');
    return next()
  },(ctx, next)=> {
    console.log('log222 -midd');
    return next()
  }],
  method: 'get'
}, {
  url: '/api/note/create',
  controller: 'home::post_create',
  method: 'post'
}, {
  url: '/api/note/delete',
  controller: 'home::post_delete',
  method: 'post'
}]