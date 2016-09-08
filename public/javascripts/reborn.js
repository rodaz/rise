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
			$('#root').tablesorter({
				dateFormat: "ddmmyyyy",
				theme : "bootstrap",

			    widthFixed: true,

			    headerTemplate : '{content} {icon}', 

			    // widget code contained in the jquery.tablesorter.widgets.js file
			    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
			    widgets : [ "uitheme", "filter"],

			    widgetOptions : {
			      // reset filters button
			      filter_hideFilters: true,

			      // extra css class name (string or array) added to the filter element (input or select)
			      filter_cssFilter: "form-control"
			  	}
			});
		});
	});

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
				
				if (key == '_id' || key == '__v') 
					continue;
				
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
				// if (key == 'validity') {
				//     if (moment(data[i]['done']) < moment())
    //                     content += '<td class=\'danger\'>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
    //                 else if (moment(data[i][key]) < moment().add(2, 'days'))
    //                 		content += '<td class=\'warning\'>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
    //                 	else content += '<td>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
    //                 continue;
    //             }
                if (key == 'date_reg') {
				    if (data[i]['done'] == 'нет' && moment() > moment(data[i][key]).add(23, 'days'))
                        content += '<td class=\'danger\'>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
                    else 
                    	content += '<td>' + moment(data[i][key]).format('DD.MM.YYYY') + '</td>';
                    continue;
                }

                // if (key == 'done') {
                // 	if (data[i][key] == true)
                // 		content += '<td><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></td>';
                // 	else
                // 		content += '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>';
                // 	continue;
                // }

                // if (key == 'partner') {
                // 	content += '<td title=\'Описание контрагента\'>' + data[i][key] + '</td>';
                // 	continue;
                // }
				content += '<td>' + data[i][key] + '</td>';
			}
			content += '</tr>';
		}
		content += "</tbody></table>";
		core.empty();
		core.append(content);
	}

	// $('#btnScan').on('click', function(event) {
	// 	event.preventDefault();
	// 	console.log('btnScan');
	// 	$.get("/rest/scan", {
	// 		id : $('#currId').val()
	// 	});
	// });
});