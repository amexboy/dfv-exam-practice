export default function ({ store, redirect }) {
  // Add the userAgent property to the context

  return store.getters.isLoggedIn || redirect('/')
}
