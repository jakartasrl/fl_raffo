<template>
  <div>
    <v-file-input
      v-if="!readonly"
      v-model="nextFiles"
      placeholder="Seleccione sus archivos"
      label="Adjuntar imagenes"
      accept="image/*"
      :multiple="multiple"
      show-size
      prepend-icon="mdi-paperclip"
      
      @change="uploadFiles"
      :loading="uploading"
      :clearable="false"
    >
      <template v-slot:selection="{ text }">
        <v-chip
          small
          label
          color="primary"
        >
          {{ text }}
        </v-chip>
      </template>
    </v-file-input>
    <v-chip
      v-for="item in files"
      :key="item.nombre"    
      class="ma-2"
      color="primary"
      label
      text-color="white"
      :close="!readonly"
      @click="showImgPopup('Imagen', imageUrl(item.hash))"
      @click:close="removeFile(item)"
    >
      <v-icon left>mdi-file-cloud</v-icon>
      {{item.nombre}}
    </v-chip>
    
    <v-dialog v-model="imgPopup.show" width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{imgPopup.title}}</span>
        </v-card-title>
        <v-card-text>
          <v-img v-if="imgPopup.src" :src="imgPopup.src"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="imgPopup.show = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  
  </div>    
</template>
<script>
export default {
    name: 'ImagesInput',
    props: ['value', 'readonly', 'multiple'],
	data: () => ({
		uploading: false,
		nextFiles: [],
		files: [],
    imgPopup:{
			show: false,
      src: null,
      title: ''
    },
    }),
	
    watch: {
      value:{
        immediate: true,
    	handler(newVal, oldVal) {
    		if (this.multiple){
    			this.files = newVal;
    		} else {
          this.files = newVal ? [newVal] : [];
    		}
    	}
      }
    },
    
	methods: {
		setUploading(val){
			this.$emit('uploading', val);
			this.uploading = val;
		},
		showImgPopup(title, src){
			this.imgPopup.title = title;
			this.imgPopup.src = src;
			this.imgPopup.show = true;
		},
          
        imageUrl(hash){
          return this.$axios.defaults.baseURL+'/files/' + hash;
        },
         
        removeFile (item){
          if (this.multiple){
            if (this.value){
        	  const index = this.value.indexOf(item);
        	  if (index !== -1) this.value.splice(index, 1);
            }
          } else {
        	this.$emit('input', null);
          }
        },
        
        uploadFiles() {
          if (this.nextFiles.length) {
        	this.setUploading(true);
        	    	
        	const formData = new FormData();

        	// nextFiles
        	for (const file of this.nextFiles) {
        	  formData.append("files", file, file.name);
        	}

        	let oldArray = this.files;
        	
          	if (!oldArray){
          		oldArray = [];
            }
        	
        	this.$axios.$post('files', formData
        	  ).then(response => {
                console.log("Archivos:", response);
                  	 
                // Modifico el valor
                if (this.multiple){
                  // Array
                  this.$emit('input', oldArray.concat(response.data));
                } else {
                  // Unico elemento
                  this.$emit('input', response.data[0]);
                }

                this.nextFiles = [];
                  	    
              }).catch(err => {
                console.log(err)
              }).finally(() => {
                this.setUploading(false);
              })        	        
        	        
        	} else {
        	  console.log("there are no files.");
        	}
         }          
	}
  }
</script>
