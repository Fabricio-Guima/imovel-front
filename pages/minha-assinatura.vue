<template>
  <div>
    <h1>Minha assinatura</h1>
    <pre>
        {{ $auth.user }}
    </pre>

    <div v-if="$auth.user.isSubscribed">
      <v-btn
        v-if="$auth.user.cancelled && $auth.user.onGracePeriod"
        depressed
        color="success"
        @click="reactivate"
        :disabled="disabled"
      >
        <template v-if="disabled">
          <v-progress-circular
            :width="3"
            :size="20"
            color="primary"
            indeterminate
          ></v-progress-circular>
          Reativando...
        </template>
        <template v-else>
          <div>Reativar assinatura</div>
        </template></v-btn
      >
      <v-btn
        v-else-if="!$auth.user.cancelled"
        depressed
        color="error"
        @click="cancel"
        :disabled="disabled"
      >
        <template v-if="disabled">
          <v-progress-circular
            :width="3"
            :size="20"
            color="primary"
            indeterminate
          ></v-progress-circular>
          Cancelando...
        </template>
        <template v-else>
          <div>Cancelar assinatura</div>
        </template>
      </v-btn>
    </div>

    <div v-else>
      <v-btn depressed color="primary" :to="{ name: 'planos' }">Assinar</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    disabled: false,
  }),
  methods: {
    async cancel() {
      this.disabled = true;
      const response = await this.$axios.$get("/subscriptions/cancel");
      await this.$auth.fetchUser();
      this.disabled = false;
    },

    async reactivate() {
      this.disabled = true;
      const response = await this.$axios.$get("/subscriptions/reactivate");
      await this.$auth.fetchUser();
      this.disabled = false;
    },
  },
};
</script>

<style></style>
