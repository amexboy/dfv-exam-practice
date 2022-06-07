<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    class="elevation-1 "
    height="500px"
    group-by="category"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase grey--text">
          <span>Question Bank</span>
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer />
        <v-btn text>
          New Question
        </v-btn>
      </v-toolbar>
    </template>
    <template #[`item.choices`]="{ item }">
      <v-chip
        v-for="c in item.choices"
        :key="c.choice"
        :color="c.choice === item.answer? 'success': 'transparent'"
        class="ma-2"
        label
      >
        <span class="text-uppercase">{{ c.choice }}: &nbsp; </span> {{ c.value }}
      </v-chip>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small color="red" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
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
    const projects = await load(app)
    console.log(projects)

    return { projects }
  },
  data: () => ({
    valid: true,
    projectTitle: '',
    nameRules: [v => !!v || 'This is required'],
    language: [
      'English',
      'German'
    ],
    headers: [
      {
        text: 'Question Number',
        align: 'start',
        sortable: false,
        value: 'q_id'
      },
      { text: 'Question', value: 'question' },
      { text: 'Category', value: 'category', groupable: true },
      { text: 'Choices', value: 'choices' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    projects: [],
    editedIndex: -1,
    editedItem: {
      q_id: '',
      question: null,
      choices: [],
      answer: null
    },
    defaultItem: {
      q_id: '',
      question: null,
      choices: [],
      answer: null
    }
  }),
  head () {
    return {
      title: 'Questions'
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Question' : 'Edit Question'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    async reload () {
      this.projects = await load(this, this.projectId)
    },
    editItem (item) {
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$fire.database
        .ref('questions/' + this.editedItem.id)
        .set(null)
        .then(() => {
          this.closeDelete()
          this.reload()
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (!this.validate()) { return }

      if (this.editedIndex > -1) {
        this.$fire.database
          .ref('questions/' + this.editedItem.id)
          .update(this.editedItem)
          .then(() => {
            this.close()
            this.reload()
          })
      } else {
        this.$fire.database
          .ref('questions')
          .push()
          .set(this.editedItem)
          .then(() => {
            this.close()
            this.reload()
          })
      }
    }
  }
}
</script>
