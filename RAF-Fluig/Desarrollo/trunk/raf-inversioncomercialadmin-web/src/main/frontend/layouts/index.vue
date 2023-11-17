<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
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
      <v-app-bar-nav-icon v-if="!drawer" @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
      	{
          icon: 'mdi-file-plus',
          title: 'Congresos',
          to: 'congreso'
        },
        {
          icon: 'mdi-file-plus',
          title: 'Presupuestos',
          to: 'presupuesto'
        },
        {
          icon: 'mdi-file-plus',
          title: 'Reporte Inversión Comercial',
          to: 'reporteInversionComercial'
        },
        {
          icon: 'mdi-file-plus',
          title: 'Reporte Carta Acuerdo',
          to: 'reporteCartaAcuerdo'
        },
       {
          icon: 'mdi-file-plus',
          title: 'Reporte Petitorio y Carta Acuerdo',
          to: 'reportePetitorioCartaAcuerdo'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Administrador Portal'
    }
  },
}
</script>
