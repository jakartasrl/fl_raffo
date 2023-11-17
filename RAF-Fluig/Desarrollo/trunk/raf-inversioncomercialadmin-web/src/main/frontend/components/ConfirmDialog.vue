<template>
    <v-dialog
      v-model="dialog"
      :max-width="width"
    >
  <v-card
    class="mx-auto"
    :loading="loading"
  >
    <v-card-title class="headline">
      {{title}}
    </v-card-title>
    <v-card-text>
      <v-icon v-if="icon" large color="orange darken-2">{{icon}}</v-icon>
      {{text}}
    </v-card-text>
    
    <v-divider></v-divider>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        color="primary"
        text
        @click="close(true)"
      >
        Aceptar
      </v-btn>
      <v-btn
        color="secondary"
        text
        @click="close(false)"
      >
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: [],
  
  data: () => ({
	loading: false,
	dialog: false,
	
	width: 350,
    title: 'Mensaje',
	text: '',
	icon: 'mdi-alert',
	
	resolve: null,
	
  }),
  
  methods: {
	  
    close(result){
      this.dialog = false;
      this.resolve && this.resolve(result);
	},
	  
	open(params){
	  
	  if(params){
	    Object.assign(this.$data, this.$data, params);
	  }
      this.dialog = true;
      
	  return new Promise((resolve)=> {
		  this.resolve = resolve;
	  })
	}
	
	
  }
  
}
</script>
