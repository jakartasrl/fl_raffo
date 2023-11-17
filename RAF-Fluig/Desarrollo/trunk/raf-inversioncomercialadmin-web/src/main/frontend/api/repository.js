export default $axios => resource => ({

  list(params) {
    return $axios.$get(`/${resource}`,{
	    params
    })
  },

  create(payload) {
    return $axios.$post(`/${resource}`, payload)
  },

  get(id) {
    return $axios.$get(`/${resource}/${id}`)
  },

  update(id, payload) {
    return $axios.$put(`/${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`/${resource}/${id}`)
  },
  
  export(params) {
    return $axios.$get(`/${resource}/export`,{
    	params,
    	responseType: 'blob',
    	headers: {
            'Accept': '*/*'
        }    	
	})
  },

  isReadonly() {
    return $axios.$get(`/${resource}/isReadonly`)
  },

})