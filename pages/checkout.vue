<template>
  <div>
    <h1>Checkout</h1>
    <h3>Assinar {{planSlug}}</h3>

<v-row>
    <v-col cols="6">
        <v-form @submit.prevent="submit" ref="form">
        <v-text-field v-model="form.name" label="Nome do cartão" :rules="[rules.required]"></v-text-field>

        <div class="mt-5 mb-5">
            <div id="card" ref="card" class="teste" label="Número do cartão"></div>
        </div>
   
        <v-btn color="primary" type="submit"> Assinar </v-btn>
    </v-form>
    </v-col>
</v-row>
   
  </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js"
export default {
    data: ()=> ({
        planSlug: null,
        show1: false,
        form: {
            name: "",
        },
        stripe: null,
        cardElement: null,
        intentClientSecret: null,
        rules: {
            required: (value) => !!value || "Este campo é obrigatório.",
            min: (v) => v.length >= 6 || "Mínimo de 6 caracteres",
            max: (v) => v.length <= 16 || "Máximo de 16 caracteres",
            email: (v) => /.+@.+\..+/.test(v) || "Este campo deve ser um email válido",       
        },
    }),
    methods: {
        async submit() {
            const {setupIntent, error} = await this.stripe.confirmCardSetup(this.intentClientSecret, {
                payment_method: {
                    card: this.cardElement,
                    billing_details: {name: this.form.name}
                }
            })

            if(error) {
                console.log('deu erro')
            } else {
                console.log('setupIntent', setupIntent)
                this.createSubscription(setupIntent.payment_method)
                //enviar petição para subscrever este user
            }
        },
        async createSubscription(token) {
            const response = await this.$axios.$post('/subscriptions/create',{
                plan:this.planSlug,
                token: token
            }).catch(e => {
                console.log('deu erro ao criar a subscription')
            })

        }
    },
    async mounted() {
        this.planSlug = this.$route.query.plan ?  this.$route.query.plan : ''
        const stripeKey = this.$config.STRIPE_KEY

        //itenção (chave)
        const response = await this.$axios.$get('/subscriptions/intent');
        this.intentClientSecret = response.data.client_secret        

        //inicializar o stripe de fato
        this.stripe = await loadStripe(stripeKey)
        const elements = this.stripe.elements();
        this.cardElement = elements.create("card")
        this.cardElement.mount(this.$refs.card)
      

    }

}
</script>

<style>
.teste {
    color: white !important;
}
   
</style>