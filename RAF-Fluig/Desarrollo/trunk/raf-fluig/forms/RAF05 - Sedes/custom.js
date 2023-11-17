
var arqFormOpts = {
     devTools : false,
     parsley: {
 
     },
 
     onView: function() {
    	
     },
 
     onEdit: {
         custom: function() { 
        	 $("#grupoAprobadorRRHH").arqzoom({
     			datasetId:'group',
     			resultFields : ['groupPK.groupId','groupDescription'],
     			template: {
                    row: [
                          { field: 'groupDescription', header: "Descripción"},
                    ],
                    width: "100%",
                },
              filterValues: function(searchValue){
                return [
                	 {
							"_field" : "groupDescription",
							"_initialValue": '%'+searchValue+'%',
							"_finalValue" : '%'+searchValue+'%',
							"_type": 2, //SHOULD
							"_likeSearch": true
                	 },
                	 {
							"_field" : "groupPK.groupId",
							"_initialValue": '%RRHH%',
							"_finalValue" : '%RRHH%',
							"_type": 1, //SHOULD
							"_likeSearch": true
                	 },
                ];
            },
     			callback: function(res){

     			},
               displayKey: function(res){
                    return res['groupPK.groupId'];
                },
                
               clean: function(res){
                }
     		});
         },// Termina el on edit
         
         bpm: {
        	 
         },
 
         ged: function() {
         }
     },
     
};
