<template>
  <div>
    <h1>Checkout</h1>
    <h3>Assinar {{planSlug}}</h3>

    <template v-if="loadingForm">
        <div class="d-flex justify-center">
        <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate>
        </v-progress-circular>
            
        </div>
    </template>
   
    <template v-else>
        <v-row>
            <v-col cols="6">
                <v-alert type="error" v-if="paymentError" dismissible>
                    Ocorreu um erro ao processar a assinatura. Por favor, tente novamente.
                </v-alert>
                <v-form @submit.prevent="submit" ref="form">
                <v-text-field v-model="form.name" label="Nome do cartão" :rules="[rules.required]"></v-text-field>

                <div class="mt-5 mb-5">
                    <div id="card" ref="card" class="teste" label="Número do cartão"></div>
                </div>
        
                <v-btn color="primary" type="submit" :disabled="disabled">
                    <template v-if="disabled">
                         <v-progress-circular
                            :width="3"
                            :size="20"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                            Processando...
                    </template>
                    <template v-else>
                        <div>
                            Assinar
                        </div>
                    </template>
                </v-btn>
            </v-form>
            </v-col>
        </v-row> 
    </template>
  </div>
</template>

<script>
import {loadStripe} from "@stripe/stripe-js"
export default {
    middleware: "auth",
    data: ()=> ({
        planSlug: null,
        show1: false,
        form: {
            name: "",
        },

        loadingForm: true,
        disabled: false,
        paymentError: false,

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
            this.paymentError = false
            this.disabled = true
            const {setupIntent, error} = await this.stripe.confirmCardSetup(this.intentClientSecret, {
                payment_method: {
                    card: this.cardElement,
                    billing_details: {name: this.form.name}
                }
            })

            if(error) {
                this.disabled = false
                this.paymentError = true
                console.log('deu erro')
            } else {
                console.log('setupIntent', setupIntent)
                this.createSubscription(setupIntent.payment_method)
                await this.$auth.fetchUser()
                 this.disabled = false
                //enviar petição para subscrever este user
            }
        },
        async createSubscription(token) {
            const response = await this.$axios.$post('/subscriptions/create',{
                plan_slug:this.planSlug,
                token: token
            }).catch(e => {
                this.disabled = false
                this.paymentError = true
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

        this.loadingForm = false

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