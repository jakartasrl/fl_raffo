<!-- Imports -->
<script type='text/javascript' src='/raf-novedades/resources/lib/jQuery.dotdotdot/jquery.dotdotdot.min.js'></script>
<link rel='stylesheet' href='/raf-novedades/resources/css/raf-novedades.min.css' type='text/css' />
<script type='text/javascript' src='/raf-novedades/resources/js/raf-novedades.min.js'></script>


<!-- Widget -->
<div id="raf-novedades-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafNovedadesFactory.instance()">
<script type='text/javascript'>
$('#raf-novedades-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	widgetTitle: "${widgetTitle!}",
	folderId: "${folderId!}",
	linkInclude: "${linkInclude!}",
	idIncludeWidget: "${idIncludeWidget!}",
	customCss: "${(customCss!'')?replace('\n','')}",
	maxCant: "${maxCant!}"
});
</script>
	<div class="raf-novedades-template" style="display:none;">
		${template!}
	</div>
	
	<div class="raf-novedades-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-novedades-list"><ul></ul></div>
</div>
						