<!-- Imports -->
<link rel='stylesheet' href='/raf-encuestas/resources/css/raf-encuestas.min.css' type='text/css' />
<script type='text/javascript' src='/raf-encuestas/resources/js/raf-encuestas.min.js'></script>

<div id="raf-encuestas-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafEncuestasFactory.instance()">
<script type='text/javascript'>
$('#raf-encuestas-${instanceId}').data('arqParams', {
	id: '${instanceId}'
});
</script>
	<form class="fs-sm-space raf-encuestas-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id</label>
			<input type="text" class="form-control raf-encuestas-widgetId" value="${widgetId!}">
		</div>

		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-encuestas-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="rootFolderId">Carpeta de Comunidades</label>
			<input type="number" class="form-control raf-encuestas-rootFolderId" value="${rootFolderId!}">
		</div>
		
		<div class="form-group">
			<label for="template">Template de encuesta</label>
			<p class="small sublabel">El template debe ser una table row, los parámetros son: {{title}}, {{descrption}}, {{validationStartDate}}, {{expirationDate}} y {{btnAnswer}}</p>
			<textarea class="form-control raf-encuestas-template" rows="5">${template!}</textarea>
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-encuestas-customCss" rows="5">${customCss!}</textarea>
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
