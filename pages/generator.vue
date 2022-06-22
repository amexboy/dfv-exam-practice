<template>
  <v-row>
    <!-- <v-col>{{ source }}</v-col> -->
    <!-- <v-col>{{ result }}</v-col> -->
    <v-col><v-textarea :value="JSON.stringify(result, null, 2)" /></v-col>
    <!-- <v-col>
      <question
        v-for="question in result"
        :key="question.id"
        :question="question"
      />
    </v-col> -->
  </v-row>
</template>

<script>
// import Question from '~/components/Question.vue'
import source from '~/static/test.text'
export default {
//   components: { Question },
  data () {
    return {
      source
    }
  },
  computed: {
    matches () {
      const pattern = /((?:Aerodynamics)|(?:Free ?fall)|(?:Air traffic law)|(?:Meteorology)|(?:Equipment)|(?:Human Performance)|(?:Behaviour in special circumstances)).*?Question No\.? ([0-9]+)(.*?)(\((?:No )?(?:(?:image)|(?:picture)).*?\)).*?a\)(.*?)b\)(.*?)c\)(.*?)d\)(.*?)Correct answer: ([a-e])/sigm
      return [...source.matchAll(pattern)]
    },
    result () {
      console.log(this.matches)
      return this.matches.map((m) => {
        try {
          return ({
            category: m[1].trim(),
            q_id: m[2].trim(),
            question: m[3].trim(),
            picture: m[4],
            choices: [
              { choice: 'A', value: m[5].trim() },
              { choice: 'B', value: m[6].trim() },
              { choice: 'C', value: m[7].trim() },
              { choice: 'D', value: m[8].trim() }],
            answer: m[9].trim().toUpperCase(),
            original: m[0]
          })
        } catch (e) {
          console.log('Failed at ', m)
          return {}
        }
      })
    },
    questions () {
      return this.result.map(r => ({ q: r.q_id, c: r.category }))
    }
  }
}
</script>
