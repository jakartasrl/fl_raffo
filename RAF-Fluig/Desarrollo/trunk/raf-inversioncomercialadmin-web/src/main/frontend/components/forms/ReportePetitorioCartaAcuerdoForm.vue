<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Petitorio y Carta Acuerdo</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Datos del Petitorio y Carta Acuerdo</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Motivo de Rechazo</v-stepper-step>
    </v-stepper-header>
    
    <v-stepper-items>
    	<v-stepper-content step="1">
    		<v-btn color="primary" @click="e1 = 2"> Siguiente </v-btn>
			 <v-row>
		    	<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.numeroSolicitud"
						label="Nro. Solicitud"
						readonly
					  ></v-text-field>
					</v-col>	
					 <v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="fechaSolicitud"
						label="Fecha Solicitud"
						readonly
						prepend-icon="mdi-calendar"
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.tarea"
						label="Tarea"
						readonly
					  ></v-text-field>
					</v-col> 
				</v-col>
				<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.solicitante"
						label="Solicitante"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.mailSolicitante"
						label="Email Solicitante"
						readonly
						prepend-icon="mdi-email-outline"
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.estado"
						label="Estado"
						readonly
					  ></v-text-field>
					</v-col> 
					
				</v-col>
				
				<v-col>

					<v-col v-if="entity.esGteDistrito"
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.area"
						label="Área"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.lineaRegion"
						label="Línea/Región"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.nombreAPM"
						label="APM"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col v-if="!entity.esGteDistrito" 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.grupoGteMKT"
						label="Grupo Gte MKT"
						readonly
					  ></v-text-field>
					</v-col>
				</v-col>
	    	 </v-row>
		</v-stepper-content>
		
		<v-stepper-content step="2">
			<v-spacer></v-spacer>	
			<v-btn color="primary" @click="e1 = 3">Siguiente</v-btn>
			<v-btn text @click="e1 = 1">Volver</v-btn>
			<v-spacer></v-spacer>	
			<v-row>
				<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="fecha"
						label="Fecha"
						readonly
						prepend-icon="mdi-calendar"
					  ></v-text-field>
					</v-col>
					<v-col 
					 cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.nombre"
						label="Nombre"
						readonly
					  ></v-text-field>
					</v-col> 
					<v-col 
					 cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.apellido"
						label="Apellido"
						readonly
					  ></v-text-field>
					</v-col>
				</v-col>	
				<v-col> 
						<v-col 
						  cols="12" sm="6" md="12"
					      class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="entity.tipoInversion"
							label="Tipo de Inversión"
							readonly
							prepend-icon="mdi-credit-card-outline"
						  ></v-text-field>
						</v-col>  
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="mesInversion"
							label="Mes de la Inversión"
							readonly
							prepend-icon="mdi-calendar"
						  ></v-text-field>
						</v-col>
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0" > 
						  <v-textarea
							v-model="entity.detalleInversion"
							filled
							no-resize
							label="Detalle de la Inversión"
							rows="5"
							counter="4000"
							readonly
							>
						  </v-textarea>
						</v-col>
					</v-col> 
					
				<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
				      class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.tipoProducto"
						label="Tipo de Producto"
						readonly
						prepend-icon="mdi-credit-card-outline"
					  ></v-text-field>
					</v-col> 
				</v-col>
			</v-row>
			<v-spacer></v-spacer>	
		</v-stepper-content>	
        
 		<v-stepper-content step="3" style="min-height: 300px;">
 			<v-spacer></v-spacer>
 			<v-btn color="primary" @click="e1 = 1">Siguiente</v-btn>
			<v-btn text @click="e1 = 1">Volver</v-btn>
 			<v-spacer></v-spacer>
			<v-row>
				<v-spacer></v-spacer>
				<v-col 
				  cols="12" sm="6" md="12"
				  class="mt-0 pt-0 mb-0 pb-0" > 
				  <v-textarea
					v-model="entity.motivoRechazo"
					filled
					no-resize
					label="Motivo de Rechazo"
					rows="5"
					counter="4000"
					readonly
					>
				  </v-textarea>
				</v-col>
			</v-row> 
		</v-stepper-content>
            
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
    name: 'ReportePetitorioCartaAcuerdoForm',
    components: { },
    props: ['entity', 'readonly'],
    
	data: () => ({
	e1: 1,
    estados:[
			{text:'PENDIENTE', value:'PENDIENTE'},
			{text:'APROBADA', value:'APROBADA'},
			{text:'RECHAZADA', value:'RECHAZADA'},
			{text:'CANCELADA', value:'CANCELADA'}
	 ],
    }),
    
    computed: {
    	  fechaSolicitud(){
    	 	return this.formatDateTime(this.entity.fechaSolicitud)
	      },
	      fecha(){
    	 	return this.formatDateTime(this.entity.fecha)
	      },
	      mesInversion(){
    	 	return this.formatDateTimeShort(this.entity.mesInversion)
	      },
    },
    
    methods: {
      formatDateTime(value){
        if (value){
          return this.$moment(value).format('DD-MM-YYYY');
        }
      },
      formatDateTimeShort(value){
        if (value){
          return this.$moment(value).format('MM-YYYY');
        }
      },
   	
    },
  }
</script>