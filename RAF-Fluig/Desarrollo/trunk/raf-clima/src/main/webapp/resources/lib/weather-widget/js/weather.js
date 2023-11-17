$.widget( "arq.weather", {
    options: {
    	tamplate: "",
    	locale: "",
    	woeid: ""
    },

    _defaultLocale: "es",
	_location: {
	    es: "",
	    en: ""
	},
	_weatherData: {},

    _create: function() {
        const that = this;

        // Set locale if it is not already set
        if(!this.options.locale) {
		    if(navigator.language){
		    	this.options.locale = navigator.language.split('-')[0];
		    } else {
		    	this.options.locale = this._defaultLocale;
		    }
		}

		// If woeid is set use it, otherwise get location from browser
		if(this.options.woeid) {
        	this._getWeatherData(that.options.woeid,function(wheatherData){
				that._render(wheatherData);
			});
        }
		else if (navigator.geolocation) {
			var locationSuccess = function(position) {
	    		that._locationCallback(that,position);
			}
			navigator.geolocation.getCurrentPosition(locationSuccess, this._locationError);
		}
		else{
			console.log("Your browser does not support Geolocation!");
		}
    },

    _locationCallback: function(that,position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		const locale = that.options.locale;
	    that._getReversedGeocodeLocation(lat,lon,locale,function(location){

			that._location[locale] = location.displayName;

			that._getWeatherData(location.woeid,function(wheatherData){
				that._weatherData = wheatherData; 
				that._render();
			});
			
	    });
  	},

	_locationError: function(error){
		switch(error.code) {
          case error.TIMEOUT:
        	  console.log("A timeout occured! Please try again!");
              break;
          case error.POSITION_UNAVAILABLE:
        	  console.log('We can\'t detect your location. Sorry!');
              break;
          case error.PERMISSION_DENIED:
        	  console.log('Please allow geolocation access for this to work.');
              break;
          case error.UNKNOWN_ERROR:
        	  console.log('An unknown error occured!');
              break;
    	}
	},

  	_getReversedGeocodeLocation: function(latitude,longitude,language,continuation){
	    var that = this;
	    let query = "https://nominatim.openstreetmap.org/reverse?format=json&accept-language="+language+"&lat="+latitude+"&lon="+longitude;
	    let xhr = new XMLHttpRequest();
	    xhr.overrideMimeType('application/json');
	    xhr.open('GET', query, true);

	    xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == '200') {
				const address = JSON.parse(xhr.responseText).address;
				var location;
				if(that._locations[address.state]) {
					if(that._locations[address.state][address.city]) {
						if(that._locations[address.state][address.city][address.suburb]) {
							location = that._locations[address.state][address.city][address.suburb];
						} else {
							location = that._locations[address.state][address.city];
						}
					} else {
						location = that._locations[address.state]
					} 
				} else {
					location = that._locations;
				}
				continuation(location);
			}
	    };
	    xhr.send();
  	},

    _getWeatherData: function(woeid,continuation) {
	    const that = this;
	    let query = this._buildWeatherQuery( woeid );
	    // send request to Yahoo
	    let xhr = new XMLHttpRequest();
	    xhr.overrideMimeType('application/json');
	    xhr.open('GET', query, true);
	    xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == '200') {
				const wheatherData = JSON.parse(xhr.responseText);
				continuation(wheatherData);
			}
	    };
	    xhr.send();
  	},

  	_render: function(){
	    let $elem = this.element;
	    const location = this._location;
	    const condition = this._weatherData.query.results.channel.item.condition;
	    const atmosphere = this._weatherData.query.results.channel.atmosphere;
	    const wind = this._weatherData.query.results.channel.wind;
	    const locale = this.options.locale;
	    
	    const code = this._strings['codes'].filter(function(item){
			return item.number == condition.code;
	    });
	    
	    const result = {
	    	location: location[locale],
	    	iconClass: code[0].class,
	    	temperature: condition.temp,
	    	status: code[0].description[locale],
	    	humidity: atmosphere.humidity,
	    	visibility: (atmosphere.visibility*0.621371).toFixed(2),
	    	wind: Math.round(wind.speed*0.621371)
	    }
	    
	    if(this.options.template) {
	    	$elem.html(this._generateHTML(result));
	    } else {
		    $elem.html(
		    	'<h3>'+location[locale]+'</h3>'+
				'<div class="block today">'+	
				'	<i class="wi '+code[0].class+'"></i>'+
			    '   <div class="weather type-small">'+
			    '     <h1>'+condition.temp+' &deg;C</h2>'+
			    '     <p>'+
			    '       '+code[0].description[locale]+'.'+
			    '       '+this._strings.humidity[locale]+': '+atmosphere.humidity+'%. <br>'+
			    '       '+this._strings.visibility[locale]+': '+(atmosphere.visibility*0.621371).toFixed(2)+' km. <br>'+
			    '       '+this._strings.wind[locale]+': a '+Math.round(wind.speed*0.621371)+' km/h.'+
			    '     </p>'+
			    '   </div>'+
			    '</div>'
		    );
	    }
	    
  	},
  	
  	_generateHTML: function(result){
  		var template = this.options.template;
  		for(property in result){
  			template = template.replace('{{'+property+'}}',result[property]);
  		}
  		return template;
  	},

  	_buildWoeidQuery: function(searchTerm){
		let now = new Date();
		const base_url = 'https://query.yahooapis.com/v1/public/yql';
		const query = encodeURIComponent('select * from geo.places where text="'+searchTerm+'"');
		const apiQuery = base_url + '?q='+ query +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json';
		return apiQuery;
	},
 
   	_buildWeatherQuery: function(woeid) {
	    const base_url = 'https://query.yahooapis.com/v1/public/yql';
	    const query = encodeURIComponent('select * from weather.forecast where woeid='+woeid+' AND u="c"');
	    const query_url = base_url+ '?q='+query+'&format=json';
	    return query_url;
  	},

  	// Obtenido de http://woeid.rosselliot.co.nz/lookup
  	_locations: {
  		'Ciudad Autónoma de Buenos Aires': {
			displayName: 'Ciudad Autónoma de Buenos Aires',
			woeid: 468739
		},
  		'Buenos Aires' : {
  			'Bahía Blanca': {
  				displayName: 'Bahía Blanca, Buenos Aires',
  				woeid: 466866
  			}, 
	  		'Vicente López': {
	  			'Munro': {
	  				displayName: 'Munro, Buenos Aires',
	  				woeid: 91814588
	  			},
	  			'Villa Martelli': {
	  				displayName: 'Villa Martelli, Buenos Aires',
	  				woeid: 22530017
	  			},
	  			displayName: 'Vicente López, Buenos Aires',
  				woeid: 91816140
	  		},
	  		'Tortuguitas': {
  				displayName: 'Tortuguitas, Buenos Aires',
  				woeid: 466624
  			},
			displayName: 'Buenos Aires',
			woeid: 2344675
  		},
  		'Catamarca': {
			displayName: 'Catamarca',
			woeid: 419824
  		},
  		'Chaco': {
			displayName: 'Chaco',
			woeid: 2344677
  		},
  		'Chubut': {
			displayName: 'Chubut',
			woeid: 2344678
  		},
  		'Córdoba': {
			displayName: 'Córdoba',
			woeid: 466861
  		},
  		'Corrientes': {
			displayName: 'Corrientes',
			woeid: 91863141
  		},
  		'Entre Ríos': {
			displayName: 'Entre Ríos',
			woeid: 2344682
  		},
  		'Formosa': {
			displayName: 'Formosa',
			woeid: 466875
  		},
  		'Jujuy': {
			displayName: 'Jujuy',
			woeid: 2344684
  		},
  		'La Pampa': {
			displayName: 'La Pampa',
			woeid: 2344685
  		},
  		'La Rioja': {
			displayName: 'La Rioja',
			woeid: 332477
  		},
  		'Mendoza': {
			displayName: 'Mendoza',
			woeid: 91834699
  		},
  		'Misiones': {
			displayName: 'Misiones',
			woeid: 2344688
  		},
  		'Neuquén': {
			displayName: 'Neuquén',
			woeid: 2344689
  		},
  		'Río Negro': {
			displayName: 'Río Negro',
			woeid: 2344690
  		},
  		'Salta': {
			displayName: 'Salta',
			woeid: 466864
  		},
  		'San Juan': {
			displayName: 'San Juan',
			woeid: 91863255
  		},
  		'San Luis': {
			displayName: 'San Luis',
			woeid: 332480
  		},
  		'Santa Cruz': {
			displayName: 'Santa Cruz',
			woeid: 2344694
  		},
  		'Santa Fe': {
  			'Rosario': {
  				displayName: 'Rosario, Santa Fe',
  				woeid: 466862
  	  		},
			displayName: 'Santa Fe',
			woeid: 466862
  		},
  		'Santiago del Estero': {
			displayName: 'Santiago del Estero',
			woeid: 332474
  		},
  		'Tierra del Fuego': {
			displayName: 'Tierra del Fuego',
			woeid: 2344697
  		},
  		'Tucumán': {
			displayName: 'Tucumán',
			woeid: 466865
  		},
		displayName: 'Buenos Aires',
		woeid: 2344675
  	},
  	
	_strings: {
		"humidity" : {
			"en": "Humidity",
			"es": "Humedad"
		},
		"visibility" : {
			"en": "Visibility",
			"es": "Visibilidad"
		},
		"wind" : {
			"en": "Wind",
			"es": "Viento"
		},
	    "codes": [
			{
				"class": "wi-tornado",
				"number": "0",
				"description": {
					"en": "Tornado",
					"es": "Tornado"
				}
			},
			{
				"class": "wi-hurricane",
				"number": "1",
				"description": {
					"en": "Tropical storm",
					"es": "Tormenta tropical"
				}
			},
			{
				"class": "wi-hurricane",
				"number": "2",
				"description": {
					"en": "Hurricane",
					"es": "Huracán"
				}
			},
			{
				"class": "wi-thunderstorm",
				"number": "3",
				"description": {
					"en": "Severe thunderstorms",
					"es": "Tormenta electrica intensa"
				}
			},
			{
				"class": "wi-thunderstorm",
				"number": "4",
				"description": {
					"en": "Thunderstorms",
					"es": "Tormenta eléctrica"
				}
			},
			{
				"class": "wi-rain-mix",
				"number": "5",
				"description": {
					"en": "Mixed rain and snow",
					"es": "Lluvia y nieve"
				}
			},
			{
				"class": "wi-sleet",
				"number": "6",
				"description": {
					"en": "Mixed rain and sleet",
					"es": "Lluvia y aguanieve"
				}
			},
			{
				"class": "wi-rain-mix",
				"number": "7",
				"description": {
					"en": "Mixed snow and sleet",
					"es": "Nieve y aguanieve"
				}
			},
			{
				"class": "wi-snow-wind",
				"number": "8",
				"description": {
					"en": "Freezing drizzle",
					"es": "Llovizna helada"
				}
			},
			{
				"class": "wi-sprinkle",
				"number": "9",
				"description": {
					"en": "Drizzle",
					"es": "Llovizna"
				}
			},
			{
				"class": "wi-rain-wind",
				"number": "10",
				"description": {
					"en": "Freezing rain",
					"es": "Lluvia helada"
				}
			},
			{
				"class": "wi-showers",
				"number": "11",
				"description": {
					"en": "Showers",
					"es": "Chubascos"
				}
			},
			{
				"class": "wi-rain",
				"number": "12",
				"description": {
					"en": "Showers",
					"es": "Chubascos"
				}
			},
			{
				"class": "wi-snow",
				"number": "13",
				"description": {
					"en": "Snow flurries",
					"es": "Copos de nieve"
				}
			},
			{
				"class": "wi-rain-mix",
				"number": "14",
				"description": {
					"en": "Light snow showers",
					"es": "Nieve ligera"
				}
			},
			{
				"class": "wi-snow-wind",
				"number": "15",
				"description": {
					"en": "Blowing snow",
					"es": "Nieve con viento"
				}
			},
			{
				"class": "wi-snow",
				"number": "16",
				"description": {
					"en": "Snow",
					"es": "Nieve"
				}
			},
			{
				"class": "wi-hail",
				"number": "17",
				"description": {
					"en": "Hail",
					"es": "Granizo"
				}
			},
			{
				"class": "wi-sleet",
				"number": "18",
				"description": {
					"en": "Sleet",
					"es": "Aguanieve"
				}
			},
			{
				"class": "wi-dust",
				"number": "19",
				"description": {
					"en": "Dust",
					"es": "Polvo"
				}
			},
			{
				"class": "wi-fog",
				"number": "20",
				"description": {
					"en": "Foggy",
					"es": "Niebla"
				}
			},
			{
				"class": "wi-day-haze",
				"number": "21",
				"description": {
					"en": "Haze",
					"es": "Neblina"
				}
			},
			{
				"class": "wi-smoke",
				"number": "22",
				"description": {
					"en": "Smoky",
					"es": "Humoso"
				}
			},
			{
				"class": "wi-strong-wind",
				"number": "23",
				"description": {
					"en": "Blustery",
					"es": "Tempestuoso"
				}
			},
			{
				"class": "wi-windy",
				"number": "24",
				"description": {
					"en": "Windy",
					"es": "Ventoso"
				}
			},
			{
				"class": "wi-snowflake-cold",
				"number": "25",
				"description": {
					"en": "Cold",
					"es": "Frio"
				}
			},
			{
				"class": "wi-cloudy",
				"number": "26",
				"description": {
					"en": "Cloudy",
					"es": "Nublado"
				}
			},
			{
				"class": "wi-night-cloudy",
				"number": "27",
				"description": {
					"en": "Mostly cloudy (night)",
					"es": "Mayormente nublado (noche)"
				}
			},
			{
				"class": "wi-day-cloudy",
				"number": "28",
				"description": {
					"en": "Mostly cloudy (day)",
					"es": "Mayormente nublado (día)"
				}
			},
			{
				"class": "wi-night-partly-cloudy",
				"number": "29",
				"description": {
					"en": "Partly cloudy (night)",
					"es": "Parcialmente nublado (noche)"
				}
			},
			{
				"class": "wi-day-cloudy",
				"number": "30",
				"description": {
					"en": "Partly cloudy (day)",
					"es": "Parcialmente nublado (día)"
				}
			},
			{
				"class": "wi-night-clear",
				"number": "31",
				"description": {
					"en": "Clear (night)",
					"es": "Despejado (noche)"
				}
			},
			{
				"class": "wi-day-sunny",
				"number": "32",
				"description": {
					"en": "Sunny",
					"es": "Soleado"
				}
			},
			{
				"class": "wi-night-cloudy",
				"number": "33",
				"description": {
					"en": "Fair (night)",
					"es": "Despejado (noche)"
				}
			},
			{
				"class": "wi-day-sunny-overcast",
				"number": "34",
				"description": {
					"en": "Fair (day)",
					"es": "Despejado (día)"
				}
			},
			{
				"class": "wi-hail",
				"number": "35",
				"description": {
					"en": "Mixed rain and hail",
					"es": "LLuvia y granizo"
				}
			},
			{
				"class": "wi-hot",
				"number": "36",
				"description": {
					"en": "Hot",
					"es": "Caluroso"
				}
			},
			{
				"class": "wi-day-thunderstorm",
				"number": "37",
				"description": {
					"en": "Isolated thunderstorms",
					"es": "Tormentas eléctricas aisladas"
				}
			},
			{
				"class": "wi-day-thunderstorm",
				"number": "38",
				"description": {
					"en": "Scattered thunderstorms",
					"es": "Tormentas eléctricas dispersas"
				}
			},
			{
				"class": "wi-rain",
				"number": "39",
				"description": {
					"en": "Scattered thunderstorms",
					"es": "Tormentas eléctricas dispersas"
				}
			},
			{
				"class": "wi-rain",
				"number": "40",
				"description": {
					"en": "Scattered showers",
					"es": "Tormentas dispersas"
				}
			},
			{
				"class": "wi-snow",
				"number": "41",
				"description": {
					"en": "Heavy snow",
					"es": "Nevada fuerte"
				}
			},
			{
				"class": "wi-rain-mix",
				"number": "42",
				"description": {
					"en": "Scattered snow showers",
					"es": "Aguanieve dispersa"
				}
			},
			{
				"class": "wi-snow",
				"number": "43",
				"description": {
					"en": "Heavy snow",
					"es": "Nevada fuerte"
				}
			},
			{
				"class": "wi-day-cloudy",
				"number": "44",
				"description": {
					"en": "Partly cloudy",
					"es": "Parcialmente nublado"
				}
			},
			{
				"class": "wi-storm-showers",
				"number": "45",
				"description": {
					"en": "Thundershowers",
					"es": "Tormentoso"
				}
			},
			{
				"class": "wi-rain-mix",
				"number": "46",
				"description": {
					"en": "Snow showers",
					"es": "Aguanieve"
				}
			},
			{
				"class": "wi-storm-showers",
				"number": "47",
				"description": {
					"en": "Isolated thundershowers",
					"es": "Tormentas eléctricas aisladas"
				}
			},
			{
				"class": "wi-horizon",
				"number": "3200",
				"description": {
					"en": "Not available",
					"es": "Descripción no disponible"
				}
			}
	    ]
	}
});