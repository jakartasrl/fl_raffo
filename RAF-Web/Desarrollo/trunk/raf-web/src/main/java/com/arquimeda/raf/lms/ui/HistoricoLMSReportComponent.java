package com.arquimeda.raf.lms.ui;

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
import com.arquimeda.raf.lms.biz.boundary.HistoricoLMSEJB;
import com.arquimeda.raf.lms.biz.control.HistoricoLMSCrudFilter;
import com.arquimeda.raf.lms.biz.entity.HistoricoLMS;
import com.vaadin.data.util.BeanItem;
import com.vaadin.ui.Button;
import com.vaadin.ui.Component;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.Table;
import com.vaadin.ui.Table.ColumnGenerator;

public class HistoricoLMSReportComponent extends CustomComponent implements ReportController<HistoricoLMS, HistoricoLMSCrudFilter>{
	
	private static final long serialVersionUID = 1L;
	
	@Inject @FiltrableLazyLoadingContainer(type=Type.ejbFiltrable, clazz=HistoricoLMSEJB.class)
	FiltrableLazyQueryContainer<HistoricoLMS, HistoricoLMSCrudFilter> container;
	
	@Inject
	ReportComponent<HistoricoLMS, HistoricoLMSCrudFilter> reportComponent;
	
	@Inject
	FormPopUpFiltrableLayoutManager<HistoricoLMS> formPopUpFiltrableCrudLayout;
		
	@Inject
	HistoricoLMSEJB historicoLMSEJB;
	
	@Inject
	HistoricoLMSReportForm historicoLMSReportForm;
	
	@Inject
	HistoricoLMSReportFilterForm historicoLMSReportFilterForm;
	
	@Inject
	HistoricoLMSCrudFilter historicoLMSCrudFilter;

	@Inject
	@App
	Messages messages;
	
	String[] propertyIds = new String[]{"matricula","login","nombre","apellido","mail","examen","resultado", "puntaje", "fecha"};
	
	@PostConstruct
	public void init(){
		
		reportComponent.init(this);
		setCompositionRoot(reportComponent);
		
	}
	
	public FiltrableLazyQueryContainer<HistoricoLMS, HistoricoLMSCrudFilter> getContainer() {
		//container.addContainerProperty("", String.class, "", true, false);
		return container;		
	}
	
	@Override
	public Class<HistoricoLMS> getEntityClass() {
		return HistoricoLMS.class;
	}
	
	@Override
	public HistoricoLMS createEntity() {
		return new HistoricoLMS();
	}
	
	@Override
	public HistoricoLMSCrudFilter createFilter() {
		return new HistoricoLMSCrudFilter();
	}

	@Override
	public BeanItem<HistoricoLMS> createBeanItem(HistoricoLMS entity) {
		return new BeanItem<HistoricoLMS>(entity, propertyIds);
	}

	@Override
	public BeanItem<HistoricoLMSCrudFilter> createFilterBeanItem(HistoricoLMSCrudFilter filter) {
		return new BeanItem<HistoricoLMSCrudFilter>(filter, new String[]{"fechaDesde","fechaHasta","login","examen"});	
	}
	
	
	@Override
	public List<TableColumn> getTableColumns() {
		
		List<TableColumn> columns = new ArrayList<TableColumn>();

		columns.add(new TableColumn("matricula", 0.1f, false, Table.Align.LEFT));
		columns.add(new TableColumn("nombre", 0.1f, false, Table.Align.LEFT));
		columns.add(new TableColumn("apellido", 0.1f, false, Table.Align.LEFT));
		columns.add(new TableColumn("login", 0.1f, false, Table.Align.LEFT));		
		columns.add(new TableColumn("mail", 0.2f, false, Table.Align.LEFT));
		columns.add(new TableColumn("examen", 0.1f, false, Table.Align.LEFT));
		columns.add(new TableColumn("resultado", 0.1f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<HistoricoLMS> beanItem = (BeanItem<HistoricoLMS>) source.getItem(itemId);
				HistoricoLMS entity = beanItem.getBean();
				String resultado = entity.getResultado();
				
				if(resultado.equals("SUCCESSFUL_POS_TEST"))
					return "APROBADO";
				if(resultado.equals("UNSUCCESSFUL_POS_TEST"))
					return "DESAPROBADO";
				else
					return "";
				
			}

		}));
		columns.add(new TableColumn("puntaje", 0.05f, false, Table.Align.CENTER));
		columns.add(new TableColumn("fecha", 0.15f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<HistoricoLMS> beanItem = (BeanItem<HistoricoLMS>) source.getItem(itemId);
				HistoricoLMS entity = beanItem.getBean();
				Date fecha = entity.getFecha();
				
				if(fecha != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
					return dateFormat.format(fecha);				
				}else{
					return "";
				}
				
			}

		}));
		
		return columns;

	}

	public List<ExportedColumn> getExportedColumns(){

		List<ExportedColumn> columns = new ArrayList<ExportedColumn>();
		
		columns.add(new ExportedColumn("matricula"));
		columns.add(new ExportedColumn("nombre"));
		columns.add(new ExportedColumn("apellido"));
		columns.add(new ExportedColumn("login"));
		columns.add(new ExportedColumn("mail"));
		columns.add(new ExportedColumn("examen"));
		columns.add(new ExportedColumn("resultado",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				HistoricoLMS lms = (HistoricoLMS) entity;				
				String resultado= lms.getResultado();
				
				if(resultado.equals("SUCCESSFUL_POS_TEST"))
					return "APROBADO";
				if(resultado.equals("UNSUCCESSFUL_POS_TEST"))
					return "DESAPROBADO";
				else
					return "";
				
			}
		}));
		columns.add(new ExportedColumn("puntaje"));
		columns.add(new ExportedColumn("fecha",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				HistoricoLMS lms = (HistoricoLMS) entity;	
				
				Date fecha = lms.getFecha();
				
				if(fecha != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
					return dateFormat.format(fecha);				
				}else{
					return "";
				}
				
			}
		}));

		return columns;
		
	}

	@Override
	public CrudLayoutManager<HistoricoLMS> getLayoutManager() {
		return formPopUpFiltrableCrudLayout;
	}

	@Override
	public Button getHelpButton() {
		return null;
	}

	@Override
	public Map<String, Object> totalize(HistoricoLMSCrudFilter filter) {
		
		Map<String, Object> footers = new HashMap<String, Object>();		
		return footers;
		
	}

	@Override
	public void customizeTable(Table table) {
		table.setHeight("515px");
		for(String property : propertyIds){
			table.setColumnWidth(property, -1);
		}
		table.setCellStyleGenerator(new Table.CellStyleGenerator() {                
			
			private static final long serialVersionUID = 1L;

			@SuppressWarnings("unchecked")
			@Override
			public String getStyle(Table source, Object itemId, Object propertyId) {

				HistoricoLMS lms = (HistoricoLMS) ((BeanItem<HistoricoLMS>) container.getItem(itemId)).getBean();
				String resultado = lms.getResultado();

				if ("resultado".equals((String) propertyId)){
				
					if(resultado.equals("SUCCESSFUL_POS_TEST"))
						return "green";
					if(resultado.equals("UNSUCCESSFUL_POS_TEST"))
						return "red";
					else
						return null;			
				}
				return null;
				
			}

		});
	}

	@Override
	public Iterator<HistoricoLMS> export(HistoricoLMSCrudFilter filter) {
		return historicoLMSEJB.export(filter);
	}

	@Override
	public Component getFilterForm() {
		return historicoLMSReportFilterForm;
	}

	@Override
	public Component getViewForm() {
		return historicoLMSReportForm;
	}

}