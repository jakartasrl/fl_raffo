<template>
  <v-card :loading="loading">
    <v-card-title>
      <v-icon left>mdi-file-plus</v-icon>
      Nuevo Congreso
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <congreso-form 
          v-model="congreso"
          :viewMode="false"
        ></congreso-form>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="text-right">	    
	      <v-btn
          :disabled="!valid || loading"
		      color="primary"
		      @click="add" 
        >
	      Crear
	      </v-btn>
	      <v-btn  
		      color="secondary"
	        @click="back"  
	      > 
	      Cancelar 
	      </v-btn>    
	    </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import CongresoForm from '~/components/forms/CongresoForm.vue';
export default {
  components: { CongresoForm },

  data(){ 
    return{
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
        diasLimiteCarga: 0,
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
    valid: false,
    loading: false
    }
  },
  methods: {
    add(e) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$repos.congreso.create(this.congreso)
            .then(({data}) => {
                this.$toast.success('Congreso creado éxitosamente.');
                this.back();       	  
            })
            .catch(err => {
                console.log(err);
                this.$toast.error(err.response.data)
            })
            .finally(()=>{
                  this.loading = false;
            });
      }
    },
    back() {
      this.$router.push({
        name: 'congreso'
      });
    }
  },
  
}
</script>