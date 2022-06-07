<template>
  <v-row justify="center" class="mt-5">
    <v-card>
      <v-card-title>
        <span>{{ question.q_id }}. &nbsp; </span>
        <span>{{ question.question }}</span>
      </v-card-title>
      <v-card-text>
        <v-btn-toggle v-model="answer">
          <!-- <v-btn
              v-for="c in question.choices"
              :key="c.choice"
              tile
              :value="c.choice"
              :color="choice_btns[c.choice]"
            >
              <v-avatar>{{ c.choice }}</v-avatar> {{ c.value }}
            </v-btn> -->
          <v-row justify="space-between">
            <v-col
              v-for="c in question.choices"
              :key="c.choice"
              xs="12"
              lg="3"
              sm="6"
            >
              <v-btn
                text
                tile
                :value="c.choice"
                :color="choice_btns[c.choice]"
              >
                <v-avatar>{{ c.choice }}</v-avatar> {{ c.value }}
              </v-btn>
            </v-col>
          </v-row>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script>
function load (app) {
  return app.$fire.database
    .ref('questions')
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val()
        return Object.keys(result).map(function (key, index) {
          return { id: key, ...result[key] }
        })
      }
      return []
    })
}

export default {
  async asyncData ({ params, app }) {
    const questions = await load(app)

    return { questions }
  },
  data: () => ({
    questions: [],
    index: 0,
    answer: null
  }),
  head () {
    return {
      title: 'Practice'
    }
  },
  computed: {
    question () {
      return this.questions[this.index]
    },
    choice_btns () {
      return Object.fromEntries(this.question.choices.map((c) => {
        // if (!this.answer) { return 'transparent' }
        let color = 'default'
        if (this.answer && c.choice === this.question.answer) {
          color = 'success'
        } else if (c.choice === this.answer) {
          color = 'warning'
        }

        return [c.choice, color]
      }))
    }
  },

  methods: {
    async reload () {
      this.projects = await load(this, this.projectId)
    }
  }
}
</script>
