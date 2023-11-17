import apiCountries from '~/api/countries.js'
import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)
  
  const repositories = {
	  areas: repositoryWithAxios('parametros/areas'),
	  distritos: repositoryWithAxios('parametros/distritos'),
	  presupuesto: repositoryWithAxios('parametros/presupuesto'),
	  productos: repositoryWithAxios('parametros/productos'),
	  lineas: repositoryWithAxios('parametros/lineas'),
	  tipoInversiones: repositoryWithAxios('parametros/tipoInversiones'),
	  tipoProductos: repositoryWithAxios('parametros/TipoProductos'),
	  gruposGteDistrito: repositoryWithAxios('parametros/gruposGteDistrito'),
	  reporteInversionComercial: repositoryWithAxios('reportes/reporteInversionComercial'),
	  imputacion: repositoryWithAxios('reportes/imputaciones'),
	  reporteCartaAcuerdo: repositoryWithAxios('reportes/reporteCartaAcuerdo'),
	  reportePetitorioCartaAcuerdo: repositoryWithAxios('reportes/reportePetitorioCartaAcuerdo'),
	  congreso: repositoryWithAxios('parametros/congreso'),

	  countries: apiCountries(ctx.$axios)('parametros/countries'),

  }

  
  inject('repos', repositories)
}