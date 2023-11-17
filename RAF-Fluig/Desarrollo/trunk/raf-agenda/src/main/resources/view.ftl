<!-- Imports -->
<link rel='stylesheet' href='/raf-agenda/resources/css/raf-agenda.min.css' type='text/css' />
<script type='text/javascript' src='/raf-agenda/resources/js/raf-agenda.min.js'></script>

<!-- Templates -->
<script type="text/template" class="${widgetId!1}-template-datatable ">
    	${(rowTemplate!'')?replace('\n','')}
</script>

<!-- Widget -->
<div id="raf-agenda-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafAgendaFactory.instance()">
<script type='text/javascript'>
$('#raf-agenda-${widgetId!1}').data('arqParams', {
	id: '${widgetId!1}',
	customCss: "${(customCss!'')?replace('\n','')}",
});
</script>

	<div class="raf-agenda-widgetTitle">${widgetTitle!}</div>
	
	<div id="${widgetId!1}-raf-agenda-table" class="raf-agenda-table">
		
	</div>
	
</div>