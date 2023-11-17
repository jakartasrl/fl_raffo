<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Inversión Comercial</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Datos de la Inversión</v-stepper-step>
      <v-divider></v-divider>
	  <v-stepper-step :complete="e1 > 3" step="3">Importe y Forma de Pago</v-stepper-step>
      <v-divider></v-divider>
	  <v-stepper-step :complete="e1 > 4" step="4">Tabla de Imputaciones</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="5">Motivo de Rechazo</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
		<v-stepper-content step="1">
		<v-spacer></v-spacer>
		<v-btn color="primary" @click="e1 = 2"> Siguiente </v-btn>
		<v-spacer></v-spacer>
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
			</v-col>
			<v-col>
				<v-col 
				  cols="12" sm="6" md="12"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="estado"
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
			 </v-col>
			 </v-row>
			 <v-row>
				<v-card-title>PRESUPUESTO SELECCIONADO </v-card-title>
			 </v-row>
			 <v-row> 
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.incluyeAlojamiento"
						label="Incluye Alojamiento"
						readonly
					></v-text-field>
					</v-col>
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.seleccionAlojamientoPresupuesto"
						label="Presupuesto"
						readonly
					></v-text-field>
					</v-col>
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.incluyeTraslado"
						label="Incluye Medio de Transporte"
						readonly
					></v-text-field>
					</v-col>
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.seleccionTrasladoPresupuesto"
						label="Presupuesto"
						readonly
					></v-text-field>
					</v-col>
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.incluyeInscripcion"
						label="Incluye Inscripción"
						readonly
					></v-text-field>
					</v-col>
					<v-col
					cols="12" sm="6" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.seleccionInscripcionoPresupuesto"
						label="Presupuesto"
						readonly
					></v-text-field>
					</v-col>
			</v-row>
			 <v-spacer></v-spacer>
			 <v-row>
				<v-col 
					cols="6" sm="3" md="6"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.nombreCongreso"
					label="Evento"
					readonly
					></v-text-field>
				</v-col>  
				<v-col 
					cols="6" sm="3" md="6"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
					v-model="entity.web"
					label="Sitio Web del Evento"
					readonly
					></v-text-field>
				</v-col>  
			</v-row>
			<v-row>
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
				<v-card-title>MONTO DE INVERSIÓN </v-card-title>
			 </v-row>
			 <v-row>
			 	<v-col 
					cols="12" sm="1" md="2"
					class="mt-0 pt-0 mb-0 pb-0">
					<v-text-field
						v-model="entity.montoInversion"
						label="Monto (ARS)"
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

		<v-stepper-content step="2">
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="e1 = 3">Siguiente</v-btn>
			<v-btn text @click="e1 = 1">Volver</v-btn>
			<v-spacer></v-spacer>
			<v-row>
				<v-col v-if="entity.tipoInversion === 'alojamientos'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.ciudad"
					label="Ciudad"
					readonly
				  ></v-text-field>
				</v-col>
				
				<v-col 
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.nombre"
					label="Nombre"
					readonly
				  ></v-text-field>
				</v-col> 
				
				<v-col 
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.apellido"
					label="Apellido"
					readonly
				  ></v-text-field>
				</v-col>   
				
				<v-col 
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.cuit"
					label="CUIT"
					readonly
				  ></v-text-field>
				</v-col>
			
				<v-col v-if="entity.tipoInversion === 'alojamientos'|| entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'equipamientos' || entity.tipoInversion === 'patrocinio'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.dni"
					label="DNI"
					readonly
				  ></v-text-field>
				</v-col>               
			
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.tipoDocumento"
					label="Tipo Documento"
					readonly
				  ></v-text-field>
				</v-col>
				
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.numeroDocumento"
					label="Nro. Documento"
					readonly
				  ></v-text-field>
				</v-col>  
					  
				<v-col v-if="entity.tipoInversion === 'aereosInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.numeroPasaporte"
					label="Nro. Pasaporte"
					readonly
				  ></v-text-field>
				</v-col>       
				 
				<v-col v-if="entity.tipoInversion === 'aereosInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="fechaVtoPasaporte"
					label="Fecha Vto Pasaporte"
					readonly
					prepend-icon="mdi-calendar"
				  ></v-text-field>
				</v-col> 
			
				<v-col v-if="entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="fechaNacimiento"
					label="Fecha Nacimiento"
					readonly
					prepend-icon="mdi-calendar"
				  ></v-text-field>
				</v-col> 
				
				<v-col v-if="entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.nacionalidad"
					label="Nacionalidad"
					readonly
				  ></v-text-field>
				</v-col> 
     
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.sexo"
					label="Sexo"
					readonly
				  ></v-text-field>
				</v-col> 
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.domicilio"
					label="Domicilio"
					readonly
				  ></v-text-field>
				</v-col>
         

			   <v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.localidad"
					label="Localidad"
					readonly
				  ></v-text-field>
				</v-col>        
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.provincia"
					label="Provincia"
					readonly
				  ></v-text-field>
				</v-col>   
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.pais"
					label="País"
					readonly
				  ></v-text-field>
				</v-col>        
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.codigoPostal"
					label="Código Postal"
					readonly
				  ></v-text-field>
				</v-col> 

				<v-col v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.telefonoContacto"
					label="Teléfono Contacto"
					readonly
					prepend-icon="mdi-phone"
				  ></v-text-field>
				</v-col>        
				 <v-col v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt' || entity.tipoInversion === 'patrocinio'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.celular"
					label="Celular"
					readonly
					prepend-icon="mdi-cellphone-iphone"
				  ></v-text-field>
				</v-col>   
				<v-col v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt' || entity.tipoInversion === 'patrocinio'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.mailContacto"
					label="Mail Contacto"
					readonly
					prepend-icon="mdi-email-outline"
				  ></v-text-field>
				</v-col>        
				 <v-col v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt' || entity.tipoInversion === 'patrocinio'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.especialidadProfesional"
					label="Especialidad Profesional"
					readonly
				  ></v-text-field>
				</v-col>        


				<v-col v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.motivoViaje"
					label="Motivo Viaje"
					readonly
				  ></v-text-field>
				</v-col>
				
			</v-row>
			<v-row v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"> 
				 
	  				<v-card-title>DATOS DEL MÉDICO </v-card-title>
	  			
 			</v-row>
			<v-row>
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.tituloGrado"
					label="Título de Grado"
					readonly
				  ></v-text-field>
				</v-col>  
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.institucionDondeObtuvo"
					label="Institución Donde Obtuvo"
					readonly
				  ></v-text-field>
				</v-col>
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.anioEgreso"
					label="Año Egreso"
					readonly
				  ></v-text-field>
				</v-col> 
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.matricula"
					label="Matrícula"
					readonly
				  ></v-text-field>
				</v-col>

				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.institucionQueTrabaja"
					label="Institución Que Trabaja"
					readonly
				  ></v-text-field>
				</v-col> 
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.cargoPosicion"
					label="Cargo/Posición"
					readonly
				  ></v-text-field>
				</v-col>
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.tipoInscripcion"
					label="Tipo Inscripción"
					readonly
				  ></v-text-field>
				</v-col>        
				<v-col v-if="entity.tipoInversion === 'inscripciones'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.nombreSociedad"
					label="Nombre Sociedad"
					readonly
				  ></v-text-field>
				</v-col>        
				<v-col v-if="entity.tipoInversion === 'inscripciones'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.numeroSocio"
					label="Nro. Socio"
					readonly
				  ></v-text-field>
				</v-col> 
				<v-col v-if="entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'"
				  cols="12" sm="6" md="3"
				  class="mt-0 pt-0 mb-0 pb-0">
				  <v-text-field
					v-model="entity.membresia"
					label="Membresía"
					readonly
				  ></v-text-field>
				</v-col>        
		</v-row>
		<!--Secciones -->
		<v-row style="margin-left: 10px;">
		  <div v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'inscripciones' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'" style="margin-right: 10px;">
			<v-card class="mx-auto" max-width="344" outlined>
				<v-list-item three-line>
				  <v-list-item-content>
					<v-list-item-title class="headline mb-1">Congreso – Inscripción</v-list-item-title>
						<v-spacer></v-spacer>
						<v-col>
							<v-col
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.nombreCongreso"
								label="Nombre"
								readonly
							  ></v-text-field>
							</v-col> 
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.lugarCongreso"
								label="Lugar"
								readonly
							  ></v-text-field>
							</v-col>        
							 <v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="fechaDesdeCongreso"
								label="Fecha Desde"
								readonly
								prepend-icon="mdi-calendar"
							  ></v-text-field>
							</v-col>          
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="fechaHastaCongreso"
								label="Fecha Hasta"
								readonly
								prepend-icon="mdi-calendar"
							  ></v-text-field>
							</v-col> 
						</v-col>					
				  </v-list-item-content>
				</v-list-item>
			</v-card>
		 </div>
		 <div v-if="entity.tipoInversion === 'alojamientos' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'" style="margin-right: 10px;">
			<v-card class="mx-auto" max-width="688" outlined>
				<v-list-item three-line>
				  <v-list-item-content>
					<v-list-item-title class="headline mb-1">Alojamiento Congreso – Hotel</v-list-item-title>
						<v-spacer></v-spacer>
						<v-row>
							<v-col>
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.nombreHotel"
									label="Hotel"
									readonly
								  ></v-text-field>
								</v-col> 
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.contactoHotel"
									label="Contacto"
									readonly
								  ></v-text-field>
								</v-col>        
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.telefonoHotel"
									label="Teléfono"
									readonly
									prepend-icon="mdi-phone"
								  ></v-text-field>
								</v-col>         
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.checkinHotel"
									label="Check-in"
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
									v-model="entity.tipoHabitacion"
									label="Tipo Habitación"
									readonly
								  ></v-text-field>
								</v-col>
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.cantidadNoche"
									label="Cantidad de Noches"
									readonly
								  ></v-text-field>
								</v-col>  
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.cochera"
									label="Cochera"
									readonly
								  ></v-text-field>
								</v-col>        
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.checkoutHotel"
									label="Check-out"
									readonly
									prepend-icon="mdi-calendar"
								  ></v-text-field>
								</v-col>  
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.comparteHabitacion"
									label="Comparte Habitación"
									readonly
								  ></v-text-field>
								</v-col> 
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.nombreMedico1"
									label="Nombre del Médico Acompañante"
									readonly
								  ></v-text-field>
								</v-col> 
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.contactoMedico1"
									label="Contacto Acompañante"
									readonly
								  ></v-text-field>
								</v-col> 
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.nombreMedico2"
									label="Nombre del Médico Acompañante"
									readonly
								  ></v-text-field>
								</v-col> 
								<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.contactoMedico2"
									label="Contacto Acompañante"
									readonly
								  ></v-text-field>
								</v-col>
							</v-col>
						</v-row>
						<v-row>
							<v-col 
								  cols="12" sm="6" md="12"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.comentariosAlojamiento"
									label="Comentarios"
									readonly
								  ></v-text-field>
								</v-col> 
						</v-row>
				  </v-list-item-content>
				</v-list-item>
			</v-card>
		  </div>
		  <div v-if="entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'" style="margin-right: 10px;">
			<v-card class="mx-auto" max-width="344" outlined>
				<v-list-item three-line>
				  <v-list-item-content>
					<v-list-item-title class="headline mb-1">Congreso – Ida</v-list-item-title>
						<v-spacer></v-spacer>
						<v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0" > 
							  <v-textarea
								v-model="entity.itinerarioIda"
								label="Itinerario"
								filled
								no-resize
								rows="5"
								counter="1000"
								readonly
								overflow-y: scroll
								>
							  </v-textarea>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="fechaIda"
								label="Fecha"
								readonly
								prepend-icon="mdi-calendar"
							  ></v-text-field>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.nroVueloIda"
								label="Nro. Vuelo"
								readonly
								prepend-icon="mdi-airplane"
							  ></v-text-field>
							</v-col>  
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.horaSalidaIda"
								label="Hora Salida"
								readonly
								prepend-icon="mdi-clock-outline"
							  ></v-text-field>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.tipoTrasladoIda"
								label="Tipo de Traslado"
								readonly
								prepend-icon="mdi-clock-outline"
							  ></v-text-field>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0" > 
							  <v-textarea
								v-model="entity.comentariosIda"
								label="Comentarios"
								filled
								no-resize
								rows="5"
								counter="1000"
								readonly
								overflow-y: scroll
								>
							  </v-textarea>
							</v-col>
						</v-col>					
				  </v-list-item-content>
				</v-list-item>
			</v-card>
		  </div>
		  <div v-if="entity.tipoInversion === 'aereosNac' || entity.tipoInversion === 'aereosInt' || entity.tipoInversion === 'becaNac' || entity.tipoInversion === 'becaInt'" style="margin-right: 10px;">
			<v-card class="mx-auto" max-width="344" outlined>
				<v-list-item three-line>
				  <v-list-item-content>
					<v-list-item-title class="headline mb-1">Congreso – Regreso</v-list-item-title>
						<v-spacer></v-spacer>
						<v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0" > 
							  <v-textarea
								v-model="entity.itinerarioRegreso"
								label="Itinerario"
								filled
								no-resize
								rows="5"
								counter="1000"
								readonly
								overflow-y: scroll
								>
							  </v-textarea>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="fechaRegreso"
								label="Fecha"
								readonly
								prepend-icon="mdi-calendar"
							  ></v-text-field>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.nroVueloRegreso"
								label="Nro. Vuelo"
								readonly
								prepend-icon="mdi-airplane" 
							  ></v-text-field> 
							</v-col>  
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.horaSalidaRegreso"
								label="Hora Salida"
								readonly
								prepend-icon="mdi-clock-outline"
							  ></v-text-field>
							</v-col> 
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0">
							  <v-text-field
								v-model="entity.tipoTrasladoRegreso"
								label="Tipo de Traslado"
								readonly
								prepend-icon="mdi-clock-outline"
							  ></v-text-field>
							</v-col>
							<v-col 
							  cols="12" sm="6" md="12"
							  class="mt-0 pt-0 mb-0 pb-0" > 
							  <v-textarea
								v-model="entity.comentariosRegreso"
								label="Comentarios"
								filled
								no-resize
								rows="5"
								counter="1000"
								readonly
								overflow-y: scroll
								>
							  </v-textarea>
							</v-col>
						</v-col>					
				  </v-list-item-content>
				</v-list-item>
			</v-card>
		  </div>
		</v-row>	
			
			
				<div v-if="entity.tipoInversion === 'equipamientos'">  
				  <v-row>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0" > 
					  <v-textarea
						v-model="entity.equipamiento"
						filled
						no-resize
						label="Equipamiento"
						rows="5"
						counter="1000"
						readonly
						>
					  </v-textarea>
					</v-col>
				  </v-row>
				</div>
				<div v-if="entity.tipoInversion === 'patrocinio'">  
				  <v-row>
					<v-col 
					  cols="12" sm="6" md="12"
					  class="mt-0 pt-0 mb-0 pb-0" > 
					  <v-textarea
						v-model="entity.equipamiento"
						filled
						no-resize
						label="Detalle"
						rows="5"
						counter="1000"
						readonly
						>
					  </v-textarea>
					</v-col>
				  </v-row>
				</div>
			<v-spacer></v-spacer>	
		</v-stepper-content>
		
		<v-stepper-content step="3" style="min-height: 300px;">
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="e1 = 4">Siguiente </v-btn>
				<v-btn text @click="e1 = 1">Volver</v-btn>
				<v-spacer></v-spacer>
				<v-row>
					<v-col>
						<v-col>
							<v-row>
								<v-col 
								  cols="12" sm="6" md="3"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="entity.moneda"
									label="Moneda"
									readonly
								  ></v-text-field>
								</v-col>
								<v-col
								  cols="12" sm="6" md="9"
								  class="mt-0 pt-0 mb-0 pb-0">
								  <v-text-field
									v-model="importe"
									label="Importe"
									readonly
								  ></v-text-field>
								</v-col> 
							</v-row>	
						</v-col>					
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="importeARS"
							label="Importe (ARS)"
							readonly
							prepend-icon="mdi-currency-usd-circle"
						  ></v-text-field>
						</v-col> 	        
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="importeUSD"
							 label="Importe (USD)"
							readonly
							prepend-icon="mdi-currency-usd-circle-outline"
						  ></v-text-field>
						</v-col> 	
					</v-col>
					<v-col>
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="tipoCambioARS"
							 label="Tipo Cambio (ARS)"
							readonly
							prepend-icon="mdi-currency-usd-circle"
						  ></v-text-field>
						</v-col> 		    
						<v-col 
						  cols="12" sm="6" md="12"
						  class="mt-0 pt-0 mb-0 pb-0">
						  <v-text-field
							v-model="tipoCambioUSD"
							 label="Tipo Cambio (USD)"
							readonly
							prepend-icon="mdi-currency-usd-circle-outline"
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
					</v-col>
				</v-row>
				<v-spacer></v-spacer>
        </v-stepper-content>
		
		<v-stepper-content step="4" style="min-height: 300px;">
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="e1 = 5">Siguiente </v-btn>
			<v-btn text @click="e1 = 1">Volver</v-btn>
			<v-spacer></v-spacer>
			
			  <v-card-title>Imputaciones</v-card-title>
			  <v-card-text>
				  <imputacion-form :listaImputaciones="imputaciones"></imputacion-form>
			  </v-card-text>
			<v-spacer></v-spacer>
       </v-stepper-content>

		<v-stepper-content step="5" style="min-height: 300px;">
			<v-spacer></v-spacer>
			<v-btn color="primary" @click="e1 = 1">Siguiente</v-btn>
			<v-btn text @click="e1 = 1">Volver</v-btn>
			<v-spacer></v-spacer>
			<v-row>
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
			<v-spacer></v-spacer>
		</v-stepper-content>
    </v-stepper-items>
  </v-stepper>


</template>

<script>
import ImputacionForm from '~/components/forms/ImputacionForm.vue';

export default {
    name: 'ReporteInversionComercialForm',
    components: { ImputacionForm },
    props: ['entity', 'readonly', 'imputaciones'],
    
	data() {
    	return {
			tabs: null,
			items:['Imputaciones'],
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
			e1: 1,
		};
  	},
    
    computed: {
    	  fechaSolicitud(){
    	 	return this.formatDateTime(this.entity.fechaSolicitud)
	      },
	      fechaVtoPasaporte(){
    	 	return this.formatDateTime(this.entity.fechaVtoPasaporte)
	      },
	      fechaNacimiento(){
    	 	return this.formatDateTime(this.entity.fechaNacimiento)
	      },
	      fechaDesdeCongreso(){
    	 	return this.formatDateTime(this.entity.fechaDesdeCongreso)
	      },
	      fechaHastaCongreso(){
    	 	return this.formatDateTime(this.entity.fechaHastaCongreso)
	      },
	      fechaIda(){
    	 	return this.formatDateTime(this.entity.fechaIda)
	      },
	      fechaRegreso(){
    	 	return this.formatDateTime(this.entity.fechaRegreso)
	      },
	      getTipoInversion(){
    	 	return this.getDescripcionTipoInversion(this.entity.tipoInversion)
	      },
	      importe(){
      	    return this.formatPrice(this.entity.importe)
 	 	  },
 	 	  importeARS(){
      	    return this.formatPrice(this.entity.importeARS)
 	 	  },
	      importeUSD(){
      	    return this.formatPrice(this.entity.importeUSD)
 	 	  },
 	 	  tipoCambioARS(){
      	    return this.formatPriceTipoCambio(this.entity.tipoCambioARS)
 	 	  },
 	 	  tipoCambioUSD(){
      	    return this.formatPriceTipoCambio(this.entity.tipoCambioUSD)
 	 	  },
	      estado(){
			if(this.entity.estado === 'PENDIENTE'){
				return 'PENDIENTE'; 
			}if(this.entity.estado === 'APROBADA'){
				return 'APROBADA'; 
			}if(this.entity.estado === 'RECHAZADA'){
				return 'RECHAZADA'; 
			}if(this.entity.estado === 'CARTA_ACUERDO_RECHAZADA'){
				return 'CA RECHAZADA'; 
			}if(this.entity.estado === 'FINALIZADA'){
				return 'FINALIZADA'; 
			}if(this.entity.estado === 'BAJA_MEDICO'){
				return 'BAJA MEDICO'; 
			}else{
				return 'CANCELADA';   
		    }
		  },
	      
    },
    
    methods: {
      formatDateTime(value){
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
	  formatPriceTipoCambio(value) {
	       if (value){
	        	const val = (value/1).toFixed(3).replace('.', ',');
	       		return val;
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