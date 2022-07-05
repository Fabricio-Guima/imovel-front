<template>
  <v-container class="container-login">
    <v-row>
      <v-col class="left-side hide-left-side">
        <div class="container-left-side">
          <div class="texts">
            <h1>Imóveis</h1>
            <h3>Compre ou alugue seu tão desejado imóvel</h3>

            <ul class="list">
              <li>
                <v-icon small color="green accent-3" class="mr-1">mdi-check</v-icon>
                Melhores imóveis
              </li>
              <li>
                <v-icon small color="green accent-3" class="mr-1">mdi-check</v-icon>Preços
                que cabem no seu bolso
              </li>
              <li>
                <v-icon small color="green accent-3" class="mr-1">mdi-check</v-icon>O site
                que mais cresce no Brasil
              </li>
            </ul>
          </div>

          <!-- <v-btn class="btn-home" :to="{ name: 'index' }" outlined color="white">
            <v-icon class="arrow-left-icon" small color="white darken-2">
              mdi-arrow-left
            </v-icon>
            <strong>Home</strong>
          </v-btn> -->
          <div>
            <img src="~/assets/icons/place.svg" class="place-img" alt="Casa" />
          </div>
        </div>
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
            <nuxt-link :to="{ name: 'cadastro' }">
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
.container-left-side {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.texts {
  color: #fff;
  text-align: center;
}

.texts h1 {
  font-size: 4rem;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style-type: none;
  max-width: 400px;
  margin: 2rem auto;
}

.list li {
  margin-bottom: 1rem;
}

.btn-home {
  width: 250px;
  margin: 0 auto;
  position: relative;
  border: 2px solid #fff;
}

.arrow-left-icon {
  position: absolute;
  top: 0;
  left: -80px;
}

.place-img {
  width: 100%;
  display: block;
  margin: 0 auto;
}

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
  padding-top: 100px;
}

.right-side {
  background: none;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
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
