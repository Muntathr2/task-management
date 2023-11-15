// todos.js
import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()

export const useTaskStore = defineStore('task', {

  //  State save data
  state: () => ({
    projects: [],
    index: -1,
    print: null,
  }),
  actions: {
    //  Function Add Project in Project State
    addProject(project) {
      this.projects.push(project)
    },

    //  Function Add Pheses in Project State
    addPhase(projectIndex, phase) {
      this.projects[projectIndex].phases.push(phase)
    },

    //  Function Add Task in Phese in Project State
    addTask(projectIndex, phaseIndex, task) {
      this.projects[projectIndex].phases[phaseIndex].tasks.push(task)
    },

    //  Function Update Status task
    updateTaskStatus(projectIndex, phaseIndex, taskIndex, newStatus) {
      this.projects[projectIndex].phases[phaseIndex].tasks[taskIndex].status = newStatus
    },

    //  Function Save Index Item in slider
    addIndex(index) {
      this.index = index
    },

    //  Function Save Tasks to Print
    printData(print) {
      this.print = print
    },
  },
  getters: {
    //  Get Data Project from State
    getProjects: state => state.projects,

    //  Get Index Slidbar from State
    getIndex: state => state.index,

    //  Get Data to Print
    getDataPrint: state => state.print,
  },
})

export { pinia }
