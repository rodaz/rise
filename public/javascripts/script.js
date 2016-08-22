document.addEventListener("DOMContentLoaded", function()
{
 var container = document.getElementById('table'),
    hot;

  hot = new Handsontable(container,
  {
    data: [],
    colWidths: [45, 75, 104, 100, 100, 230, 450, 100, 60, 105, 75, 125, 300],
    afterChange: function (change, source)
    {
       if (source === 'loadData') {
        return; //don't save this change
      }
      $.post(
        "/rest/save",
        {
          onSrv: this.getData() //change
        },
        function (newData)
        {
        }
      )
    },
    minSpareRows: 1,
    manualRowResize: true,
    manualColumnResize: true,
    columnSorting: true,
    sortIndicator: true,
    colHeaders: ['№рег.', 'Отдел', '№ контрагента', 'Дата регистр.', 'Дата заключ.', 'Наименов. контрагента', 'Предмет договора', 'Сумма с НДС', 'Валюта', 'Срок действия', 'ЕГРПОУ', 'Отв. исп.', 'Наличие служебки об исполнении договора'],
    contextMenu: true,
    columns: [
      {type: 'numeric'}, //№ регистр.------------------------------------------------------------
      {
        type: 'dropdown',
        source: ['АХО', 'ОГМет', 'ОГТ', 'ОГМ', 'ВЛ', 'ОК', 'ОГЭ', 'ОИТ']
      }, //Отдел.--------------------------------------------------------------------------------
      {}, //№ контрагента------------------------------------------------------------------------
      {
        type: 'date',
        datePickerConfig: {
          firstDay: 1
        }
      }, // Дата регистр.------------------------------------------------------------------------
      {
        type: 'date',
        datePickerConfig: {
          firstDay: 1
        }
      }, // Дата заключ.------------------------------------------------------------------------
      {},  // Наименов. контрагента-------------------------------------------------------------
      {}, // Предмет договора-------------------------------------------------------------------
      {}, // Сумма с НДС------------------------------------------------------------------------
      {
        type: 'dropdown',
        source: ['ГРН', 'USD', 'EUR', 'РУБ']
      },  // Валюта-----------------------------------------------------------------------------
      {
        type: 'date',

        datePickerConfig: {
          firstDay: 1
        }
      }, // Срок действия-----------------------------------------------------------------------
      {type: 'numeric'}, // ЕГРПОУ--------------------------------------------------------------
      {
        type: 'dropdown',
        source: ['Баранов А.С.', 'Григорьев В.А.', 'Яковлева Н.И.', 'Сапунов Ю.Н.', 'Голенко Е.А.', 'Галицкая Ю.В.', 'Шевчик С.П.']
      }, // Отв. исп.---------------------------------------------------------------------------
      {} // Наличие служебки об исполнении договора---------------------------------------------
    ]
  });
    
  $.post(
  "/rest/load",
  {// Отправка запроса на срв
    // hData: hot3.getData()
  },
  function (data) 
  {
    // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
    hot.loadData(data);
    console.log(data);
  });

  function bindDumpButton() {
    if (typeof Handsontable === "undefined") {
      return;
    }
    Handsontable.Dom.addEvent(document.body, 'click', function (e) {
      var element = e.target || e.srcElement;
      if (element.nodeName == "BUTTON" && element.name == 'dump') {
        var name = element.getAttribute('data-dump');
        var instance = element.getAttribute('data-instance');
        var hot = window[instance];
        console.log('data of ' + name, hot.getData());
      }
    });
  }
  bindDumpButton();

});