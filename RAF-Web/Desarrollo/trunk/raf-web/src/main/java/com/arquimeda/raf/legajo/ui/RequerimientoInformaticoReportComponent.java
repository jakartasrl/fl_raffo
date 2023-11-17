package com.arquimeda.raf.legajo.ui;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.arquimeda.daffy.container.FiltrableLazyQueryContainer;
import com.arquimeda.daffy.container.qualifier.FiltrableLazyLoadingContainer;
import com.arquimeda.daffy.container.qualifier.FiltrableLazyLoadingContainer.Type;
import com.arquimeda.daffy.crud.ui.CrudLayoutManager;
import com.arquimeda.daffy.crud.ui.ExportedColumn;
import com.arquimeda.daffy.crud.ui.FormPopUpFiltrableLayoutManager;
import com.arquimeda.daffy.crud.ui.ReportComponent;
import com.arquimeda.daffy.crud.ui.ReportController;
import com.arquimeda.daffy.crud.ui.TableColumn;
import com.arquimeda.daffy.exporter.Exporter;
import com.arquimeda.daffy.exporter.HorizontalAlignment;
import com.arquimeda.daffy.i18n.App;
import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.legajo.biz.boundary.RequerimientoInformaticoEJB;
import com.arquimeda.raf.legajo.biz.control.RequerimientoInformaticoCrudFilter;
import com.arquimeda.raf.legajo.biz.entity.RequerimientoInformatico;
import com.vaadin.data.util.BeanItem;
import com.vaadin.ui.Button;
import com.vaadin.ui.Component;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.Table;
import com.vaadin.ui.Table.ColumnGenerator;

public class RequerimientoInformaticoReportComponent extends CustomComponent implements ReportController<RequerimientoInformatico, RequerimientoInformaticoCrudFilter>{
	
	private static final long serialVersionUID = 1L;
	
	@Inject @FiltrableLazyLoadingContainer(type=Type.ejbFiltrable, clazz=RequerimientoInformaticoEJB.class)
	FiltrableLazyQueryContainer<RequerimientoInformatico, RequerimientoInformaticoCrudFilter> container;
	
	@Inject
	ReportComponent<RequerimientoInformatico, RequerimientoInformaticoCrudFilter> reportComponent;
	
	@Inject
	FormPopUpFiltrableLayoutManager<RequerimientoInformatico> formPopUpFiltrableCrudLayout;
		
	@Inject
	RequerimientoInformaticoEJB requerimientoInformaticoEJB;
	
	@Inject
	RequerimientoInformaticoReportForm requerimientoInformaticoReportForm;
	
	@Inject
	RequerimientoInformaticoReportFilterForm requerimientoInformaticoReportFilterForm;
	
	@Inject
	RequerimientoInformaticoCrudFilter requerimientoInformaticoCrudFilter;

	@Inject
	@App
	Messages messages;
	
	String[] propertyIds = new String[]{"nroSolicitud","pendiente","fechaIngresoNecesaria","nombre","apellido","puesto","gerencia", "area", "sector",
			"subSector", "centroCosto", "reportaA", "tipoPosicion", "pea", "sede", "ubicacionFisica", "equipamientoRequerido",
			"usuarioQAD", "accesos", "webmail", "telefonia"};
	
	@PostConstruct
	public void init(){
		
		reportComponent.init(this);
		setCompositionRoot(reportComponent);
		
	}
	
	public FiltrableLazyQueryContainer<RequerimientoInformatico, RequerimientoInformaticoCrudFilter> getContainer() {
		container.addContainerProperty("nombreCompleto", String.class, "", true, false);
		return container;		
	}
	
	@Override
	public Class<RequerimientoInformatico> getEntityClass() {
		return RequerimientoInformatico.class;
	}
	
	@Override
	public RequerimientoInformatico createEntity() {
		return new RequerimientoInformatico();
	}
	
	@Override
	public RequerimientoInformaticoCrudFilter createFilter() {
		return new RequerimientoInformaticoCrudFilter();
	}

	@Override
	public BeanItem<RequerimientoInformatico> createBeanItem(RequerimientoInformatico entity) {
		return new BeanItem<RequerimientoInformatico>(entity, propertyIds);
	}

	@Override
	public BeanItem<RequerimientoInformaticoCrudFilter> createFilterBeanItem(RequerimientoInformaticoCrudFilter filter) {
		return new BeanItem<RequerimientoInformaticoCrudFilter>(filter, new String[]{"fechaAltaDesde","fechaAltaHasta","puesto","sector","reportaA","pendiente","sede", "nombre", "apellido"});	
	}
	
	
	@Override
	public List<TableColumn> getTableColumns() {
		
		List<TableColumn> columns = new ArrayList<TableColumn>();

		columns.add(new TableColumn("nroSolicitud", 0.04f, false, Table.Align.CENTER));
		columns.add(new TableColumn("pendiente", 0.04f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<RequerimientoInformatico> beanItem = (BeanItem<RequerimientoInformatico>) source.getItem(itemId);
				RequerimientoInformatico entity = beanItem.getBean();

				if(entity.getPendiente())
					return "SI";
				else
					return "NO";
			}

		}));
		columns.add(new TableColumn("fechaIngresoNecesaria", 0.05f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<RequerimientoInformatico> beanItem = (BeanItem<RequerimientoInformatico>) source.getItem(itemId);
				RequerimientoInformatico entity = beanItem.getBean();
				Date fechaIngresoNecesaria = entity.getFechaIngresoNecesaria();
				
				if(fechaIngresoNecesaria != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
					return dateFormat.format(fechaIngresoNecesaria);				
				}else{
					return "";
				}
			}

		}));
		columns.add(new TableColumn("nombreCompleto", 0.08f, false, Table.Align.LEFT, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<RequerimientoInformatico> beanItem = (BeanItem<RequerimientoInformatico>) source.getItem(itemId);
				RequerimientoInformatico entity = beanItem.getBean();

				return entity.getApellido() + ", " + entity.getNombre();
			}

		}));
		columns.add(new TableColumn("puesto", 0.07f, false, Table.Align.LEFT));		
		columns.add(new TableColumn("gerencia", 0.07f, false, Table.Align.LEFT));
		columns.add(new TableColumn("area", 0.06f, false, Table.Align.LEFT));
		columns.add(new TableColumn("sector", 0.06f, false, Table.Align.LEFT));
		columns.add(new TableColumn("subSector", 0.06f, false, Table.Align.LEFT));
		columns.add(new TableColumn("centroCosto", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("reportaA", 0.05f, false, Table.Align.LEFT));
		columns.add(new TableColumn("tipoPosicion", 0.04f, false, Table.Align.LEFT, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<RequerimientoInformatico> beanItem = (BeanItem<RequerimientoInformatico>) source.getItem(itemId);
				RequerimientoInformatico entity = beanItem.getBean();

				if(entity.getTipoPosicion().equals("puestoNuevo"))
					return "Puesto Nuevo";
				else
					return "Reemplazo";
			}

		}));
		columns.add(new TableColumn("pea", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("sede", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("ubicacionFisica", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("equipamientoRequerido", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("usuarioQAD", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("accesos", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("webmail", 0.04f, false, Table.Align.LEFT));
		columns.add(new TableColumn("telefonia", 0.06f, false, Table.Align.LEFT));
		
		return columns;

	}

	public List<ExportedColumn> getExportedColumns(){

		List<ExportedColumn> columns = new ArrayList<ExportedColumn>();
		
		columns.add(new ExportedColumn("nroSolicitud", HorizontalAlignment.center));
		columns.add(new ExportedColumn("pendiente",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				RequerimientoInformatico ri = (RequerimientoInformatico) entity;	
				
				if(ri.getPendiente())
					return "SI";
				else
					return "NO";				
			}
		}));
		columns.add(new ExportedColumn("fechaIngresoNecesaria",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				RequerimientoInformatico ri = (RequerimientoInformatico) entity;					
				Date fechaIngresoNecesaria = ri.getFechaIngresoNecesaria();
				
				if(fechaIngresoNecesaria != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
					return dateFormat.format(fechaIngresoNecesaria);				
				}else{
					return "";
				}
			}
		}));
		columns.add(new ExportedColumn("nombre"));
		columns.add(new ExportedColumn("apellido"));
		columns.add(new ExportedColumn("puesto"));
		columns.add(new ExportedColumn("gerencia"));
		columns.add(new ExportedColumn("area"));
		columns.add(new ExportedColumn("sector"));
		columns.add(new ExportedColumn("subSector"));
		columns.add(new ExportedColumn("centroCosto"));
		columns.add(new ExportedColumn("reportaA"));
		columns.add(new ExportedColumn("tipoPosicion",HorizontalAlignment.left,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				RequerimientoInformatico ri = (RequerimientoInformatico) entity;	
				
				if(ri.getTipoPosicion().equals("puestoNuevo"))
					return "Puesto Nuevo";
				else
					return "Reemplazo";
			}
		}));
		columns.add(new ExportedColumn("pea"));
		columns.add(new ExportedColumn("sede"));
		columns.add(new ExportedColumn("ubicacionFisica"));
		columns.add(new ExportedColumn("equipamientoRequerido"));
		columns.add(new ExportedColumn("usuarioQAD"));
		columns.add(new ExportedColumn("accesos"));
		columns.add(new ExportedColumn("webmail"));
		columns.add(new ExportedColumn("telefonia"));

		return columns;
		
	}

	@Override
	public CrudLayoutManager<RequerimientoInformatico> getLayoutManager() {
		return formPopUpFiltrableCrudLayout;
	}

	@Override
	public Button getHelpButton() {
		return null;
	}

	@Override
	public Map<String, Object> totalize(RequerimientoInformaticoCrudFilter filter) {
		
		Map<String, Object> footers = new HashMap<String, Object>();		
		return footers;
		
	}

	@Override
	public void customizeTable(Table table) {
		table.setHeight("515px");
		for(String property : propertyIds){
			table.setColumnWidth(property, -1);
		}
		table.setColumnWidth("nombreCompleto", -1);
	}

	@Override
	public Iterator<RequerimientoInformatico> export(RequerimientoInformaticoCrudFilter filter) {
		return requerimientoInformaticoEJB.export(filter);
	}

	@Override
	public Component getFilterForm() {
		return requerimientoInformaticoReportFilterForm;
	}

	@Override
	public Component getViewForm() {
		return requerimientoInformaticoReportForm;
	}

}