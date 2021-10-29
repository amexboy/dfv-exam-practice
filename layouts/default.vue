<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="signout">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'check-auth',
  data () {
    return {
      title: 'Boyfriend Survay'
    }
  },
  methods: {
    signout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
