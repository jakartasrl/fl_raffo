<!-- Imports -->
<link rel='stylesheet' href='/raf-layoutPortal-dashboard/resources/css/raf-layoutPortal-dashboard.min.css' type='text/css' />
<script type='text/javascript' src='/raf-layoutPortal-dashboard/resources/js/raf-layoutPortal-dashboard.min.js'></script>

<#import "/wcm.ftl" as wcm/>

<script type="text/javascript" src="/ecm_resources/resources/ecm-plugins_es.js" charset="utf-8"></script>

<div class="fluig-style-guide">

	<!-- Panel superior para la administración de la página -->
	<div id="fluigHeader" style="display:none;"><@wcm.header /></div>
	
	<!-- Menú Superior del Portal -->
	<div id="topMenu">
		<div class="padding">
			<div id="home"><div id="logoi"></div></div>
	    	<div class="menu">
	    		<a id="telefonos" class="boton sinSubMenu">TELEFONOS</a>
		    	<a id="correspondencia" class="boton sinSubMenu ">CORRESPONDENCIA</a>
		    	<a id="solicitudRemises" class="boton sinSubMenu ">SOLICITUD DE REMISES</a>
		    </div>
		    <div class="loggedUser">
		    	<a id="encuestas" style="display:none;">
		    		<button class="btn btn-default counter-group">
		    			<span class="fluigicon fluigicon-tests-central"></span>
		    			<span class="counter counter-warning pos-right-bottom"></span>
		    		</button>
		    	</a>
		    </div>
	        <div class="clear"></div>
		
		  <!--
		  	<div class="menu_mobile_icon"><img src="images/icon_mobile.png" border="0"></div>        
		    <div class="menu_mobile">
		        <div id="menu_mobile_cerrar" class="boton" style="text-align:right">X</div>
				<div id="btnTelefonos" class="boton sinSubMenu">TELEFONOS</div>
		    	<div id="btnCorrespondencia" class="boton sinSubMenu ">CORRESPONDENCIA</div>
		    	<div id="btnSolicitudDeRemises" class="boton sinSubMenu ">SOLICITUD DE REMISES</div>
		    </div> 
		  -->
        </div>
	</div>
	
	<!-- Menú Vertical del Portal -->
	<div id="verticalMenu">
		<div class="menu-wrapper">
			<ul class="menu">
			    <li class="boton subMenu">COMUNIDAD RAFFO
		           	<div class="sub">
						<a id="interesGeneral" class="botoncito">De interés general</a>
						<a id="felicitaciones" class="botoncito">Felicitaciones</a>
						<a id="ingresos" class="botoncito">Ingresos / Promociones</a>
						<a id="busquedasInternas" class="botoncito">Búsquedas Activas</a>
						<a id="beneficios" class="botoncito">Beneficios</a>
						<a id="eventos" class="botoncito">Eventos</a>
						<a id="fotosYVideos" class="botoncito">Galerías de Imágenes</a>
		            </div>
			    </li>
			    
			    <li class="boton subMenu">INSTITUCIONAL
		           	<div class="sub">
						<a id="quienesSomos" class="botoncito">Quienes Somos</a>
						<a id="sedes" class="botoncito">Sedes</a>
						<a id="nuestroNegocio" class="botoncito">Nuestros Productos</a>
						<a id="rse" class="botoncito">RSE</a>
		            </div>
			    </li>
			
		    	<a id="organigrama" class="boton sinSubMenu">ORGANIGRAMA</a>
			
				<li class="boton subMenu">HERRAMIENTAS ÚTILES
		           	<div class="sub">
						<a id="politicas" class="botoncito">Políticas</a>
						<a id="procedimientos" class="botoncito">Procedimientos</a>
						<a id="aplicaciones" class="botoncito">Aplicaciones</a>
						<a id="tableros" class="botoncito">Tableros</a>
						<a id="descargaFormularios" class="botoncito">Formularios</a>
		            </div>
			    </li>
			</ul>
		</div>
	</div>
	
	<!-- Contenido del Portal -->
	<div id="content">
	    <div class="padding">
		    <#if pageRender.isEditMode()=true>
	    	<div id="edicaoPagina" class="clearfix">
		    <#else>
	    	<div id="visualizacaoPagina" class="clearfix">
		    </#if>
	            <!-- Slot 1 -->
	            <div class="editable-slot slotfull layout-1-1" id="divSlot1">
	            <@wcm.renderSlot id="SlotA" editableSlot="true"/>
	            </div>
	
	            <!-- Slot 2 -->
	            <div class="editable-slot slotfull layout-1-2left" id="divSlot2">
	            <@wcm.renderSlot id="SlotB" editableSlot="true"/>
	            </div>
	
	            <!-- Slot 3 -->
	            <div class="editable-slot slotfull layout-1-2right" id="divSlot3">
	            <@wcm.renderSlot id="SlotC" editableSlot="true"/>
	            </div>
								
	            <!-- Slot 4 -->
	            <div class="editable-slot slotfull layout-1-1" id="divSlot4">
	            <@wcm.renderSlot id="SlotD" editableSlot="true"/>
	            </div>
		    </div>
	    </div>
	</div>
	
</div>
