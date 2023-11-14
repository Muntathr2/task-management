<template>
  <div
    id="myPrintedElement"
    class="print-content"
  >
    <div class="d-flex justify-content-center mb-4">
      <img
        src="../assets/images/pages/bg.jpg"
        alt="logo"
      >
    </div>
    <h2>Open Tasks</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in data"
          :key="index"
        >
          <template v-if="task && task.status === 'open'">
            <td>{{ index + 1 }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.status }}</td>
          </template>
        </tr>
      </tbody>
    </table>

    <h2>Progress Tasks</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in data"
          :key="index"
        >
          <template v-if="task && task.status === 'in progress'">
            <td>{{ index + 1 }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.status }}</td>
          </template>
        </tr>
      </tbody>
    </table>

    <h2>Complete Tasks</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in data"
          :key="index"
        >
          <template v-if="task && task.status === 'complete'">
            <td>{{ index + 1 }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.status }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/todos'

const data = ref(null)


//TODO: On Click Nav in Slidbar Save index and get it
onMounted(() => {
  const unwatch = watch(() => useTaskStore().getDataPrint, newValue => {
    data.value = newValue
    console.log(JSON.stringify(data.value))
  })

  onUnmounted(unwatch)
})
</script>
