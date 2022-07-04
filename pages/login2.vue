<template>
  <v-container class="container-login">
    <v-row>
      <v-col class="left-side hide-left-side">
        <h1>teste</h1>
      </v-col>
      <v-col class="right-side">
        <img src="~/assets/icons/house-icon.svg" class="login-icon" />
        <v-form class="form-login" @submit.prevent="submit" ref="form">
          <v-text-field
            class="input"
            v-model="email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            outlined
            color="primary"
          ></v-text-field>

          <v-text-field
            class="input"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.max]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            outlined
            color="primary"
          ></v-text-field>

          <div class="container-forgot-login">
            <nuxt-link :to="{ name: 'login' }">
              <span class="forgot-login"> Esqueci a senha</span>
            </nuxt-link>
          </div>

          <v-btn color="primary" class="btn-login" type="submit"> Entrar </v-btn>

          <div class="container-forgot-login">
            <span class="account-text"> Ainda não tem conta?</span>
          </div>

          <div class="container-forgot-login">
            <nuxt-link :to="{ name: 'login' }">
              <span class="register-account"> Cadastre-se grátis</span>
            </nuxt-link>
          </div>
        </v-form>
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

<style>
.container-login {
  max-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.container-login .row {
  margin: 0 !important;
}

.left-side {
  background: #2962ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  padding-top: 150px;
}

.right-side {
  background: none;
  height: 100vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin: 0;
  padding: 0;
  padding-top: 150px;
}

.login-icon {
  width: 180px;
  height: 180px;
  display: block;
  margin: 0 auto 1rem auto;
}

.v-form.form-login {
  width: 100%;
  padding: 0 2rem;
}

.v-text-field.input {
  max-width: 416px;
  margin: 0 auto;
}

.btn-login {
  margin: 1rem auto 1rem auto;
  padding: 5px 0;
  display: block;
  width: 260px !important;
}

.container-forgot-login {
  max-width: 416px;
  height: 1rem;
  margin: 0 auto;
  position: relative;
}

.forgot-login {
  max-width: 416px;
  margin: 0 auto;
  text-align: left;
  color: #2962ff;
  font-size: 12px;
  display: block;
  position: absolute;
  top: -5px;
  transition: 0.2s all;
}

.forgot-login:hover {
  color: #2962ff;
  text-decoration: underline;
}

.account-text {
  display: block;
  text-align: center;
  font-size: 14px;
}

.register-account {
  margin-top: 1rem;
  display: block;
  color: #2962ff;
  text-decoration: underline;
  text-align: center;
}

@media screen and (max-width: 992px) {
  .hide-left-side {
    display: none;
  }

  .v-text-field.input {
    max-width: 100%;
  }

  .container-forgot-login {
    max-width: 100%;
    height: 1rem;
    margin: 0 auto;
    position: relative;
  }

  .btn-login {
    margin: 1rem auto 1rem auto;
    display: block;
    width: 100% !important;
  }
}
</style>
