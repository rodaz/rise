$(document).ready(function(){

	//configurable variables
	var DAYS_BEFORE_BACKLIGHT = 23;

	/**
	*	Search recording with specified fields
	*/
	$('#search').on('click', function() {
		
		$.post("/rest/search", {
			year: $('#year').val(),
			branch: $('#branch').val(),
			partner: $('#partner').val(),
			exec: $('#exec').val(),
			done: $('#done').val()
		}, function (data) {
			
			create(data);

			//Options for tablesorter plugin
			$('#root').tablesorter({
				dateFormat: "ddmmyyyy",
				theme : "bootstrap",
			    widthFixed: true,
			    headerTemplate : '{content} {icon}', 
			    widgets : [ "uitheme", "filter"],
			    widgetOptions : {
			      filter_hideFilters: true,
			      filter_cssFilter: "form-control"
			  	}
			});
		});
	});
	/**
	*	Create a main table with data
	*/
	function create(data) {
        var core = $('#core');
		var content = "<table class='table table-bordered tablesorter' id='root'>";
		
		content += '<thead><tr>'+
			'<th>Ред.</th>'+
			'<th>Нал.</th>'+
			'<th>№ рег.</th>'+
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
			'<th>Скан</th>'+
			'<th>Примечание</th>'+
		'</tr></thead><tbody>';

		for (var i=0; i<data.length; i++) {
			content += '<tr>';
			content += '<td><a href=\'rest/edit/'+data[i]._id+'\'><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td>';
			for (var key in data[i]) {
				
				//hidden fields
				if (key == '_id' || key == '__v') 
					continue;
				
				//set date format
				if (key == 'date_close' || key == 'validity') {
					content += '<td>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
					continue;
				}

				if (key == 'scan') {
					if (data[i][key] == '') {
						content += '<td>нет</td>';
					} else {
						content += '<td>да</td>';
					}
					continue;
				}

				//backlight after n days if done = false
                if (key == 'date_reg') {
				    if (data[i]['done'] == 'нет' && moment() > moment(data[i][key]).add(DAYS_BEFORE_BACKLIGHT, 'days'))
                        content += '<td class=\'danger\'>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
                    else 
                    	content += '<td>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
                    continue;
                }

				content += '<td>' + data[i][key] + '</td>';
			}

			content += '</tr>';
		}

		content += "</tbody></table>";
		core.empty();
		core.append(content);
	}
});