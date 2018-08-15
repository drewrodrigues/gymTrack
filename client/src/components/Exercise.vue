<template>
  <div>
    <!-- add an exercise -->
    <div class="form-group">
      <input type="text" v-model="exerciseName" @keyup.enter="postExercise()" class='form-control'/>
    </div>

    <!-- list each exercise -->
    <!-- TODO: add Exercise-List.vue -->
    <div v-for="(exercise, index) in exercises" :key="exercise.id" class="card">
      <div class="card-header">
        <input type="text" v-model="exercise.name" @change="updateExercise(exercise)" class="form-control" />
      </div>
      <div class="card-body">
        <set-list :sets=exercise.sets :exerciseId=exercise._id></set-list>
      </div>
      <div class="card-footer">
        <button v-on:click="deleteExercise(exercise, index)" class="btn btn-danger btn-sm">Delete Exercise</button>
      </div>
    </div>

    <section class="alerts container">
      <!-- flash -->
      <p v-for="flash in flashes" class="alert alert-success" :key=flash>
        {{ flash }}
      </p>

      <!-- errors -->
      <p v-for="error in errors" :key="error.id" class="alert alert-danger">
        {{ error }}
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import SetList from './Set-List.vue'

export default {
  data() {
    return {
      exerciseID: '',
      exerciseName: '',
      exercises: [],
      errors: [],
      flashes: []
    }
  },
  
  components: {
    SetList
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
    sendFlash(message, data) {
      data.push(message)
      setTimeout(() => {
        data.pop()
      }, 3000)
    },

    // Pushes exercise to the server when called.
    postExercise() {
      axios.post('http://localhost:3000/exercises', {'name': this.exerciseName})
      .then(response => {
        this.exercises = response.data
        this.exerciseName = '' // clear input
        this.sendFlash("Success", this.flashes)
      })
      .catch(e => {
        this.sendFlash(e, this.errors)
      })
    },

    // Delete an exercise
    // there should be a better way to delete than selecting an index
    deleteExercise(exercise, index) {
      axios.delete('http://localhost:3000/exercises/' + exercise._id)
      .then(response => {
        this.$delete(this.exercises, index)
        this.sendFlash("Success", this.flashes)
      })
      .catch(e => {
        this.sendFlash(e, this.errors)
      })
    },

    // Triggered when edited in place
    updateExercise(exercise) {
      axios.put('http://localhost:3000/exercises/' + exercise._id, {'name': exercise.name})
      .then(response => {
        this.sendFlash("Successfully updated", this.flashes)
      })
      .catch(e => {
        this.sendFlash("Failed to update", this.errors)
      })
    }
  }
}

</script>
<style scoped>
.alerts {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

