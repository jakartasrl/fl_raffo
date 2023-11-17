<!-- Imports -->
<link rel='stylesheet' href='/raf-carousel/resources/lib/unitegallery/css/unite-gallery.css' type='text/css' />
<link rel='stylesheet' href='/raf-carousel/resources/lib/unitegallery/skins/alexis/alexis.css' type='text/css' />
<script type='text/javascript' src='/raf-carousel/resources/lib/unitegallery/js/unitegallery.min.js'></script>
<script type='text/javascript' src='/raf-carousel/resources/lib/unitegallery/themes/compact/ug-theme-compact.js'></script>
<link rel='stylesheet' href='/raf-carousel/resources/css/raf-carousel.min.css' type='text/css' />
<script type='text/javascript' src='/raf-carousel/resources/js/raf-carousel.min.js'></script>

<!-- Widget -->
<div id="raf-carousel-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafCarouselFactory.instance()">
<script type='text/javascript'>
$('#raf-carousel-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	datasetName: "${datasetName!}",
	unitegalleryParams: "${(unitegalleryParams!'')?replace('\n','')?replace('"','\\"')}",
	customCss: "${(customCss!'')?replace('\n','')}",
	resize: "${resize!}"
});
</script>
	
	<div class="raf-carousel-widgetTitle">${widgetTitle!}</div>
	
	<input type="hidden" id="imageLink">
	<input type="hidden" id="target">
	<div class="raf-carousel-gallery" id="raf-carousel-gallery-${widgetId!1}" style="display:none;">
	</div>

</div>
						