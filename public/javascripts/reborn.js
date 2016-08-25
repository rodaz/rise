function load() {
	$('#loadbtn').hide();
	$.post(
	  "/rest/load",
	  {},
  	  function (data) {console.log(data); create(data);}
  	);
}
var arr = [
			['АХО', '75/01,16М', new Date('2015-11-25'), new Date('2016-01-01'), 'ТОВ Днепруниверсал', 'вывоз бытовых отходов', 'счет', 'UAH', new Date('2016-11-31'), '35809022', 'Баранов А.С.', false],
			['ОГТ', '', new Date('2016-01-18'), new Date('2016-11-1'), 'ООО МВМ Груп ЛТД', 'покупка интструмента', 'спец', 'UAH', new Date('2016-11-31'), '39470596', 'Яковлева Н.И.', false],
			['ОГМ', '242', new Date('2016-01-18'), new Date('2015-11-18'), 'ООО Промтехаудит', 'работы по монтажу и демонтажу крана мостового', '15928.46', 'UAH', new Date('2016-2-31'), '36840681', 'Молдован А.В.', false],
			['ОИТ', '473042', new Date('2016-01-25'), new Date('2016-1-11'), 'ПАТ КБ Приватбанк', 'денежные средства', '70000.00', 'USD', new Date('2016-11-31'), '35809022', 'Баранов А.С.', false]
		];
function save() {
	$.post(
		"/rest/save",
		{data: arr}
	);
}

function search(){

}

function add(){

}

function create(data) {
	var content = "<table class='table table-bordered root'>";
	content += `<tr>
		<th>Ред.</th>
		<th>Отдел</th>
		<th>№ контрагента</th>
		<th>Дата регистрации</th>
		<th>Дата заключения</th>
		<th>Контрагент</th>
		<th>Предмет договора</th>
		<th>Сумма с ндс.</th>
		<th>Валюта</th>
		<th>Срок действия</th>
		<th>ЕГРПОУ</th>
		<th>Отв. исполнитель</th>
		<th>Утверждение</th>
	</tr>`;
	for(i=0; i<data.length; i++){
		content += '<tr>';
		content += '<td><a href=\'rest/edit/'+data[i]._id+'\'><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td>';
		for(key in data[i]){
			if (key == '_id' || key == '__v') continue;
			if (key == 'done') {
				if (data[i][key] == false) {
					content += '<td><span class="rem glyphicon glyphicon-remove" aria-hidden="true"></span></td>';
				}
				continue;
			} 
			content += '<td>' + data[i][key] + '</td>';
		}
		content += '</tr>';
	}
	content += "</table>";
	$('#core').append(content);
}


