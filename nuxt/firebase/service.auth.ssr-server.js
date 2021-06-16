import admin from 'firebase-admin'

const config = {"apiKey":"AIzaSyDMkjSdCNGCldWgWWCdQPwat-mLAojcSdw","authDomain":"pingo-rianair-2f72e.firebaseapp.com","projectId":"pingo-rianair-2f72e","storageBucket":"pingo-rianair-2f72e.appspot.com","messagingSenderId":"273896716312","appId":"1:273896716312:web:13cf68da448f23564ceb6d","measurementId":"G-6TV65CMWTB"}

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  admin.initializeApp(config)
}

export default async ({ req, res }) => {
  if (!req || !req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = simulateUserRecord(decodedToken)

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
					allClaims: decodedToken,
					idToken,
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
