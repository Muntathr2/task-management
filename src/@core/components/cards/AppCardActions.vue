<script setup>
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  noActions: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionCollapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRefresh: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRemove: {
    type: Boolean,
    required: false,
    default: false,
  },
  loading: {
    type: Boolean,
    required: false,
    skipCheck: true,
    default: undefined,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
  icon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits([
  'collapsed',
  'refresh',
  'trash',
  'initialLoad',
  'update:loading',
])

defineOptions({
  inheritAttrs: false,
})

const _loading = ref(false)

const $loading = computed({
  get() {
    return props.loading !== undefined ? props.loading : _loading.value
  },
  set(value) {
    props.loading !== undefined ? emit('update:loading', value) : _loading.value = value
  },
})

const isContentCollapsed = ref(props.collapsed)
const isCardRemoved = ref(false)

// stop loading
const stopLoading = () => {
  $loading.value = false
}

// trigger collapse
const triggerCollapse = () => {
  isContentCollapsed.value = !isContentCollapsed.value
  emit('collapsed', isContentCollapsed.value)
}

// trigger refresh
const triggerRefresh = () => {
  $loading.value = true
  emit('refresh', stopLoading)
}

// trigger removal
const triggeredRemove = () => {
  isCardRemoved.value = true
  emit('trash')
}
</script>

<template>
  <VExpandTransition>
    <!-- TODO remove div when transition work with v-card components: https://github.com/vuetifyjs/vuetify/issues/15111 -->
    <div v-if="!isCardRemoved">
      <VCard v-bind="$attrs">
        <VCardItem>
          <div class="d-flex align-item-center">
            <VAvatar
              v-if="props.icon"
              size="42"
              variant="tonal"
              :color="props.color"
              :icon="props.icon"
              class="ma-1"
            />
            <VCardTitle
              v-if="props.title || $slots.title"
              class="ma-3"
            >
              <!-- 👉 Title slot and prop -->
              <slot
                class="ma-5"
                name="title"
              >
                {{ props.title }}
              </slot>
            </VCardTitle>
          </div>

          <template #append>
            <!-- 👉 Before actions slot -->
            <div>
              <slot name="before-actions" />

              <!-- SECTION Actions buttons -->

              <!-- 👉 Close button -->
              <IconBtn
                v-if="(!(actionRefresh || actionCollapsed) || actionRemove) && !noActions"
                @click="triggeredRemove"
              >
                <VIcon
                  size="20"
                  icon="tabler-x"
                />
              </IconBtn>
              <!-- 👉 Overlay button -->
              <slot name="affter-actions" />
            </div>
          <!-- !SECTION -->
          </template>
        </VCardItem>

        <!-- 👉 card content -->
        <VExpandTransition>
          <div
            v-show="!isContentCollapsed"
            class="v-card-content"
          >
            <slot />
          </div>
        </VExpandTransition>

        <!-- 👉 Overlay -->
        <VOverlay
          v-model="$loading"
          contained
          persistent
          scroll-strategy="none"
          class="align-center justify-center"
        >
          <VProgressCircular indeterminate />
        </VOverlay>
      </VCard>
    </div>
  </VExpandTransition>
</template>

<style lang="scss">
.v-card-item {
  +.v-card-content {
    .v-card-text:first-child {
      padding-block-start: 0;
    }
  }
}
</style>
