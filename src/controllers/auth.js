import EvernoteService from '../services/EvernoteService'
const NoteService = new EvernoteService()

const callbackUrl = 'http://0.0.0.0:8081/oauth_callback'

/**
 * evernote-markdown
 */
class Auth {
  /**
   * 自动授权
   * @author  johnnyjiang
   * @email               johnnyjiang813@gmail.com
   * @createTime          2018-03-01T15:32:57+0800
   */
  async index(ctx) {
    try {
      const { oauthToken, oauthTokenSecret } = await NoteService.getRequestToken(callbackUrl)
      // save request token
      ctx.session = Object.assign(ctx.session, {
        oauthToken,
        oauthTokenSecret
      })
      let _redUrl = NoteService.client.getAuthorizeUrl(oauthToken)
      ctx.redirect(_redUrl);
    } catch (e) {
      ctx.status = e.statusCode
      ctx.body = e.data
    }
  }

  /**
   * [callback 授权回调]
   * @author  johnnyjiang
   * @email                 johnnyjiang813@gmail.com
   * @createTime            2018-03-01T15:32:42+0800
   */
  async callback(ctx) {
    const { oauthToken, oauthTokenSecret } = ctx.session
    try {
      const { oauthAccessToken, oauthAccessTokenSecret, results } = await NoteService.getAccessToken({
        oauthToken,
        oauthTokenSecret,
        oauthVerifier: ctx.query.oauth_verifier
      })
      ctx.session = Object.assign(ctx.session, {
        oauthAccessToken,
        oauthAccessTokenSecret,
        edamShard: results.edam_shard,
        edamUserId: results.edam_userId,
        edamExpires: results.edam_expires,
        edamNoteStoreUrl: results.edam_noteStoreUrl,
        edamWebApiUrlPrefix: results.edam_webApiUrlPrefix
      })
      ctx.redirect('/');

    } catch(e) {
      switch (e.statusCode) {
        case 401:
        ctx.redirect('/oauth')
          break;
        default:
          ctx.status = e.statusCode
          ctx.body = e.data
          break;
      }
    }
  }
}

module.exports = new Auth()