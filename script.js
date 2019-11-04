const path = require('path');
const url = require('url');

// customers=[]

customers = [

    {

        "date": "1",
        "name": "LanTest101",
        "address": "123121212",
        "telephone": "yLanTest101",
        "old_stb": "M",
        "new_stb": "10/16/1941",
        "old_smart": "Caucasian/White",
        "new_smart": "Caucasian/White",
        "warranty": "Caucasian/White",
        "remarks": "Bad",
    },
    {
        "address": "kathmandu",
        "date": "11/11/2019",
        "name": "Suson",
        "new_smart": "OXFFA126",
        "new_stb": "OXFFA124",
        "old_smart": "OXFFA125",
        "old_stb": "OXFFA123",
        "remarks": "Good",
        "telephone": "+789 123456",
        "warranty": "OXFFA127"
    }

]


var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
});

knex('customers').select().then(function (data) {
    //do something here
    console.log(data);
    data.forEach(function (singleRow) {
        delete singleRow.id;
        customers.push(singleRow);
        console.log(singleRow);
    });
    console.log(customers)
    myTable = $('#dataTable').DataTable({
        destroy: true,
        dom: 'lifrtp',
        "data": customers,
        "iDisplayLength": 25,
        "lengthChange": false,
        responsive: true,
        language: {
            entries: '',
            "emptyTable": "<center>No Data available. Please add infomation and try again.<center>"
        },

        "columns": [
            { "data": "date" },
            { "data": "name" },
            { "data": "address" },
            { "data": "telephone" },
            { "data": "old_stb" },
            { "data": "new_stb" },
            { "data": "old_smart" },
            { "data": "new_smart" },
            { "data": "warranty" },
            { "data": "remarks" },
            {
                "data": null,
                "defaultContent": "<button type='button' class='btn btn-primary btn-sm'>Edit</button>"
            }
        ]
    });
});


$(document).ready(function () {

    $("#filterbox").keyup(function () {
        myTable.search(this.value).draw();
    });

});


function ConvertFormToJSON(form) {
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });

    return json;
}

$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        console.log('clicked');
        var form = this;
        houses.push(ConvertFormToJSON(form))

    }
    );
});



function ConvertFormToJSON(form) {
    var array = jQuery(form).serializeArray();
    console.log(array);
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });

    return json;
}




