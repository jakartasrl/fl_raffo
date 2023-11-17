<!-- Imports -->
<link rel='stylesheet' href='/raf-album/resources/lib/unitegallery/css/unite-gallery.css' type='text/css' />
<link rel='stylesheet' href='/raf-album/resources/lib/unitegallery/skins/alexis/alexis.css' type='text/css' />
<link rel='stylesheet' href='/raf-album/resources/lib/unitegallery/themes/default/ug-theme-default.css' type='text/css' />
<script type='text/javascript' src='/raf-album/resources/lib/unitegallery/js/unitegallery.min.js'></script>
<script type='text/javascript' src='/raf-album/resources/lib/unitegallery/themes/default/ug-theme-default.js'></script>
<link rel='stylesheet' href='/raf-album/resources/css/raf-album.min.css' type='text/css' />
<script type='text/javascript' src='/raf-album/resources/js/raf-album.min.js'></script>

<!-- Widget -->
<div id="raf-album-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafAlbumFactory.instance()">
<script type='text/javascript'>
$('#raf-album-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	folderId: "${folderId!}",
	unitegalleryParams: "${(unitegalleryParams!'')?replace('\n','')?replace('"','\\"')}",
	customCss: "${(customCss!'')?replace('\n','')}"
});
</script>
	
	<div class="raf-album-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-album-nav">
			
	</div>
	
	<div class="raf-album-gallery" id="raf-album-gallery-${widgetId!1}" style="display:none;">
			
	</div>

</div>
						