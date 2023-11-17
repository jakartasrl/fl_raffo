package com.arquimeda.ic.parameters.biz.boundary;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
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
import com.arquimeda.ic.fdn.boundary.NumeradorEJB;
import com.arquimeda.ic.fdn.entity.Usuario;
import com.arquimeda.ic.parameters.biz.dto.CongresoDTO;
import com.arquimeda.ic.parameters.biz.dto.CongresoExportDTO;
import com.arquimeda.ic.parameters.biz.entity.Congreso;
import com.arquimeda.ic.parameters.biz.entity.Country;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.arquimeda.ic.parameters.biz.entity.State;
import com.arquimeda.ic.parameters.biz.filter.CongresoFilter;
import com.arquimeda.ic.producer.LoggedUser;
import com.arquimeda.ic.utils.ScrollableResultsIteratorImpl;

@Stateless
public class CongresoEJB {
	
	private static final String _ADM = "adm";
	private static final String _RAF08_ADM = "RAF08-ADM";
	private static final String _RAF08_GTOR_PROCESO = "RAF08-GTOR-PROCESO";
	private static final String _RAF08_APM = "RAF08-APM";
	private static final String _NUMERADOR = "raf08.congresos.nro";
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
	
	@Inject @LoggedUser
	Usuario usuario;
	
	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	@Inject
	NumeradorEJB numeradorEJB;
	
	public Long count(CongresoFilter filter) {
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(c) FROM Congreso c " + filter.getWhere(), Long.class);
		
    	
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
		return count;
	}
	
	public List<CongresoDTO> loadItems(Integer firsResult, Integer maxResults, String[] sortByArray, Boolean[] sortDescArray, CongresoFilter filter) {
		
    	String sortBy = Optional.ofNullable(firstOrNull(sortByArray)).orElse("c.id ");

    	if (Optional.ofNullable(firstOrNull(sortDescArray)).orElse(true)) {
    		sortBy+=" desc";
    	} else {
    		sortBy+=" asc";
    	}
    	
		// Busco la pagina
    	TypedQuery<Congreso> query = em.createQuery(
    			"SELECT c FROM Congreso c "  + filter.getWhere() +
    	        " ORDER BY " + sortBy, Congreso.class);
 	
    	filter.addParameters(query);
        
    	List<CongresoDTO> list =	query
        		.setFirstResult(firsResult)
        		.setMaxResults(maxResults)
        		.setHint(QueryHints.READ_ONLY, true)
        		.getResultList()    		
        		.stream()
        		.map(CongresoDTO::fromEntity)
        		.collect(Collectors.toCollection(ArrayList::new));  
    	
       	logger.info("Reporte Congresos QUERY: " + query.unwrap(org.hibernate.Query.class).getQueryString());
            	
		return list;
		
	}	
	
	private <T> T firstOrNull(T[] array) {
    	T ret = null;
    	if (array != null && array.length > 0) {
    		ret = array[0];
    	}
		return ret;
	}
	
	public CongresoDTO save(CongresoDTO dto){
		
		logger.info("################## Nuevo Congreso ..." + dto);
	
		String anio = sdf.format(dto.getFechaInicio());
	
		if(dto.getSiglas() != null && !"".equals(dto.getSiglas())) {
			if(validarSiglas(dto.getSiglas(), anio, -1)) {
				throw new IllegalArgumentException("El congreso que intenta crear ya existe.");
			}
		}
		
		Congreso entity = new Congreso();
		
		entity.setCodigo(numeradorEJB.getNextNumComprobante(_NUMERADOR, anio)); 
		entity.setAnio(anio);
		entity.setSiglas(dto.getSiglas() != null? dto.getSiglas().toUpperCase() : dto.getSiglas());
		entity.setNombre(dto.getNombre().toUpperCase());
		entity.setNacional(dto.getNacional());
		entity.setCountry(em.getReference(Country.class, dto.getCountry().getId()));
		entity.setState(dto.getState() != null? em.getReference(State.class, dto.getState().getId()) : null);
		entity.setEstado(dto.getEstado() != null? dto.getEstado().toUpperCase() : dto.getEstado());
		entity.setLocalidad(dto.getLocalidad() != null? dto.getLocalidad().toUpperCase() : dto.getLocalidad());
		entity.setFechaInicio(dto.getFechaInicio());
		entity.setFechaFin(dto.getFechaFin());
		entity.setDiasLimiteCarga(dto.getDiasLimiteCarga());
		entity.setPresupuestoHabilitado(dto.getPresupuestoHabilitado());
		entity.setWeb(dto.getWeb()!= null? dto.getWeb().toUpperCase() : dto.getWeb());
		entity.setMetadata(dto.getMetadata() != null? dto.getMetadata().toUpperCase() : dto.getMetadata());
		entity.setHabitacionSimple(dto.getHabitacionSimple());
		entity.setHabitacionDoble(dto.getHabitacionDoble());
		entity.setHabitacionTriple(dto.getHabitacionTriple());
		entity.setVueloDirecto(dto.getVueloDirecto());
		entity.setVueloEscalas(dto.getVueloEscalas());
		entity.setLugarEvento(dto.getLugarEvento());
		entity.setFechaCheckin(dto.getFechaCheckin());
		entity.setFechaCheckout(dto.getFechaCheckout());
		entity.setFechaAlta(new Date());
				
		em.persist(entity);
		
		return CongresoDTO.fromEntity(entity);	

	}
	
	public CongresoDTO delete(Integer id) {

		Congreso entity = em.find(Congreso.class, id);
		em.remove(entity);
		
		return CongresoDTO.fromEntity(entity);
	}
	
	public CongresoDTO update(CongresoDTO dto) {
		
		String anio = sdf.format(dto.getFechaInicio());
		
		logger.info("################## Actualizar Congreso ..." + dto);

		Congreso entity = em.find(Congreso.class, dto.getId());
		
		if(entity == null) {
			return null;
		}
		
		
		if(!anio.equals(entity.getAnio())) {
			throw new IllegalArgumentException("No se puede modificar el año del congreso.");
		}
		
		if(dto.getSiglas() != null && !"".equals(dto.getSiglas())) {
			if(validarSiglas(dto.getSiglas(), anio, dto.getId())) {
				throw new IllegalArgumentException("Ya existe un congreso con las siglas indicadas.");
			}
		}
		
		entity.setSiglas(dto.getSiglas() != null? dto.getSiglas().toUpperCase() : dto.getSiglas());
		entity.setNombre(dto.getNombre().toUpperCase());
		entity.setNacional(dto.getNacional());
		entity.setCountry(em.getReference(Country.class, dto.getCountry().getId()));
		entity.setState(dto.getState() != null? em.getReference(State.class, dto.getState().getId()) : null);
		entity.setEstado(dto.getEstado() != null? dto.getEstado().toUpperCase() : dto.getEstado());
		entity.setLocalidad(dto.getLocalidad() != null? dto.getLocalidad().toUpperCase() : dto.getLocalidad());
		entity.setFechaInicio(dto.getFechaInicio());
		entity.setFechaFin(dto.getFechaFin());
		entity.setDiasLimiteCarga(dto.getDiasLimiteCarga());
		entity.setPresupuestoHabilitado(dto.getPresupuestoHabilitado());
		entity.setWeb(dto.getWeb()!= null? dto.getWeb().toUpperCase() : dto.getWeb());
		entity.setMetadata(dto.getMetadata() != null? dto.getMetadata().toUpperCase() : dto.getMetadata());
		entity.setHabitacionSimple(dto.getHabitacionSimple());
		entity.setHabitacionDoble(dto.getHabitacionDoble());
		entity.setHabitacionTriple(dto.getHabitacionTriple());
		entity.setVueloDirecto(dto.getVueloDirecto());
		entity.setVueloEscalas(dto.getVueloEscalas());
		entity.setFechaUltimaModificacion(new Date());
		entity.setLugarEvento(dto.getLugarEvento() != null? dto.getLugarEvento().toUpperCase() :  null);
		entity.setFechaCheckin(dto.getFechaCheckin());
		entity.setFechaCheckout(dto.getFechaCheckout());
		
		return CongresoDTO.fromEntity(entity);
	}
	
	public CongresoDTO find(Integer id) {
		
		Congreso entity = em.find(Congreso.class, id);
		return CongresoDTO.fromEntity(entity);
	
	}
	
	private Boolean validarSiglas(String siglas, String anio, Integer id) {
		
    	TypedQuery<String> query = em.createQuery(
    			"SELECT c.codigo " +
    			" FROM Congreso c " +
    			" WHERE c.siglas = :siglas " +
    			" AND c.anio = :anio " +
    			" AND c.id <> :id", String.class)
    			.setParameter("siglas", siglas)
    			.setParameter("anio", anio)
    			.setParameter("id", id);

		List<String> list = query
				.setHint(QueryHints.READ_ONLY, true)
				.getResultList()    		
				.stream()
				.collect(Collectors.toCollection(ArrayList::new)); 			
		
		return !list.isEmpty();
	}
	
	public Iterator<CongresoExportDTO> getIterator(CongresoFilter filter) {

		TypedQuery<CongresoExportDTO> query = em.createQuery("SELECT NEW com.arquimeda.ic.parameters.biz.dto.CongresoExportDTO(c) " +
		" FROM Congreso c "  + filter.getWhere() + " ORDER BY c.id", CongresoExportDTO.class);
		
		
		filter.addParameters(query);

		Query hquery = query.unwrap(Query.class);
		final ScrollableResults results = hquery.scroll(ScrollMode.FORWARD_ONLY);

		return new ScrollableResultsIteratorImpl<CongresoExportDTO>(results);

	}
	
	public File export(CongresoFilter filter) {
		
		File file = null;
		FileOutputStream fileOutputStream = null;
		XlsExporter exporter = null;

		try {

			file = File.createTempFile("Congresos_", ".xlsx");			
			fileOutputStream = new FileOutputStream(file);

			exporter = new XlsExporter(new DefaultXlsTemplate());

			XlsSheet sheet1 = exporter.addSheet("Congresos");	
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

			columnNames.add("codigo");
			columnNames.add("siglas");
			columnNames.add("nombre");
			columnNames.add("nacional");
			columnNames.add("country");
			columnNames.add("state");
			columnNames.add("localidad");
			columnNames.add("lugarEvento");
			columnNames.add("anio");
			columnNames.add("fechaInicio");
			columnNames.add("fechaFin");
			columnNames.add("fechaCheckin");
			columnNames.add("fechaCheckout");
			columnNames.add("diasLimiteCarga");
			columnNames.add("presupuestoHabilitado");
			columnNames.add("web");
			columnNames.add("metadata");
			columnNames.add("habitacionSimple");
			columnNames.add("habitacionDoble");
			columnNames.add("habitacionTriple");
			columnNames.add("vueloDirecto");
			columnNames.add("vueloEscalas");
			
			columnHeaders.add("CODIGO");
			columnHeaders.add("SIGLAS DEL CONGRESO");
			columnHeaders.add("NOMBRE");
			columnHeaders.add("NACIONAL");
			columnHeaders.add("PAIS");
			columnHeaders.add("PROVINCIA");
			columnHeaders.add("LOCALIDAD");
			columnHeaders.add("LUGAR DEL EVENTO");
			columnHeaders.add("AÑO");
			columnHeaders.add("FECHA INICIO DEL EVENTO");
			columnHeaders.add("FECHA FIN DEL EVENTO");
			columnHeaders.add("FECHA CHECKIN");
			columnHeaders.add("FECHA CHECKOUT");
			columnHeaders.add("DIAS LIMITE DE CARGA");
			columnHeaders.add("PRESUPUESTO HABILITADO");
			columnHeaders.add("WEB");
			columnHeaders.add("METADATA");
			columnHeaders.add("HABITACION SIMPLE");
			columnHeaders.add("HABITACION DOBLE");
			columnHeaders.add("HABITACION TRIPLE");
			columnHeaders.add("VUELO DIRECTO");
			columnHeaders.add("VUELO ESCALAS");
			
			sheet1.setColumnWidth("codigo", 20);
			sheet1.setColumnWidth("siglas", 26);
			sheet1.setColumnWidth("nombre", 80);
			sheet1.setColumnWidth("nacional", 15);
			sheet1.setColumnWidth("country", 45);
			sheet1.setColumnWidth("state", 45);
			sheet1.setColumnWidth("localidad", 45);
			sheet1.setColumnWidth("lugarEvento", 45);
			sheet1.setColumnWidth("anio", 15);
			sheet1.setColumnWidth("fechaInicio", 30);
			sheet1.setColumnWidth("fechaFin", 30);
			sheet1.setColumnWidth("fechaCheckin", 20);
			sheet1.setColumnWidth("fechaCheckout", 20);
			sheet1.setColumnWidth("diasLimiteCarga", 35);
			sheet1.setColumnWidth("presupuestoHabilitado", 30);
			sheet1.setColumnWidth("web", 80);
			sheet1.setColumnWidth("metadata", 80);
			sheet1.setColumnWidth("habitacionSimple", 20);
			sheet1.setColumnWidth("habitacionDoble", 20);
			sheet1.setColumnWidth("habitacionTriple", 20);
			sheet1.setColumnWidth("vueloDirecto", 20);
			sheet1.setColumnWidth("vueloEscalas", 20);
						
			sheet1.setColumnFormat("fechaInicio", "m/d/yy");
			sheet1.setColumnFormat("fechaFin", "m/d/yy");
			sheet1.setColumnFormat("fechaCheckin", "m/d/yy");
			sheet1.setColumnFormat("fechaCheckout", "m/d/yy");

			sheet1.setColumnAlignment("codigo", XlsAlignment.left);
			sheet1.setColumnAlignment("siglas", XlsAlignment.left);
			sheet1.setColumnAlignment("nombre", XlsAlignment.left);
			sheet1.setColumnAlignment("nacional", XlsAlignment.left);
			sheet1.setColumnAlignment("country", XlsAlignment.left);
			sheet1.setColumnAlignment("state", XlsAlignment.left);
			sheet1.setColumnAlignment("localidad", XlsAlignment.left);
			sheet1.setColumnAlignment("lugarEvento", XlsAlignment.left);
			sheet1.setColumnAlignment("anio", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaInicio", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaCheckin", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaCheckout", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaFin", XlsAlignment.center);
			sheet1.setColumnAlignment("diasLimiteCarga", XlsAlignment.left);
			sheet1.setColumnAlignment("presupuestoHabilitado", XlsAlignment.left);
			sheet1.setColumnAlignment("web", XlsAlignment.left);
			sheet1.setColumnAlignment("metadata", XlsAlignment.left);
			sheet1.setColumnAlignment("habitacionSimple", XlsAlignment.center);
			sheet1.setColumnAlignment("habitacionDoble", XlsAlignment.center);
			sheet1.setColumnAlignment("habitacionTriple", XlsAlignment.center);
			sheet1.setColumnAlignment("vueloDirecto", XlsAlignment.center);
			sheet1.setColumnAlignment("vueloEscalas", XlsAlignment.center);
			
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
	
	public List<PresupuestoHabilitado> getPresupuestos(){
		
		List<PresupuestoHabilitado> list = new ArrayList<PresupuestoHabilitado>();
		
		//if(usuario.isEnGrupo(_RAF08_GTOR_PROCESO) || usuario.isEnGrupo(_ADM) || usuario.isEnGrupo(_RAF08_ADM) || usuario.isEnGrupo("RAF08-MARKETING")){
		if(usuario.isEnGrupo("RAF08-MARKETING")){
			list.add(PresupuestoHabilitado.MARKETING);
			list.add(PresupuestoHabilitado.COMBINADO);
			list.add(PresupuestoHabilitado.DELEGADO);
		}else {
			list.add(PresupuestoHabilitado.DELEGADO);
		}
		
		logger.info("Permisos RAF08-Congreso: " + list);
		
		return list;
	}

	public Boolean isReadonly() {
		return !usuario.isEnGrupo("RAF08-MARKETING");
	}

	public List<CongresoDTO> getCongresos() {
		
		List<CongresoDTO> congresos = new ArrayList<CongresoDTO>();

		TypedQuery<Congreso> query = em.createQuery(
				"SELECT c " +
						"  FROM Congreso c " +
						" ORDER BY c.nombre ASC", Congreso.class);

		List<Congreso> list = query.getResultList();
		
		for (Congreso congreso : list) {
			CongresoDTO dto = CongresoDTO.fromEntity(congreso);
			congresos.add(dto);
		}

		return congresos;
	}
}
