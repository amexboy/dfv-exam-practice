<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn icon>
          <v-avatar size="32">
            <v-img class="ml-19" src="/IMAlogo.png" />
          </v-avatar>
        </v-btn>

        <v-btn v-for="link in links" :key="link" :to="link.to" text>
          {{ link.title }}
        </v-btn>

        <v-spacer />

        <v-responsive max-width="260">
          <v-text-field
            v-model="search"
            dense
            flat
            hide-details
            rounded
            solo-inverted
            append-outer-icon="mdi-account-search"
            color="blue-grey"
            @click:append-outer="
              $router.push({ path: '/contacts', query: { s: search } })
            "
            @keypress.enter="
              $router.push({ path: '/contacts', query: { s: search } })
            "
          />
        </v-responsive>
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-avatar size="40" color="blue-grey" class="white--text">
                {{ displayName }}
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="400">
            <v-list>
              <v-list-item to="/changepassword">
                <v-list-item-title>Change password</v-list-item-title>
                <v-icon color="blue-grey">
                  mdi-key-change
                </v-icon>
              </v-list-item>
              <v-divider />
              <v-list-item @click="signout">
                <v-list-item-title>Sign out</v-list-item-title>
                <v-icon color="blue-grey">
                  mdi-logout-variant
                </v-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row >
          <v-col>
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-card class="flex" flat tile>
        <v-card-text
          class="py-2 black--text text-center"
        >
          &copy; {{ new Date().getFullYear() }} — <strong>IMA</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'check-auth',
  data: () => ({
    search: '',
    links: [
      {
        icon: 'mdi-home-circle',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: '',
        title: 'Questions',
        to: '/questions'
      },
      {
        icon: 'mdi-contacts',
        title: 'Practice',
        to: '/practice'
      },
      {
        icon: 'mdi-contacts',
        title: 'Result',
        to: '/results'
      },
      {
        icon: 'mdi-contacts',
        title: 'Contribute',
        to: '/project/projects'
      }
    ]
  }),
  computed: {
    displayName () {
      return this.$fire.auth.currentUser.email[0]
    }
  },
  methods: {
    signout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>
