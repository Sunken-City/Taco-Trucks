<!DOCTYPE html>
<!--Created by: Anthony Cloudy-->
<!--35103644-->
<html lang="en">

  <head>
    <title>The Taco Truck</title>
    <meta charset="UTF-8">
    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="css/mainStyle.css">
    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans|Hammersmith+One' rel='stylesheet' type='text/css'>
    
    <script src="js/order.js"></script>
    <link rel="stylesheet" type="text/css" href="css/orderStyle.css"/>
  </head>

  <body>
    <a href="#openLastOrderModal"><h1 id="title">Create A Taco</h1></a>
    
    <div id="currentTaco" class="menu">
      <h3 class="currTaco">Current Taco:</h3>
      <ul class="tortilla fixing">Tortilla:</ul>
      <ul class="filling fixing">Filling:</ul>
      <ul class="rice fixing">Rice:</ul>
      <ul class="bean fixing">Beans:</ul>
      <ul class="cheese fixing">Cheese:</ul>
      <ul class="sauce fixing">Sauce:</ul>
      <ul class="veggie fixing">Vegtables:</ul>
      <ul class="extras fixing">Extras:</ul>
      <span class="button currTaco clearButton" id="clearVeggies">Clear Vegetables</span>
      <span class="button currTaco clearButton" id="clearExtras">Clear Extras</span>
      <span class="button currTaco clearButton" id="clearTaco">Clear Taco</span>
      <div class="price currTaco" id="tacoPrice">Price:$0.00</div>
      <label class="currTaco" for="quantity">Quantity</label>
      <input name="quantity" class="quantity" value="1"/>
      <span class="button currTaco" id="addToCart">Add to Cart</span>
    </div>
    
    <div id="loginDiv">
      <?php include("loginModal.html"); ?>
    </div>
    
    <div id="accordion">
      <h3>Step 1: Choose your Tortilla</h3>
      <div id="tortillaMenu"></div>
      <h3>Step 2: Choose your Filling</h3>
      <div id="fillingMenu"></div>
      <h3>Step 3: Choose your Rice</h3>
      <div id="riceMenu"></div>
      <h3>Step 4: Choose your Beans</h3>
      <div id="beanMenu"></div>
      <h3>Step 5: Choose your Cheese</h3>
      <div id="cheeseMenu"></div>
      <h3>Step 6: Choose your Sauce</h3>
      <div id="sauceMenu"></div>
      <h3>Step 7: Choose any Veggies and Extras</h3>
      <div id="choicesMenu">
	<div id="veggieMenu"></div>
	<div id="extrasMenu"></div>
      </div>
    </div>
    
    <div id="cart" class="menu">
      <h3 id="cartHeader">Cart:</h3>
      <div id="cartItems"></div>
      <h3 id="total">Total:$0.00</h3>
      <span class="button" id="checkout">Checkout</span>
    </div>
    
<?php
require_once('../lib/session.php');
getSession();
if(validateSession('userId'))
{
?>
  <script src="/js/lastorder.js"></script>   
    <div id="openLastOrderModal" class="modalDialog">
      <div>
        <a href="#close" title="Close" class="close">X</a>
        <h2>Welcome Back, $NAME!</h2>
        <p>Would you like to add your<br>
          previous order to the cart?</p>
        <form id="lastOrder" action="">
          <ul>
            <li>
              <input type="button" value="Yes" id="lastOrderYes" class="submit button modal-button"/>
            </li>
            <li>
              <input type="button" value="No" id="lastOrderNo" class="submit button modal-button"/>
            </li>
          </ul>
        </form>
      </div>
    </div>
<?php
}
?>    
  </body>
</html>
