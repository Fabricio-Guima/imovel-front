<template>
  <v-container class="container-login">
    <v-row>
      <v-col class="left-side hide-left-side">
        <h1>teste</h1>
        <font-awesome-icon icon="fa-solid fa-house" />
      </v-col>
      <v-col class="right-side">
        <h1>teste</h1>
        <font-awesome-icon icon="fa-solid fa-house" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "loggedinWithoutPermission",
  layout: "login",
  default: false,
  data() {
    return {
      email: "bogan.quinton@example.net",
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
      if (!this.$refs.form.validate()) {
        console.log("campos errados");
        return;
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

<style scoped>
.container-login {
  max-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
.left-side {
  background: #2962ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 150px;
}

.right-side {
  background: none;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 150px;
}

@media screen and (max-width: 992px) {
  .hide-left-side {
    display: none;
  }
}
</style>
