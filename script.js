const path = require('path');
const url = require('url');
const app = require('electron').remote;
var dialog = app.dialog;
var XLSX = require('xlsx');

$(document).ready(function () {
    $('#data-date').datepicker({
        autoclose:true,
        todayHighlight:true
    });
    myTable = $('#dataTable').DataTable({
        destroy: true,
        dom: 'lfrtip',
        "ajax": "http://localhost:8081/json",
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
                "defaultContent": "<button type='button' id='editBtn' class='btn btn-primary btn-sm'>Edit</button><button type='button' id='delBtn' class='btn btn-danger btn-sm ml-2'>Delete</button>"
            }
        ]
    });
    $("#filterbox").keyup(function () {
        myTable.search(this.value).draw();
    });

    $("#dataTable tbody").on("click", '#editBtn', function (event) {

        var data = myTable.row($(this).parents('tr')).data();
        $.each(data, function (key, value) {
            $('#updateModal').find('input[name=' + key + ']').val(value)
            $('#updateModal').modal('toggle')
        })

    });

    $("#dataTable tbody").on("click", '#delBtn', function (event) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover data after this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                var data = myTable.row($(this).parents('tr')).data()['id'];
                $.ajax({
                    url: "http://localhost:8081/formdelete",
                    data: JSON.stringify({ 'id': data }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (res) {
                        myTable.ajax.reload();
                        Swal.fire({
                            icon: 'success',
                            title: '',
                            text: 'Successfully Deleted!',
                            timer: 2500
                        });



                    },
                    error: function (err) {
                        Swal.fire({
                            icon: 'error',
                            title: '',
                            text: 'Error Occururd.',
                            footer: 'Error Code:FAD!',
                            timer: 2000
                        });
                    }
                });

            }
        })



    });

});

$(function () {
    $("#mySave").click(function (e) {

        var exceldat;
        $.ajax({
            url: "http://localhost:8081/json",
            type: 'GET',
            contentType: 'application/json',
            success: function (res) {
                delete res['data']['id'];

                var exceldat = res['data']

                exceldat.forEach(function(item){ 
                    delete item.id; 
                });

                var wb = XLSX.utils.book_new();
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = mm + '-' + dd + '-' + yyyy;

                wb.Props = {
                    Title: "Satta Box Data",
                    Subject: "BoxRecord",
                    Author: "Suson Sapkota",
                    CreatedDate: new Date(yyyy, mm, dd)
                };
                wb.SheetNames.push("Record");

                var ws = XLSX.utils.json_to_sheet(exceldat);
                wb.Sheets["Record"] = ws;

                WIN = app.getCurrentWindow();
                paths = app.app // getting property called app from app
                document_path = paths.getPath('documents');

                let options = {
                    title: "Save as Excel",
                    defaultPath: "document_path\\" + today + ".xlsx",
                    buttonLabel: "Save",
                    filters: [
                        { name: 'All Files', extensions: ['*'] }
                    ]
                }

                var o = dialog.showSaveDialog(WIN, options);
                XLSX.writeFile(wb, o);
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: 'Successfully exported data to'+ o,
                    timer: 2500
                });

            },
            error: function (err) {
            }
        });

    });
}); 