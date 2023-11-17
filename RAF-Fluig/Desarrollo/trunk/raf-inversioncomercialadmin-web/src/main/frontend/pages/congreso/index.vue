<template>
  <v-card>
  <v-card-title>
      <v-layout wrap>
        <v-row>
		     <v-col>
            <v-flex xs6 sm4 md12 ml-3>
              <v-text-field
              v-model="filter.siglas"
              label="Siglas del Congreso"
              clearable
              ></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md12 ml-3>
              <v-text-field
              v-model="filter.nombre"
              label="Nombre"
              clearable
              ></v-text-field>
            </v-flex>
         </v-col>
         <v-col>
            <v-flex xs6 sm4 md12 ml-3>
              <v-text-field
              v-model="filter.codigo"
              label="Código"
              clearable
              ></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md12 ml-3>
              <v-autocomplete
		            v-model="filter.presupuestoHabilitado"
		            :items="presupuestos"
		            label="Presupuesto Habilitado"
		            clearable>
		            </v-autocomplete>
		        </v-flex>
         </v-col>
         <v-col>
            <v-flex xs6 sm4 md12 ml-3>
              <date-picker
              v-model="filter.fechaInicioDesde"
              class="mt-0 pt-0 mb-0 pb-0" 
              label="Fecha Inicio del Evento Desde"
              clearable>
              </date-picker>
            </v-flex>
            <v-flex xs6 sm4 md12 ml-3>
                <date-picker 
                v-model="filter.fechaInicioHasta" 
                class="mt-0 pt-0 mb-0 pb-0" 
                label="Fecha Inicio del Evento Hasta"
                clearable>
                </date-picker>
            </v-flex>
         </v-col>
         <v-col>
            <v-flex xs6 sm4 md12 ml-3>
                <date-picker
                v-model="filter.fechaFinDesde"
                class="mt-0 pt-0 mb-0 pb-0" 
                label="Fecha Fin del Evento Desde"
                clearable>
                </date-picker>
            </v-flex>
            <v-flex xs6 sm4 md12 ml-3>
                <date-picker 
                v-model="filter.fechaFinHasta" 
                class="mt-0 pt-0 mb-0 pb-0" 
                label="Fecha Fin del Evento Hasta"
                clearable>
                </date-picker>
            </v-flex>  
         </v-col>
         <v-col>
		       <v-flex xs32 sm2 md12 ml-3>
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
          <span>Agregar Congreso</span>
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
  
  <template v-slot:item.fechaInicio="{ item }">
		{{formatDate(item.fechaInicio)}}
	</template>
  <template v-slot:item.fechaFin="{ item }">
		{{formatDate(item.fechaFin)}}
	</template>
  <template v-slot:item.nacional="{ item }">
    {{ item.nacional ? "SI" : "NO" }}
  </template>
  <template v-slot:item.presupuestoHabilitado="{ item }">
    {{ getDescripcionProesupuesto(item.presupuestoHabilitado) }}
  </template>

    <template v-slot:item.action="{ item }">
      <div 
        v-if="isReadonly"
        class="d-flex justify-end">
        <v-icon @click="editItem(item)">mdi-magnify</v-icon>
      </div>
      <div 
        v-else
        class="d-flex justify-end">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </div>
    </template>
  
  </v-data-table>
  
  </v-card-text>
  
  <confirm-dialog ref="dialog"></confirm-dialog>
  
  </v-card>
</template>

<script>
import ConfirmDialog from '~/components/ConfirmDialog.vue';
import DatePicker from "~/components/DatePicker.vue";

export default {
  components: { ConfirmDialog, DatePicker },

  data() {
    return {
      loading: false,
      isReadonly: false,
	  
    filter: {
      siglas: null,
      nombre: null,
      fechaInicioDesde: new Date().toISOString().substr(0, 10),
      fechaInicioHasta: null,
      fechaFinDesde: null,
      fechaFinHasta: null,
      presupuestoHabilitado: null,
      codigo: null
    },
    
    list: [],
    total: 0,
    presupuestos:['MARKETING', 'COMBINADO', 'DELEGADO'],
    
    pagination: {
          page: 1, 
          itemsPerPage: 15,
          sortBy: ["id"],
          sortDesc: [false]
      },
      
      headers: [
          { text: 'Código', value: 'codigo', sortable: false },
          { text: 'Siglas del Congreso', value: 'siglas', sortable: false },
          { text: 'Nombre', value: 'nombre', sortable: false },
          { text: 'Año', value: 'anio', sortable: false },
          { text: 'Nacional', value: 'nacional', sortable: false },
          { text: 'Fecha Inicio del Evento', value: 'fechaInicio', sortable: false },
          { text: 'Fecha Fin del Evento', value: 'fechaFin', sortable: false },
          { text: 'Presupuesto Habilitado', value: 'presupuestoHabilitado', sortable: false },
          { text: '', value: 'action', sortable: false },
        ],	
    };
  },
  computed: {
  },

	mounted () {
		this.isRO();

    if (!this.list || this.list.length === 0){
      this.search();
    }
}, 

watch: {
    pagination: {
        handler (val) {
          this.search();
        },
        deep: true,
      },
    }, 


  methods: {
          
      search(){

        const filterValuesOld = this.filter;
        const retrievedObject = localStorage.getItem('congresofilterValues');
        
        if(retrievedObject != null){
        
          // Retrieve the object from storage to add a new filter
          const stored = JSON.parse(retrievedObject);
          
          if(stored.siglas !== filterValuesOld.siglas ||
            stored.nombre !== filterValuesOld.nombre ||
            stored.fechaInicioDesde !== filterValuesOld.fechaInicioDesde ||
            stored.fechaInicioHasta !== filterValuesOld.fechaInicioHasta ||
            stored.fechaFinDesde !== filterValuesOld.fechaFinDesde ||
            stored.fechaFinHasta !== filterValuesOld.fechaFinHasta ||
            stored.presupuestoHabilitado !== filterValuesOld.presupuestoHabilitado){
            
            localStorage.removeItem('congresofilterValues');
            
          }
            
          this.filter = stored;

        }
      
          this.loading = true;
          
          this.$repos.congreso.list({
            ...this.pagination,
            ...this.filter
          })
          .then((res) =>{
            this.list = res.data;
            this.total = res.totalItems;
          })
          .catch((err) => {
              console.log(err);
              this.list = [];
            })
          .finally(() =>{
            this.loading = false;
          });    	  
      },

    editItem (item) {
    
        // toma los valores de los filtros y los guardas en localStorage
      const filterValues = this.getFilterValues();
      this.saveLocalStorage('congresofilterValues', filterValues);
    
      this.$router.push({ 
        name: 'congreso-id', 
        params: { 
          'id': item.id,
          'filtros':this.filter,       // paso filtros a un item particular,
          'pagination':this.pagination,
          'readonly': this.isReadonly
        } 
      })        
    },

    deleteItem (item) {
        this.$refs.dialog.open({
          title:'Eliminar',
          text: 'Desea eliminar el Congreso '+item.nombre+'?'
        })
        .then((res) => {
          if (res){
            this.loading = true;
            this.$repos.congreso.delete(item.id
            )
            .then((res) =>{
              this.$toast.success('Congreso ' + item.nombre + ' eliminado.');
            })
            .catch(err => {
              console.log(err.response.data);
              this.$toast.error(err.response.data);
            })
            .finally(() =>{
              this.loading = false;
              this.search();
            });        	  
          }
        });     
      },
        
      addItem() {
        this.$router.push({name: 'congreso-add'});
      },
    
    exportar(){
        this.loading = true;
          
        this.$repos.congreso.export(this.filter)
        .then((res) =>{
        	  console.log("***res:",res);
        	  const url = window.URL.createObjectURL(new Blob([res]));
        	  const link = document.createElement('a');
        	  link.href = url;
        	  link.setAttribute('download', 'Reporte Congresos.xlsx');
        	  document.body.appendChild(link);
        	  link.click();
        })
        .finally(() =>{
          this.loading = false;
        });    	  
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
	      'siglas': this.filter.siglas,
	      'nombre': this.filter.nombre,
	      'fechaInicioDesde': this.filter.fechaInicioDesde,
	      'fechaInicioHasta': this.filter.fechaInicioHasta,
	      'fechaFinDesde': this.filter.fechaFinDesde,
	      'fechaFinHasta': this.filter.fechaFinHasta, 
	      'presupuestoHabilitado': this.filter.presupuestoHabilitado              
		  }
	  },

    getDescripcionProesupuesto(value){
      switch(value){
			case 'MARKETING':
				return 'MARKETING';
			case 'COMBINADO':
				return 'COMBINADO';
      default:
        return 'DELEGADO';

			}
    },
    isRO(){
        this.$repos.congreso.isReadonly()
        .then(res => {
          console.log("isReadonly:", res.data);
          this.isReadonly = res.data;
        })
        .catch(err => {
        this.$toast.error(err.response.data)
        })
        .finally(() => {
            this.loading = false;
        });	
    }
      
	},
  }
</script>