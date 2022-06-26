<template>
  <div>
    <h1>Minha assinatura</h1>
    <pre>
        {{$auth.user}}
    </pre>

   
     <v-btn  v-if="$auth.user.onGracePeriod" depressed color="success" @click="reactivate">Reativar assinatura</v-btn>     
     <v-btn  v-if="$auth.user.isSubscribed && !$auth.user.onGracePeriod " depressed color="error" @click="cancel">Cancelar assinatura</v-btn>     
      
  </div>
</template>

<script>
export default {
    middleware: "auth",
    methods: {
        async cancel({auth}) {
            const response = await this.$axios.$get('/subscriptions/cancel');
            await this.$auth.fetchUser()
        },

        async reactivate({auth}) {
            const response = await this.$axios.$get('/subscriptions/reactivate');
            await this.$auth.fetchUser()
        }
    }

}
</script>

<style>

</style>