export const state = () => ({
  selectedReportName: null,
})

export const getters = {
  getSelectedReportName(state) {
    return state.selectedReportName
  },
}

export const mutations = {
  setSelectedReportName(state, srn) {
    state.selectedReportName = srn
  },
}
