<!-- Imports -->
<script type="text/javascript">
ECMNavigationInit = function(){
   	ECM.openDocumentId = 0;
	ECM.openDocumentVersion = -1;
	ECM.openCardId = 0;
	ECM.openFolderId = 0;


          ECM.appletEnabled = false;
          ECM.privateFolderEnabled = true;

          ECM.maxUploadSize = 100;

	    ECM.socialDoc = 0;

	ECM.isSocialDoc = false;

	if(ECM.socialDoc != 0){
		WCMAPI.setSessionAttribute("ecmNavigationIsSocialFolder", "true");
		ECM.isSocialDoc = true;
	} else {
		WCMAPI.setSessionAttribute("ecmNavigationIsSocialFolder", "false");
	}

   	ECM.navigation = {};
	ECM.navigation.actions = [];
   	ECM.navigation.action = {};

   	ECM.navigation.editDoc = 0;

	ECM.navigation.action.mirror = 0;
	ECM.navigation.action.cut = 1;
	ECM.navigation.action.copy = 2;
	ECM.navigation.action.paste = 3;
	ECM.navigation.action.remove = 4;
	ECM.navigation.action.print = 5;
	ECM.navigation.action.filter = 6;
   	ECM.navigation.action.newFolder = 7;
  		ECM.navigation.action.newDocumentAdvanced = 8;
  		ECM.navigation.action.newExternalDocument = 9;
  		ECM.navigation.action.newMultiplePublication = 10;
  		ECM.navigation.action.newArticle = 11;
  		ECM.navigation.action.newForm = 12;
  		ECM.navigation.action.newReport = 13;
  		ECM.navigation.action.newApplication = 14;
  		ECM.navigation.action.masterList = 15;
	ECM.navigation.action.renovation = 16;
	ECM.navigation.action.clipboard = 17;
	ECM.navigation.action.newCardIndex = 18;
	ECM.navigation.action.priority = 19;
	ECM.navigation.action.meeting = 20;
	ECM.navigation.action.newDocument = 21;
	ECM.navigation.action.newSimpleFolder = 22;
	ECM.navigation.action.rename = 23;
	ECM.navigation.action.download = 24;

	 	ECM.navigation.actions.push({
			label: "Nueva carpeta (avanzado)",
			action: ECM.navigation.action.newFolder
   		},{
			label: "Nueva carpeta",
			action: ECM.navigation.action.newSimpleFolder
   		});
	 	ECM.navigation.actions.push({
			label: "Cargar archivos",
			action: ECM.navigation.action.newDocument
   		},{
			label: "Nuevo documento (avanzado)",
			action: ECM.navigation.action.newDocumentAdvanced
   		});
	 	ECM.navigation.actions.push({
   	    	label: "Cortar",
			action: ECM.navigation.action.cut
   		 });
	 	ECM.navigation.actions.push({
   	    	label: "Copiar",
			action: ECM.navigation.action.copy
   		 });
	 	ECM.navigation.actions.push({
   	    	label: "Pegar",
			action: ECM.navigation.action.paste
   		 });
	 	ECM.navigation.actions.push({
			label: "Reflejar",
			action: ECM.navigation.action.mirror
		 });
	 	ECM.navigation.actions.push({
   	    	label: "Eliminar",
			action: ECM.navigation.action.remove
   		});
	
	 	ECM.navigation.actions.push({
   	    	label: "Imprimir copia controlada",
			action:	ECM.navigation.action.print
   		 });

	 	ECM.navigation.actions.push({
   	    	label: "Download",
			action:	ECM.navigation.action.download
   		 });

		ECM.navigation.actions.push({
			label: "Alteración en bloque",
			action: ECM.navigation.action.renovation
		});

	ECM.navigation.actions.push({
    	label: "Filtrar",
		action:	ECM.navigation.action.filter
	 });

	 	ECM.navigation.actions.push({
	    	label: "Nuevo documento externo",
			action:	ECM.navigation.action.newExternalDocument
		 });
	 	ECM.navigation.actions.push({
	    	label: "Nueva publicación múltiple",
			action:	ECM.navigation.action.newMultiplePublication
		 });
	 	ECM.navigation.actions.push({
	    	label: "Nuevo artículo",
			action:	ECM.navigation.action.newArticle
		 });
	 	ECM.navigation.actions.push({
	    	label: "Nuevo formulario",
			action:	ECM.navigation.action.newCardIndex
		 });
		ECM.navigation.actions.push({
			label: "Nuevo registro de formulario",
			action: ECM.navigation.action.newForm
		});
	 	ECM.navigation.actions.push({
	    	label: "Nuevo informe",
			action:	ECM.navigation.action.newReport
		 });
	 	ECM.navigation.actions.push({
	    	label: "Nueva aplicación",
			action:	ECM.navigation.action.newApplication
		 });
		ECM.navigation.actions.push({
			label: "Lista maestra",
			action: ECM.navigation.action.masterList
		});

		ECM.navigation.actions.push({
			label: "Área de transferencia",
			action: ECM.navigation.action.clipboard
		});

	ECM.navigation.actions.push({
		label: "Mostrar prioridad",
		action: ECM.navigation.action.priority
	});

	ECM.navigation.actions.push({
		label: "Crear reunión",
		action: ECM.navigation.action.meeting
	});
	
	 	ECM.navigation.actions.push({
   	    	label: "Renombrar",
			action: ECM.navigation.action.rename
   		 });

	ECM.navigation.actionsDynamics = ECM.navigation.actions;
};
</script>
<script type='text/javascript' src='/social/resources/js/api_es.js'></script>
<script type='text/javascript' src='/social/resources/js/socialglobal_es.js'></script>
<script type='text/javascript' src='/resources/components/breadcrumb/breadcrumb_es.js'></script>
<script type='text/javascript' src='/resources/components/datatable/datatable_es.js'></script>
<script type='text/javascript' src='/resources/js/jqgrid/jquery.jqGrid.min.js'></script>
<script type='text/javascript' src='/ecm_navigation/resources/js/navigation_es.js'></script>
<link rel='stylesheet' href='/raf-navegadorGED/resources/css/raf-navegadorGED.min.css' type='text/css' />
<script type='text/javascript' src='/raf-navegadorGED/resources/js/raf-navegadorGED.min.js'></script>

<!-- Templates -->
<script type="text/template" class="template-area-buttons">
    <button class="btn btn-default raf-navegadorGED-btnReturn" disabled><span class="fluigicon fluigicon-arrow-up"></span></button>
    <span class="raf-navegadorGED-path"></span>
</script>

<script type="text/template" class="template-datatable">
    <tr>
        ${(rowTemplate!'')?replace('\n','')}
    </tr>
</script>

<!-- Widget -->
<div id="raf-navegadorGED-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafNavegadorGEDFactory.instance()">
<script type='text/javascript'>
$('#raf-navegadorGED-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	rootFolderId: "${rootFolderId!}",
	customCss: "${(customCss!'')?replace('\n','')}",
	columns: JSON.parse("${(columns!'[]')?replace('\n','')?replace('"','\\"')}")
});
</script>
	
	<div style="display:none" id="ecm-navigation"></div>
	
	<div class="raf-navegadorGED-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-navegadorGED-table" id="raf-navegadorGED-table-${widgetId!1}">
		
	</div>
	
</div>