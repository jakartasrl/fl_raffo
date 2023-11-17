<template>
    <v-container fill-height>
      <v-layout column>
      
        <v-flex xs12 md8>
          <v-combobox
            v-model="entity.descGrupoGteDist" 
            :items="listaGrupoGteDist()"
            :rules="descGrupoGteDistRules"
            label="Grupo Gte. Distrito"
            v-bind:disabled="disabled"
            @change="setGrupoCodigo"
          ></v-combobox>
        </v-flex>
        
        <v-flex xs12 md8>
          <v-text-field
            v-model="entity.codigoGrupoGteDist"
            :rules="codigoGrupoGteDistRules"
            label="Código Grupo Gte. Distrito"
            disabled
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 md8>
          <v-combobox
            v-model="entity.descripcionProducto"
            :items="listaProductos()"
            :rules="descripcionProductoRules"
            label="Producto"
            v-bind:disabled="disabled"
            @change="setProductoCodigo"
          ></v-combobox>
        </v-flex>
        
        <v-flex xs12 md8>
          <v-text-field
            v-model="entity.codigoProducto"
            :rules="codigoProductoRules"
            label="Código de Producto"
            disabled
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 md8>
          <v-text-field
            v-model="entity.anio"
            :rules="anioRules"
            label="Año"
            v-bind:disabled="disabled"
           ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
	      <v-text-field
	        v-model="entity.montoPresupuestado"
	        :rules="montoPresupuestadoRules"
	      	label="Monto Presupuestado (ARS)"
	        prepend-icon="mdi-currency-usd-circle"
	        type="number"
	      ></v-text-field>
	    </v-flex> 	
        
        <v-flex v-if="entity.id" xs12 md8>
          <v-text-field
            v-model="fechaAlta"
            label="Alta"
            disabled
          ></v-text-field>
        </v-flex>
        
        <v-flex v-if="entity.id" xs12 md8>
          <v-text-field
            v-model="fechaUltimaModificacion"
            label="Modificado"
            disabled
          ></v-text-field>
        </v-flex>	
            
      </v-layout>
       
    </v-container>
</template>

<script>
export default {
    name: 'PresupuestoForm',
    components: { },
    props: ['entity', 'disabled', 'productosDS', 'gruposGteDistritoDS'],
    
	data: () => ({
	    codigoGrupoGteDistRules: [
        (v) => !!v || 'Campo requerido',
	    ],
	    descGrupoGteDistRules: [
        (v) => !!v || 'Campo requerido',
	    ],
	    descripcionProductoRules: [
        (v) => !!v || 'Campo requerido',
	    ],
	    codigoProductoRules: [
        (v) => !!v || 'Campo requerido',
	    ],
	    anioRules: [
        (v) => !!v || 'Campo requerido',
	    ],
	    montoPresupuestadoRules: [
        (v) => !!v || 'Campo requerido',
	    ]    	 	
    }),
    
    computed: {
	 	  fechaAlta(){
	   	    return this.formatDateTime(this.entity.fechaAlta)
	      },
	      fechaUltimaModificacion() {
	        return this.formatDateTime(this.entity.fechaUltimaModificacion)  
	      },
	      // montoPresupuestado(){
      	  //  return this.formatPrice(this.entity.montoPresupuestado)
 	 	  // },
    },
    
    methods: {
      formatDateTime(value){
        if (value){
          return this.$moment(value).format('DD-MM-YYYY HH:mm:ss');
        }
      },
      formatPrice(value) {
        if (value){
         	const val = (value/1).toFixed(2).replace('.', ',');
        	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       	 }
	  },
	  listaProductos(){
      	if(this.productosDS)
      		return this.productosDS.map(req => {return {text: req.descripcionProducto,value: req.codigoProducto}});    
      },
      setProductoCodigo(rta){
	      if(rta != null){
	      	this.entity.codigoProducto = rta.value;
	      	this.entity.descripcionProducto = rta.text;
	      }
      },
      listaGrupoGteDist(){
      	if(this.gruposGteDistritoDS) 
      		return this.gruposGteDistritoDS.map(req => {return {text: req.descGrupoGteDist,value: req.codigoGrupoGteDist}});    
      },
      setGrupoCodigo(rta){
	      if(rta != null){
	      	this.entity.descGrupoGteDist = rta.text;
	      	this.entity.codigoGrupoGteDist = rta.value;
	      }
      },
 	
    },
  }
</script>