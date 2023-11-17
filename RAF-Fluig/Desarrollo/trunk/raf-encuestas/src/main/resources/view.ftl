<!-- Imports -->
<script type='text/javascript' src='/social/resources/js/api_es.js'></script>
<script type='text/javascript' src='/social/resources/js/socialglobal_es.js'></script>
<script type='text/javascript' src='/socialform/resources/js/socialform_es.js'></script>
<script type='text/javascript' src='/raf-encuestas/resources/lib/jQuery.dotdotdot/jquery.dotdotdot.min.js'></script> 
<link rel='stylesheet' href='/raf-encuestas/resources/css/raf-encuestas.min.css' type='text/css' />
<script type='text/javascript' src='/raf-encuestas/resources/js/raf-encuestas.min.js'></script>

<!-- Widget -->
<div id="raf-encuestas-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafEncuestasFactory.instance()">
<script type='text/javascript'>
$('#raf-encuestas-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	rootFolderId: "${rootFolderId!}",
	customCss: "${(customCss!'')?replace('\n','')}"
});
</script>
	
	<div class="raf-encuestas-template" style="display:none;">
		${template!}
	</div>
	
	<div class="raf-encuestas-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-encuestas-list">
		<ul>
		</ul>
	</div>
	
</div>