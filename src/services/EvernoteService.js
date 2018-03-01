import Evernote from 'evernote'
import {
  API_CONSUMER_KEY,
  API_CONSUMER_SECRET,
  SANDBOX,
  CHINA
} from '../config/index'

/**
 * evernote 服务
 */
export default class EvernoteService {
  constructor({ token } = {} ) {
    if (token) {
      this.client = new Evernote.Client({
        token,
        sandbox: SANDBOX,
        china: CHINA
      });
    } else {
      this.client = new Evernote.Client({
        consumerKey: API_CONSUMER_KEY,
        consumerSecret: API_CONSUMER_SECRET,
        sandbox: SANDBOX,
        china: CHINA
      });
    }
    this.noteStore = this.client.getNoteStore();
  }

  /**
   * [getAuthToken description]
   * @param      {[type]} callbackUrl    '回调地址'
   * @author  johnnyjiang
   * @createTime          2018-03-01T15:19:04+0800
   */
  async getRequestToken(callbackUrl) {
    return new Promise((resolve, reject) => {
      this.client.getRequestToken(callbackUrl, (error, oauthToken, oauthTokenSecret, results) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            oauthToken,
            oauthTokenSecret,
            results
          })
        }
      });
    })
  }

  /**
   * 获取AccessToken
   * @param      {[type]} options.oauthToken       [reqtoken]
   * @param      {[type]} options.oauthTokenSecret [reqSecret]
   * @param      {[type]} options.oauthVerifier    [verifier]
   * @author  johnnyjiang
   * @email               johnnyjiang813@gmail.com
   * @createTime          2018-03-01T15:22:43+0800
   */
  async getAccessToken({ oauthToken, oauthTokenSecret, oauthVerifier }) {
    return new Promise((resolve, reject) => {
      this.client.getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            oauthAccessToken,
            oauthAccessTokenSecret,
            results
          })
        }
      })
    })
  }

  async getNotes() {
    try {
      const res = await this.noteStore.listNotebooks()
      return res
    } catch (e) {
      throw e
    }
  }

  createNote() {}

  updateNote() {}
}