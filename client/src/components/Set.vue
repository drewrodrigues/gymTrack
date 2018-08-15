<template>
    <tr>
      <td>{{ this.weight }}</td>
      <td>{{ this.reps }}</td>
      <td>{{ this.calculatedOneRepMax }}</td>
      <td>
        <button class="btn btn-sm btn-light" @click="$emit('delete')">X</button>
      </td>
    </tr>
</template>

<script>
export default {
  name: 'Set',
  props: ['weight', 'reps', 'calculatedOneRepMax']
}
</script>

