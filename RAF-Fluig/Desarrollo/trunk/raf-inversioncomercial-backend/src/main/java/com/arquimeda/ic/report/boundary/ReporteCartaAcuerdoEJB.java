package com.arquimeda.ic.report.boundary;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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
import com.arquimeda.ic.report.boundary.dto.ReporteCartaAcuerdoDTO;
import com.arquimeda.ic.report.boundary.filter.ReporteCartaAcuerdoFilter;
import com.arquimeda.ic.report.entity.CartaAcuerdo;
import com.arquimeda.ic.utils.ScrollableResultsIteratorImpl;

@Stateless
public class ReporteCartaAcuerdoEJB {
	
	private static final String _ADM = "adm";
	private static final String _RAF09_AUDITORIA = "RAF09-AUDITORIA";
	private static final String _RAF09_GTOR_PROCESO = "RAF09-GTOR-PROCESO";

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject @LoggedUser
	Usuario usuario;
	
	@Inject
	Logger logger;
	
	private FiltroGrupo filtroGrupo;
	
	public Long count(ReporteCartaAcuerdoFilter filter) {
		
		filtroGrupo = getFiltroGrupo();
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(c) FROM CartaAcuerdo c " + filter.getWhere() + filtroGrupo.getWhere(), Long.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
		return count;
	}
	
	public List<ReporteCartaAcuerdoDTO> loadItems(Integer firsResult, Integer maxResults, String[] sortByArray, Boolean[] sortDescArray, ReporteCartaAcuerdoFilter filter) {
		
    	String sortBy = Optional.ofNullable(firstOrNull(sortByArray)).orElse("c.numeroSolicitud");

    	if (Optional.ofNullable(firstOrNull(sortDescArray)).orElse(true)) {
    		sortBy+=" desc";
    	} else {
    		sortBy+=" asc";
    	}
    	
    	filtroGrupo = getFiltroGrupo();
		
		// Busco la pagina
    	TypedQuery<CartaAcuerdo> query = em.createQuery(
    			"SELECT c FROM CartaAcuerdo c "  + filter.getWhere() + filtroGrupo.getWhere() +
    	        " ORDER BY " + sortBy, CartaAcuerdo.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	List<ReporteCartaAcuerdoDTO> list =	query
        		.setFirstResult(firsResult)
        		.setMaxResults(maxResults)
        		.setHint(QueryHints.READ_ONLY, true)
        		.getResultList()    		
        		.stream()
        		.map(ReporteCartaAcuerdoDTO::fromEntity)
        		.collect(Collectors.toCollection(ArrayList::new)); 
    	
    	logger.info("QUERY ReporteCartaAcuerdo: " + query.unwrap(org.hibernate.Query.class).getQueryString());
    	
		return list;
		
	}	
	
	private <T> T firstOrNull(T[] array) {
    	T ret = null;
    	if (array != null && array.length > 0) {
    		ret = array[0];
    	}
		return ret;
	}
	
	
	public ReporteCartaAcuerdoDTO find(Integer id) {
		
		CartaAcuerdo entity = em.find(CartaAcuerdo.class, id);
		return ReporteCartaAcuerdoDTO.fromEntity(entity);
	
	}
	
	public Iterator<ReporteCartaAcuerdoDTO> getIterator(ReporteCartaAcuerdoFilter filter) {

		filtroGrupo = getFiltroGrupo();
    	
		TypedQuery<ReporteCartaAcuerdoDTO> query = em.createQuery("SELECT NEW com.arquimeda.ic.report.boundary.dto.ReporteCartaAcuerdoDTO(c) FROM CartaAcuerdo c "  + 
				filter.getWhere() + filtroGrupo.getWhere() + " ORDER BY c.id", ReporteCartaAcuerdoDTO.class);
		
		query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
		filter.addParameters(query);

		Query hquery = query.unwrap(Query.class);
		final ScrollableResults results = hquery.scroll(ScrollMode.FORWARD_ONLY);

		return new ScrollableResultsIteratorImpl<ReporteCartaAcuerdoDTO>(results);

	}
	
	public FiltroGrupo getFiltroGrupo(){
		
		String where = "";
    	String nombreParametro = "";
    	List<String> valoresParametro = new ArrayList<String>();
    	
    	if(usuario.isEnGrupo(_RAF09_GTOR_PROCESO) || usuario.isEnGrupo(_RAF09_AUDITORIA) || usuario.isEnGrupo(_ADM)){
    		
    		where = " AND :uno = :uno ";
    		nombreParametro = "uno";
        	valoresParametro.add("1");
        
       	}else if(usuario.isEnGrupo("RAF08-GTE-PROMO-")){
    		
    		where = " AND c.codGrupoGtePromocion IN :codGrupoGtePromocion ";
    		nombreParametro = "codGrupoGtePromocion";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-PROMO-");
        	
    	}else if(usuario.isEnGrupo("RAF08-GTE-AREA-")){				
    		
    		where = " AND c.codGrupoGteArea IN :codigosGrupoGteArea ";
    		nombreParametro = "codigosGrupoGteArea";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-AREA-");
        	
    	} else if(usuario.isEnGrupo("RAF08-GTE-DIST-")){
    		
    		where = " AND c.codGrupoGteDistrito IN :codigoGrupoGteDistrito ";
    		nombreParametro = "codigoGrupoGteDistrito";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-DIST-");
        	
    	} else if(usuario.isEnGrupo("RAF08-ASIST-DIST-")){
    		
    		where = " AND c.codGrupoAsistenteDistrito IN :codigoGrupoAsistDistrito ";
    		nombreParametro = "codigoGrupoAsistDistrito";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-ASIST-DIST-");   		
        
    	}else {
    		// Sino no ve nada.
    		where = " AND :uno != :uno ";
    		nombreParametro = "uno";
    		valoresParametro.add("1");
    	}
		
    	logger.info("ReporteCartaAcuerdo GRUPOS: " + nombreParametro + ": " +  valoresParametro);
    	
    	return new FiltroGrupo(where, nombreParametro, valoresParametro);
		
	}
	
	public File export(ReporteCartaAcuerdoFilter filter) {
		
		File file = null;
		FileOutputStream fileOutputStream = null;
		XlsExporter exporter = null;

		try {

			file = File.createTempFile("ReporteCartaAcuerdo_", ".xlsx");			
			fileOutputStream = new FileOutputStream(file);

			exporter = new XlsExporter(new DefaultXlsTemplate());

			XlsSheet sheet1 = exporter.addSheet("ReporteCartaAcuerdo");	
			sheet1.setDataSource(new XlsDataSource() {

				@Override
				public Integer rowsCount() {
					return count(filter).intValue();
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
			columnNames.add("fechaFinSolicitud");
			columnNames.add("solicitante");
			columnNames.add("nroInversionComercial");
			columnNames.add("areaDescripcion");
			columnNames.add("distritoDescripcion");
			columnNames.add("gteDistrito");
			columnNames.add("nombreAPM");
			columnNames.add("emailAPM");
			columnNames.add("fecha");
			columnNames.add("apellido");
			columnNames.add("nombre");
			columnNames.add("tipoInversion");
			columnNames.add("nombreCongreso");
			columnNames.add("mesInversion");
			columnNames.add("formaPago");
			columnNames.add("motivoRechazo");
			columnNames.add("estado");
			columnNames.add("tarea");
			
			columnNames.add("comentariosCongreso");
			columnNames.add("web");
			columnNames.add("cartaPetitorioDescripcion");
			columnNames.add("cartaAcuerdoDescripcion");
			columnNames.add("flyerDescripcion");
			
			columnHeaders.add("NRO SOLICITUD");
			columnHeaders.add("FECHA SOLICITUD");
			columnHeaders.add("FECHA FIN SOLICITUD");
			columnHeaders.add("SOLICITANTE");
			columnHeaders.add("NRO DE PATROCINIO");
			columnHeaders.add("AREA");
			columnHeaders.add("DISTRITO");
			columnHeaders.add("GTE. DISTRITO");
			columnHeaders.add("APM");
			columnHeaders.add("EMAIL APM");
			columnHeaders.add("FECHA");
			columnHeaders.add("APELLIDO");
			columnHeaders.add("NOMBRE");
			columnHeaders.add("TIPO INVERSION");
			columnHeaders.add("CONGRESO");
			columnHeaders.add("MES DE LA INVERSION");
			columnHeaders.add("FORMA DE PAGO");
			columnHeaders.add("MOTIVO DE RECHAZO");
			columnHeaders.add("ESTADO");
			columnHeaders.add("TAREA");
			
			columnHeaders.add("CONGRESO COMENTARIOS");
			columnHeaders.add("SITIO WEB DEL EVENTO");
			columnHeaders.add("CARTA PETITOTIO");
			columnHeaders.add("CARTA ACUERDO");
			columnHeaders.add("FLYER");
			
			sheet1.setColumnWidth("numeroSolicitud", 20);
			sheet1.setColumnWidth("fechaSolicitud", 20);
			sheet1.setColumnWidth("fechaFinSolicitud", 20);
			sheet1.setColumnWidth("solicitante", 40);
			sheet1.setColumnWidth("nroInversionComercial", 30);
			sheet1.setColumnWidth("areaDescripcion", 40);
			sheet1.setColumnWidth("distrito", 40);
			sheet1.setColumnWidth("gteDistrito", 40);
			sheet1.setColumnWidth("nombreAPM", 40);
			sheet1.setColumnWidth("emailAPM", 40);
			sheet1.setColumnWidth("fecha", 40);
			sheet1.setColumnWidth("apellido", 40);
			sheet1.setColumnWidth("nombre", 40);
			sheet1.setColumnWidth("tipoInversion", 40);
			sheet1.setColumnWidth("nombreCongreso", 40);
			sheet1.setColumnWidth("mesInversion", 40);
			sheet1.setColumnWidth("formaPago", 40);
			sheet1.setColumnWidth("motivoRechazo", 40);
			sheet1.setColumnWidth("estado", 40);
			sheet1.setColumnWidth("tarea", 40);
			
			sheet1.setColumnWidth("comentariosCongreso", 50);
			sheet1.setColumnWidth("web", 40);
			sheet1.setColumnWidth("cartaPetitorioDescripcion", 40);
			sheet1.setColumnWidth("cartaAcuerdoDescripcion", 40);
			sheet1.setColumnWidth("flyerDescripcion", 40);
						
			sheet1.setColumnFormat("fechaSolicitud", "m/d/yy");
			sheet1.setColumnFormat("fechaFinSolicitud", "m/d/yy");
			sheet1.setColumnFormat("fecha", "m/d/yy");
			sheet1.setColumnFormat("mesInversion", "m/yy");

			sheet1.setColumnAlignment("numeroSolicitud", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaSolicitud", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaFinSolicitud", XlsAlignment.center);
			sheet1.setColumnAlignment("solicitante", XlsAlignment.left);
			sheet1.setColumnAlignment("nroInversionComercial", XlsAlignment.left);
			sheet1.setColumnAlignment("areaDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("distritoDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("gteDistrito", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreAPM", XlsAlignment.left);
			sheet1.setColumnAlignment("emailAPM", XlsAlignment.left);
			sheet1.setColumnAlignment("fecha", XlsAlignment.center);
			sheet1.setColumnAlignment("apellido", XlsAlignment.left);
			sheet1.setColumnAlignment("nombre", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("mesInversion", XlsAlignment.center);
			sheet1.setColumnAlignment("formaPago", XlsAlignment.left);
			sheet1.setColumnAlignment("motivoRechazo", XlsAlignment.left);
			sheet1.setColumnAlignment("estado", XlsAlignment.left);
			sheet1.setColumnAlignment("tarea", XlsAlignment.left);
			
			sheet1.setColumnAlignment("comentariosCongreso", XlsAlignment.left);
			sheet1.setColumnAlignment("web", XlsAlignment.left);
			sheet1.setColumnAlignment("cartaPetitorioDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("cartaAcuerdoDescripcion", XlsAlignment.left);
			sheet1.setColumnAlignment("flyerDescripcion", XlsAlignment.left);

			
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
