<template>
  <v-card :loading="loading">
    <v-card-title>
	  <v-icon left>mdi-file-outline</v-icon>
	  <span class="headline">Congreso #{{congreso.id}} </span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid">
      <congreso-form 
       v-model="congreso"
       :viewMode="this.$route.params.readonly"
      ></congreso-form>
    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        v-if="!this.$route.params.readonly"
        color="primary"
        @click="update"
        >
        Guardar
      </v-btn>
      <v-btn 
        color="secondary"
        nuxt
        @click="back" 
        > 
        Volver 
      </v-btn>    	  	
    </v-card-actions>
  </v-card>
</template>

<script>
import CongresoForm from '~/components/forms/CongresoForm.vue';
export default {
  components: { CongresoForm },

  data() {
    return {
      congreso: {
        id: null,
        siglas: null,
        nombre: null,
        nacional: null,
        country: null,
        state: null,
        estado: null,
        localidad: null,
        fechaInicio: null,
        fechaFin: null,
        diasLimiteCarga: null,
        presupuestoHabilitado: null,
        web: null,
        metadata: null,
        habitacionSimple: null,
        habitacionDoble: null,
        habitacionTriple: null,
        vueloDirecto: null,
        vueloEscalas: null,
        anio: null,
        lugarEvento: null,
        fechaCheckin: null,
        fechaCheckout: null,
        codigo: null
      },
      loading: false,
      valid: false,
    };
  },

  
  mounted () {
    console.log("RO", this.$route.params.readonly);

    this.loading = true;

	  this.$repos.congreso.get(this.$route.params.id)
      .then(({data}) => {
         this.congreso = data;
      })
      .catch(err => {
	     this.$toast.error(err.response.data)
	    })
      .finally(() => {
      	  this.loading = false;
      });	  
  }, 
  
  methods: {
    update(e) {

      if (this.$refs.form.validate()) {
    	this.loading = true;
        this.$repos.congreso.update(this.congreso.id, this.congreso
          ).then(({data})=>{
        	this.congreso = data;
        	this.$toast.success(`Se actualizó el Congreso ${this.congreso.nombre}`);
            this.back(e);
          }).catch((err) => {
        	  this.$toast.error(err.response.data);
          }).finally(()=>{
        	  this.loading = false;
          });
      }
    },
    back() {
      this.$router.push({
        name: 'congreso',
      });
    },
    formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
      }
    },

  },
 
}
</script>