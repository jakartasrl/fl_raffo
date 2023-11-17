<!-- Imports -->
<script type='text/javascript' src='/raf-tableros/resources/lib/jQuery.dotdotdot/jquery.dotdotdot.min.js'></script>
<link rel='stylesheet' href='/raf-tableros/resources/css/raf-tableros.min.css' type='text/css' />
<script type='text/javascript' src='/raf-tableros/resources/js/raf-tableros.min.js'></script>

<!-- Widget -->
<div id="raf-tableros-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafTablerosFactory.instance()">
<script type='text/javascript'>
$('#raf-tableros-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	datasetName: "${datasetName!}",
	linkInclude: "${linkInclude!}",
	idIncludeWidget: "${idIncludeWidget!}",
	customCss: "${(customCss!'')?replace('\n','')}",
});
</script>
	
	<div class="raf-tableros-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-tableros-grid">
	    
	</div>

</div>
						