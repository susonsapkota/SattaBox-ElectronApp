const path = require('path');
const url = require('url');
const app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
var XLSX = require('xlsx');






$(document).ready(function () {
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


// function showDialog(){

// //renderer.js - renderer process example
// const {remote} = require('electron'),
// dialog = remote.dialog,
// WIN = remote.getCurrentWindow();

// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = mm + '-' + dd + '-' + yyyy;



// let options = {
//  //Placeholder 1
//  title: "Save as Excel",



//  //Placeholder 2
//  defaultPath : "C:\\"+today+".xlsx",

//  //Placeholder 4
//  buttonLabel : "Save",

//  //Placeholder 3
//  filters :[
//   {name: 'All Files', extensions: ['*']}
//  ]
// }

// dialog.showSaveDialog(WIN, options, (filename) => {
//  console.log(filename)
// })
// }


function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}



$(function () {
    $("#mySave").click(function (e) {

        var exceldat;
        $.ajax({
            url: "http://localhost:8081/json",
            type: 'GET',
            contentType: 'application/json',
            success: function (res) {
                delete res['data']['id'];

                exceldat=res['data']
                delete exceldat['id'];
                
                console.log(exceldat)
                var wb = XLSX.utils.book_new();

        wb.Props = {
            Title: "SheetJS Tutorial",
            Subject: "Test",
            Author: "Red Stapler",
            CreatedDate: new Date(2017, 12, 19)
        };
        wb.SheetNames.push("Test Sheet");
       
        var ws = XLSX.utils.json_to_sheet(exceldat);
        wb.Sheets["Test Sheet"] = ws;

        WIN = app.getCurrentWindow();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;

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

        var o = dialog.showSaveDialog(WIN,options);
        XLSX.writeFile(wb, o);
        dialog.showMessageBox({ message: "Exported data to " + o, buttons: ["OK"] });

            },
            error: function (err) {
            }
        });
        


    });
});



// $(function () {
//     $("#mySave").click(function (e) {
//         dialog.showSaveDialog((filename) => {
//             if (filename === undefined) {
//                 alert('File was not saved.');
//                 return;
//             }

//             var wb = XLSX.utils.book_new();

//             wb.Props = {
//                 Title: "SheetJS Tutorial",
//                 Subject: "Test",
//                 Author: "Red Stapler",
//                 CreatedDate: new Date(2017, 12, 19)
//             };
//             wb.SheetNames.push("Test Sheet");
//             var ws_data = [['hello' , 'world']];
//             var ws = XLSX.utils.aoa_to_sheet(ws_data);
//             wb.Sheets["Test Sheet"] = ws;


//             fs.writeFile(filename, content, (err) => {
//                 if (err) console.log(err);
//                 alert("File was successfully saved.");
//             })
//         })

//     });
// });

