<script>
import { Bar } from 'vue-chartjs/legacy'

export default {
  name: 'BarChart',
  extends: Bar,
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 400
    }
  }
}
</script>
