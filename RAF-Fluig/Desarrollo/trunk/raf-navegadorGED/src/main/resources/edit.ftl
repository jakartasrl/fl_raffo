<!-- Imports -->
<link rel='stylesheet' href='/raf-navegadorGED/resources/css/raf-navegadorGED.min.css' type='text/css' />
<script type='text/javascript' src='/raf-navegadorGED/resources/js/raf-navegadorGED.min.js'></script>

<div id="raf-navegadorGED-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafNavegadorGEDFactory.instance()">
<script type='text/javascript'>
$('#raf-navegadorGED-${instanceId}').data('arqParams', {
	id: '${instanceId}',
	columns: JSON.parse("${(columns!'[]')?replace('\n','')?replace('"','\\"')}")
});
</script>
	<form class="fs-sm-space raf-navegadorGED-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id</label>
			<input type="text" class="form-control raf-navegadorGED-widgetId" value="${widgetId!}">
		</div>

		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-navegadorGED-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="rootFolderId">Carpeta Raiz</label>
			<input type="number" class="form-control raf-navegadorGED-rootFolderId" value="${rootFolderId!}">
		</div>
		
		<div class="form-group raf-navegadorGED-columns">
			<label>Columnas mostradas</label>
			<div style="margin-left:25px;">
				<div class="checkbox">
				  <label><input type="checkbox" data-column="documentDescription" checked disabled>Descripcion</label>
				</div>
				<div class="checkbox">
				  <label><input type="checkbox" data-column="documentId">Código</label>
				</div>
				<div class="checkbox">
				  <label><input type="checkbox" data-column="createDate">Fecha de creación</label>
				</div>
				<div class="checkbox">
				  <label><input type="checkbox" data-column="lastModifiedDate">Fecha de última modificación</label>
				</div>
				<div class="checkbox">
				  <label><input type="checkbox" data-column="publisherName">Publicador</label>
				</div>
				<div class="checkbox">
				  <label><input type="checkbox" data-column="version">Versión</label>
				</div>
			</div>
		</div>
		
			
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-navegadorGED-customCss" rows="5">${customCss!}</textarea>
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
