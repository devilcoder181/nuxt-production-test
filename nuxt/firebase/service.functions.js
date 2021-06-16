

export default async function (session) {
  await import(/* webpackChunkName: 'firebase-functions' */'firebase/functions')

  const functionsService = session.functions()

  return functionsService
}
