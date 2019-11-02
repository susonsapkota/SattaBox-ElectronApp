houses = [

    {

        "Date": 1,
        "Name": "LanTest101",
        "Address": "x1",
        "Telephone": "yLanTest101",
        "Old Stb": "M",
        "New Stb": "10/16/1941",
        "old smart": "Caucasian/White",
        "New smart": "Caucasian/White",
        "Warranty": "Caucasian/White",
        "Remarks": "Bad",
    },
    {
        "Date": 1,
        "Name": "LanTest101",
        "Address": "x1",
        "Telephone": "yLanTest101",
        "Old Stb": "F",
        "New Stb": "10/16/1941",
        "old smart": "Caucasian/White",
        "New smart": "Caucasian/White",
        "Warranty": "Caucasian/White",
        "Remarks": "Good",
    },
]


$(document).ready(function () {

   

    myTable = $('#dataTable').DataTable({
        destroy: true,
        dom: 'lifrtp',
        "data": houses,
        "iDisplayLength": 25,
        "lengthChange": false,
        responsive: true,
        language: {
            entries: '',
            "emptyTable": "<center>No Data available. Please add infomation and try again.<center>"
        },

        "columns": [
            { "data": "Date" },
            { "data": "Name" },
            { "data": "Address" },
            { "data": "Telephone" },
            { "data": "Old Stb" },
            { "data": "New Stb" },
            { "data": "old smart" },
            { "data": "New smart" },
            { "data": "Warranty" },
            { "data": "Remarks" },
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



// for date

$('#datepicker').datepicker({
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
});
$('#datepicker').datepicker("setDate", new Date());