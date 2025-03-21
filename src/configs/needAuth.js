import {env} from './env'
// let needAuth = false
let needAuth = env === 'production' ? false : true
export default needAuth
