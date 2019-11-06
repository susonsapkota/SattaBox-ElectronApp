const path = require('path');
const url = require('url');

$(document).ready(function () {
    myTable = $('#dataTable').DataTable({
        destroy: true,
        dom: 'lifrtp',
        // "data": customers,
        "ajax":"http://localhost:8081/json",
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
    $("#filterbox").keyup(function () {
        myTable.search(this.value).draw();
    });

});




