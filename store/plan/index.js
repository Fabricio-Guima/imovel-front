export const state = () => ({
    plans: [
        {
            name: "plano 1"
        },
        {
            name: "plano 2"
        }
    ],
    plan: {
        name: "plano sozinho"
    }
})

export const getter = {
    getPlans(state) {
      return state.plans
    }
  }
  
  export const mutations = {
    increment(state, payload) {
      state.plans.push(payload)
    }
  }
  
  export const actions = {
    async fetchCounter(state) {
      // make request
      const res = { data: 10 };
      state.counter = res.data;
      return res.data;
    }
}