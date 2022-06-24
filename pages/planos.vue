<template>
  <div>
    <h1>Planos</h1>   
    <planCard v-for="(plan,index) in plans" :plan="plan" :key="index" ></planCard>
  </div>
</template>

<script>
export default {
  data: () => ({
    plans: []

  }),

  async mounted() {
    const response = await this.$axios.$get('/plans');
    this.plans = response.data

  }

}
</script>

<style>

</style>