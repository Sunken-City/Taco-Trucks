window.addEventListener('load', function(event) {
	var createATacoButton = $('#createATaco');
	createATacoButton.click(function(){
		window.location.replace("order.html");
	});

		var createAUser = $('#signUp');
		createAUser.click(function(){
			event.preventDefault();
			$.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/users',
                dataType: "json",
                data: signUpFormToJSON(),
                success: function(data) {
                    if (data.success) {
                        window.location.replace("order.html");
                    }
                },
                error: function(data) {
                    alert('Errors occured during your request :(');
                }
            });
		});

		var loginAUser = $('#signIn');
        loginAUser.click(function(){

			$.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/login',
                dataType: "json",
                data: loginFormToJSON(),
                success: function(data) {
                    if (data.success) {
                        window.location.replace("order.html");
                    }
                    else {
                        if(data.message !== undefined) {
                            alert("We don't have that email! Try creating "+
                                "an Account!");
                            autoFillCreateAccount();
                        }
                        else {
                            alert("Login failed");
                            $('#loginPassword').val('');
                        }
                    }
                },
                error: function(data) {
                    alert('Errors occured during your request :(');
                    $('#loginPassword').val('');
                }
            });
		});

});




function autoFillCreateAccount()
{
    var loginEmail = $('#loginEmail');
    var loginPassword = $('#loginPassword');
    var email = loginEmail.val();
    var pass = loginPassword.val();

    loginPassword.val('');

    $('#createEmail').val(email);
    $('#createPassword').val(pass);
}



// Helper function to serialize all the form fields into a JSON string
function loginFormToJSON() {
    return JSON.stringify({
        "email": $('#loginEmail').val(),
        "password": $('#loginPassword').val()
        });
}
// Helper function to serialize all the form fields into a JSON string
function signUpFormToJSON() {
    return JSON.stringify({
        "email": $('#createEmail').val(),
        "password": $('#createPassword').val(),
        "f_name":$('#firstName').val(),
        "l_name":$('#lastName').val(),
        "cc_p":$('#CardProvider').val(),
        "cc_n":$('#creditCardNumber').val(),
        "tele_num": '000-000-0000'
        });
}
