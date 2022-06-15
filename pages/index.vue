<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn @click="login('google')">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg">
        &nbsp;
        Login
      </v-btn>
      <v-btn @click="login('none')">
        Continue without logging in
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'unauthenticated',
  data () {
    return {
    }
  },
  methods: {
    login (provider) {
      const signin = provider === 'google'
        ? this.$fire.auth.signInWithPopup(new this.$fireModule.auth.GoogleAuthProvider())
        : this.$fire.auth.signInAnonymously()

      signin.then(() => {
        this.$router.push('/practice')
      })
    }
  }
}
</script>
