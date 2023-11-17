<!-- Imports -->
<link rel='stylesheet' href='/raf-cumpleanios/resources/css/raf-cumpleanios.min.css' type='text/css' />
<script type='text/javascript' src='/raf-cumpleanios/resources/js/raf-cumpleanios.min.js'></script>

<!-- Templates -->
<script type="text/template" class="${widgetId!1}-template-datatable ">
	${(rowTemplate!'')?replace('\n','')}
</script>

<!-- Widget -->
<div id="raf-cumpleanios-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafCumpleaniosFactory.instance()">
<script type='text/javascript'>
$('#raf-cumpleanios-${widgetId!1}').data('arqParams', {
	id: '${widgetId!1}',
	customCss: "${(customCss!'')?replace('\n','')}",
});
</script>

	<div class="raf-cumpleanios-widgetTitle">${widgetTitle!}</div>
	
	<div id="${widgetId!1}-raf-cumpleanios-table" class="raf-cumpleanios-table">
		
	</div>
	
</div>