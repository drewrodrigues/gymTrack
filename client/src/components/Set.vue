<template>
  <div>
    <form v-on:submit.prevent="postSet()">
      <input type="text" v-model="weight" placeholder="weight" class="form-control">
      <input type="text" v-model="reps" placeholder="reps" class="form-control">
      <input type="submit" value="Add" class="btn btn-success btn-sm">
    </form>

    <table class='table'>
      <tr>
        <th>Weight</th>
        <td v-for="(set, index) in sets" :key="set._id">
          <input type="text" v-model="set.weight" class="form-control text-center">
        </td>
      </tr>
      <tr>
        <th>Reps</th>
        <td v-for="(set, index) in sets" :key="set._id">
          <input type="text" v-model="set.reps" class="form-control text-center">
        </td>
      </tr>
      <tr class="text-center">
        <th></th>
        <td v-for="(set, index) in sets" :key="set._id" >
          <button class="btn btn-sm btn-danger" v-on:click="deleteSet(set, index)">X</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Set',

  data() {
    return {
      sets: [],
      weight: '',
      reps: '',
      errors: []
    }
  },

  created() {
    axios.get('http://localhost:3000/sets')
    .then(res => {
      this.sets = res.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    postSet() {
      axios.post('http://localhost:3000/sets', { weight: this.weight, reps: this.reps })
      .then(res => {
        this.weight = ''
        this.reps = ''
        this.sets = res.data
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