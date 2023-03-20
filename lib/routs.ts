import Router from '@koa/router'
import { getJwt } from './getJwt'
import { getKs } from './getKs'
import config from './config'

// const router = new Router()
const router = new Router({ prefix: '/embed-cnc' })

const { id: partnerId } = config.get('partner')
//const partnerId = process.env.KALTURA_PARTNER_ID

router.get('/init-data', async (ctx: any) => {
 const [ks, jwt] = await Promise.all([getKs(), getJwt()])
  ctx.body = { ks, jwt, success: true }
})

// router.get('/user-data', async (ctx: any) => {
//  const [user] = await Promise.all([getUser()])
//   ctx.body = { user, success: true }
// })

router.get('/foobar', async (ctx: any) => {
  ctx.body   = "Ta-Da!"
  ctx.status = 200

  return;
})


export default router
