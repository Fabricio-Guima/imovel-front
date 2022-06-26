<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant" class="mr-2">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <client-only>
        <v-btn text v-if="$auth.loggedIn" :to="{ name: 'minha-assinatura' }"
          >Minha assinatura</v-btn
        >
        <v-btn v-if="$auth.loggedIn" @click="logout"> Encerrar </v-btn>

        <div v-if="!$auth.loggedIn">
          <v-btn text :to="{ name: 'login' }">Inciar Sessão</v-btn>
          <v-btn text :to="{ name: 'cadastro' }">Cadastrar-se</v-btn>
        </div>
      </client-only>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Favoritos",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Planos",
          to: "/planos",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Faturas",
          to: "/faturas",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Imóveis",
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();

      this.$router.push("/login");
      console.log("logout");
    },
  },
  created() {},
};
</script>
