// todos.js
import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()

export const useTaskStore = defineStore('task', {

  //TODO: State save data
  state: () => ({
    projects: [],
    index: -1,
    print: null,
  }),
  actions: {
    //TODO: Function Add Project in Project State
    addProject(project) {
      this.projects.push(project)
    },

    //TODO: Function Add Pheses in Project State
    addPhase(projectIndex, phase) {
      this.projects[projectIndex].phases.push(phase)
    },

    //TODO: Function Add Task in Phese in Project State
    addTask(projectIndex, phaseIndex, task) {
      this.projects[projectIndex].phases[phaseIndex].tasks.push(task)
    },

    //TODO: Function Update Status task
    updateTaskStatus(projectIndex, phaseIndex, taskIndex, newStatus) {
      this.projects[projectIndex].phases[phaseIndex].tasks[taskIndex].status = newStatus
    },

    //TODO: Function Save Index Item in slider
    addIndex(index) {
      this.index = index
    },

    //TODO: Function Save Tasks to Print
    printData(print) {
      this.print = print
    },
  },
  getters: {
    //TODO: Get Data Project from State
    getProjects: state => state.projects,

    //TODO: Get Index Slidbar from State
    getIndex: state => state.index,

    //TODO: Get Data to Print
    getDataPrint: state => state.print,
  },
})

export { pinia }
