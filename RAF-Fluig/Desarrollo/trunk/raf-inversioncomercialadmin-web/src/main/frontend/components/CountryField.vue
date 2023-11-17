<template>
  <v-autocomplete
    v-bind="props"
    v-on="$listeners"
  >
    <template v-for="(index, name) in $slots" #[name]>
      <slot :name="name" />
    </template>   
  </v-autocomplete>   
</template>

<script>
export default {
  name: 'CountryField',
  inheritAttrs: false,
  
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },    
    defaultAll: {
      type: Boolean,
      default: false
    },
    nacional: {
      type: Boolean,
      default: false
    }
  },

  data(){
    return {
      loading: false,
      list: []
  }},  
    
  computed: {
    props(){
      return {
        
        // Default values
        label: 'País',
        clearable: true,
        'return-object': !this.$attrs['item-value'],
        'item-text': 'description',
        'items': this.list,
        'loading': this.loading,
        'multiple': false,
        value: this.value,
        viewMode: false,
        
        ... this.$attrs
      }
    }
    
  },

  watch: {
    nacional: {
      handler (val) {
        this.loadList();
      },
      deep: true,
      immediate: true
    },      
  },

  mounted () {
  	this.loadList();
  },
  
  methods: {
    loadList(){
      console.log("NACIONAL", this.nacional)
      if(this.nacional != null && this.nacional !== undefined){
        if(this.nacional){
        this.list = [{
          id: 1,
          code: 'AR',
          description: 'ARGENTINA'
        }]
      }
      else{
        this.loading = true
          this.$repos.countries.list({
            page: 1,
            itemsPerPage: -1
          })
          .then(response => {
            this.list = response
            this.defaultAll && !(this.value.length) && this.$emit('input', this.list)

          })
          .catch(err => {
            console.log(err)
            this.list = []
          })
          .finally(() => {
            this.loading = false
          })
      }
      }
    },
  }
  
}
</script>
