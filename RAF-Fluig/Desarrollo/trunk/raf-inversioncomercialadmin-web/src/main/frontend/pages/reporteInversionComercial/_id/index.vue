<template>
  <v-card :loading="loading">
    <v-card-title>
	  <v-icon left>mdi-file-outline</v-icon>
	  <span class="headline">{{ getDescripcionTipoInversion(entity.tipoInversion) }} #{{entity.id}} </span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid">
      <reporte-inversion-comercial-form :entity="entity" :imputaciones="list"></reporte-inversion-comercial-form>
    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>

	    <v-btn 
		  nuxt
		  color="secondary"
		  text
	      @click="back" 
	     > 
	       Volver 
	    </v-btn>      	  	
    </v-card-actions>
  </v-card>
</template>

<script>
import ReporteInversionComercialForm from '~/components/forms/ReporteInversionComercialForm.vue';
export default {
  components: { ReporteInversionComercialForm },

  data:() => ({
	loading: false,
    headers: [],
	list: [],
    entity: {},
    valid: false,
  }),
  
  mounted () {
	  this.loading = true;
	
	  this.$repos.reporteInversionComercial.get(this.$route.params.id)
      .then(({data}) => {
         this.entity = data;
      	 this.list = data.imputacionesDTO; 
      }).catch(err => {
	     console.log(err);
	     this.$toast.error(err.response.data)
	    }).finally(()=>{
      	  this.loading = false;
      });	  
  },  
  
  methods: {

    back (e){
    	this.$router.push('/reporteInversionComercial')
   },
    
   getDescripcionTipoInversion(value){
		switch(value){
			case 'alojamientos':
				return 'ALOJAMIENTO CONGRESO O EVENTO CIENTIFICO';
			case 'aereosNac':
				return 'AEREO CONGRESO NACIONAL';
			case 'aereosInt':
				return 'AEREO CONGRESO INTERNACIONAL';
			case 'inscripciones':
				return 'INSCRIPCION A CONGRESO';
			case 'equipamientos':
				return 'EQUIPAMIENTO MEDICO';
			case 'becaNac':
				return 'BECA COMPLETA/PARCIAL NACIONAL';
			case 'becaInt':
				return 'BECA COMPLETA/PARCIAL INTERNACIONAL';
			case 'patrocinio':
				return 'PATROCINIO EDUCACION MEDICA';	
		}
	},
    
  },
 
}
</script>