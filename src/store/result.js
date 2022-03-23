export default {
  namespaced: true,
  state: {
    data: null,
  },
  mutations: {
    addResult(state, result) {
      state.data = result;
    },
  },
};
