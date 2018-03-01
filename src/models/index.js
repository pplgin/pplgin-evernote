import mongoose from 'mongoose'
import { DB_SERVER } from '../config'

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${DB_SERVER}`);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'db is connected!'));

module.exports = db