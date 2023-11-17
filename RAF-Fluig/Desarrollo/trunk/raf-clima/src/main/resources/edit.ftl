<!-- Imports -->
<link rel='stylesheet' href='/raf-clima/resources/css/raf-clima.min.css' type='text/css' />
<script type='text/javascript' src='/raf-clima/resources/js/raf-clima.min.js'></script>

<div id="raf-clima-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafClimaFactory.instance()">
<script type='text/javascript'>
$('#raf-clima-${instanceId}').data('arqParams', {
	id: '${instanceId}',
});
</script>
	<form class="fs-sm-space raf-clima-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-clima-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-clima-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-clima-customCss" rows="5">${customCss!}</textarea>
		</div>

		<div class="form-group">
			<label for="rowTemplate">Template</label>
			<p class="small sublabel">Los parámetros disponibles son: {{location}}, {{iconClass}}, {{temperature}}, {{status}}, {{humidity}}, {{visibility}}, {{wind}}</p>
			<textarea class="form-control raf-clima-template" rows="5">${template!}</textarea>
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
