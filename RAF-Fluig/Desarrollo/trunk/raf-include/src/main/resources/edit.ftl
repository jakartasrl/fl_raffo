<!-- Imports -->
<link rel='stylesheet' href='/raf-include/resources/css/raf-include.min.css' type='text/css' />
<script type='text/javascript' src='/raf-include/resources/js/raf-include.min.js'></script>

<div id="raf-include-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafIncludeFactory.instance()">
<script type='text/javascript'>
$('#raf-include-${instanceId}').data('arqParams', {
	id: "${instanceId}"
});
</script>
	<form class="fs-sm-space raf-include-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-include-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-include-customCss" rows="5">${customCss!}</textarea>
		</div>
	
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
