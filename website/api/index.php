<?php
require '/vendor/autoload.php';


$app = new \Slim\Slim();

$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

$app->get('/', function () {
    echo "<h1>What's up?</h1>";
    echo "<h3>Enter into the url: ".$_SERVER['PHP_SELF']."/hello/yourname";
});

$app->run();
?>