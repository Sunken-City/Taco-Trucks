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
                    console.log(data);
                    // if (data.success) {
                    //     window.location.replace("order.html");
                    // }
                },
                error: function(data) {
                    alert('Error');
                    console.log(data);
                }

	});
		});

			var loginAUser = $('#signIn');
            loginAUser.click(function(){
			event.preventDefault();
			$.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/login',
                dataType: "json",
                data: loginFormToJSON(),
                success: function(data) {
                    // window.location.replace("order.html");
                    console.log(data);
                },
                error: function(data) {
                    alert('Error :(');
                        console.log(data);
                }
            });
		});



});








// Helper function to serialize all the form fields into a JSON string
function loginFormToJSON() {
    console.log("email :" + $('#loginEmail').val());
    console.log("password:" + $('#loginPassword').val());
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
