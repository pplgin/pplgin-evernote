module.exports = [{
  url: '/',
  controller: 'home::index'
}, {
  url: '/oauth',
  controller: 'auth::index'
}, {
  url: '/oauth_callback',
  controller: 'auth::callback'
}, {
  url: '/note/create',
  controller: 'home::create'
}, {
  url: '/note/:guid',
  controller: 'home::note'
},{
  url: '/note/:guid/detail',
  controller: 'home::note_detail'
}]