export default defineNuxtRouteMiddleware(async (to, from) => {
  const $auth = useAuth()

  try {
    if (!$auth.authenticated) {
      console.log('not authenticated, redirecting to login')
      return navigateTo(`/login?next=${to.path}`)
    }
  } catch (error) {
    return navigateTo(`/login?next=${to.path}`)
  }
})