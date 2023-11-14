<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  icon: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  series: {
    type: Array,
    required: true,
  },
  chartOptions: {
    type: null,
    required: true,
  },
})
</script>

<template>
  <VCard class="d-flex my-2">
    <VCardText class="d-flex flex-column pb-0">
      <VAvatar
        v-if="props.icon"
        size="42"
        variant="tonal"
        :color="props.color"
        :icon="props.icon"
        class="mb-3"
      />

      <h6 class="text-lg font-weight-medium">
        {{ props.stats }}
      </h6>
      <span class="text-xl">{{ props.title }}</span>
    </VCardText>
    <slot />

    <VueApexCharts
      :series="props.series"
      :options="props.chartOptions"
      :height="props.height"
    />
  </VCard>
</template>
