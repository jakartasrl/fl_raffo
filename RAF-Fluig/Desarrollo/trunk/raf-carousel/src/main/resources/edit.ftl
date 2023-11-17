<!-- Imports -->
<link rel='stylesheet' href='/raf-carousel/resources/css/raf-carousel.min.css' type='text/css' />
<script type='text/javascript' src='/raf-carousel/resources/js/raf-carousel.min.js'></script>

<div id="raf-carousel-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafCarouselFactory.instance()">
<script type='text/javascript'>
$('#raf-carousel-${instanceId}').data('arqParams', {
	id: "${instanceId}"
});
</script>
	<form class="fs-sm-space raf-carousel-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-carousel-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-carousel-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="datasetName">Dataset del Fichero Carusel</label>
			<input type="text" class="form-control raf-carousel-datasetName" value="${datasetName!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-carousel-customCss" rows="5">${customCss!}</textarea>
		</div>
		
		<div class="form-group">
			<label for="unitegalleryParams">Unitegallery Params</label>
			<textarea class="form-control raf-carousel-unitegalleryParams" rows="5">${unitegalleryParams!}</textarea>
		</div>
	
		<div class="form-group">
			<label for="resize">Resize</label>
			<select type="text" class="form-control raf-carousel-resize" value="${resize!}">
				<option value="SI">SI</option>
				<option value="NO">NO</option>
			</select>
		</div>

		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
