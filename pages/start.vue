<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card>
        <v-card-title class="headline">
          Welcome to the the boyfriend survay!
        </v-card-title>
        <v-card-text>
          <v-stepper
            v-model="e6"
            vertical
          >
            <v-stepper-step
              :complete="e6 > 1"
              step="1"
            >
              Personal info
              <small>Tell us a little bit about yourself</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card
                class="mb-12"
              >
                <v-card-text>
                  <p>This form stands to collect "Usage" data about your current boyfriend.</p>
                  <p>
                    Please fill the following form honestly and with due dilegence
                  </p>
                  <v-row>
                    <v-text-field
                      v-model="form.name"
                      label="Your name"
                      hint="Optional! Your name, if you choose to provide it, will help the boyfriend identify which girlfriend gave this review"
                    />
                  </v-row>
                  <v-row>
                    <datepicker v-model="dateRange" />
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6" sm="12" />
                  </v-row>
                </v-card-text>
              </v-card>
              <v-btn
                color="primary"
                @click="e6 = 2"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="e6 > 2"
              step="2"
            >
              What was the highlight of the period
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
              >
                <v-textarea
                  v-model="form.highlight"
                  label="Highlight"
                />
              </v-card>
              <v-btn
                color="primary"
                @click="e6 = 3"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
              :complete="e6 > 3"
              step="3"
            >
              What went well in that period
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
              >
                <v-textarea v-model="form.good" label="Things that were good" />
              </v-card>
              <v-btn
                color="primary"
                @click="e6 = 4"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">
              Whap didn't go 100% well in that period
            </v-stepper-step>
            <v-stepper-content step="4">
              <v-card
                class="mb-12"
              >
                <v-textarea v-model="form.bads" label="Things that were not the best" />
              </v-card>
              <v-btn
                color="primary"
                @click="e6 = 1"
              >
                Continue
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            @click="save"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import { ref, set, push } from 'firebase/database'

export default {
  data () {
    return {
      e6: 1,
      form: {}
    }
  },
  computed: {
    dateRange: {
      get () {
        return [this.form.fromDate, this.form.toDate]
      },
      set (value) {
        this.form.fromDate = value[0]
        this.form.toDate = value[1]
      }
    }
  },
  methods: {
    save () {
      this.$fire.database.ref('entries').push().set(this.form).then(() => {
        this.form = {}
      })
    }
  }
}
</script>
