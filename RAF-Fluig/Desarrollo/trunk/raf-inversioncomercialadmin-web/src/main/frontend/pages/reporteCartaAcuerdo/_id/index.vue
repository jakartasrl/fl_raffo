<template>
  <v-card :loading="loading">
    <v-card-title>
	  <v-icon left>mdi-file-outline</v-icon>
	  <span class="headline">{{ getDescripcionTipoInversion(entity.tipoInversion) }} #{{entity.id}} </span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid">
      <reporte-carta-acuerdo-form :entity="entity" :disabled="true"></reporte-carta-acuerdo-form>
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
import ReporteCartaAcuerdoForm from '~/components/forms/ReporteCartaAcuerdoForm.vue';
export default {
  components: { ReporteCartaAcuerdoForm },

  data:() => ({
    dialog: false,
	loading: false,
	list: [],
    entity: {},
    valid: false,
  }),
  
    
  mounted () {
	  this.loading = true;
	
	  this.$repos.reporteCartaAcuerdo.get(this.$route.params.id)
      .then(({data}) => {
         this.entity = data;
         
      }).catch(err => {
	     console.log(err);
	     this.$toast.error(err.response.data)
	    }).finally(()=>{
      	  this.loading = false;
      });	  
  },  
  
  methods: {

    back (e){
    	this.$router.push('/reporteCartaAcuerdo')
    },
    formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
      }
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