<template>
  <v-card>
  <v-card-title>
      <v-layout wrap>
        <v-flex xs6 sm4 md3>
          <v-icon left>mdi-view-list</v-icon>
          Imputación
        </v-flex>
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
      <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
  
  </v-card-text>
  
  <confirm-dialog ref="dialog"></confirm-dialog>
  
  </v-card>
</template>

<script>
import ConfirmDialog from '~/components/ConfirmDialog.vue';

export default {
  components: { ConfirmDialog },

  data: () => ({
	loading: false,
	  
	filter: {
		desde: null,
		hasta: null,
	},
	
	list: [],
	total: 0,
	
	pagination: {
        page: 1, 
        itemsPerPage: 15,
        sortBy: ['id'],
        sortDesc: [false]
    },
    
    headers: [
        { text: 'Id', value: 'id' },
        { text: 'Prod', value: 'producto', sortable: true },
        { text: '', value: 'action', sortable: true },
      ],		
    }),
    
    watch: {
    	pagination: {
          handler (val) {
            this.search();
          },
          deep: true,
        },
      },    

	mounted () {
    	if (!this.list || this.list.length === 0){
			this.search();
    	}
	},   
    
	methods: {
      
      search(){
        this.loading = true;
        
        this.$repos.imputacion.list({
          ...this.pagination,
          ...this.filter
        }).then((res) =>{
          this.list = res.data;
          this.total = res.totalItems;
        }).finally(() =>{
          this.loading = false;
        });    	  
      },
      
      formatDate(value){
    	if (value){
    	  return this.$moment(value).format('DD-MM-YYYY');
    	}
      },

      deleteItem (item) {
      this.$refs.dialog.open({
        title:'Eliminar',
        text: 'Desea eliminar el Dominio #'+item.id+'?'
      }).then((res) => {
        if (res){
        	this.loading = true;
          this.$repos.imputacion.delete(item.id
          ).then((res) =>{
          	this.$toast.success('Dominio #' + item.id + ' eliminado.');
          }).catch(err => {
      	    console.log(err);
      	    this.$toast.error(err.response.data)
          }).finally(() =>{
          	this.loading = false;
          	this.search();
          });        	  
        }
      });     
    },
      
	},
  }
</script>