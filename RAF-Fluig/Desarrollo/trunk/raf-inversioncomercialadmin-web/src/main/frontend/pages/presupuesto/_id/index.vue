<template>
  <v-card :loading="loading">
    <v-card-title>
	  <v-icon left>mdi-file-outline</v-icon>
	  <span class="headline">Presupuesto #{{entity.id}} </span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid">
      <presupuesto-form :productosDS="responseProductos" :gruposGteDistritoDS="responseGrupos" :entity="entity" :disabled="true"></presupuesto-form>
    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
	    <v-btn
		  text
		  :disabled="!valid"
		  color="primary"
		  @click="update" 
        >
	      Guardar
	    </v-btn>
	    <v-btn 
		  text
		  color="secondary"
		  nuxt
	      @click="back" 
	     > 
	       Volver 
	    </v-btn>      	  	
    </v-card-actions>
    <confirm-dialog ref="dialog"></confirm-dialog>
  </v-card>
</template>

<script>
import PresupuestoForm from '~/components/forms/PresupuestoForm.vue';
export default {
  components: { PresupuestoForm },

  data:() => ({
    dialog: false,
	loading: false,
	list: [],
	responseProductos: [],
	responseGrupos: [],
    entity: {},
    valid: false,
  }),
  
    mounted () {
	  this.loading = true;
    
      this.cargarProductos();
      this.cargarGrupos();
	
	
	  this.$repos.presupuesto.get(this.$route.params.id)
      .then(({data}) => {
         this.entity = data;
         
      }).catch(err => {
	     // console.log(err);
	     this.$toast.error(err.response.data)
	    }).finally(()=>{
      	  this.loading = false;
      });	  
  }, 
  
  methods: {
    update(e) {
      if (this.$refs.form.validate()) {
    	this.loading = true;
        this.$repos.presupuesto.update(this.entity.id, this.entity
          ).then(({data})=>{
        	// this.entity = data;
        	this.$toast.success('Se actualizó el Presupuesto #' + this.entity.id);
            this.back(e);
          }).catch((err) => {
        	  this.$toast.error(err.response.data);
          }).finally(()=>{
        	  this.loading = false;
          });
      }
    },
    back (e){
    	this.$router.push('/presupuesto')
    },
    formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
      }
    },
    cargarProductos(){
   		this.$axios.$get('/parametros/productos')
         .then(response => {
           this.responseProductos =  response.data; 
         })
         .catch(err => {
           console.log(err)
         })
         .finally(() => (this.isLoading = false))
     }, 
     cargarGrupos(){
   		this.$axios.$get('/parametros/gruposGteDistrito')
         .then(response => {
           this.responseGrupos =  response.data; 
         })
         .catch(err => {
           console.log(err)
         })
         .finally(() => (this.isLoading = false))
      },
    
  },
 
}
</script>