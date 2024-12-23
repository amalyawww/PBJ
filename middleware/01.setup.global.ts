export default defineNuxtRouteMiddleware(async (to, from) => {
  const $auth = useAuth()
  try {
    await $auth.init()
  } catch (error) { }
})