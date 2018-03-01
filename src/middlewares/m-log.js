module.exports = async (ctx, next) => {
  const stime = new Date();
  console.log(`link:${ctx.url} begintime:${stime}`)
  try {
    await next();
  } catch (e) {
    console.error('err', JSON.stringify(e))
  }
  const etime = new Date();
  console.log(`link:${ctx.url} endtime:${etime}`)
}
