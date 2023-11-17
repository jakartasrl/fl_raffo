<template>
  <v-card :loading="loading">
    <v-card-title>
	  <v-icon left>mdi-file-outline</v-icon>
	  <span class="headline"> #{{entity.id}} </span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid">
      <reporte-petitorio-carta-acuerdo-form :entity="entity" :disabled="true"></reporte-petitorio-carta-acuerdo-form>
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
import ReportePetitorioCartaAcuerdoForm from '~/components/forms/ReportePetitorioCartaAcuerdoForm.vue';
export default {
  components: { ReportePetitorioCartaAcuerdoForm },

  data:() => ({
    dialog: false,
	loading: false,
	list: [],
    entity: {},
    valid: false,
  }),
  
    
  mounted () {
	  this.loading = true;
	
	  this.$repos.reportePetitorioCartaAcuerdo.get(this.$route.params.id)
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
    	this.$router.push('/reportePetitorioCartaAcuerdo')
    },
    formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
      }
    },
    
  },
  
}
</script>