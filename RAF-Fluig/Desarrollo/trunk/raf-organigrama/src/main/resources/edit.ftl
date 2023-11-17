<!-- Imports -->
<link rel='stylesheet' href='/raf-organigrama/resources/css/raf-organigrama.min.css' type='text/css' />
<script type='text/javascript' src='/raf-organigrama/resources/js/raf-organigrama.min.js'></script>

<div id="raf-organigrama-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafOrganigramaFactory.instance()">
<script type='text/javascript'>
$('#raf-organigrama-${instanceId}').data('arqParams', {
	id: '${instanceId}',
});
</script>
	<form class="fs-sm-space raf-organigrama-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-organigrama-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-organigrama-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="rootNode">Nodo Raiz</label>
			<input type="text" class="form-control raf-organigrama-rootNode" value="${rootNode!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-organigrama-customCss" rows="5">${customCss!}</textarea>
		</div>

		<div class="form-group">
			<label for="rowTemplate">Template</label>
			<p class="small sublabel">Los parámetros disponibles son: {{nombre}}, {{cargo}}, {{legajo}}, {{interno}}, {{mail}}, {{supFuncional}} y {{supFuncionalCode}}.</p>
			<textarea class="form-control raf-organigrama-nodeTemplate" rows="5">${nodeTemplate!}</textarea>
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
