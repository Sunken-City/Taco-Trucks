<html>
<head>
    <title>Checkout</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
    <link rel="stylesheet" type="text/css" href="css/mainStyle.css">
    <link rel="stylesheet" type="text/css" href="css/checkout.css">

    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans|Hammersmith+One' rel='stylesheet' type='text/css'>
    
    <script type="text/javascript" src = "js/checkout.js" ></script>
</head>
<body>
	<div id="checkoutWindow">
		<h2>Checkout</h2>
		<section id="order">
            <h3 id="cartHeader">Cart:</h3>
            <div id="cart" class="menu" style="overflow-y:scroll;">
                <div id="cartItems"></div>
            </div>
            <h3 id="total">Total:$0.00</h3>
		</section>
		<section id="payment">
			<h3>Payment Information</h3>
			<form id="paymentForm" class="paymentForm" action="reciept.html" method="post">
        		<ul>
	       			<li>
	            		<input type="text" placeholder="First Name" id="firstName" name="firstName"required/>
	        		</li>

	        		<li>
	            		<input type="text" placeholder="Last Name" id="lastName" name="lastName"required/>
			        </li>

                    <li>
                        <select form="paymentForm" id="CardProvider">
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                        <option value="Discover">Discover</option>
                        </select>
                    </li>

			        <li>
			            <input type="text" placeholder="Credit Card Number" id="creditCardNumber" name="creditCardNumber" pattern="(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})" required />
			        </li>
        		</ul>
           		<input type="submit" value="Pay" id="payment" class="button" />
      		</form>


		</section>
	</div>

    <div id="map-canvas"></div>

</body>
</html>
<script type="text/javascript">
$("#createAccount").submit(function(event){
    alert("Submitting!");
});
</script>