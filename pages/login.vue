<template>
  <div>
    <h1>Login</h1>
    <v-form @submit.prevent="submit" ref="form">
      <v-text-field v-model="email" label="E-mail" :rules="[rules.required, rules.email]"></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min, rules.max]"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn color="primary" type="submit"> Login </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: "loggedinWithoutPermission",
  layout: false,
  default: false,
  data() {
    return {
      email: "madie78@example.net",
      password: "password",
      show1: false,
      rules: {
        required: (value) => !!value || "Este campo é obrigatório.",
        min: (v) => v.length >= 6 || "Mínimo de 6 caracteres",
        max: (v) => v.length <= 16 || "Máximo de 16 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || "Este campo deve ser um email válido",       
      },
    };
  },
  methods: {
    async submit() {      
      let payload = {
        email: this.email,
        password: this.password,
        device_name: "my-pc",
      };
      //tudo ok? true
    if( !this.$refs.form.validate()) {
      console.log('campos errados')
      return 
    }

      try {
        await this.$auth.loginWith("local", {
          data: {
            email: payload.email,
            password: payload.password,
            device_name: "my-pc",
          },
        });

        this.$router.push("/");
      } catch (e) {
        console.log("Erro", e);
      }

      console.log("payload", payload);
    },
  },
};
</script>

<style></style>
