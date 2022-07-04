<template>
  <div>
    <h1>Faturas</h1>

    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Total</th>
            <th class="text-left">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoices" :key="index">
            <td>{{ item.created }}</td>
            <td>{{ item.total }}</td>
            <td>
              <v-btn depressed color="primary" @click="downloadInvoice(item.id)">
                Download
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data: () => ({
    invoices: [],
  }),

  methods: {
    async downloadInvoice(invoiceId) {
      await this.$axios.$get(`/subscriptions/invoices/${invoiceId}`);
    },
  },

  async mounted() {
    const response = await this.$axios.$get("/subscriptions/invoices");
    this.invoices = response.invoices;
    console.log("faturas", response.invoices);
  },
};
</script>

<style></style>
