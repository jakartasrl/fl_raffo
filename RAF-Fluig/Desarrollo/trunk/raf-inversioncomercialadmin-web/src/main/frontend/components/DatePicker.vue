<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
    :disabled="disabledMenu"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="field"
        v-model="dateFormatted"
        :label="label"
        prepend-icon="mdi-calendar"
        :clearable="!disabled && !disabledMenu"
        @click:prepend="menu = true"
        :dense="dense"
        :rules="rules"
        v-on="on"
        :key="randomNumber"
        :disabled="disabled"
        v-mask="'##-##-####'"
        :hint="hint"
        persistent-hint
        :error='error'
        :error-messages='errorMessages'
      >
        <template v-slot:prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-slot:append>
          <slot name="append"></slot>
        </template>
      </v-text-field>
    </template>
    <v-date-picker 
      class="ma-0" 
      v-bind:value="value" 
      @input="$emit('input', $event); menu=false" 
      locale="es"
      :max="max"
      :min="min"
      :disabled="disabled"
      no-title
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
  name: 'DatePicker',
  directives: {
    mask
  }, 
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    dense: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    disabledMenu: {
      default: false,
      type: Boolean
    },
    rules: {
      type: Array,
      default: () => []
    },
    min: {
      default: undefined,
      type: String
    },
    max: {
      default: undefined,
      type: String
    },
    hint: {
      type: String
    },
    error: {
      default: false,
      type: Boolean
    },
    errorMessages: {
	  type: String
    },
  },
  data: () => ({
    menu: false,
    randomNumber: Math.random()
  }),
  watch:{
    value(){
      this.$emit('change')
    } 
  },
  methods: {
    validate() {
      this.$refs.field.validate();
    }
  },
  computed: {
    dateFormatted: {
      get() {
        return this.value ? this.$moment(this.value).format('DD-MM-YYYY') : '';
      },
      set(newValue) {
      	if(newValue){
      	  if (this.$moment(newValue,'DD-MM-YYYY',true).isValid()) {
	          
	          const fecha = newValue.split('-')
	          newValue = fecha[2] + '-' + fecha[1] + '-' + fecha[0];

	          this.$emit('input', newValue);
	      }
      	}else{
		  this.$emit('input', newValue);
      	}
      }
    }
  }
};
</script>
