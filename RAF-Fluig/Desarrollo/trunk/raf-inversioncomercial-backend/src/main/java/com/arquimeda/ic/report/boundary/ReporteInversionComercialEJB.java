package com.arquimeda.ic.report.boundary;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.Query;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.annotations.QueryHints;
import org.slf4j.Logger;

import com.arquimeda.elmer.exporter.DefaultXlsTemplate;
import com.arquimeda.elmer.exporter.XlsAlignment;
import com.arquimeda.elmer.exporter.XlsDataSource;
import com.arquimeda.elmer.exporter.XlsExporter;
import com.arquimeda.elmer.exporter.XlsSheet;
import com.arquimeda.ic.fdn.entity.Usuario;
import com.arquimeda.ic.producer.LoggedUser;
import com.arquimeda.ic.report.boundary.dto.ReporteExportInversionComercialDTO;
import com.arquimeda.ic.report.boundary.dto.ReporteInversionComercialDTO;
import com.arquimeda.ic.report.boundary.filter.ReporteExportInversionComercialFilter;
import com.arquimeda.ic.report.boundary.filter.ReporteInversionComercialFilter;
import com.arquimeda.ic.report.entity.InversionComercial;
import com.arquimeda.ic.utils.ScrollableResultsIteratorImpl;

@Stateless
public class ReporteInversionComercialEJB {
	
	private static final String _ADM = "adm";
	private static final String _RAF08_ADM = "RAF08-ADM";
	private static final String _RAF08_GTOR_PROCESO = "RAF08-GTOR-PROCESO";

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject @LoggedUser
	Usuario usuario;
	
	@Inject
	Logger logger;
	
	private FiltroGrupo filtroGrupo;
	
	public Long count(ReporteInversionComercialFilter filter) {
		
		filtroGrupo = getFiltroGrupo();
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(c) FROM InversionComercial c " + filter.getWhere() + filtroGrupo.getWhere(), Long.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
		return count;
	}
	
	public List<ReporteInversionComercialDTO> loadItems(Integer firsResult, Integer maxResults, String[] sortByArray, Boolean[] sortDescArray, ReporteInversionComercialFilter filter) {
		
    	String sortBy = Optional.ofNullable(firstOrNull(sortByArray)).orElse("c.numeroSolicitud");

    	if (Optional.ofNullable(firstOrNull(sortDescArray)).orElse(true)) {
    		sortBy+=" desc";
    	} else {
    		sortBy+=" asc";
    	}
		
    	filtroGrupo = getFiltroGrupo();
    	
    	TypedQuery<InversionComercial> query = em.createQuery("SELECT c FROM InversionComercial c " + filter.getWhere() + filtroGrupo.getWhere() + " ORDER BY " + sortBy, InversionComercial.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
    	
    	List<ReporteInversionComercialDTO> list = query
        		.setFirstResult(firsResult)
        		.setMaxResults(maxResults)
        		.setHint(QueryHints.READ_ONLY, true)
        		.getResultList()    		
        		.stream()
        		.map(ReporteInversionComercialDTO::fromEntity)
        		.collect(Collectors.toCollection(ArrayList::new)); 

    	
    	logger.info("QUERY ReporteInversionComercial: " + query.unwrap(org.hibernate.Query.class).getQueryString());
     	
		return list;
		
	}	
	
	private <T> T firstOrNull(T[] array) {
    	T ret = null;
    	if (array != null && array.length > 0) {
    		ret = array[0];
    	}
		return ret;
	}
	
	public ReporteInversionComercialDTO find(Integer id) {
		
		InversionComercial entity = em.find(InversionComercial.class, id);
		return ReporteInversionComercialDTO.fromEntity(entity);
	
	}
	
	public Iterator<ReporteExportInversionComercialDTO> getIterator(ReporteExportInversionComercialFilter filter) {
		
		filtroGrupo = getFiltroGrupo();
		
		TypedQuery<ReporteExportInversionComercialDTO> query = em.createQuery("SELECT NEW com.arquimeda.ic.report.boundary.dto.ReporteExportInversionComercialDTO(c, d) FROM InversionComercial c LEFT JOIN c.imputaciones d "  +
					filter.getWhere() + filtroGrupo.getWhere() + " ORDER BY c.id", ReporteExportInversionComercialDTO.class);
		
		query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
		filter.addParameters(query);

		Query hquery = query.unwrap(Query.class);
		final ScrollableResults results = hquery.scroll(ScrollMode.FORWARD_ONLY);
		
		logger.info("QUERY ReporteInversionComercial Export: " + query.unwrap(org.hibernate.Query.class).getQueryString());

		return new ScrollableResultsIteratorImpl<ReporteExportInversionComercialDTO>(results);

	}
	
	public FiltroGrupo getFiltroGrupo(){
		
		String where = "";
    	String nombreParametro = "";
    	List<String> valoresParametro = new ArrayList<String>();
    	
    	if(usuario.isEnGrupo(_RAF08_GTOR_PROCESO) || usuario.isEnGrupo(_ADM) || usuario.isEnGrupo(_RAF08_ADM)){
    		
    		where = " AND :uno = :uno ";
    		nombreParametro = "uno";
        	valoresParametro.add("1");
        
       	} else if(usuario.isEnGrupo("RAF08-GTE-PROMO-")){
    		
    		where = " AND c.codGrupoGtePromocion IN :codGrupoGtePromocion ";
    		nombreParametro = "codGrupoGtePromocion";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-PROMO-");
        	
    	}else if(usuario.isEnGrupo("RAF08-GTE-AREA-")){				
    		
    		where = " AND c.codGrupoGteArea IN :codigosGrupoGteArea ";
    		nombreParametro = "codigosGrupoGteArea";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-AREA-");
        	
    	}else if(usuario.isEnGrupo("RAF08-GTE-DIST-")){
    		
    		where = " AND c.codGrupoGteDistrito IN :codigoGrupoGteDistrito ";
    		nombreParametro = "codigoGrupoGteDistrito";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-DIST-");
        	
    	}else if(usuario.isEnGrupo("RAF08-ASIST-DIST-")){
    		
    		where = " AND c.codGrupoAsistenteDistrito IN :codigoGrupoAsistDistrito ";
    		nombreParametro = "codigoGrupoAsistDistrito";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-ASIST-DIST-");   		
        
    	}else {
    		// Sino no ve nada.
    		where = " AND :uno != :uno ";
    		nombreParametro = "uno";
    		valoresParametro.add("1");
    	}
		
    	logger.info("ReporteInversionComercial GRUPOS: " + nombreParametro + ": " +  valoresParametro);
    	
    	return new FiltroGrupo(where, nombreParametro, valoresParametro);
		
	}
	
	public Long countExport(ReporteExportInversionComercialFilter filter) {
		
		filtroGrupo = getFiltroGrupo();
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(d) FROM InversionComercial c JOIN c.imputaciones d " + filter.getWhere() + filtroGrupo.getWhere(), Long.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
    	
		logger.info("QUERY ReporteInversionComercial Export count: " + query.unwrap(org.hibernate.Query.class).getQueryString());

		return count;
	}
	
	public File export(ReporteExportInversionComercialFilter filter) {
		
		File file = null;
		FileOutputStream fileOutputStream = null;
		XlsExporter exporter = null;

		try {

			file = File.createTempFile("ReporteInversionComercial_", ".xlsx");			
			fileOutputStream = new FileOutputStream(file);

			exporter = new XlsExporter(new DefaultXlsTemplate());

			XlsSheet sheet1 = exporter.addSheet("ReporteInversionComercial");	
			sheet1.setDataSource(new XlsDataSource() {

				@Override
				public Integer rowsCount() {
					return countExport(filter).intValue();
				}

				@Override
				public Iterator<?> iterator() {
					return getIterator(filter);
				}

			});

			List<String> columnNames = new ArrayList<String>();
			List<String> columnHeaders = new ArrayList<String>();		

			columnNames.add("numeroSolicitud");
			columnNames.add("fechaSolicitud");
			columnNames.add("solicitante");
			columnNames.add("estado");
			columnNames.add("tarea");
			columnNames.add("areaDescripcion");
			columnNames.add("distritoDescripcion");
			columnNames.add("nombreAPM");
			columnNames.add("emailAPM");
			columnNames.add("tipoInversion");
			columnNames.add("montoInversion");
			
			columnNames.add("incluyeAlojamiento");
			columnNames.add("seleccionAlojamientoPresupuesto");
			columnNames.add("incluyeTraslado");
			columnNames.add("seleccionTrasladoPresupuesto");
			columnNames.add("incluyeInscripcion");
			columnNames.add("seleccionInscripcionoPresupuesto");
			
			columnNames.add("mesInversion");
			columnNames.add("apellido");
			columnNames.add("nombre");
			columnNames.add("cuit");
			columnNames.add("dni");
			columnNames.add("tipoDocumento");
			columnNames.add("numeroDocumento");
			columnNames.add("ciudad");
			columnNames.add("numeroPasaporte");
			columnNames.add("fechaVtoPasaporte");
			columnNames.add("sexo");
			columnNames.add("fechaNacimiento");
			columnNames.add("nacionalidad");
			columnNames.add("domicilio");
			columnNames.add("localidad");
			columnNames.add("provincia");
			columnNames.add("pais");
			columnNames.add("codigoPostal");
			columnNames.add("telefonoContacto");
			columnNames.add("celular");
			columnNames.add("mailContacto");
			columnNames.add("especialidadProfesional");
			columnNames.add("motivoViaje");
			columnNames.add("tituloGrado");
			columnNames.add("institucionDondeObtuvo");
			columnNames.add("anioEgreso");
			columnNames.add("matricula");
			columnNames.add("institucionQueTrabaja");
			columnNames.add("cargoPosicion");
			columnNames.add("tipoInscripcion");
			columnNames.add("membresia");
			columnNames.add("nombreSociedad");
			columnNames.add("numeroSocio");
			columnNames.add("equipamiento");
			
			columnNames.add("nombreCongreso");
			columnNames.add("lugarCongreso");
			columnNames.add("fechaDesdeCongreso");
			columnNames.add("fechaHastaCongreso");
			columnNames.add("web");
			columnNames.add("comentariosCongreso");
			
			columnNames.add("nombreHotel");
			columnNames.add("contactoHotel");
			columnNames.add("telefonoHotel");
			columnNames.add("checkinHotel");
			columnNames.add("checkoutHotel");
			columnNames.add("comentariosAlojamiento");
			columnNames.add("comparteHabitacion");
			columnNames.add("nombreMedico1");
			columnNames.add("contactoMedico1");
			columnNames.add("nombreMedico2");
			columnNames.add("contactoMedico2");
			columnNames.add("tipoHabitacion");
			columnNames.add("cantidadNoche");
			columnNames.add("cochera");
			
			columnNames.add("itinerarioIda");
			columnNames.add("fechaIda");
			columnNames.add("nroVueloIda");
			columnNames.add("horaSalidaIda");
			columnNames.add("tipoTrasladoIda");
			
			columnNames.add("itinerarioRegreso");
			columnNames.add("fechaRegreso");
			columnNames.add("nroVueloRegreso");
			columnNames.add("horaSalidaRegreso");
			columnNames.add("tipoTrasladoRegreso");
			
			columnNames.add("moneda");
			columnNames.add("importe");
			columnNames.add("importeARS");
			columnNames.add("importeUSD");
			columnNames.add("tipoCambioARS");
			columnNames.add("tipoCambioUSD");
			columnNames.add("formaPago");
			//imputaciones
			columnNames.add("codigoProducto");
			columnNames.add("producto");
			columnNames.add("porcentaje");
			//columnNames.add("presupuestoARS");
			//columnNames.add("consumidoARS");
			
			columnNames.add("cartaPetitorioDescripcion");
			columnNames.add("cartaAcuerdoDescripcion");
			columnNames.add("flyerDescripcion");

			columnNames.add("motivoRechazo");
			

			columnHeaders.add("NRO SOLICITUD");
			columnHeaders.add("FECHA SOLICITUD");
			columnHeaders.add("SOLICITANTE");
			columnHeaders.add("ESTADO");
			columnHeaders.add("TAREA");
			columnHeaders.add("AREA");
			columnHeaders.add("DISTRITO");
			columnHeaders.add("APM");
			columnHeaders.add("EMAIL APM");
			columnHeaders.add("TIPO DE INVERSION");
			columnHeaders.add("MONTO DE INVERSION");
			
			columnHeaders.add("INCLUYE ALOJAMIENTO");
			columnHeaders.add("PRESUPUESTO");
			columnHeaders.add("INCLUYE MEDIO DE TRANSPORTE");
			columnHeaders.add("PRESUPUESTO");
			columnHeaders.add("INCLUYE INSCRIPCION");
			columnHeaders.add("PRESUPUESTO");
			
			columnHeaders.add("MES INVERSION");
			columnHeaders.add("APELLIDO");
			columnHeaders.add("NOMBRE");
			columnHeaders.add("CUIT");
			columnHeaders.add("DNI");
			columnHeaders.add("TIPO DOCUMENTO");
			columnHeaders.add("NRO DOCUMENTO");
			columnHeaders.add("CIUDAD");
			columnHeaders.add("NRO PASAPORTE");
			columnHeaders.add("FECHA VTO PASAPORTE");
			columnHeaders.add("SEXO");
			columnHeaders.add("FECHA NACIMIENTO");
			columnHeaders.add("NACIONALIDAD");
			columnHeaders.add("DOMICILIO");
			columnHeaders.add("LOCALIDAD");
			columnHeaders.add("PROVINCIA");
			columnHeaders.add("PAIS");
			columnHeaders.add("CODIGO POSTAL");
			columnHeaders.add("TELEFONO DE CONTACTO");
			columnHeaders.add("CELULAR");
			columnHeaders.add("MAIL DE CONTACTO");
			columnHeaders.add("ESPECIALIDAD PROFESIONAL");
			columnHeaders.add("MOTIVO VIAJE");
			columnHeaders.add("TITULO GRADO");
			columnHeaders.add("INSTITUTO DONDE OBTUVO");
			columnHeaders.add("EGRESO");
			columnHeaders.add("MATRICULA");
			columnHeaders.add("INSTITUCION QUE TRABAJA");
			columnHeaders.add("CARGO/POSICION");
			columnHeaders.add("TIPO INSCRIPCION");
			columnHeaders.add("MEMBRESIA");
			columnHeaders.add("NOMBRE SOCIEDAD");
			columnHeaders.add("NRO SOCIO");
			columnHeaders.add("EQUIPAMIENTO/DETALLE");
			
			columnHeaders.add("CONGRESO");
			columnHeaders.add("LUGAR");
			columnHeaders.add("FECHA DESDE");
			columnHeaders.add("FECHA HASTA");
			columnHeaders.add("WEB");
			columnHeaders.add("CONGRESO COMENTARIOS");
			
			columnHeaders.add("HOTEL");
			columnHeaders.add("CONTACTO");
			columnHeaders.add("TELEFONO");
			columnHeaders.add("CHECK-IN");
			columnHeaders.add("CHECK-OUT");
			columnHeaders.add("COMENTARIOS");
			columnHeaders.add("COMPARTE HABITACION");
			columnHeaders.add("NOMBRE DEL MEDICO ACOMPAÑANTE");
			columnHeaders.add("CONTACTO ACOMPAÑANTE");
			columnHeaders.add("NOMBRE DEL MEDICO ACOMPAÑANTE");
			columnHeaders.add("CONTACTO ACOMPAÑANTE");
			columnHeaders.add("TIPO HABITACION");
			columnHeaders.add("CANTIDAD NOCHES");
			columnHeaders.add("COCHERA");
			
			columnHeaders.add("ITINERARIO IDA");
			columnHeaders.add("FECHA");
			columnHeaders.add("NRO VUELO");
			columnHeaders.add("HORA SALIDA");
			columnHeaders.add("TIPO DE TRASLADO IDA");
			
			columnHeaders.add("ITINERARIO REGRESO");
			columnHeaders.add("FECHA");
			columnHeaders.add("NRO VUELO");
			columnHeaders.add("HORA SALIDA");
			columnHeaders.add("TIPO DE TRASLADO REGRESO");
			
			columnHeaders.add("MONEDA");
			columnHeaders.add("IMPORTE");
			columnHeaders.add("IMPORTE ARS");
			columnHeaders.add("IMPORTE USD");
			columnHeaders.add("TIPO CAMBIO ARS");
			columnHeaders.add("TIPO CAMBIO USD");
			columnHeaders.add("FORMA PAGO");

			//imputaciones
			columnHeaders.add("CODIGO PRODUCTO");
			columnHeaders.add("PRODUCTO");
			columnHeaders.add("PORCENTAJE");
			//columnHeaders.add("PRESUPUESTO ARS");
			//columnHeaders.add("CONSUMIDO ARS");
			
			columnHeaders.add("CARTA PETITORIO");
			columnHeaders.add("CARTA ACUERDO");
			columnHeaders.add("FLYER");

			columnHeaders.add("MOTIVO RECHAZO");
				
			sheet1.setColumnWidth("numeroSolicitud", 20);
			sheet1.setColumnWidth("fechaSolicitud", 20);
			sheet1.setColumnWidth("solicitante", 20);
			sheet1.setColumnWidth("estado", 40);
			sheet1.setColumnWidth("tarea", 40);
			sheet1.setColumnWidth("areaDescripcion", 40);
			sheet1.setColumnWidth("distritoDescripcion", 40);
			sheet1.setColumnWidth("nombreAPM", 40);
			sheet1.setColumnWidth("emailAPM", 40);
			sheet1.setColumnWidth("tipoInversion", 40);
			sheet1.setColumnWidth("montoInversion", 40);
			
			sheet1.setColumnWidth("incluyeAlojamiento", 30);
			sheet1.setColumnWidth("seleccionAlojamientoPresupuesto", 30);
			sheet1.setColumnWidth("incluyeTraslado", 30);
			sheet1.setColumnWidth("seleccionTrasladoPresupuesto", 30);
			sheet1.setColumnWidth("incluyeInscripcion", 30);
			sheet1.setColumnWidth("seleccionInscripcionoPresupuesto", 30);
			
			sheet1.setColumnWidth("mesInversion", 20);
			sheet1.setColumnWidth("apellido", 40);
			sheet1.setColumnWidth("nombre", 40);
			sheet1.setColumnWidth("cuit", 20);
			sheet1.setColumnWidth("dni", 20);
			sheet1.setColumnWidth("tipoDocumento", 20);
			sheet1.setColumnWidth("numeroDocumento", 20);
			sheet1.setColumnWidth("ciudad", 40);
			sheet1.setColumnWidth("numeroPasaporte", 20);
			sheet1.setColumnWidth("fechaVtoPasaporte", 30);
			sheet1.setColumnWidth("sexo", 20);
			sheet1.setColumnWidth("fechaNacimiento", 20);
			sheet1.setColumnWidth("nacionalidad", 40);
			sheet1.setColumnWidth("domicilio", 40);
			sheet1.setColumnWidth("localidad", 40);
			sheet1.setColumnWidth("provincia", 40);
			sheet1.setColumnWidth("pais", 40);
			sheet1.setColumnWidth("codigoPostal", 20);
			sheet1.setColumnWidth("telefonoContacto", 20);
			sheet1.setColumnWidth("celular", 20);
			sheet1.setColumnWidth("mailContacto", 40);
			sheet1.setColumnWidth("especialidadProfesional", 40);
			sheet1.setColumnWidth("motivoViaje", 40);
			sheet1.setColumnWidth("tituloGrado", 40);
			sheet1.setColumnWidth("institucionDondeObtuvo", 40);
			sheet1.setColumnWidth("anioEgreso", 20);
			sheet1.setColumnWidth("matricula", 20);
			sheet1.setColumnWidth("institucionQueTrabaja", 40);
			sheet1.setColumnWidth("cargoPosicion", 40);
			sheet1.setColumnWidth("tipoInscripcion", 30);
			sheet1.setColumnWidth("membresia", 15);
			sheet1.setColumnWidth("nombreSociedad", 20);
			sheet1.setColumnWidth("numeroSocio", 20);
			sheet1.setColumnWidth("equipamiento", 60);
			
			sheet1.setColumnWidth("nombreCongreso", 40);
			sheet1.setColumnWidth("lugarCongreso", 40);
			sheet1.setColumnWidth("fechaDesdeCongreso", 40);
			sheet1.setColumnWidth("fechaHastaCongreso", 40);
			sheet1.setColumnWidth("web", 40);
			sheet1.setColumnWidth("comentariosCongreso", 50);
			
			sheet1.setColumnWidth("nombreHotel", 40);
			sheet1.setColumnWidth("contactoHotel", 40);
			sheet1.setColumnWidth("telefonoHotel", 20);
			sheet1.setColumnWidth("checkinHotel", 20);
			sheet1.setColumnWidth("checkoutHotel", 20);
			sheet1.setColumnWidth("comentariosAlojamiento", 40);
			sheet1.setColumnWidth("comparteHabitacion", 30);
			sheet1.setColumnWidth("nombreMedico1", 40);
			sheet1.setColumnWidth("contactoMedico1", 40);
			sheet1.setColumnWidth("nombreMedico2", 40);
			sheet1.setColumnWidth("contactoMedico2", 40);
			sheet1.setColumnWidth("tipoHabitacion", 30);
			sheet1.setColumnWidth("cantidadNoche", 20);
			sheet1.setColumnWidth("cochera", 20);
			
			sheet1.setColumnWidth("itinerarioIda", 60);
			sheet1.setColumnWidth("fechaIda", 20);
			sheet1.setColumnWidth("nroVueloIda", 20);
			sheet1.setColumnWidth("horaSalidaIda", 20);
			sheet1.setColumnWidth("tipoTrasladoIda", 20);
			
			sheet1.setColumnWidth("itinerarioRegreso", 60);
			sheet1.setColumnWidth("fechaRegreso", 20);
			sheet1.setColumnWidth("nroVueloRegreso", 20);
			sheet1.setColumnWidth("horaSalidaRegreso", 20);
			sheet1.setColumnWidth("tipoTrasladoRegreso", 20);
			
			sheet1.setColumnWidth("moneda", 20);
			sheet1.setColumnWidth("importe", 20);
			sheet1.setColumnWidth("importeARS", 20);
			sheet1.setColumnWidth("importeUSD", 20);
			sheet1.setColumnWidth("tipoCambioARS", 20);
			sheet1.setColumnWidth("tipoCambioUSD", 20);
			sheet1.setColumnWidth("formaPago", 20);

			//imputaciones
			sheet1.setColumnWidth("codigoProducto", 40);
			sheet1.setColumnWidth("producto", 40);
			sheet1.setColumnWidth("porcentaje", 20);
			//sheet1.setColumnWidth("presupuestoARS", 20);
			//sheet1.setColumnWidth("consumidoARS", 20);
			
			sheet1.setColumnWidth("cartaPetitorioDescripcion", 40);
			sheet1.setColumnWidth("cartaAcuerdoDescripcion", 40);
			sheet1.setColumnWidth("flyerDescripcion", 40);
			
			sheet1.setColumnWidth("motivoRechazo", 20);
						
			sheet1.setColumnFormat("fechaSolicitud", "m/d/yy");
			sheet1.setColumnFormat("fechaVtoPasaporte", "m/d/yy");
			sheet1.setColumnFormat("fechaNacimiento", "m/d/yy");
			sheet1.setColumnFormat("fechaDesdeCongreso", "m/d/yy");
			sheet1.setColumnFormat("fechaHastaCongreso", "m/d/yy");
			sheet1.setColumnFormat("checkinHotel", "m/d/yy");
			sheet1.setColumnFormat("checkoutHotel", "m/d/yy");
			sheet1.setColumnFormat("fechaIda", "m/d/yy");
			sheet1.setColumnFormat("fechaRegreso", "m/d/yy");

			sheet1.setColumnFormat("montoInversion", "##,##0.00");
			sheet1.setColumnFormat("importe", "##,##0.00");
			sheet1.setColumnFormat("importeARS", "##,##0.00");
			sheet1.setColumnFormat("importeUSD", "##,##0.00");
			sheet1.setColumnFormat("tipoCambioARS", "##,##0.00");
			sheet1.setColumnFormat("tipoCambioUSD", "##,##0.00");
			sheet1.setColumnFormat("porcentaje", "##,##0.00");
			//sheet1.setColumnFormat("presupuestoARS", "##,##0.00");
			//sheet1.setColumnFormat("consumidoARS", "##,##0.00");

			sheet1.setColumnAlignment("numeroSolicitud", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaSolicitud", XlsAlignment.left);
			sheet1.setColumnAlignment("solicitante", XlsAlignment.left);
			sheet1.setColumnAlignment("estado", XlsAlignment.left);
			sheet1.setColumnAlignment("tarea", XlsAlignment.left);
			sheet1.setColumnAlignment("areaDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("distritoDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreAPM", XlsAlignment.left);
			sheet1.setColumnAlignment("emailAPM", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("montoInversion", XlsAlignment.left);
			
			sheet1.setColumnAlignment("incluyeAlojamiento", XlsAlignment.left);
			sheet1.setColumnAlignment("seleccionAlojamientoPresupuesto", XlsAlignment.left);
			sheet1.setColumnAlignment("incluyeTraslado", XlsAlignment.left);
			sheet1.setColumnAlignment("seleccionTrasladoPresupuesto", XlsAlignment.left);
			sheet1.setColumnAlignment("incluyeInscripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("seleccionInscripcionoPresupuesto", XlsAlignment.left);
			
			sheet1.setColumnAlignment("mesInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("apellido", XlsAlignment.left);
			sheet1.setColumnAlignment("nombre", XlsAlignment.left);
			sheet1.setColumnAlignment("cuit", XlsAlignment.left);
			sheet1.setColumnAlignment("dni", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoDocumento", XlsAlignment.left);
			sheet1.setColumnAlignment("numeroDocumento", XlsAlignment.left);
			sheet1.setColumnAlignment("ciudad", XlsAlignment.left);
			sheet1.setColumnAlignment("numeroPasaporte", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaVtoPasaporte", XlsAlignment.left);
			sheet1.setColumnAlignment("sexo", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaNacimiento", XlsAlignment.left);
			sheet1.setColumnAlignment("nacionalidad", XlsAlignment.left);
			sheet1.setColumnAlignment("domicilio", XlsAlignment.left);
			sheet1.setColumnAlignment("localidad", XlsAlignment.left);
			sheet1.setColumnAlignment("provincia", XlsAlignment.left);
			sheet1.setColumnAlignment("pais", XlsAlignment.left);
			sheet1.setColumnAlignment("codigoPostal", XlsAlignment.left);
			sheet1.setColumnAlignment("telefonoContacto", XlsAlignment.left);
			sheet1.setColumnAlignment("celular", XlsAlignment.left);
			sheet1.setColumnAlignment("mailContacto", XlsAlignment.left);
			sheet1.setColumnAlignment("especialidadProfesional", XlsAlignment.left);
			sheet1.setColumnAlignment("motivoViaje", XlsAlignment.left);
			sheet1.setColumnAlignment("tituloGrado", XlsAlignment.left);
			sheet1.setColumnAlignment("institucionDondeObtuvo", XlsAlignment.left);
			sheet1.setColumnAlignment("anioEgreso", XlsAlignment.left);
			sheet1.setColumnAlignment("matricula", XlsAlignment.left);
			sheet1.setColumnAlignment("institucionQueTrabaja", XlsAlignment.left);
			sheet1.setColumnAlignment("cargoPosicion", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoInscripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("membresia", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreSociedad", XlsAlignment.left);
			sheet1.setColumnAlignment("numeroSocio", XlsAlignment.left);
			sheet1.setColumnAlignment("equipamiento", XlsAlignment.left);
			
			sheet1.setColumnAlignment("nombreCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("lugarCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaDesdeCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaHastaCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("web", XlsAlignment.left);
			sheet1.setColumnAlignment("comentariosCongreso", XlsAlignment.left);
			
			sheet1.setColumnAlignment("nombreHotel", XlsAlignment.left);
			sheet1.setColumnAlignment("contactoHotel", XlsAlignment.left);
			sheet1.setColumnAlignment("telefonoHotel", XlsAlignment.left);
			sheet1.setColumnAlignment("checkinHotel", XlsAlignment.left);
			sheet1.setColumnAlignment("checkoutHotel", XlsAlignment.left);
			sheet1.setColumnAlignment("comentariosAlojamiento", XlsAlignment.left);
			sheet1.setColumnAlignment("comparteHabitacion", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreMedico1", XlsAlignment.left);
			sheet1.setColumnAlignment("contactoMedico1", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreMedico2", XlsAlignment.left);
			sheet1.setColumnAlignment("contactoMedico2", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoHabitacion", XlsAlignment.left);
			sheet1.setColumnAlignment("cantidadNoche", XlsAlignment.left);
			sheet1.setColumnAlignment("cochera", XlsAlignment.left);
			
			sheet1.setColumnAlignment("itinerarioIda", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaIda", XlsAlignment.left);
			sheet1.setColumnAlignment("nroVueloIda", XlsAlignment.left);
			sheet1.setColumnAlignment("horaSalidaIda", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoTrasladoIda", XlsAlignment.left);;
			
			sheet1.setColumnAlignment("itinerarioRegreso", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaRegreso", XlsAlignment.left);
			sheet1.setColumnAlignment("nroVueloRegreso", XlsAlignment.left);
			sheet1.setColumnAlignment("horaSalidaRegreso", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoTrasladoRegreso", XlsAlignment.left);
			
			sheet1.setColumnAlignment("moneda", XlsAlignment.left);
			sheet1.setColumnAlignment("importe", XlsAlignment.left);
			sheet1.setColumnAlignment("importeARS", XlsAlignment.left);
			sheet1.setColumnAlignment("importeUSD", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoCambioARS", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoCambioUSD", XlsAlignment.left);
			sheet1.setColumnAlignment("formaPago", XlsAlignment.left);
			//imputaciones
			sheet1.setColumnAlignment("codigoProducto", XlsAlignment.left);
			sheet1.setColumnAlignment("producto", XlsAlignment.left);
			sheet1.setColumnAlignment("porcentaje", XlsAlignment.left);
			//sheet1.setColumnAlignment("presupuestoARS", XlsAlignment.left);
			//sheet1.setColumnAlignment("consumidoARS", XlsAlignment.left);
			
			sheet1.setColumnAlignment("cartaPetitorioDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("cartaAcuerdoDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("flyerDescripcion", XlsAlignment.left);

			sheet1.setColumnAlignment("motivoRechazo", XlsAlignment.left);
			
			sheet1.setColumNames(columnNames.toArray(new String[0]));
			sheet1.setColumHeaders(columnHeaders.toArray(new String[0]));

			exporter.export(fileOutputStream);
			
		} catch (Exception e) {
			
			logger.error("Se produjo un error al exportar reporte a xlsx.", e);
			throw new RuntimeException(e);

		}finally {

			try {

				if(exporter != null){
					exporter.clear();					
				}

				if(fileOutputStream != null){
					fileOutputStream.close();				
				}

				if(file != null){
					file.deleteOnExit();				
				}				

			} catch (IOException e) {
				logger.error("Se produjo un error al cerrar exportador.", e);
			}

		}
		
		return file;
	
	}	

}
