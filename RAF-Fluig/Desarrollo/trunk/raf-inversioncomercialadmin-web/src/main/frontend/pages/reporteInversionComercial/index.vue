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
		            <v-text-field
		            v-model="filter.apellido"
		            label="Apellido"
		            clearable>
		            </v-text-field>
		        </v-flex>
				<v-autocomplete
		            v-model="filter.congreso"
		            :items="congresos"
					item-value="id"
			        item-text="nombre"
		            label="Evento"
		            clearable>
		        </v-autocomplete>
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
				<v-flex xs32 sm2 md12 ml-3>
		            <v-text-field
		            v-model="filter.numeroSolicitud"
		            label="Nro. Solicitud"
		            clearable>
		            </v-text-field>
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
		<v-chip label :color="getColor(item.estado)" dark>{{ getEstado(item.estado) }}</v-chip>
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

	data() {
		return {
			loading: false,
			validateDistrito:false,
			validateArea:false,
			
			filter: {
				fechaSolicitudDesde: new Date().toISOString().substr(0, 10),
				fechaSolicitudHasta:null,
				codigoGrupoGteDist:null,
				areaCodigo:null,
				distritoCodigo:null,
				nombre:null,
				apellido:null,
				numeroSolicitud:null,
				estado: null,
				tipoInversion:null
			},
			
		list: [],
		areas: [],
		distritos: [],
		congresos: [{
			id: null,
			nombre: null
		}],
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
					{text:'APROBADA', value:'APROBADA'},
					{text:'FINALIZADA', value:'FINALIZADA'},
					{text:'RECHAZADA', value:'RECHAZADA'},
					{text:'CA RECHAZADA', value:'CARTA_ACUERDO_RECHAZADA'},
					{text:'BAJA MEDICO', value:'BAJA_MEDICO'},
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
				{ text: 'Área', value: 'areaDescripcion' },
				{ text: 'Distrito', value: 'distritoDescripcion' },
				{ text: 'Nombre', value: 'nombre' },
				{ text: 'Apellido', value: 'apellido' },
				{ text: 'Tipo de Inversión', value: 'tipoInversion' },
				{ text: 'Evento', value: 'nombreCongreso' },
				{ text: 'Estado', value: 'estado', sortable: true },
				{ text: '', value: 'action', sortable: false },
			],
		};
	},

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
		this.cargarCongresos();
		
    	if (!this.list || this.list.length === 0){
			this.search();
    	}
	},   
    
	methods: {
	
	  editItem (item) {
	  
	  	 // toma los valores de los filtros y los guardas en localStorage
		 const filterValues = this.getFilterValues();
		 this.saveLocalStorage('invfilterValues', filterValues);
	  
	    this.$router.push({ 
	    	name: 'reporteInversionComercial-id', 
	    	params: { 
	    		'id': item.id,
	    		'filtros':this.filter,       // paso filtros a un item particular,
	    		'pagination':this.pagination 
	    	} 
	    })        
      },
 
      search(){
      
        const filterValuesOld = this.filter;
    	const retrievedObject = localStorage.getItem('invfilterValues');
   		
   		if(retrievedObject != null){
   		
    		 // Retrieve the object from storage to add a new filter
			const stored = JSON.parse(retrievedObject);
			
			if(stored.fechaSolicitudDesde !== filterValuesOld.fechaSolicitudDesde ||
				stored.fechaSolicitudHasta !== filterValuesOld.fechaSolicitudHasta ||
				stored.areaCodigo !== filterValuesOld.areaCodigo ||
				stored.distritoCodigo !== filterValuesOld.distritoCodigo ||
				stored.estado !== filterValuesOld.estado ||
				stored.tipoInversion !== filterValuesOld.tipoInversion ||
				stored.numeroSolicitud !== filterValuesOld.numeroSolicitud ||
				stored.congreso !== filterValuesOld.congreso){ 
				
				localStorage.removeItem('invfilterValues');
				
			}
				
			this.filter = stored;

   		}
      
        this.loading = true;
        
        console.log("this.filter.areaCodigo: " + this.filter.areaCodigo);
        
        this.$repos.reporteInversionComercial.list({
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
          
         this.$repos.reporteInversionComercial.export(this.filter)
         	.then((res) =>{
        	  console.log("***res:",res);
        	  const url = window.URL.createObjectURL(new Blob([res]));
        	  const link = document.createElement('a');
        	  link.href = url;
        	  link.setAttribute('download', 'ReporteInversionComercial.xlsx');
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
				case 'APROBADA':
					return 'green';
				case 'RECHAZADA':
					return 'red';
				case 'CARTA_ACUERDO_RECHAZADA':
					return '#FA8484';
				case 'FINALIZADA':
					return 'light-blue darken-1';
				case 'BAJA_MEDICO':
					return '#DDA0DD';
				default:
				    return 'grey';
			}
		},
		getEstado(estado){
			switch(estado){
				case 'PENDIENTE':
					return 'PENDIENTE';
				case 'APROBADA':
					return 'APROBADA';
				case 'RECHAZADA':
					return 'RECHAZADA';
				case 'CARTA_ACUERDO_RECHAZADA':
					return 'CA RECHAZADA';
				case 'FINALIZADA':
					return 'FINALIZADA';
				case 'BAJA_MEDICO':
					return 'BAJA MEDICO';
				default:
				    return 'CANCELADA';
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

		  cargarCongresos(){
	      		this.$axios.$get('/parametros/congreso/congresos')
	            .then(response => {
					this.congresos = response.data;
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
		      'estado': this.filter.estado,
		      'tipoInversion': this.filter.tipoInversion,
		      'numeroSolicitud': this.filter.numeroSolicitud,
		      'congreso': this.filter.congreso
			  }
		  }	  	      
      
	},
  }
</script>