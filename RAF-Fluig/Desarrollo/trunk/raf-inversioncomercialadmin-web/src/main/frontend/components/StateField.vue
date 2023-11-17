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
  name: 'StateField',
  inheritAttrs: false,
  
  props: {
    value: {
      type: Object,
      default() {
        return null
      }
    },    
    defaultAll: {
      type: Boolean,
      default: false
    },
    country: {
      type: Object,
      default() {
        return {
          id: 1,
          code: 'AR',
          description: 'ARGENTINA'
        }
      }
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
        label: 'Provincias',
        'return-object': !this.$attrs['item-value'],
        'item-text': 'description',
        'items': this.list,
        'loading': this.loading,
        'multiple': false,
        value: this.value,
        
        ... this.$attrs
      }
    }
    
  },

  watch: {
    country: {
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
      if(this.country){
        this.loading = true
        this.$repos.countries.states(this.country.id, {
          page: 1,
          itemsPerPage: -1
        })
        .then(response => {
          this.list = response
          this.defaultAll && !(this.value.length) && this.$emit('input', this.list)

          if(this.list.filter(e => this.value && e.id === this.value.id).length === 0){ 
           this.$emit('input', null)
          }
        })
        .catch(err => {
          console.log(err)
          this.list = []
        })
        .finally(() => {
          this.loading = false
        })
      }
    },
  }
  
}
</script>
