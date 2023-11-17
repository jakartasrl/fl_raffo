var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		var color = $('#color').val();
		if(!color) color = '#000000';
		$('#colorSelector div').css('backgroundColor', color);
	},
	
	onEdit: {
		custom: function() {
			var color = $('#color').val();
			if(!color) color = '#000000';
			$('#colorSelector div').css('backgroundColor', color);
			$('#colorPickerHolder').ColorPicker({
				flat: true,
				color: color,
				onChange: function (hsb, hex, rgb) {
					$('#colorSelector div').css('backgroundColor', '#' + hex);
					$('#color').val('#' + hex);
				}
			});
			$('#colorpickerHolder>div').css('position', 'absolute');
			var widt = false;
			$('#colorSelector').bind('click', function() {
				$('#colorPickerHolder').stop().animate({height: widt ? 0 : 173}, 500);
				widt = !widt;
			});
		},
		
		bpm: {
		},
		
		ged: function() {
		}
	}
};
