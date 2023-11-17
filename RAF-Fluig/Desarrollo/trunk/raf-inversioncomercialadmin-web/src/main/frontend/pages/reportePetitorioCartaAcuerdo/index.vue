<template>
  <v-card>
  <v-card-title>
      <v-layout wrap>
       
	    <v-row>
		     <v-col>
	        	<v-flex xs6 sm4 md12 ml-3>
		          <date-picker
		          v-model="filter.fechaSolicitudDesde"
		          class="mt-0 pt-0 mb-0 pb-0" 
		          label="Fecha Solicitud Desde"
		          clearable>
		          </date-picker>
		        </v-flex>
		       <v-flex xs6 sm4 md12 ml-3>
		          <date-picker 
		          v-model="filter.fechaSolicitudHasta" 
		          class="mt-0 pt-0 mb-0 pb-0" 
		          label="Fecha Solicitud Hasta"
		          clearable>
		          </date-picker>
		        </v-flex>
		     </v-col> 
		     
		     <v-col>
		     	<v-flex xs6 sm4 md12 ml-3>
		            <v-select
		            v-model="filter.areaCodigo"
		            :items="areas"
		            item-value="codigo"
			        item-text="descripcion"
		            label="�?rea"
		            :disabled="validateArea"
		            clearable>
		            </v-select>
		        </v-flex>
	     	   <v-flex xs6 sm4 md12 ml-3>
		            <v-select
		            v-model="filter.regionCodigo"
		            :items="distritos"
		            item-value="codigo"
			        item-text="descripcion"
		            label="Región"
		            :disabled="validateDistrito"
		            clearable>
		            </v-select>
		        </v-flex>        
		     </v-col>
		     
		      <v-col>
		      	 <v-flex xs32 sm2 md12 ml-3>
		            <v-text-field
		            v-model="filter.solicitante"
		            label="Solicitante"
		            clearable>
		            </v-text-field>
		        </v-flex>
		      	<v-flex xs6 sm4 md12 ml-3>
		            <v-select
		            v-model="filter.lineaCodigo"
		            :items="lineas"
		            item-value="codigo"
			        item-text="descripcion"
		            label="Línea"
		            clearable>
		            </v-select>
		        </v-flex>  
		      </v-col>
		     
		     
		     <v-col>
	     		<v-flex xs32 sm2 md12 ml-3>
		            <v-text-field
		            v-model="filter.nombre"
		            label="Nombre"
		            clearable>
		            </v-text-field>
		        </v-flex>
		        <v-flex xs6 sm4 md12 ml-3>
		            <v-text-field
		            v-model="filter.apellido"
		            label="Apellido"
		            clearable>
		            </v-text-field>
		        </v-flex>
		     </v-col>
		     
		     <v-col>
		        <v-flex xs32 sm2 md12 ml-3>
		            <v-text-field
		            v-model="filter.numeroSolicitud"
		            label="Nro. Solicitud"
		            clearable>
		            </v-text-field>
		        </v-flex>
		      <v-flex xs6 sm4 md12 ml-3>
		           <v-select
		            v-model="filter.estado"
		            :items="estados"
		            label="Estado"
		            clearable>
		            </v-select>
		        </v-flex>
		   </v-col>
		   
	        <v-col>
		        <v-flex xs6 sm4 md12 ml-3>
		           <v-select
		            v-model="filter.tipoInversionCodigo"
		            :items="tipoInversiones"
		            item-value="codigo"
			        item-text="descripcion"
		            label="Tipo de Inversión"
		            clearable>
		            </v-select>
		        </v-flex>
		        <v-flex xs6 sm4 md12 ml-3>
		           <v-select
		            v-model="filter.tipoProductoCodigo"
		            :items="tipoProductos"
		            item-value="codigo"
			        item-text="descripcion"
		            label="Tipo de Producto"
		            clearable>
		            </v-select>
		        </v-flex>
	        </v-col>
		   
	 	   <v-col>
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
	  	   </v-col>
	 	</v-row>
        <v-spacer></v-spacer>

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
	   	<div class="d-flex justify-end">
	   	  <v-icon v-if="item.estado == 'APROBADA' || item.estado == 'RECHAZADA'" @click="openFolderGED(item)">mdi-folder-open</v-icon>
	      <v-icon @click="editItem(item)">mdi-magnify</v-icon>
	    </div>
    </template>
    
    <template v-slot:item.estado="{ item }">
		<v-chip label :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
	</template>
    
     <template v-slot:item.fechaSolicitud="{ item }">
		{{formatDate(item.fechaSolicitud)}}
	</template>

	<template v-slot:item.fechaFinSolicitud="{ item }">
		{{formatDate(item.fechaFinSolicitud)}}
	</template>
  
  </v-data-table>
  
  </v-card-text>
  
  <confirm-dialog ref="dialog"></confirm-dialog>
  
  </v-card>
</template>

<script>
import DatePicker from "~/components/DatePicker.vue";
import ConfirmDialog from '~/components/ConfirmDialog.vue';

export default {
  components: { ConfirmDialog , DatePicker },

  data: () => ({
	loading: false,
	validateDistrito:false,
	validateArea:false,
	  
  filter: {
    fechaSolicitudDesde: new Date().toISOString().substr(0, 10),
    fechaSolicitudHasta:null,
	solicitante:null,
	areaCodigo:null,
	regionCodigo:null,
	lineaCodigo:null,
    nombre:null,
    apellido:null,
    numeroSolicitud:null,
    estado: null,
	tipoInversionCodigo:null,
	tipoProductoCodigo:null
	},
	
  list: [],
  areas: [],
  distritos: [],
  lineas: [],
  tipoInverciones: [],
  tipoProductos: [],
  total: 0,

  estados:[
			{text:'PENDIENTE', value:'PENDIENTE'},
			{text:'APROBADA', value:'APROBADA'},
			{text:'RECHAZADA', value:'RECHAZADA'},
			{text:'CANCELADA', value:'CANCELADA'}
  ],
	
	pagination: {
        page: 1, 
        itemsPerPage: 15,
        sortBy: ['id'],
        sortDesc: [false]
    },
    
    headers: [
		{ text: 'Nro. Solicitud', value: 'numeroSolicitud' },
		{ text: 'Fecha Solicitud', value: 'fechaSolicitud' },
		{ text: 'Fecha Fin Solicitud', value: 'fechaFinSolicitud' },
		{ text: 'Solicitante', value: 'solicitante' },
		{ text: '�?rea', value: 'area' },
		{ text: 'Línea/Región', value: 'lineaRegion' },
		{ text: 'Nombre', value: 'nombre' },
		{ text: 'Apellido', value: 'apellido' },
		{ text: 'Tipo de Inversión', value: 'tipoInversion' },
		{ text: 'Tipo de Producto', value: 'tipoProducto' },
		{ text: 'Estado', value: 'estado', sortable: true },
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
		this.cargarAreas();
		this.cargarDistritos();
		this.cargarLineas();
		this.cargarTipoInversiones();
		this.cargarTipoProductos();
		
    	if (!this.list || this.list.length === 0){
			this.search();
    	}
	},   
    
	methods: {
	  editItem (item) {
	  
	  	 // toma los valores de los filtros y los guardas en localStorage
		 const filterValues = this.getFilterValues();
		 this.saveLocalStorage('pcafilterValues', filterValues);
	  
	    this.$router.push({ 
	    	name: 'reportePetitorioCartaAcuerdo-id', 
	    	params: { 
	    		'id': item.id,
	    		'filtros':this.filter,       // paso filtros a un item particular,
	    		'pagination':this.pagination 
	    	} 
	    })        
    },

 
      search(){
      
        const filterValuesOld = this.filter;
    	const retrievedObject = localStorage.getItem('pcafilterValues');
   		
   		if(retrievedObject != null){
   		
    		 // Retrieve the object from storage to add a new filter
			const stored = JSON.parse(retrievedObject);
			
			if(stored.fechaSolicitudDesde !== filterValuesOld.fechaSolicitudDesde ||
				stored.fechaSolicitudHasta !== filterValuesOld.fechaSolicitudHasta ||
				stored.solicitante !== filterValuesOld.solicitante ||
				stored.areaCodigo !== filterValuesOld.areaCodigo ||
				stored.regionCodigo !== filterValuesOld.regionCodigo ||
				stored.lineaCodigo !== filterValuesOld.lineaCodigo ||
				stored.nombre !== filterValuesOld.nombre ||
				stored.apellido !== filterValuesOld.apellido ||
				stored.numeroSolicitud !== filterValuesOld.numeroSolicitud ||
				stored.estado !== filterValuesOld.estado ||
				stored.tipoInversionCodigo !== filterValuesOld.tipoInversionCodigo ||
				stored.tipoProductoCodigo !== filterValuesOld.tipoProductoCodigo){
				
				localStorage.removeItem('pcafilterValues');
				
			}
				
			this.filter = stored;

   		}
   		
        this.loading = true;
        
        this.$repos.reportePetitorioCartaAcuerdo.list({
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
          
        this.$repos.reportePetitorioCartaAcuerdo.export(this.filter
        ).then((res) =>{
        	  console.log("***res:",res);
        	  const url = window.URL.createObjectURL(new Blob([res]));
        	  const link = document.createElement('a');
        	  link.href = url;
        	  link.setAttribute('download', 'ReportePetitorioCartaAcuerdo.xlsx');
        	  document.body.appendChild(link);
        	  link.click();
          }).finally(() =>{
            this.loading = false;
          });    	  
        },  
      
      formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
    	}
      },
 	 getColor(estado){
		switch(estado){
			case 'PENDIENTE':
				return 'orange accent-2';
			case 'RECHAZADA':
				return 'red';
			case 'APROBADA':
				return 'light-blue darken-1';
			case 'CANCELADA':
				return 'grey';
		}
	},
      
	cargarAreas(){
      		this.$axios.$get('/parametros/areas')
            .then(response => {
              
              if(response.data.length === 1){
		     		 this.validateArea = true;
		     				     		
		     		this.filter.areaCodigo = response.data[0].codigo;
		     		this.areas = [response.data[0]];
			    }else{
			     	this.validateArea = false;
			     	this.areas = response.data;
			    }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
	    },

		cargarDistritos(){
      		this.$axios.$get('/parametros/distritos')
            .then(response => {

	            if(response.data.length === 1){
		     		 this.validateDistrito = true;
		     				     		
		     		this.filter.regionCodigo = response.data[0].codigo;
		     		this.distritos = [response.data[0]];
			    }else{
			     	this.validateDistrito = false;
			     	this.distritos = response.data;
			    }
               
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
	    },
	    cargarLineas(){
      		this.$axios.$get('/parametros/lineas')
            .then(response => {
	     		this.lineas = response.data;
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
	    },
	    cargarTipoInversiones(){
      		this.$axios.$get('/parametros/tipoInversiones')
            .then(response => {
	     		this.tipoInversiones = response.data;
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
	    },
	    cargarTipoProductos(){
      		this.$axios.$get('/parametros/tipoProductos')
            .then(response => {
		     		this.tipoProductos = response.data;
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
	    },	    
	  
	  saveLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	  },
	  getFilterValues() {
	    return {
	      // para definir una propiedad en un objeto no es necesario usar literales ''
	      'fechaSolicitudDesde': this.filter.fechaSolicitudDesde,
	      'fechaSolicitudHasta': this.filter.fechaSolicitudHasta,
	      'solicitante': this.filter.solicitante,
	      'areaCodigo': this.filter.areaCodigo,
	      'regionCodigo': this.filter.regionCodigo,
	      'lineaCodigo': this.filter.lineaCodigo,
	      'nombre': this.filter.nombre,
	      'apellido': this.filter.apellido,
	      'numeroSolicitud': this.filter.numeroSolicitud,
	      'estado': this.filter.estado,
	      'tipoInversionCodigo': this.filter.tipoInversionCodigo,
	      'tipoProductoCodigo': this.filter.tipoProductoCodigo,
		  }
	  },
	  openFolderGED(item){
	  
	  	const companyID = 1;
	  	window.open('/portal/p/'+companyID+'/ecmnavigation?app_ecm_navigation_doc=' + item.carpetaAdjuntosId);
	  	
	  }	    
      
	},
  }
</script>