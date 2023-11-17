<!-- Imports -->
<link rel="stylesheet" href="/raf-clima/resources/lib/weather-widget/css/weather-icons.css">
<link rel="stylesheet" href="/raf-clima/resources/lib/weather-widget/css/style.css">
<script src="/raf-clima/resources/lib/weather-widget/js/weather.js"></script>
<link rel='stylesheet' href='/raf-clima/resources/css/raf-clima.min.css' type='text/css' />
<script type='text/javascript' src='/raf-clima/resources/js/raf-clima.min.js'></script>

<!-- Widget -->
<div id="raf-clima-${widgetId!1}" class="super-widget wcm-widget-class fluig-style-guide" data-params="rafClimaFactory.instance()">
<script type='text/javascript'>
$('#raf-clima-${widgetId!1}').data('arqParams', {
	id: "${widgetId!1}",
	customCss: "${(customCss!'')?replace('\n','')}",
});
</script>
	<div class="raf-clima-template" style="display:none;">
		${template!}
	</div>

	<div class="raf-clima-widgetTitle">${widgetTitle!}</div>
	
	<div class="raf-clima-weather"></div>
	
</div>