<!-- Imports -->
<link rel='stylesheet' href='/raf-include/resources/css/raf-include.min.css' type='text/css' />
<script type='text/javascript' src='/raf-include/resources/js/raf-include.min.js'></script>

<!-- Widget -->
<div id="raf-include-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafIncludeFactory.instance()">
<script type='text/javascript'>
$('#raf-include-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	customCss: "${(customCss!'')?replace('\n','')}"
});
</script>
	<h3 class="includeTitle"></h3>
	<div class="embed-responsive embed-responsive-4by3">
		<iframe class="raf-include-iframe"></iframe>
	</div>
</div>
						