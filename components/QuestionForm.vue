<template>
  <v-card>
    <v-card-title>
      <span class="text-h5 text-uppercase grey--text">{{
        formTitle
      }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="editedItem.q_id"
                :rules="[i => !!i || 'Question is required']"
                label="Question Id"
              />
            </v-col>
            <v-col cols="12" sm="7">
              <v-autocomplete
                v-model="editedItem.category"
                :items="['Aerodynamics', 'Freefall', 'Air Traffic Law', 'Human Performance', 'Metreology', 'Equipment', 'Behavior in Special Circumstances']"
                label="Category"
                placeholder="Category..."
                required
              />
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="editedItem.question"
                :rules="[i => !!i || 'Question is required']"
                label="Question"
                required
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-autocomplete
                v-model="editedItem.answer"
                :items="['A', 'B', 'C', 'D']"
                label="Answer"
                placeholder="Choose..."
                required
              />
            </v-col>
            <v-col cols="12" sm="5">
              <v-autocomplete
                ref="language"
                v-model="editedItem.language"
                :items="[ 'English', 'German' ]"
                label="Language"
                placeholder="Language..."
                required
              />
            </v-col>

            <v-col cols="12" sm="12">
              <v-text-field v-model="editedItem.choices[0].value" required label="Choice A" />
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field v-model="editedItem.choices[1].value" required label="Choice A" />
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field v-model="editedItem.choices[2].value" required label="Choice A" />
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field v-model="editedItem.choices[3].value" required label="Choice A" />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="close">
        Cancel
      </v-btn>
      <v-btn color="blue darken-1" text @click="save">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    input: {
      type: Object,
      default () {
        return {
          q_id: '',
          question: null,
          choices: [
            { choice: 'A', value: null },
            { choice: 'B', value: null },
            { choice: 'C', value: null },
            { choice: 'D', value: null }
          ],
          answer: null,
          language: 'English'
        }
      }
    }
  },
  data () {
    return {
      valid: true,
      editedItem: this.input
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Question' : 'Edit Question'
    }
  },

  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    close () {
      this.$emit('submit', null)
    },

    save () {
      if (!this.validate()) { return }

      this.$emit('submit', this.editedItem)
    }
  }
}
</script>
