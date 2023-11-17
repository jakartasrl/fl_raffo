<!-- Imports -->
<link rel='stylesheet' href='/raf-album/resources/css/raf-album.min.css' type='text/css' />
<script type='text/javascript' src='/raf-album/resources/js/raf-album.min.js'></script>

<div id="raf-album-${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafAlbumFactory.instance()">
<script type='text/javascript'>
$('#raf-album-${instanceId}').data('arqParams', {
	id: "${instanceId}"
});
</script>
	<form class="fs-sm-space raf-album-form">
		
		<div class="form-group">
			<label for="widgetId">Widget Id </label>
			<input type="text" class="form-control raf-album-widgetId" value="${widgetId!}">
		</div>
		
		<div class="form-group">
			<label for="widgetTitle">Título</label>
			<input type="text" class="form-control raf-album-widgetTitle" value="${widgetTitle!}">
		</div>
		
		<div class="form-group">
			<label for="folderId">Carpeta de Galerías</label>
			<input type="number" class="form-control raf-album-folderId" value="${folderId!}">
		</div>
		
		<div class="form-group">
			<label for="customCss">Custom CSS</label>
			<p class="small sublabel">Referenciar al contenedor del widget como {{container}}</p>
			<textarea class="form-control raf-album-customCss" rows="5">${customCss!}</textarea>
		</div>
		
		<div class="form-group">
			<label for="unitegalleryParams">Unitegallery Params</label>
			<textarea class="form-control raf-album-unitegalleryParams" rows="5">${unitegalleryParams!}</textarea>
		</div>
	
		<button type="submit" class="btn btn-default" data-save-preferences>Guardar</button>	
		
	</form>
</div>
