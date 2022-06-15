<template>
  <v-row justify="center" class="mt-5">
    <v-card>
      <v-toolbar>
        <v-tabs
          v-model="tab"
          right
        >
          <v-tabs-slider color="yellow" />

          <v-tab
            v-for="item in categories"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <v-pagination v-model="page" :length="pages" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <question
              v-for="question in questionsInPage"
              :key="question.id"
              :question="question"

              @answered="answer => answered(question, answer)"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-pagination v-model="page" :length="pages" />
          </v-col>
        </v-row>
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
    const categories = [...new Set(questions.map(q => q.category))]

    return { questions, categories }
  },
  data: () => ({
    questions: [],
    tab: 0,
    categories: [],
    answers: [],
    page: 0
  }),
  head () {
    return {
      title: 'Practice'
    }
  },
  computed: {
    category () {
      return this.categories[this.tab]
    },
    questionsInPage () {
      return this.filteredQuestions.slice(this.page * 5, (this.page + 1) * 5)
    },
    filteredQuestions () {
      return this.questions.filter(q => q.category === this.category)
    },
    pages () {
      return this.filteredQuestions.length / 5
    },
    choice_btns () {
      return Object.fromEntries((this.question.choices || []).map((c) => {
        // if (!this.answer) { return 'transparent' }
        let color = 'default'
        if (this.answer && c.choice === this.question.answer) {
          color = 'success'
        } else if (c.choice === this.answer) {
          color = 'warning'
        }

        return [c.choice, color]
      }))
    },
    currentUserId () {
      return this.$fire.auth.currentUser.uid
    }
  },

  methods: {
    async reload () {
      this.projects = await load(this, this.projectId)
    },
    answered (q, answer) {
      const correct = q.answer === answer
      this.$fire.database
        .ref('answers/' + this.currentUserId + '/' + 'attempts/' + q.q_id)
        .push()
        .set({ answer, correct })
        .then((e) => {
        })
    }
  }
}
</script>
