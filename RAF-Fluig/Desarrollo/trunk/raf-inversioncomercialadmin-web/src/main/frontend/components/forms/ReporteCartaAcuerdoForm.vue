<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Carta Acuerdo</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Datos de Carta Acuerdo</v-stepper-step>
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
						v-model="fechaFinSolicitud"
						label="Fecha Fin Solicitud"
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
						v-model="entity.areaDescripcion"
						label="Área"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.distritoDescripcion"
						label="Distrito"
						readonly
					  ></v-text-field>
					</v-col>
				</v-col>
				<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.nombreAPM"
						label="APM"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.emailAPM"
						label="Email"
						readonly
						prepend-icon="mdi-email-outline"
					  ></v-text-field>
					</v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.gteDistrito"
						label="Gte. Distrito"
						readonly
					  ></v-text-field>
					</v-col>
				</v-col>
				<v-col>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					  <v-text-field
						v-model="entity.estado"
						label="Estado"
						readonly
					  ></v-text-field>
					</v-col> 
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					 <v-text-field
						v-model="getTipoInversion"
						label="Tipo de Inversión"
						readonly
					  ></v-text-field>
					</v-col>
					<v-col  v-if="entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0">
					 <v-text-field
						v-model="entity.nombreCongreso"
						label="Congreso"
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
						v-model="entity.nroInversionComercial"
						label="Nro. de Patrocinio"
						readonly
					  ></v-text-field>
					</v-col>
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
				</v-col>	
				<v-col>
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
							v-model="entity.formaPago"
							label="Forma de Pago"
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
					</v-col> 
			</v-row>
			<v-row>
				<v-col 
					cols="12" sm="6" md="12"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.web"
					label="Sitio Web del Evento"
					readonly
					></v-text-field>
				</v-col>  
				<v-col 
					cols="12" sm="6" md="12"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.comentariosCongreso"
					label="Congreso Comentarios"
					readonly
					></v-text-field>
				</v-col>
			 </v-row>
			<v-row>
				<v-card-title>DOCUMENTOS </v-card-title>
			 </v-row>
			 <v-row>
				<v-col 
					cols="12" sm="6" md="12"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.cartaPetitorioDescripcion"
					label="Carta Petitorio"
					readonly
					></v-text-field>
				</v-col>  
				<v-col 
					cols="12" sm="6" md="12"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.cartaAcuerdoDescripcion"
					label="Carta Acuerdo"
					readonly
					></v-text-field>
				</v-col>
				<v-col 
					cols="12" sm="6" md="12"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.flyerDescripcion"
					label="Flyer"
					readonly
					></v-text-field>
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
					counter="1000"
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
    name: 'ReporteCartaAcuerdoForm',
    components: { },
    props: ['entity', 'readonly'],
    
	data: () => ({
	e1: 1,
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
    }),
    
    computed: {
    	  fechaSolicitud(){
    	 	return this.formatDateTime(this.entity.fechaSolicitud)
	      },
		  fechaFinSolicitud(){
    	 	return this.formatDateTime(this.entity.fechaFinSolicitud)
	      },
	      fecha(){
    	 	return this.formatDateTime(this.entity.fecha)
	      },
	      getTipoInversion(){
    	 	return this.getDescripcionTipoInversion(this.entity.tipoInversion)
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
   	
    },
  }
</script>