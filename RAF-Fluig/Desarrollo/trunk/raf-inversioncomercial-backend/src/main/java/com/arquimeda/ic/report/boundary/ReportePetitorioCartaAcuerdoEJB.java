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
import com.arquimeda.ic.report.boundary.dto.ReportePetitorioCartaAcuerdoDTO;
import com.arquimeda.ic.report.boundary.filter.ReportePetitorioCartaAcuerdoFilter;
import com.arquimeda.ic.report.entity.PetitorioCartaAcuerdo;
import com.arquimeda.ic.utils.ScrollableResultsIteratorImpl;

@Stateless
public class ReportePetitorioCartaAcuerdoEJB {

	private static final String _ADM = "adm";
	private static final String _RAF10_AUDITORIA = "RAF10-AUDITORIA";
	private static final String _RAF10_ADM = "RAF10-ADM";
	private static final String _RAF10_GTOR_PROCESO = "RAF10-GTOR-PROCESO";

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject @LoggedUser
	Usuario usuario;
	
	@Inject
	Logger logger;
	
	private FiltroGrupo filtroGrupo;
	
	public Long count(ReportePetitorioCartaAcuerdoFilter filter) {
		
		filtroGrupo = getFiltroGrupo();
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(c) FROM PetitorioCartaAcuerdo c " + filter.getWhere() + filtroGrupo.getWhere(), Long.class);
    	
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
		return count;
	}
	
	public List<ReportePetitorioCartaAcuerdoDTO> loadItems(Integer firsResult, Integer maxResults, String[] sortByArray, Boolean[] sortDescArray, ReportePetitorioCartaAcuerdoFilter filter) {
		
    	String sortBy = Optional.ofNullable(firstOrNull(sortByArray)).orElse("c.numeroSolicitud");

    	if (Optional.ofNullable(firstOrNull(sortDescArray)).orElse(true)) {
    		sortBy+=" desc";
    	} else {
    		sortBy+=" asc";
    	}
    	
    	filtroGrupo = getFiltroGrupo();
    	
		// Busco la pagina
    	TypedQuery<PetitorioCartaAcuerdo> query = em.createQuery("SELECT c FROM PetitorioCartaAcuerdo c " + filter.getWhere() + filtroGrupo.getWhere() + " ORDER BY " + sortBy, PetitorioCartaAcuerdo.class);
    	query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
    	filter.addParameters(query);
        
    	List<ReportePetitorioCartaAcuerdoDTO> list = query
        		.setFirstResult(firsResult)
        		.setMaxResults(maxResults)
        		.setHint(QueryHints.READ_ONLY, true)
        		.getResultList()    		
        		.stream()
        		.map(ReportePetitorioCartaAcuerdoDTO::fromEntity)
        		.collect(Collectors.toCollection(ArrayList::new)); 
    	
    	logger.info("ReportePetitorioCartaAcuerdo QUERY: " + query.unwrap(org.hibernate.Query.class).getQueryString());
    	
		return list;
		
	}	
	
	private <T> T firstOrNull(T[] array) {
    	T ret = null;
    	if (array != null && array.length > 0) {
    		ret = array[0];
    	}
		return ret;
	}
	
	
	public ReportePetitorioCartaAcuerdoDTO find(Integer id) {
		
		PetitorioCartaAcuerdo entity = em.find(PetitorioCartaAcuerdo.class, id);
		return ReportePetitorioCartaAcuerdoDTO.fromEntity(entity);
	
	}
	
	public Iterator<ReportePetitorioCartaAcuerdoDTO> getIterator(ReportePetitorioCartaAcuerdoFilter filter) {

		filtroGrupo = getFiltroGrupo();
		
		TypedQuery<ReportePetitorioCartaAcuerdoDTO> query = em.createQuery("SELECT NEW com.arquimeda.ic.report.boundary.dto.ReportePetitorioCartaAcuerdoDTO(c) FROM PetitorioCartaAcuerdo c "  
																			+ filter.getWhere() + filtroGrupo.getWhere() + " ORDER BY c.id", ReportePetitorioCartaAcuerdoDTO.class);
		
		query.setParameter(filtroGrupo.getNombreParametro(), filtroGrupo.getValoresParametro());
		filter.addParameters(query);

		Query hquery = query.unwrap(Query.class);
		final ScrollableResults results = hquery.scroll(ScrollMode.FORWARD_ONLY);

		return new ScrollableResultsIteratorImpl<ReportePetitorioCartaAcuerdoDTO>(results);

	}
	
	public FiltroGrupo getFiltroGrupo(){
			
		String where = "";
    	String nombreParametro = "";
    	List<String> valoresParametro = new ArrayList<String>();
    	
    	if(usuario.isEnGrupo(_RAF10_GTOR_PROCESO) || usuario.isEnGrupo(_RAF10_AUDITORIA) || usuario.isEnGrupo(_ADM) || usuario.isEnGrupo(_RAF10_ADM)){
    		
    		where = " AND :uno = :uno ";
    		nombreParametro = "uno";
        	valoresParametro.add("1");
        
       	} else if(usuario.isEnGrupo("RAF10-GTE-MARKETING")){
       		
    		where = " AND c.codGrupoGteMKT IN :codGrupoGteMKT ";
    		nombreParametro = "codGrupoGteMKT";
    		valoresParametro = usuario.getCodigosGrupo("RAF10-GTE-MARKETING");
        	
    	} else if(usuario.isEnGrupo("RAF08-GTE-PROMO-")){
    		
    		where = " AND c.codGrupoGtePromocion IN :codGrupoGtePromocion ";
    		nombreParametro = "codGrupoGtePromocion";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-PROMO-");
        	
    	}else if(usuario.isEnGrupo("RAF08-GTE-AREA-")){				
    		
    		where = " AND c.codGrupoGteArea IN :codigosGrupoGteArea ";
    		nombreParametro = "codigosGrupoGteArea";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-AREA-");
        	
    	} else if(usuario.isEnGrupo("RAF08-ASIST-DIST-") && usuario.isEnGrupo("RAF10-SOL-LINEA-")){
    		
    		where = " AND (c.codGrupoAsistDistrito IN :codigoGrupoAsistDistrito OR c.codGrupoSolicitante IN :codigoGrupoAsistDistrito) ";
    		nombreParametro = "codigoGrupoAsistDistrito";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-ASIST-DIST-");  
    		valoresParametro.addAll(usuario.getCodigosGrupo("RAF10-SOL-LINEA-"));
        
    	} else if(usuario.isEnGrupo("RAF08-GTE-DIST-") || usuario.isEnGrupo("RAF10-SOL-LINEA-")){
    		
    		where = " AND c.codGrupoSolicitante IN :codGrupoSolicitante ";
    		nombreParametro = "codGrupoSolicitante";
        	valoresParametro = usuario.getCodigosGrupo("RAF08-GTE-DIST-");
        	valoresParametro.addAll(usuario.getCodigosGrupo("RAF10-SOL-LINEA-"));
        	
    	} else if(usuario.isEnGrupo("RAF08-ASIST-DIST-")){
    		
    		where = " AND c.codGrupoAsistDistrito IN :codigoGrupoAsistDistrito ";
    		nombreParametro = "codigoGrupoAsistDistrito";
    		valoresParametro = usuario.getCodigosGrupo("RAF08-ASIST-DIST-");  
        
    	} else if(usuario.isEnGrupo("RAF10-DER-")){
    		
    		where = " AND c.codGrupoDerivacion IN :codGrupoDerivacion ";
    		nombreParametro = "codGrupoDerivacion";
        	valoresParametro = usuario.getCodigosGrupoEnPool("RAF10-DER-");
        	
    	}else {
    		// Sino no ve nada.
    		where = " AND :uno != :uno ";
    		nombreParametro = "uno";
    		valoresParametro.add("1");
    	}
		
    	logger.info("ReportePetitorioCartaAcuerdo GRUPOS: " + nombreParametro + ": " +  valoresParametro);
    	
    	return new FiltroGrupo(where, nombreParametro, valoresParametro);
		
	}
		
	public File export(ReportePetitorioCartaAcuerdoFilter filter) {
		
		File file = null;
		FileOutputStream fileOutputStream = null;
		XlsExporter exporter = null;

		try {

			file = File.createTempFile("ReportePetitorioCartaAcuerdo_", ".xlsx");			
			fileOutputStream = new FileOutputStream(file);

			exporter = new XlsExporter(new DefaultXlsTemplate());

			XlsSheet sheet1 = exporter.addSheet("ReportePetitorioCartaAcuerdo");	
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
			columnNames.add("solicitante");
			columnNames.add("area");
			columnNames.add("lineaRegion");
			columnNames.add("grupoGteMKT");
			columnNames.add("nombreAPM");
			columnNames.add("fecha");
			columnNames.add("apellido");
			columnNames.add("nombre");
			columnNames.add("tipoInversion");
			columnNames.add("detalleInversion");
			columnNames.add("mesInversion");
			columnNames.add("tipoProducto");
			columnNames.add("motivoRechazo");
			columnNames.add("estado");
			columnNames.add("tarea");
			
			columnHeaders.add("NRO SOLICITUD");
			columnHeaders.add("FECHA SOLICITUD");
			columnHeaders.add("SOLICITANTE");
			columnHeaders.add("AREA");
			columnHeaders.add("LINEA/REGION");
			columnHeaders.add("GRUPO MKT");
			columnHeaders.add("APM");
			columnHeaders.add("FECHA");
			columnHeaders.add("APELLIDO");
			columnHeaders.add("NOMBRE");
			columnHeaders.add("TIPO INVERSION");
			columnHeaders.add("DETALLE DE LA INVERSION");
			columnHeaders.add("MES DE LA INVERSION");
			columnHeaders.add("TIPO DE PRODUCTO");
			columnHeaders.add("MOTIVO DE RECHAZO");
			columnHeaders.add("ESTADO");
			columnHeaders.add("TAREA");
			
			sheet1.setColumnWidth("numeroSolicitud", 20);
			sheet1.setColumnWidth("fechaSolicitud", 30);
			sheet1.setColumnWidth("solicitante", 40);
			sheet1.setColumnWidth("area", 40);
			sheet1.setColumnWidth("lineaRegion", 40);
			sheet1.setColumnWidth("grupoGteMKT", 40);
			sheet1.setColumnWidth("nombreAPM", 40);
			sheet1.setColumnWidth("fecha", 40);
			sheet1.setColumnWidth("apellido", 40);
			sheet1.setColumnWidth("nombre", 40);
			sheet1.setColumnWidth("tipoInversion", 40);
			sheet1.setColumnWidth("detalleInversion", 40);
			sheet1.setColumnWidth("mesInversion", 20);
			sheet1.setColumnWidth("tipoProducto", 40);
			sheet1.setColumnWidth("motivoRechazo", 40);
			sheet1.setColumnWidth("estado", 40);
			sheet1.setColumnWidth("tarea", 40);
						
			sheet1.setColumnFormat("fechaSolicitud", "m/d/yy");
			sheet1.setColumnFormat("fecha", "m/d/yy");
			sheet1.setColumnFormat("mesInversion", "m/yy");

			sheet1.setColumnAlignment("numeroSolicitud", XlsAlignment.left);
			sheet1.setColumnAlignment("fechaSolicitud", XlsAlignment.center);
			sheet1.setColumnAlignment("solicitante", XlsAlignment.left);
			sheet1.setColumnAlignment("area", XlsAlignment.left);
			sheet1.setColumnAlignment("lineaRegion", XlsAlignment.left);
			sheet1.setColumnAlignment("grupoGteMKT", XlsAlignment.left);
			sheet1.setColumnAlignment("nombreAPM", XlsAlignment.left);
			sheet1.setColumnAlignment("fecha", XlsAlignment.center);
			sheet1.setColumnAlignment("apellido", XlsAlignment.left);
			sheet1.setColumnAlignment("nombre", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("detalleInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("mesInversion", XlsAlignment.left);
			sheet1.setColumnAlignment("tipoProducto", XlsAlignment.left);
			sheet1.setColumnAlignment("motivoRechazo", XlsAlignment.left);
			sheet1.setColumnAlignment("estado", XlsAlignment.left);
			sheet1.setColumnAlignment("tarea", XlsAlignment.left);

			
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
