<!doctype HTML>
<html>
  <head>
    <title>The Taco Truck</title>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

    <link rel="stylesheet" type="text/css" href="css/mainStyle.css">
    <link rel="stylesheet" type="text/css" href="css/homeStyle.css">

    <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans|Hammersmith+One' rel='stylesheet' type='text/css'>
    
    <script type="text/javascript" src = "js/main.js" ></script>
  </head>

  <body>
    <h1 id="title">The Taco Truck</h1>
    <img src="resources/img/taco_truck_logo.png" alt="Marfle Bark" id="logo">
    
    <div id = "createAccountDiv">
      <?php include("accountCreateModal.html"); ?>
    </div>

    <div id="loginDiv">
      <?php include("loginModal.html"); ?>
    </div>

    <div id="createATaco">
      <h2 class="buttonText">Create a Taco</h2>
    </div>
    
  </body>
</html>