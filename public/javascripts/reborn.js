$(document).ready(function(){
	$('#search').on('click', function() {
		$.post("/rest/search", {
			year: $('#year').val(),
			branch: $('#branch').val(),
			partner: $('#partner').val(),
			exec: $('#exec').val(),
			done: $('#done').val()
		}, function (data) {
			create(data);
		});
	});

	function create(data) {
        var core = $('#core');
		var content = "<table class='table table-bordered root'>";
		content += '<tr>'+
			'<th>Ред.</th>'+
			'<th>Отдел</th>'+
			'<th>№ контрагента</th>'+
			'<th>Дата регистрации</th>'+
			'<th>Дата заключения</th>'+
			'<th>Контрагент</th>'+
			'<th>Предмет договора</th>'+
			'<th>Сумма с ндс.</th>'+
			'<th>Валюта</th>'+
			'<th>Срок действия</th>'+
			'<th>ЕГРПОУ</th>'+
			'<th>Отв. исполнитель</th>'+
			'<th>Примечание</th>'+
		'</tr>';
		for(var i=0; i<data.length; i++){
			content += '<tr>';
			content += '<td><a href=\'rest/edit/'+data[i]._id+'\'><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td>';
			for(var key in data[i]){
				if (key == '_id' || key == '__v') continue;
				if (key == 'date_close' || key == 'date_reg') {
					content += '<td>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
					continue;
				}
				if (key == 'validity') {
				    if (moment(data[i][key]) > moment().subtract(2, 'days'))
                        content += '<td class=\'warn\'>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
                    else content += '<td>' + moment(data[i][key]).format('L') + '</td>';
                    continue;
                }
				content += '<td>' + data[i][key] + '</td>';
			}
			content += '</tr>';
		}
		content += "</table>";
		core.empty();
		core.append(content);
	}
});