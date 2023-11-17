<template>
  <v-card :loading="loading">
    <v-card-title>
      <v-icon left>mdi-file-plus</v-icon>
      Nuevo Presupuesto
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <presupuesto-form :productosDS="responseProductos" :gruposGteDistritoDS="responseGrupos" :entity="entity"></presupuesto-form>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="text-right">	    
	      <v-btn
		      :disabled="!valid"
		      :loading="loading"
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
import PresupuestoForm from '~/components/forms/PresupuestoForm.vue';
export default {
  components: { PresupuestoForm },
  data: ()=> ({
    loading: false,
    responseProductos: [],
    responseGrupos: [],
        
    entity: {
      id:null,
      codigoGrupoGteDist: '',
      descGrupoGteDist: '',
      codigoProducto: '',
      descripcionProducto: '',
      anio:null,
      montoPresupuestado:null,
      fechaAlta:null
    },
    valid: false,
  }),
  

  mounted () {
	 this.cargarProductos();
	 this.cargarGrupos();
  },
  
  methods: {
    add(e) {
      if (this.$refs.form.validate()) {
    	this.loading = true;
    	
    	this.$repos.presupuesto.create(this.entity
    	  ).then(({data}) => {
        	this.$toast.success('Se creo el Presupuesto ' + data.id);
      	    this.$router.push('/presupuesto');        	  
          }).catch(err => {
	        console.log(err);
	        this.$toast.error(err.response.data)
	      }).finally(()=>{
        	  this.loading = false;
          });
      }
    },
    back (e){
      this.$router.push('/presupuesto');
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
           console.log("***value:",response.data[0]);
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