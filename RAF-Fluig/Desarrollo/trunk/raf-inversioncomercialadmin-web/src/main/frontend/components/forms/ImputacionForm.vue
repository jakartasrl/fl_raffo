<template>
        <v-data-table
          :headers="headers"
          :items="listaImputaciones"
          :options.sync="pagination"
          :server-items-length="total"
          :loading="loading"
          loading-text="Cargando... por favor aguarde"
          class="elevation-3"
        >
        
	<template v-slot:item.porcentaje="{ item }">
		{{formatPrice(item.porcentaje)}}
	</template>
	
    <template v-slot:item.presupuestoARS="{ item }">
		{{formatPrice(item.presupuestoARS)}}
	</template>
	
	<template v-slot:item.consumidoARS="{ item }">
		{{formatPrice(item.consumidoARS)}}
	</template>
        </v-data-table>
</template>
<script>
export default {
	name: 'ImputacionForm',
	props: ['listaImputaciones'],
	data:() => ({
		dialogNewItem: false,
		loading: false,
		headers: [
		  { text: 'Código de Producto', value: 'codigoProducto', sortable: true },
		  { text: 'Producto', value: 'producto', sortable: false },
		  { text: 'Porcentaje', value: 'porcentaje', sortable: false },
		  { text: '', value: 'action', sortable: false },
		],
		entity: {},
		valid: false,
		editedIndex: -1,
		defaultItem: {
		  id:null,
		  producto: '',
		  porcentaje:null,
		  presupuestoARS:null,
		  consumidoARS:null
		},
	}),
	
  methods:{
  
  	formatPrice(value) {
       if (value){
        const val = (value/1).toFixed(2).replace('.', ',');
       	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       }
	},
  },

}
</script>