<!-- Imports -->
<link rel='stylesheet' href='/raf-agenda/resources/css/raf-agenda.min.css' type='text/css' />
<script type='text/javascript' src='/raf-agenda/resources/js/raf-agenda.min.js'></script>

<div id="raf-agenda-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafAgendaFactory.instance()">
<script type='text/javascript'>
$('#raf-agenda-${instanceId}').data('arqParams', {
	id: '${instanceId}',
});
</script>
	<form class="fs-sm-space raf-agenda-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-agenda-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-agenda-widgetTitle" value="${widgetTitle!}">
		</div>
			
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-agenda-customCss" rows="5">${customCss!}</textarea>
		</div>
		
		<div class="form-group">
			<label for="rowTemplate">Row Template</label>
			<p class="small sublabel">El template debe ser una table row, los parámetros son: {{legajo}}, {{apellidoynombre}}, {{puesto}}, {{sede}}, {{interno}}, {{departamento}}, {{celular}}, {{mail}}, {{gerencia}}, {{fechaNacimiento}}, {{fechaingreso}}, {{dni}} y {{usuarioGenerico}}.</p>
			<textarea class="form-control raf-agenda-rowTemplate" rows="5">${rowTemplate!}</textarea>
		</div>
		
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
