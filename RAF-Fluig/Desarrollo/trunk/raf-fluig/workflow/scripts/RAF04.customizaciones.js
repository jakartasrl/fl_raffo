function pad(num) {    num = num + '';    return num.length < 2 ? '0' + num : num;}function formatDate(d){   var yyyy = d.getFullYear().toString();   var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based   var dd  = d.getDate().toString();   var hh = d.getHours();   var mi = d.getMinutes();   var ss = d.getSeconds();   return yyyy + pad(mm) + pad(dd) + pad(hh) + pad(mi) + pad(ss);}function formatDateMinutes(d,time){	var yyyy = dataArr[0];	var mm = dataArr[1];    var dd  = dataArr[2].split("T")[0];     	var hh = Math.floor( time / 3600 ); 	var mi = Math.floor( (time % 3600) / 60 );         	var ss = time % 60;	return yyyy + pad(mm) + pad(dd) + pad(hh) + pad(mi) + pad(ss);}