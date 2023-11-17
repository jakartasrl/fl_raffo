<template>
    <v-container fill-height>
      <v-layout column>
        <v-row>
        <v-col cols="2" class="mr-0">
            <v-text-field
                  v-if="value.id"
                  dense
                  label="Código"
                  :value="value.codigo"
                  @input="update('codigo', $event)"
                  :readonly="true"
                ></v-text-field>
        </v-col>
      </v-row> 
      <v-row>
        <v-col cols="8" class="mr-0">
            <v-text-field
                  dense
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  label="Siglas del Congreso"
                  maxlength="50"
                  :value="value.siglas"
                  @input="update('siglas', $event)"
                ></v-text-field>
        </v-col>
      </v-row>  
      <v-row>
        <v-col cols="8" class="mr-0">
            <v-text-field
                  dense
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  label="Nombre"
                  maxlength="255"
                  :rules="requiredField"
                  :value="value.nombre"
                  @input="update('nombre', $event)"
                ></v-text-field>
        </v-col>
      </v-row>  
      <v-row>
        <v-col cols="2" class="mr-0">
               <v-select 
                dense
                label="Nacional"
                :rules="requiredField" 
                :value="value.nacional"
                @input="update('nacional', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
                :readonly="viewMode"
               ></v-select>
        </v-col>
      </v-row>  

      <v-row>
        <v-col cols="6" class="mr-0">
              <country-field 
                dense
                label="País"
                :value="value.country"
                :nacional="value.nacional"
                @input="update('country', $event)"
                :disabled="value.nacional == null"
                :clearable="!viewMode"
                :readonly="viewMode"
              ></country-field>
        </v-col>
      </v-row> 
      <v-row>
        <v-col cols="6" class="mr-0">
            <state-field 
              dense
              label="Provincia"
              :clearable="!viewMode"
              :readonly="viewMode"
              :value="value.state"
              :country="value.country"
              @input="update('state', $event)"
              :disabled="value.nacional === null || !value.nacional"
            ></state-field>
        </v-col>
      </v-row> 
      <v-row>
        <v-col cols="6" class="mr-0">
            <v-text-field
                  dense
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  maxlength="100"
                  label="Localidad"
                  :value="value.localidad"
                  @input="update('localidad', $event)"
                ></v-text-field>
        </v-col>
      </v-row>  
      <v-row>
        <v-col cols="8" class="mr-0">
            <v-text-field
                  dense
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  maxlength="500"
                  label="Lugar del Evento"
                  :value="value.lugarEvento"
                  @input="update('lugarEvento', $event)"
                ></v-text-field>
        </v-col>
      </v-row>       

      <v-row>
        <v-col cols="3" class="mr-0">
          <date-picker
                class="mt-3 pt-2 mb-0 pb-0"
                dense
                label="Fecha Inicio del Evento"
                :disabled="viewMode"
                :rules="requiredField"
                :value="value.fechaInicio"
                @input="update('fechaInicio', $event)"
              ></date-picker>
        </v-col>
        <v-col cols="3" class="mr-0">
            <date-picker 
                class="mt-3 pt-2 mb-0 pb-0" 
                dense
                label="Fecha Fin del Evento" 
                :disabled="viewMode"
                :rules="dateRules"
                :value="value.fechaFin"
                @input="update('fechaFin', $event)"
              ></date-picker>
        </v-col>
        <v-col cols="2" class="mr-0">
            <v-text-field
                  dense
                  type="number" 
                  min="0"
                  label="Días Límite Carga"
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  :rules="requiredField"
                  :value="value.diasLimiteCarga"
                  @input="update('diasLimiteCarga', $event)"
                ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="3" class="mr-0">
          <date-picker
                class="mt-3 pt-2 mb-0 pb-0"
                dense
                label="Fecha Check-in"
                :disabled="viewMode"
                :value="value.fechaCheckin"
                @input="update('fechaCheckin', $event)"
              ></date-picker>
        </v-col>
        <v-col cols="3" class="mr-0">
            <date-picker 
                class="mt-2 pt-3 mb-0 pb-0" 
                dense
                label="Fecha Check-out" 
                :disabled="viewMode"
                :value="value.fechaCheckout"
                @input="update('fechaCheckout', $event)"
              ></date-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="mr-0">
            <v-autocomplete
                dense
                label="Presupuesto Habilitado"
                :readonly="viewMode"
                :rules="requiredField"
                :value="value.presupuestoHabilitado"
                @input="update('presupuestoHabilitado', $event)"
                :items="presupuestos"
              ></v-autocomplete>
        </v-col>
      </v-row> 
      
      <v-row>
        <v-col cols="6" class="mr-0">
            <v-text-field
                  dense
                  maxlength="4000"
                  label="Web"
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  :value="value.web"
                  @input="update('web', $event)"
                ></v-text-field>
        </v-col>
      </v-row>  

      <v-row>
        <v-col cols="6" class="mr-0">
            <v-text-field
                  dense
                  label="Metadata"
                  maxlength="200"
                  :clearable="!viewMode"
                  :readonly="viewMode"
                  :rules="requiredField"
                  :value="value.metadata"
                  @input="update('metadata', $event)"
                ></v-text-field>
        </v-col>
      </v-row>  

      <v-row>
        <v-col cols="2" class="mr-0">
            <v-select 
                dense 
                label="Habitación Simple"
                :readonly="viewMode"
                :value="value.habitacionSimple"
                @input="update('habitacionSimple', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
               ></v-select>
        </v-col>
        <v-col cols="2" class="mr-0">
            <v-select 
                dense 
                label="Habitación Doble"
                :readonly="viewMode"
                :value="value.habitacionDoble"
                @input="update('habitacionDoble', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
               ></v-select>
        </v-col>
        <v-col cols="2" class="mr-0">
            <v-select 
                dense 
                label="Habitación Triple"
                :readonly="viewMode"
                :value="value.habitacionTriple"
                @input="update('habitacionTriple', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
               ></v-select>
        </v-col>
      </v-row>  

      <v-row>
        <v-col cols="2" class="mr-0">
            <v-select 
                dense 
                label="Vuelo Directo"
                :readonly="viewMode"
                :value="value.vueloDirecto"
                @input="update('vueloDirecto', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
               ></v-select>
        </v-col>
        <v-col cols="2" class="mr-0">
            <v-select 
                dense 
                label="Vuelo Escalas"
                :readonly="viewMode"
                :value="value.vueloEscalas"
                @input="update('vueloEscalas', $event)"
                :items="[
                  {text:'SI', value: true}, 
                  {text:'NO', value: false}
                ]"
               ></v-select>
        </v-col>
      </v-row>  
         
      </v-layout>
       
    </v-container>
</template>

<script>
import CountryField from '~/components/CountryField.vue';
import StateField from '~/components/StateField.vue';
import DatePicker from "~/components/DatePicker.vue";
export default {
    name: 'CongresoForm',
    components: { DatePicker, CountryField, StateField },
    props: {
      viewMode: {
        default: false,
        type: Boolean,
      },
      value: {
        type: Object,
        default() {
          return {}
      },
    },
  },

  data() {
    return {
      presupuestos:[],
      requiredField: [(v) => !!v || v === 0 || v === false || "Campo obligatorio"],
      dateRules: [
        (v) =>  (this.fechasValidation)
        || 'La fecha de fin debe ser igual o posterior a la fecha de inicio',
	    ]
    }
  },
    
    computed: {
      fechasValidation(){
        return this.$moment(this.value.fechaFin).valueOf() >= this.$moment(this.value.fechaInicio).valueOf()
      },
    },
    
    watch: {
      "value.presupuestoHabilitado"(){

        if(!this.presupuestos.includes(this.value.presupuestoHabilitado)){
          this.presupuestos.push(this.value.presupuestoHabilitado);
        }

      },
      "value.nacional"(){
        let country = this.value.country? this.value.country : null
        let state = null

        if(this.value.nacional){
          country = {
            id: 1,
            code: 'AR',
            description: 'ARGENTINA'
          }

          state = this.value.state

        } else{
          state = null
        }

        this.$emit("input", {...this.value, country, state})
      },
      "value.fechaInicio"(){
        const fechaCheckin = this.value.fechaInicio? this.value.fechaInicio : null

        this.$emit("input", {...this.value, fechaCheckin})
      },
      "value.fechaFin"(){
        const fechaCheckout = this.value.fechaFin? this.value.fechaFin : null

        this.$emit("input", {...this.value, fechaCheckout})
      }
  },

  mounted() {
    this.cargarPresupuestos();
  },

  methods: {
    update(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
    
    cargarPresupuestos(){
      this.$axios
              .$get('/parametros/congreso/presupuestos')
              .then(response => {
                this.presupuestos = response.data;
              })
              .catch(err => { console.log(err) })
              .finally(() => (this.isLoading = false))
  },
  },
  }
</script>