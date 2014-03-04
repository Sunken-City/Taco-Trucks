var rootUrl = 'local.tacotruck.com';

function login() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootUrl + '/api/login',
        dataType: "json",
        data: loginFormToJSON(),
        success: function() {
            alert('Success!');
        },
        error: function() {
            alert('Error :(');
        }
    });
}

// Helper function to serialize all the form fields into a JSON string
function loginFormToJSON() {
    return JSON.stringify({
        "email": $('#email').val(),
        "password": $('#password').val(),
        });
}