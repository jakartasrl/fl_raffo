var ww = $(window).width(); // ANCHO DE VENTANA
var wh = $(window).height(); // ALTO DE VENTANA

$(function(e) {

	$(window).resize(function(){
		var ww = $(window).width(); // ANCHO DE VENTANA
		var wh = $(window).height(); // ALTO DE VENTANA

		$('.index_slider').css({'min-height': '670px'});    // (wh*0.9)
		if(ww>800){
			var alto_modulo = 400*0.9;    
			$('.index_modulos .moduloi').css({'height': alto_modulo+'px'});
			$('.index_modulos .bloque').css({'height': alto_modulo+'px'});
			$('.index_modulos .moduloi2').css({'height': alto_modulo+'px'});
			$('.index_modulos .moduloi3').css({'height': alto_modulo+'px'});		
		}
	});
	
	if(ww>800){
		var alto_modulo = 400*0.9;    
		$('.index_modulos .moduloi').css({'height': alto_modulo+'px'});
		$('.index_modulos .bloque').css({'height': alto_modulo+'px'});
		$('.index_modulos .moduloi2').css({'height': alto_modulo+'px'});
		$('.index_modulos .moduloi3').css({'height': alto_modulo+'px'});		
	}
	
	$.ajax({
		type: "POST",
		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
		contentType: "application/json; charset=utf-8",
		dataType: "json",				
		data: JSON.stringify({
			name : 'colleagueGroup',
			constraints: [
              {
            	  _field: "colleagueGroupPK.colleagueId",
            	  _initialValue: WCMAPI.userCode,
            	  _finalValue: WCMAPI.userCode,
            	  _type: 1
              }
			]
		})
	})
	.done(function(dataset) {	
		var isAdminUser = false;
		for (var i = 0; i < dataset.values.length; i++) {
			if (dataset.values[i]["colleagueGroupPK.groupId"] == 'ADM-PORTAL') {
				isAdminUser = true;
				break;
			}
		}
		
		if(isAdminUser){
			$('.loggedUser').append($('#SlotLogin'));
		} else {
			$('.loggedUser').append(
				'<div class="btn-group slotLogin">'+
					'<img  class="slotLoginImage" data-update-image-profile="'+WCMAPI.userCode+'" src="/social/api/rest/social/image/profile/'+WCMAPI.userCode+'/X_SMALL_PICTURE"/>'+
					'<span class="slotLoginName">'+$('#SlotLogin #logged-user-name').text()+'</span>'+
				'</div>');
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert('Error al detectar al usuario logueado.');
	});		

    $('.menu .boton.subMenu').mouseover(function(){
    	var submenu = $('.sub',$(this));
    	$('.menu .sub').not(submenu).fadeOut(100);
    	submenu.fadeIn(100);
    });

    $('#topMenu, #content, .menu .boton.sinSubMenu').mouseover(function(){
    	$('.menu .sub').fadeOut(100);
    });
    
    
    //Links
	$.ajax({
		type: "POST",
		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
		contentType: "application/json; charset=utf-8",
		dataType: "json",				
		data: JSON.stringify({
			name : 'raf-layout-params',
			constraints: null
		})
	})
	.done(function(dataset) {	
		for (var i = 0; i < dataset.values.length; i++) {
			var row = dataset.values[i];
			$('#'+row.button)
				.attr('href', row.link)
				.attr('target', '_self');
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert('Error al cargar los links.');
	});	

	
	//Encuestas
	$.ajax({
		type: "POST",
		url: window.location.protocol + "//" + window.location.host + "/ecm/api/rest/ecm/dataset/datasets/",
		contentType: "application/json; charset=utf-8",
		dataType: "json",				
		data: JSON.stringify({
			name : 'raf-encuestas'
		})
	})
	.done(function(dataset) {	
		var cantEncuestas = dataset.values.length;
		if(cantEncuestas > 0){
			$('#encuestas .counter').html(cantEncuestas);
			$('#encuestas').show();
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert('Error al cargar las encuestas.');
	});	
});