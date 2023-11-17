<!-- Imports -->
<link rel='stylesheet' href='/raf-tableros/resources/css/raf-tableros.min.css' type='text/css' />
<script type='text/javascript' src='/raf-tableros/resources/js/raf-tableros.min.js'></script>

<div id="raf-tableros-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafTablerosFactory.instance()">
<script type='text/javascript'>
$('#raf-tableros-${instanceId}').data('arqParams', {
	id: "${instanceId}"
});
</script>
	<form class="fs-sm-space raf-tableros-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id</label>
			<input type="text" class="form-control raf-tableros-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-tableros-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="datasetName">Dataset del Fichero</label>
			<input type="text" class="form-control raf-tableros-datasetName" value="${datasetName!}">
		</div>
		
		<div class="form-group">
			<label for="linkInclude">URL de la página de Include</label>
			<input type="text" class="form-control raf-tableros-linkInclude" value="${linkInclude!}">
		</div>
		
		<div class="form-group">
			<label for="idIncludeWidget">Id del widget Include</label>
			<input type="text" class="form-control raf-tableros-idIncludeWidget" value="${idIncludeWidget!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-tableros-customCss" rows="5">${customCss!}</textarea>
		</div>

		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
