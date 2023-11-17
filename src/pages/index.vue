
<script setup>
import AppCardActions from '@/@core/components/cards/AppCardActions.vue'
import AppCardDropDown from '@/@core/components/cards/AppCardDropDown.vue'
import CardStatisticsVertical from '@/@core/components/cards/CardStatisticsVertical.vue'
import Print from '@/components/Print.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import { onMounted, ref, watch } from 'vue'
import { VCol, VRow } from 'vuetify/lib/components/index.mjs'
import { useTaskStore } from '../store/todos'

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const projects = useTaskStore().getProjects

//  State save info Data
const phaseName = ref('')
const phesesData = ref()
const taskName = ref('')
const index = ref(useTaskStore.index)
const indexPhese = ref(-1)

//  Push data in Pheses
const addPhase = () => {
  let data ={
    name: phaseName.value,
    tasks: [],
  }
  if (phaseName.value) {
    useTaskStore().addPhase(index.value, data)
    phaseName.value = ''
  }
}

//  Push data Tasks in state
const addTask = phaseIndex => {
  let data = {
    name: taskName.value,
    status: 'open',
  }
  if (taskName.value) {
    useTaskStore().addTask(index.value, phaseIndex, data)
    taskName.value = ''
  }
}


//  Update Status data in Task
const updateTaskStatus = (taskIndex, newStatus) => {
  useTaskStore().updateTaskStatus(index.value, indexPhese.value, taskIndex, newStatus)
}

//  Save index Phases
const selectPhase = phaseIndex => {
  indexPhese.value = phaseIndex
  console.log(phaseIndex)
}

//  Save Data Print
const addDataPrint = data => {
  console.log(data)
  if (data) {
    useTaskStore().printData(data)
  }
}

//   Function Print tasks
import html2pdf from "html2pdf.js"

const download = data => {
  addDataPrint(data)
  
  const element = document.getElementById("element-to-print")

  const options = {
    margin: 0,
    filename: "tasks.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "mm",
      format: [280, 350],
      orientation: "portrait",
    },
  }

  html2pdf().set(options).from(element).save()
}

//  On Click Nav in Slidbar Save index and get it
onMounted(() => {
  const unwatch = watch(() => useTaskStore().getIndex, newValue => {
    index.value = newValue
    phesesData.value = projects[index.value].phases
  })

  onUnmounted(unwatch)
})
</script>

<template>
  <div class="d-none">
    <Print />
  </div>
  <!-- CARD PHESES AND ADD NEW PHESES -->
  <CardStatisticsVertical
    v-if="index >=0"
    :title="$t('Pheses.title')"
  >
    <div class="header-pheses">
      <div class="add-phese">
        <input
          v-model="phaseName"
          class="input-add"
          :placeholder="$t('Pheses.input_text')"
        >
        <button
          class="btn-add-2"
          @click="addPhase"
        >
          +
        </button>
      </div>
    </div>
  </CardStatisticsVertical>
  <!-- CARD TASKS AND ADD NEW TASK -->
  <div
    v-for="(phase, phaseIndex) in phesesData"
    :key="phaseIndex"
  >
    <div @click="selectPhase(phaseIndex)">
      <!-- CARD DROP DOWN -->
      <AppCardDropDown>
        <template #title>
          <div class="d-flex">
            <h3 class="text-phese">
              {{ phase.name }}
            </h3>
          </div>
        </template>
        <template #before-actions>
          <IconBtn @click="download(phase.tasks)">
            <VIcon
              size="20"
              icon="tabler-printer"
            />
          </IconBtn>
        </template>
        <VRow no-gutters>
          <VCol
            cols="12"
            md="4"
          >
            <!-- CARDS TASK -->
            <div class="ma-2">
              <VCard
                class="mb-6 text-center"
                :title="$t('Tasks.open')"
                color="#192a5655"
              />
              <div
                v-for="(task, taskIndex) in phase.tasks"
                :key="taskIndex"
                class="my-2"
              >
                <AppCardActions
                  v-if="task.status === 'open'"
                  :key="taskIndex"
                  :title="task.name"
                  color="#192a5655"
                  icon="tabler-checkup-list"
                  icon-color=""
                >
                  <template #affter-actions>
                    <IconBtn @click="updateTaskStatus(taskIndex, 'in progress')">
                      <VIcon
                        size="20"
                        icon="tabler-arrow-bar-right"
                      />
                    </IconBtn>
                  </template>
                </AppCardActions>
              </div>
              <div class="ma-2">
                <input
                  v-model="taskName"
                  class="input-add-task"
                  :placeholder="$t('Tasks.input_text')"
                >
                <button
                  class="btn-add-task"
                  @click="addTask(phaseIndex)"
                >
                  {{ $t('Tasks.btn_text') }}
                </button>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <!-- CARDS TASK -->
            <div class="ma-2">
              <VCard
                class="mb-6 text-center"
                :title="$t('Tasks.in_progress')"
                color="#f39c1255"
              />
              <div
                v-for="(task, taskIndex) in phase.tasks"
                :key="taskIndex"
                class="my-2"
              >
                <AppCardActions
                  v-if="task.status === 'in progress'"
                  :key="taskIndex"
                  :title="task.name"
                  color="#f39c1255"
                  icon="tabler-refresh-dot"
                  icon-color=""
                >
                  <template #affter-actions>
                    <IconBtn @click="updateTaskStatus(taskIndex,'complete')">
                      <VIcon
                        size="20"
                        icon="tabler-arrow-bar-right"
                      />
                    </IconBtn>
                  </template>
                </AppCardActions>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <!-- CARDS TASK -->
            <div class="ma-2">
              <VCard
                class="mb-6 text-center"
                :title="$t('Tasks.complete')"
                color="#27ae6055"
              />
              <div
                v-for="(task, taskIndex) in phase.tasks"
                :key="taskIndex"
                class="my-2"
              >
                <AppCardActions
                  v-if="task.status === 'complete'"
                  :key="taskIndex"
                  :title="task.name"
                  color="#27ae6055"
                  icon="tabler-discount-check-filled"
                  icon-color=""
                >
                  <template #affter-actions>
                    <IconBtn @click="updateTaskStatus(taskIndex, 'open')">
                      <VIcon
                        size="20"
                        icon="tabler-arrow-bar-right"
                      />
                    </IconBtn>
                  </template>
                </AppCardActions>
              </div>
            </div>
          </VCol>
        </VRow>
      </AppCardDropDown>
    </div>
  </div>
  <div
    v-if="!phesesData"
    class="misc-no-data"
  >
    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="authThemeImg"
        alt="Data"
        :max-width="340"
        class="mx-auto"
      />
    </div>
    <ErrorHeader
      :title="$t('data.title_no_data')"
      :description="$t('data.des_no_data')"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
