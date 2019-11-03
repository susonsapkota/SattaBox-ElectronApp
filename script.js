
houses = [

    {

        "Date": 1,
        "Name": "LanTest101",
        "Address": "123121212",
        "Telephone": "yLanTest101",
        "Old Stb": "M",
        "New Stb": "10/16/1941",
        "Old smart": "Caucasian/White",
        "New smart": "Caucasian/White",
        "Warranty": "Caucasian/White",
        "Remarks": "Bad",
    },
    {
        "Date": 1,
        "Name": "LanTest101",
        "Address": "x1",
        "Telephone": "12121221",
        "Old Stb": "F",
        "New Stb": "10/16/1941",
        "Old smart": "Caucasian/White",
        "New smart": "Caucasian/White",
        "Warranty": "Caucasian/White",
        "Remarks": "Good",
    },
    {
        "Date": 1,
        "Name": "LanTest101",
        "Address": "x1",
        "Telephone": "12121221",
        "Old Stb": "F",
        "New Stb": "10/16/1941",
        "Old smart": "Caucasian/White",
        "New smart": "Caucasian/White",
        "Warranty": "Caucasian/White",
        "Remarks": "Good",
    },
    {
        "Date": 1,
        "Name": "LanTest101",
        "Address": "x1",
        "Telephone": "12121221",
        "Old Stb": "F",
        "New Stb": "10/16/1941",
        "Old smart": "Caucasian/White",
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
            { "data": "Old smart" },
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


