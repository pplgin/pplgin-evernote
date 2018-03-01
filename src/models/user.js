import DB from './index'


export const UserModel = DB.model('user', {
  id: String,
  username: String,
  userpwd: String,
  email: String,
  intro: String
})