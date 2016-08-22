function load() {
	$.post(
	  "/rest/load",
	  {},
  	  function (data) {console.log(data); create(data);}
  	);
}
var arr = [
			['QWE', '123457', new Date(), new Date(), 'Kolya', 'Tema', 12, 'UAH', new Date(), 'Loki', true],
			['ASD', '123457', new Date(), new Date(), 'Kolya', 'Tema', 12, 'UAH', new Date(), 'Loki', true],
			['QZC', '334213', new Date(), new Date(), 'Kolya', 'Tema', 12, 'UAH', new Date(), 'Loki', true],
			['TYU', '123457', new Date(), new Date(), 'Kolya', 'Tema', 12, 'UAH', new Date(), 'Loki', true]
		];
function save() {
	$.post(
		"/rest/save",
		{data: arr}
	);
}

function create(data) {
	var content = "<table class='table'>";
	for(i=0; i<data.length-1; i++){
		content += '<tr>';
		for(j=0; j<data[i].length-1; j++){
			content += '<td>' + data[i][j] + '</td>';
		}
		content += '</tr>';
	}
	content += "</table>";
	$('#core').append(content);
}

