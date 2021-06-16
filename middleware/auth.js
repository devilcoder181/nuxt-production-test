export default function ({ store, redirect, error }) {
  if (!store.getters.isLoggedIn) {
    return redirect('/login')
  }
}
