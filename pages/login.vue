<template>
  <div>
    <h1>Login</h1>   
     <v-form
     @submit.prevent="submit"
    ref="form"
    
   
  >  

    <v-text-field
      v-model="email"     
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
         v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"           
        label="Password"
        hint="At least 8 characters"
        counter
         @click:append="show1 = !show1"        
          ></v-text-field>

    <v-btn
      color="primary"
      type="submit"     
    >
      Login
    </v-btn>
  </v-form>
  </div>
</template>

<script>
export default {
    middleware: "loggedinWithoutPermission",
    data() {
        return {
            email: 'madie78@example.net',
            password: 'password',      
            show1: false,      
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            },
        
        }
    },
    methods: {
        async submit() {
            let payload = {
                email: this.email,
                password: this.password,
                device_name: "my-pc"
            }

            try {
            await this.$auth.loginWith("local", {
                data: {
                    email: payload.email,
                    password: payload.password,
                    device_name: "my-pc"
                },
            })

            this.$router.push('/');

            } catch(e) {
                console.log("Erro", e)
            }
            
            console.log('payload', payload)

        }
    }

}
</script>

<style>

</style>