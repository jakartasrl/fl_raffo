package com.arquimeda.raf.solicitudDisenio.ui;

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
import com.arquimeda.raf.solicitudDisenio.biz.boundary.SolicitudDisenioEJB;
import com.arquimeda.raf.solicitudDisenio.biz.control.SolicitudDisenioCrudFilter;
import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio;
import com.vaadin.data.util.BeanItem;
import com.vaadin.shared.ui.label.ContentMode;
import com.vaadin.ui.Button;
import com.vaadin.ui.Component;
import com.vaadin.ui.CustomComponent;
import com.vaadin.ui.Label;
import com.vaadin.ui.Table;
import com.vaadin.ui.Table.ColumnGenerator;
import com.vaadin.ui.VerticalLayout;

public class SolicitudDisenioReportComponent extends CustomComponent implements ReportController<SolicitudDisenio, SolicitudDisenioCrudFilter>{
	
	private static final long serialVersionUID = 1L;
	
	@Inject @FiltrableLazyLoadingContainer(type=Type.ejbFiltrable, clazz=SolicitudDisenioEJB.class)
	FiltrableLazyQueryContainer<SolicitudDisenio, SolicitudDisenioCrudFilter> container;
	
	@Inject
	ReportComponent<SolicitudDisenio, SolicitudDisenioCrudFilter> reportComponent;
	
	@Inject
	FormPopUpFiltrableLayoutManager<SolicitudDisenio> formPopUpFiltrableCrudLayout;
		
	@Inject
	SolicitudDisenioEJB solicitudDisenioEJB;
	
	@Inject
	SolicitudDisenioReportForm solicitudDisenioReportForm;
	
	@Inject
	SolicitudDisenioReportFilterForm solicitudDisenioReportFilterForm;
	
	@Inject
	SolicitudDisenioCrudFilter solicitudDisenioCrudFilter;

	@Inject
	@App
	Messages messages;
	
	String[] propertyIds = new String[]{"nroSolicitud","title","changeReason","currentState","creationDate","requestantName",
										"userGroup","userGroupCode","prActivos","lastModificationDate",
										"implementationType",  "comments",
										"breakDate", "changeDetail", "marcaNewProd","formaFarmaceuticaNewProd",
										 "unidadesMedidaNewProd", "concentracionesNewProd",  "grupoNewProd",
										 "presentacionNewProd","paisNewProd","titularidadNewProd","elaboradorNewProd",
										 "acondicionadorNewProd", "fichaTecnicaNewProd", 
										 "prActivo1NewProd", "prActivo2NewProd", "prActivo3NewProd", "prActivo4NewProd",
										 "unidadMedida1NewProd","unidadMedida2NewProd","unidadMedida3NewProd","unidadMedida4NewProd",
										 "concentracion1NewProd","concentracion2NewProd","concentracion3NewProd","concentracion4NewProd",
										};
	  
	@PostConstruct
	public void init() {
		
		reportComponent.init(this);
		reportComponent.getViewFieldGroup().addItemDataSourceChangeListener(solicitudDisenioReportForm);
		setCompositionRoot(reportComponent);
		
	}
	
	public FiltrableLazyQueryContainer<SolicitudDisenio, SolicitudDisenioCrudFilter> getContainer() {
		container.addContainerProperty("link", String.class, "", true, false);
		return container;		
	}
	
	@Override
	public Class<SolicitudDisenio> getEntityClass() {
		return SolicitudDisenio.class;
	}
	
	@Override
	public SolicitudDisenio createEntity() {
		return new SolicitudDisenio();
	}
	
	@Override
	public SolicitudDisenioCrudFilter createFilter() {
		return new SolicitudDisenioCrudFilter();
	}

	@Override
	public BeanItem<SolicitudDisenio> createBeanItem(SolicitudDisenio entity) {
		return new BeanItem<SolicitudDisenio>(entity, propertyIds);
	}

	@Override
	public BeanItem<SolicitudDisenioCrudFilter> createFilterBeanItem(SolicitudDisenioCrudFilter filter) {
		return new BeanItem<SolicitudDisenioCrudFilter>(filter, new String[]{"nroSolicitudDesde","nroSolicitudHasta","title",
								"changeReason","currentState","creationDateDesde","creationDateHasta","requestant","userGroup","prActivos",
								"lastModificationDateDesde","lastModificationDateHasta"});	
	}
	
	@Override
	public List<TableColumn> getTableColumns() {
		
		List<TableColumn> columns = new ArrayList<TableColumn>();

		columns.add(new TableColumn("nroSolicitud", 0.05f, false, Table.Align.CENTER));
		columns.add(new TableColumn("title", 0.1f, false, Table.Align.CENTER));
		columns.add(new TableColumn("changeReason", 0.1f, false, Table.Align.CENTER));
		columns.add(new TableColumn("currentState", 0.08f, false, Table.Align.CENTER));
		columns.add(new TableColumn("creationDate", 0.1f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<SolicitudDisenio> beanItem = (BeanItem<SolicitudDisenio>) source.getItem(itemId);
				SolicitudDisenio entity = beanItem.getBean();
				Date creationDate = entity.getCreationDate();
				
				if(creationDate != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					return dateFormat.format(creationDate);				
				}else{
					return "";
				}
			}

		}));
		columns.add(new TableColumn("requestantName", 0.1f, false, Table.Align.CENTER));
		columns.add(new TableColumn("userGroup", 0.1f, false, Table.Align.CENTER));		
		columns.add(new TableColumn("prActivos", 0.15f, false, Table.Align.CENTER));		
		columns.add(new TableColumn("lastModificationDate", 0.1f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<SolicitudDisenio> beanItem = (BeanItem<SolicitudDisenio>) source.getItem(itemId);
				SolicitudDisenio entity = beanItem.getBean();
				Date lastModificationDate = entity.getLastModificationDate();
				
				if(lastModificationDate != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					return dateFormat.format(lastModificationDate);				
				}else{
					return "";
				}
			}

		}));
		columns.add(new TableColumn("link", 0.12f, false, Table.Align.CENTER, new ColumnGenerator() {

			private static final long serialVersionUID = 1L;

			@Override
			public Object generateCell(Table source, Object itemId, Object columnId) {

				@SuppressWarnings("unchecked")
				BeanItem<SolicitudDisenio> beanItem = (BeanItem<SolicitudDisenio>) source.getItem(itemId);
				SolicitudDisenio entity = beanItem.getBean();
				
				// Get the text from bean item container
				String linkHtml = "<a target=\"_new\" href=\"" + entity.getUrl() + "\"><button type=\"button\" class=\"v-button\">IR</button></a>";

				// Create the component for the generated column
				VerticalLayout cellLayout = new VerticalLayout();
				cellLayout.setStyleName("linkLayout");
				cellLayout.addComponent(new Label(linkHtml, ContentMode.HTML));

				return cellLayout;
			}

		}));

		return columns;

	}

	public List<ExportedColumn> getExportedColumns(){

		List<ExportedColumn> columns = new ArrayList<ExportedColumn>();
		
		columns.add(new ExportedColumn("nroSolicitud", HorizontalAlignment.center));
		columns.add(new ExportedColumn("title", HorizontalAlignment.center));
		columns.add(new ExportedColumn("breakDate", HorizontalAlignment.center));
		columns.add(new ExportedColumn("currentState", HorizontalAlignment.center));
		columns.add(new ExportedColumn("userGroup", HorizontalAlignment.center));
		columns.add(new ExportedColumn("creationDate",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				SolicitudDisenio sd = (SolicitudDisenio) entity;					
				Date creationDate = sd.getCreationDate();
				
				if(creationDate != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					return dateFormat.format(creationDate);				
				}else{
					return "";
				}
			}
		}));
		columns.add(new ExportedColumn("lastModificationDate",HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				SolicitudDisenio sd = (SolicitudDisenio) entity;					
				Date lastModificationDate = sd.getLastModificationDate();
				
				if(lastModificationDate != null){					
					SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					return dateFormat.format(lastModificationDate);				
				}else{
					return "";
				}
			}
		}));
		columns.add(new ExportedColumn("requestantName", HorizontalAlignment.center));
		columns.add(new ExportedColumn("implementationType", HorizontalAlignment.center));
		columns.add(new ExportedColumn("userGroupCode", HorizontalAlignment.center));
		columns.add(new ExportedColumn("changeReason", HorizontalAlignment.center));
		columns.add(new ExportedColumn("changeDetail", HorizontalAlignment.center));
		columns.add(new ExportedColumn("comments", HorizontalAlignment.center));
		columns.add(new ExportedColumn("marcaNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("formaFarmaceuticaNewProd", HorizontalAlignment.center));
		
		columns.add(new ExportedColumn("prActivo1NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("unidadMedida1NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("concentracion1NewProd", HorizontalAlignment.center));
		
		columns.add(new ExportedColumn("prActivo2NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("unidadMedida2NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("concentracion2NewProd", HorizontalAlignment.center));
		
		columns.add(new ExportedColumn("prActivo3NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("unidadMedida3NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("concentracion3NewProd", HorizontalAlignment.center));
		
		columns.add(new ExportedColumn("prActivo4NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("unidadMedida4NewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("concentracion4NewProd", HorizontalAlignment.center));

		columns.add(new ExportedColumn("TiposNewProd", HorizontalAlignment.center));
		
		columns.add(new ExportedColumn("grupoNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("presentacionNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("paisNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("titularidadNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("elaboradorNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("acondicionadorNewProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("fichaTecnicaNewProd", HorizontalAlignment.center));

		columns.add(new ExportedColumn("codigoProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("descripcionProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("grupoProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("tipoProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("prActivoProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("paisProd", HorizontalAlignment.center));
		columns.add(new ExportedColumn("link", HorizontalAlignment.center,new Exporter.ColumnGenerator() {
			@Override
			public Object generateCell(Object entity, String field) {
				SolicitudDisenio sd = (SolicitudDisenio) entity;					
				return sd.getUrl();
			}
		}));
		
		return columns;
		
	}

	@Override
	public CrudLayoutManager<SolicitudDisenio> getLayoutManager() {
		return formPopUpFiltrableCrudLayout;
	}

	@Override
	public Button getHelpButton() {
		return null;
	}

	@Override
	public Map<String, Object> totalize(SolicitudDisenioCrudFilter filter) {
		
		Map<String, Object> footers = new HashMap<String, Object>();		
		return footers;
		
	}

	@Override
	public void customizeTable(Table table) {
		table.setHeight("515px");
		for(String property : propertyIds){
			table.setColumnWidth(property, -1);
		}
		table.setColumnWidth("link", -1);
	}

	@Override
	public Iterator<SolicitudDisenio> export(SolicitudDisenioCrudFilter filter) {
		return solicitudDisenioEJB.export(filter);
	}

	@Override
	public Component getFilterForm() {
		return solicitudDisenioReportFilterForm;
	}

	@Override
	public Component getViewForm() {
		return solicitudDisenioReportForm;
	}

}