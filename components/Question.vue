<template>
  <v-card flat :disabled="!enabled">
    <v-card-title>
      <span>{{ question.q_id }}. &nbsp; </span>
      <span>{{ question.question }}</span>
    </v-card-title>
    <v-card-text>
      <v-row
        v-for="o in question.questionOptions"
        :key="o.option"
        justify="space-between"
      >
        <v-col>
          <span> {{ o.option }} ) </span> {{ o.text }}
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col
          v-for="c in question.choices"
          :key="c.choice"
        >
          <v-btn
            text
            tile
            :color="choice_btns[c.choice]"
            @click="checkAnswer(c.choice)"
          >
            <v-avatar>{{ c.choice }}</v-avatar> {{ c.value }}
          </v-btn>
        </v-col>
      </v-row>
      <v-divider />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  model: {
    prop: 'correct',
    event: 'input'
  },

  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    answer: null,
    correct: null,
    enabled: true
  }),
  computed: {
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
    }
  },

  methods: {
    checkAnswer (choice) {
      this.answer = choice
      if (this.answer !== this.question.answer) {
        this.hint = 'We will show you this question again soon'
      }

      this.correct = this.answer === this.question.answer
      this.$emit('answered', this.correct)
      // this.enabled = false
    }
  }
}
</script>
