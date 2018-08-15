<template>
  <div>

    <!-- 1RM Chart -->
    <set-chart :sets=sets :height="250"></set-chart>

    <!-- Display Each Set -->
    <table class='table table-bordered text-center table-sm'>
      <thead>
        <th>Weight</th>
        <th>Reps</th>
        <th>Calculated 1RM</th>
        <th></th>
      </thead>


      <tbody>
        <set 
          v-for="(set, index) in sets" 
          :weight=set.weight 
          :reps=set.reps 
          :key=set._id
          :calculatedOneRepMax=set.calculatedOneRepMax
          @delete="deleteSet(set, index)">
        </set>
      </tbody>
    </table>

    <!-- Add new set -->
    <form v-on:submit.prevent="postSet()" class="form-row">
      <div class="col">
        <input type="text" v-model="weight" placeholder="weight" class="form-control">
      </div>
      <div class="col">
        <input type="text" v-model="reps" placeholder="reps" class="form-control">
      </div>
      <input type="submit" value="Add" class="btn btn-success btn-sm">
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import Set from './Set.vue'
import SetChart from './Set-Chart.vue'

export default {
  name: 'Set-List',
  props: ['exerciseId', 'sets'],
  components: {
    Set,
    SetChart
  },

  data() {
    return {
      // TODO: add weightInput & repsInput to name
      weight: '',
      reps: '',
    }
  },

  methods: {
    postSet() {
      axios.post('http://localhost:3000/' + this.exerciseId + '/sets', { weight: this.weight, reps: this.reps })
      .then(res => {
        this.weight = ''
        this.reps = ''
        this.sets.push(res.data)
      })
      .catch(e => {
      })
    },

    deleteSet(set, index) {
      axios.delete('http://localhost:3000/sets/' + set._id)
      .then(res => {
        this.$delete(this.sets, index)
      })
      .catch(e => {

      })
    }
  }
}
</script>