<!-- Imports -->
<link rel='stylesheet' href='/raf-novedades/resources/css/raf-novedades.min.css' type='text/css' />
<script type='text/javascript' src='/raf-novedades/resources/js/raf-novedades.min.js'></script>

<div id="raf-novedades-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafNovedadesFactory.instance()">
<script type='text/javascript'>
$('#raf-novedades-${instanceId}').data('arqParams', {
	id: "${instanceId}"
});
</script>
	<form class="fs-sm-space raf-novedades-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-novedades-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-novedades-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="folderId">Carpeta de Artículos</label>
			<input type="number" class="form-control raf-novedades-folderId" value="${folderId!}">
		</div>
		
		<div class="form-group">
			<label for="linkInclude">URL de la página de Include</label>
			<input type="text" class="form-control raf-novedades-linkInclude" value="${linkInclude!}">
		</div>
		
		<div class="form-group">
			<label for="idIncludeWidget">Id del widget Include</label>
			<input type="text" class="form-control raf-novedades-idIncludeWidget" value="${idIncludeWidget!}">
		</div>
		
		<div class="form-group">
			<label for="template">Template de novedad</label>
			<p class="small sublabel">Los párametros vienen en las variables: {{imageUrl}}, {{title}}, {{description}} y {{link}}</p>
			<textarea class="form-control raf-novedades-template" rows="5">${template!}</textarea>
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-novedades-customCss" rows="5">${customCss!}</textarea>
		</div>
	
		<div class="form-group">
			<label for="maxCant">Máxima cantidad de novedades</label>
			<p class="small sublabel">Ingresar 0 para mostrar todas las disponibles.</p>
			<input type="number" class="form-control raf-novedades-maxCant" value="${maxCant!}">
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
