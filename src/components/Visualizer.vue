<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Paste a complete link to a json file to run simulation
    </p>

    <input type='url' placeholder='JSON file URL' @change="onChange($event)" v-model='searchUrl' />
    <div class="error" v-if="!isValid">URL is Invalid</div>
    <button @click='reset'> Clear URL </button>

    <div v-if="!loading">
      <span>Total impact: {{ immpact }}%</span><br>
      <table>
        <tbody>
          <tr v-for="(row, rowindex) in visualizationData" :key="rowindex">
            <td v-for="(col, colindex) in row" :key="rowindex-colindex">{{ col }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div>Fetching Data</div>
      <img :src="loadingImage" alt="">
    </div>
  </div>
</template>

<script>
import {CreateMatrix, UpdateMatrix, CalculateImpact} from '../AnalyzeData.js';

export default {
  name: 'Visualizer',
  props: {
    msg: String
  },
  components: {
  },
  methods: {
    async fetchData() {
      const res = await fetch('https://run.mocky.io/v3/0b760158-c081-463f-b5b2-4cd7c113374b')
      const data = await res.json()
      return data
    },
    async calculateImpact() {
      const data = await this.fetchData()
      this.matrix = CreateMatrix(data.grid_width_and_length, data.confirmed_outbreaks)
      this.visualizationData = UpdateMatrix(this.matrix, data.wind_direction)
      this.immpact = CalculateImpact(this.visualizationData, data.grid_width_and_length)
      this.loading = false
    },
    reset (e) {
      if (e) {
        e.preventDefault()
      }
      this.searchUrl = ''
    },
    onChange (e) {
      const url = e.target.value
      const isValid = this.isURLValid(url);
      if (isValid) {
        this.isURLValid = true
        this.loading = true
        this.calculateImpact()
      }
    },
    isURLValid: function(inputUrl) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(inputUrl);
    }
  },
  data() {
    return {
      searchUrl: '',
      loading: '',
      matrix: [],
      visualizationData: [],
      immpact: "",
      loadingImage: require('../assets/hourglass.gif'),
      isValid: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type='text'] {
  margin-bottom: 20px;
  padding: 8px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
