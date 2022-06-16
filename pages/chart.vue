<template>
  <v-sheet>
    <v-row>
      <v-col>
        <bar-chart :chart-data="data" :chart-options="options" />
      </v-col>
      <v-col>
        <PolarArea
          :chart-options="progressByCategory.options"
          :chart-data="progressByCategory.data"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>

import { PolarArea } from 'vue-chartjs/legacy'
import BarChart from '~/components/BarChart.vue'

function toArray (result) {
  return Object.keys(result).filter(key => key !== 'id').map(function (key, index) {
    return { id: key, ...result[key] }
  })
}

function load (app, path) {
  return app.$fire.database
    .ref(path)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return toArray(snapshot.val())
      }
      return []
    })
}

export default {
  components: { BarChart, PolarArea },
  async asyncData ({ params, app }) {
    const uid = app.$fire.auth.currentUser.uid

    const attepmts = (await load(app, 'answers/' + uid + '/attempts'))// .map(q => toArray(q))
    const questions = await load(app, 'questions')

    return { attepmts, questions }
  },
  data () {
    return {
      questions: [],
      attepmts: [],
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    categories () {
      return [...new Set(this.questions.map(q => q.category))]
    },
    progressByCategory () {
      return {
        data: {
          labels: this.categories,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
}
</script>
