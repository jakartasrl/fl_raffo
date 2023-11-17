import repository from '~/api/repository.js';

export default $axios => resource => ({

  ... repository($axios)(resource),

  states(id, params) {
    return $axios.$get(`/${resource}/${id}/states`,{
	    params
    })
  },

})