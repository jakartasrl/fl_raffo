<!-- Imports -->
<link rel="stylesheet" href="/raf-organigrama/resources/lib/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="/raf-organigrama/resources/lib/org-chart/css/jquery.orgchart.min.css">
<script src="/raf-organigrama/resources/lib/es6-promise/js/es6-promise.auto.min.js"></script>
<script src="/raf-organigrama/resources/lib/html2canvas/js/html2canvas.min.js"></script>
<script src="/raf-organigrama/resources/lib/org-chart/js/jquery.orgchart.min.js"></script>
<link rel='stylesheet' href='/raf-organigrama/resources/css/raf-organigrama.min.css' type='text/css' />
<script type='text/javascript' src='/raf-organigrama/resources/js/raf-organigrama.min.js'></script>

<!-- Widget -->
<div id="raf-organigrama-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafOrganigramaFactory.instance()">
<script type='text/javascript'>
$('#raf-organigrama-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	rootNode: "${rootNode!0}",
	customCss: "${(customCss!'')?replace('\n','')}",
	nodeTemplate: `${nodeTemplate!''}`
});
</script>

	<div class="raf-organigrama-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-organigrama-chart"></div>
	
</div>