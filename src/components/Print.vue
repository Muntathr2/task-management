<template>
  <div
    id="element-to-print"
    class="hello"
  >
    <button @click="download">
      PDF
    </button>
    <Report />
    <!-- ... other HTML content ... -->
  </div>
</template>

<script setup>
import Report from "./Report.vue"

</script>

