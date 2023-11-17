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
		            label="Área"
		            :disabled="validateArea"
		            clearable>
		            </v-select>
		        </v-flex>
	     	   <v-flex xs6 sm4 md12 ml-3>
		            <v-select
		            v-model="filter.distritoCodigo"
		            :items="distritos"
		            item-value="codigo"
			        item-text="descripcion"
		            label="Distrito"
		            :disabled="validateDistrito"
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
		        <v-flex xs32 sm2 md12 ml-3>
		            <v-text-field
		            v-model="filter.nroInversionComercial"
		            label="Nro. de Patrocinio"
		            clearable>
		            </v-text-field>
		        </v-flex>
		   </v-col>
		   
	        <v-col>
		      <v-flex xs6 sm4 md12 ml-3>
		           <v-select
		            v-model="filter.estado"
		            :items="estados"
		            label="Estado"
		            clearable>
		            </v-select>
		        </v-flex>
		        <v-flex xs6 sm4 md12 ml-3>
		           <v-select
		            v-model="filter.tipoInversion"
		            :items="tipoInversiones"
		            label="Tipo de Inversión"
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
      <v-icon @click="editItem(item)">mdi-magnify</v-icon>
    </template>
    
    <template v-slot:item.tipoInversion="{ item }">
		{{ getDescripcionTipoInversion(item.tipoInversion) }}
	</template>
    
    <template v-slot:item.estado="{ item }">
		<v-chip label :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
	</template>
    
     <template v-slot:item.fechaSolicitud="{ item }">
		{{formatDate(item.fechaSolicitud)}}
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
	areaCodigo:null,
	distritoCodigo:null,
    nombre:null,
    apellido:null,
    nroInversionComercial:null,
    numeroSolicitud:null,
    estado: null,
	tipoInversion:null
	},
	
  list: [],
  areas: [],
  distritos: [],
  total: 0,
  tipoInversiones:[
			{text:'ALOJAMIENTO CONGRESO O EVENTO CIENTIFICO', value:'alojamientos'},
			{text:'INSCRIPCION A CONGRESO', value:'inscripciones'},
			{text:'AEREO CONGRESO NACIONAL', value:'aereosNac'},
			{text:'AEREO CONGRESO INTERNACIONAL', value:'aereosInt'},
			{text:'EQUIPAMIENTO MEDICO', value:'equipamientos'},
			{text:'BECA COMPLETA/PARCIAL NACIONAL', value:'becaNac'},
			{text:'BECA COMPLETA/PARCIAL INTERNACIONAL', value:'becaInt'},
			{text:'PATROCINIO EDUCACION MEDICA', value:'patrocinio'}
			
		],
  estados:[
			{text:'PENDIENTE', value:'PENDIENTE'},
			{text:'AUDITADA', value:'AUDITADA'},
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
		{ text: 'Nro. de Patrocinio', value: 'nroInversionComercial' },
		{ text: 'Área', value: 'areaDescripcion' },
		{ text: 'Distrito', value: 'distritoDescripcion' },
		{ text: 'Nombre', value: 'nombre' },
		{ text: 'Apellido', value: 'apellido' },
		{ text: 'Tipo de Inversión', value: 'tipoInversion' },
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
		
    	if (!this.list || this.list.length === 0){
			this.search();
    	}
	},   
    
	methods: {
	  editItem (item) {
	  
	  	 // toma los valores de los filtros y los guardas en localStorage
		 const filterValues = this.getFilterValues();
		 this.saveLocalStorage('cafilterValues', filterValues);
	  
	    this.$router.push({ 
	    	name: 'reporteCartaAcuerdo-id', 
	    	params: { 
	    		'id': item.id,
	    		'filtros':this.filter,       // paso filtros a un item particular,
	    		'pagination':this.pagination 
	    	} 
	    })        
    },

 
      search(){
      
        const filterValuesOld = this.filter;
    	const retrievedObject = localStorage.getItem('cafilterValues');
   		
   		if(retrievedObject != null){
   		
    		 // Retrieve the object from storage to add a new filter
			const stored = JSON.parse(retrievedObject);
			
			if(stored.fechaSolicitudDesde !== filterValuesOld.fechaSolicitudDesde ||
				stored.fechaSolicitudHasta !== filterValuesOld.fechaSolicitudHasta ||
				stored.areaCodigo !== filterValuesOld.areaCodigo ||
				stored.distritoCodigo !== filterValuesOld.distritoCodigo ||
				stored.nombre !== filterValuesOld.nombre ||
				stored.apellido !== filterValuesOld.apellido ||
				stored.numeroSolicitud !== filterValuesOld.numeroSolicitud ||
				stored.nroInversionComercial !== filterValuesOld.nroInversionComercial ||
				stored.estado !== filterValuesOld.estado ||
				stored.tipoInversion !== filterValuesOld.tipoInversion){
				
				localStorage.removeItem('cafilterValues');
				
			}
				
			this.filter = stored;

   		}
   		
        this.loading = true;
        
        this.$repos.reporteCartaAcuerdo.list({
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
          
        this.$repos.reporteCartaAcuerdo.export(this.filter
        ).then((res) =>{
        	  console.log("***res:",res);
        	  const url = window.URL.createObjectURL(new Blob([res]));
        	  const link = document.createElement('a');
        	  link.href = url;
        	  link.setAttribute('download', 'ReporteCartaAcuerdo.xlsx');
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
 	 getColor(estado){
		switch(estado){
			case 'PENDIENTE':
				return 'orange accent-2';
			case 'RECHAZADA':
				return 'red';
			case 'AUDITADA':
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
		     				     		
		     		this.filter.distritoCodigo = response.data[0].codigo;
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
	  
	  saveLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	  },
	  getFilterValues() {
	    return {
	      // para definir una propiedad en un objeto no es necesario usar literales ''
	      'fechaSolicitudDesde': this.filter.fechaSolicitudDesde,
	      'fechaSolicitudHasta': this.filter.fechaSolicitudHasta,
	      'areaCodigo': this.filter.areaCodigo,
	      'distritoCodigo': this.filter.distritoCodigo,
	      'nombre': this.filter.nombre,
	      'apellido': this.filter.apellido,
	      'numeroSolicitud': this.filter.numeroSolicitud,
	      'nroInversionComercial': this.filter.nroInversionComercial,
	      'estado': this.filter.estado,
	      'tipoInversion': this.filter.tipoInversion,
		  }
	  }	    
      
	},
  }
</script>