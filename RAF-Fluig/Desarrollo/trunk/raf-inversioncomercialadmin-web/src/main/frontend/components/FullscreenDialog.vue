<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{titulo}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
              <v-list-item-content>

                <v-flex xs4 md2>
                    <v-btn
                    @click="copiarMensaje"
                    color="primary"
                    class="ma-3"
                        >
                        Copiar mensaje
                    </v-btn>
                </v-flex>		
                 
              </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
                <pre>
              {{ mensaje }}
                </pre>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'FullscreenDialog',
    props: ['multiple'],
    data () {
      return {
        mensaje: '',
        titulo: 'default',
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
    methods :{
        close(){
            this.dialog = false;
        },
        formatXML(input) {
            // PART 1: Add \n where necessary
            // A) add \n between sets of angled brackets without content between them
            // B) remove \n between opening and closing tags of the same node if no content is between them
            // C) add \n between a self-closing set of angled brackets and the next set
            // D) split it into an array

            const xmlString = input.trim()
                .replace(/>\s*</g,'>\n<')                   
                .replace(/(<[^/>].*>)\n(<[/])/g,'$1$2')      
                .replace(/(<\/[^>]+>|<[^>]+\/>)(<[^>]+>)/g,'$1\n$2');            
            const xmlArr = xmlString.split('\n');

            let tabs = '';         
            let start = 0;         
            if (/^<[?]xml/.test(xmlArr[0])) start++;    

            for (let i = start; i < xmlArr.length; i++) { 
                const line = xmlArr[i].trim();   
                if (/^<[/]/.test(line)) {            

                    tabs = tabs.replace(/.$/, '');
                    xmlArr[i] = tabs + line;            
                } else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line)) {                
             
                    xmlArr[i] = tabs + line;
                } else { 
                    xmlArr[i] = tabs + line;            
                    tabs += '\t';
                }                    
            }
            return xmlArr.join('\n');
        },
        openDialog(titulo,mensaje){

            if(mensaje === null){
                mensaje = "El campo solicitado es nulo";
            }
            this.titulo = titulo;
            this.mensaje = this.formatXML(mensaje);
            this.dialog = true;
        },
        copiarMensaje(){
            const el = document.createElement('textarea');
            el.value = this.mensaje;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }
  }
</script>