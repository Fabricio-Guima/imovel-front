<template>
  <v-card
    class="mx-auto"
    max-width="344" 
   
  >
  
    <v-img
      src=""
      height="200px"
      @click="choosePlan()"
    ></v-img>

    <v-card-title @click="choosePlan()">
     {{plan.name}}
    </v-card-title>

    <v-card-subtitle>
     R$ {{plan.price}} / mês
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Descrição
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
         {{plan.description}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
    data: ()=> ({
        show: false,
    }),
    props: {
        plan: {
            type: Object,
            required: true,
        }
    },
    methods: {
        choosePlan() {
            this.$router.push({name: 'checkout', query: {plan: this.plan.slug }})
        }
    }

}
</script>

<style>

</style>