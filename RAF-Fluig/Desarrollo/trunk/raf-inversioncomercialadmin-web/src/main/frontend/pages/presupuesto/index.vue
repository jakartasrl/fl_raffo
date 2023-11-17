<template>
  <v-card>
  <v-card-title>
      <v-layout wrap>
        <v-flex xs6 sm3 md10>
          <v-icon left>mdi-view-list</v-icon>
          Presupuesto
        </v-flex>

        <v-flex xs6 sm4 md3 ml-3>
          <v-autocomplete
            v-model="filter.descGrupoGteDist"
            :items="gruposGteDistrito"
            label="Descripción Grupo Gte. Dist"
            item-value="codigoGrupoGteDist"
	        item-text="descGrupoGteDist"
	        clearable
           ></v-autocomplete>
        </v-flex>

         <v-flex xs6 sm4 md3 ml-3>
            <v-autocomplete
            v-model="filter.codigoProducto"
            :items="productos"
            label="Producto"
            item-value="codigoProducto"
	        item-text="descripcionProducto"
	        clearable
           ></v-autocomplete>
        </v-flex>
        
         <v-flex xs32 sm2 md1 ml-3>
            <v-text-field
            v-model="filter.anio"
            label="Año"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex ml-5 mt-2>
          <v-btn
            color="primary"
            @click="search"
          >
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
          
          <v-btn
            color="secondary"
            @click="exportar"
          ><v-icon dark>mdi-export</v-icon>
          </v-btn>   
          
        </v-flex>

        <v-spacer></v-spacer>
		    <v-tooltip left color="primary">
          <template v-slot:activator="{ on }">
			      <v-btn
			        color="primary"
			        fab
			        medium
			        @click="addItem()"
			        v-on="on"
			      >
			        <v-icon dark>mdi-plus</v-icon>
			      </v-btn> 
       	  </template>
          <span>Agregar Presupuesto</span>
        </v-tooltip>
      </v-layout>
  </v-card-title>
  <v-card-text>

  <v-data-table
    :headers="headers"
    :items="list"
    :options.sync="pagination"
    :server-items-length="total"
    class="elevation-1"
    :loading="loading"
    loading-text="Cargando... por favor aguarde"
  >
  
    <template v-slot:item.action="{ item }">
      <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:item.montoPresupuestado="{ item }">
		{{formatPrice(item.montoPresupuestado)}}
	</template>
       
  </v-data-table>
  
  </v-card-text>
  
  <confirm-dialog ref="dialog"></confirm-dialog>
  
  </v-card>
</template>

<script>
import ConfirmDialog from '~/components/ConfirmDialog.vue';

export default {
  components: { ConfirmDialog },

  data: () => ({
	loading: false,
	  
	filter: {
    descGrupoGteDist:null,
    codigoProducto:null,
    anio:null
	},
	
  list: [],
  total: 0,
  productos: [],
  gruposGteDistrito: [],
	
	pagination: {
        page: 1, 
        itemsPerPage: 15,
        sortBy: ['id'],
        sortDesc: [false]
    },
    
    headers: [
        { text: 'Id', value: 'id' },
		{ text: 'Descripción Grupo Gte. Dist.', value: 'descGrupoGteDist' },
		{ text: 'Código Producto', value: 'codigoProducto' },
		{ text: 'Descripción Producto', value: 'descripcionProducto' },
		{ text: 'Año', value: 'anio' },
		{ text: 'Monto Presupuestado', value: 'montoPresupuestado' },
	    { text: '', value: 'action', sortable: false },
      ],		
    }),
    
    watch: {
    	pagination: {
          handler (val) {
            this.search();
          },
          deep: true,
        },
      },    

	mounted () {
    	if (!this.list || this.list.length === 0){
			this.search();
    	}
    	
    	this.cargarProductos();
    	this.cargarGrupos();
	},   
    
	methods: {

	  editItem (item) {
	  
	  	 // toma los valores de los filtros y los guardas en localStorage
		 const filterValues = this.getFilterValues();
		 this.saveLocalStorage('presupuestofilterValues', filterValues);
	 
	    this.$router.push({ 
	    	name: 'presupuesto-id', 
	    	params: { 
	    		'id': item.id,
	    		'filtros':this.filter,       // paso filtros a un item particular,
	    		'pagination':this.pagination 
	    	} 
	    })        
    },

	deleteItem (item) {
      this.$refs.dialog.open({
        title:'Eliminar',
        text: 'Desea eliminar el Presupuesto #'+item.id+'?'
      }).then((res) => {
        if (res){
        	this.loading = true;
          this.$repos.presupuesto.delete(item.id
          ).then((res) =>{
          	this.$toast.success('Presupuesto #' + item.id + ' eliminado.');
          }).catch(err => {
      	    console.log(err);
      	    this.$toast.error(err.response.data)
          }).finally(() =>{
          	this.loading = false;
          	this.search();
          });        	  
        }
      });     
    },
      
    addItem() {
      this.$router.push({name: 'presupuesto-add'});
    },
      
    search(){
    
        const filterValuesOld = this.filter;
    	const retrievedObject = localStorage.getItem('presupuestofilterValues');
   		
   		if(retrievedObject != null){
   		
    		 // Retrieve the object from storage to add a new filter
			const stored = JSON.parse(retrievedObject);
			
			if(stored.descGrupoGteDist !== filterValuesOld.descGrupoGteDist ||
				stored.codigoProducto !== filterValuesOld.codigoProducto ||
				stored.anio !== filterValuesOld.anio){
				
				localStorage.removeItem('presupuestofilterValues');
				
			}
				
			this.filter = stored;

   		}
    
    
        this.loading = true;
        
        this.$repos.presupuesto.list({
          ...this.pagination,
          ...this.filter
        }).then((res) =>{
          this.list = res.data;
          this.total = res.totalItems;
        }).finally(() =>{
          this.loading = false;
        });    	  
      },
      
      exportar(){
        this.loading = true;
          
        this.$repos.presupuesto.export(this.filter
        ).then((res) =>{
        	  console.log("***res:",res);
        	  const url = window.URL.createObjectURL(new Blob([res]));
        	  const link = document.createElement('a');
        	  link.href = url;
        	  link.setAttribute('download', 'Reporte.xlsx');
        	  document.body.appendChild(link);
        	  link.click();
          }).finally(() =>{
            this.loading = false;
          });    	  
      },  
      
      cargarProductos(){
      		this.$axios.$get('/parametros/productos')
            .then(response => {
              this.productos =  response.data; 
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
      },
      
     cargarGrupos(){
      		this.$axios.$get('/parametros/gruposGteDistrito')
            .then(response => {
              this.gruposGteDistrito =  response.data; 
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
      },
      
      formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
    	}
      },
      formatPrice(value) {
        if (value){
         	const val = (value/1).toFixed(2).replace('.', ',');
        	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       	 }
	  },
	  
	  saveLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	  },
	  getFilterValues() {
	    return {
	      // para definir una propiedad en un objeto no es necesario usar literales ''
	      'descGrupoGteDist': this.filter.descGrupoGteDist,
	      'codigoProducto': this.filter.codigoProducto,
	      'anio': this.filter.anio,
		  }
	  }
      
	},
  }
</script>