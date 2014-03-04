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
                    window.location.replace("order.html");
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
                success: function() {
                    window.location.replace("order.html");
                },
                error: function() {
                    alert('Error :(');
                }



	});
		});



});








// Helper function to serialize all the form fields into a JSON string
function loginFormToJSON() {
    return JSON.stringify({
        "email": $('#email').val(),
        "password": $('#password').val(),
        });
}
// Helper function to serialize all the form fields into a JSON string
function signUpFormToJSON() {
    return JSON.stringify({
        "email": $('#email').val(),
        "password": $('#password').val(),
        "f_name":$('#firstName').val(),
        "l_name":$('#lastName').val(),
        "cc_p":$('#CardProvider').val(),
        "cc_n":$('#creditCardNumber').val(),
        "tele_num": '214-159-1595'
        });
}