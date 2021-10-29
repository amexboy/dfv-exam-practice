<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Picker in menu"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      range
      no-title
      scrollable
      @change="$refs.menu.save(date)"
    >
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: { value: { type: String, default: null } },
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false
  })
}
</script>
