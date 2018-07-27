<template>
  <div>
    <!-- add an exercise -->
    <div class="form-group">
      <input type="text" v-model="exerciseName" @keyup.enter="postExercise()" class='form-control'/>
    </div>

    <!-- list each exercise -->
    <p v-for="(exercise, index) in exercises" :key="exercise.id">
      <button v-on:click="deleteExercise(exercise, index)" class="btn btn-danger btn-sm">X</button>
      <input type="text" v-model="exercise.name" @change="updateExercise(exercise)" class="form-control" />
    </p>

    <!-- errors -->
    <ul>
      <li v-for="error in errors" :key="error.id">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      exerciseID: '',
      exerciseName: '',
      exercises: [],
      errors: []
    }
  },

  // Fetches exercises when the component is created
  created() {
    axios.get('http://localhost:3000/exercises')
    .then(response => {
      this.exercises = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    // Pushes exercise to the server when called.
    postExercise() {
      axios.post('http://localhost:3000/exercises', {'name': this.exerciseName})
      .then(response => {
        this.exercises = response.data
        this.exerciseName = '' // clear input
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    // Delete an exercise
    // there should be a better way to delete than selecting an index
    deleteExercise(exercise, index) {
      axios.delete('http://localhost:3000/exercises/' + exercise._id)
      .then(response => {
        this.$delete(this.exercises, index)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    // Triggered when edited in place
    updateExercise(exercise) {
      axios.put('http://localhost:3000/exercises/' + exercise._id, {'name': exercise.name})
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
<style scoped>
</style>
