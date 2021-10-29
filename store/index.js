import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  countDocument: {
    count: null
  },
  user: null
})
export const mutations = {
  ...vuexfireMutations,
  SET_COUNT_DOCUMENT: (state, countDocument) => {
    // Only needed for SSR/Universal Mode
    state.countDocument = countDocument
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  }
}

export const actions = {
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('countCollection')
      .doc('countDocument')
    await bindFirestoreRef('countDocument', ref, { wait: true })
  }),
  unbindCountDocument: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('countDocument', false)
  }),
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
}
export const getters = {
  count (state) {
    return state.countDocument.count
  },
  isLoggedIn: (state) => {
    try {
      return state.user.uid !== null
    } catch {
      return false
    }
  }
}
