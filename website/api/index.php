<?php
require '../../vendor/autoload.php';
require_once('../../init.php');
require_once('../../lib/password.php');
require_once('../../lib/session.php');

session_cache_limiter(false);
getSession();

$app = new \Slim\Slim();
$app->log->setEnabled(true);

$app->get('/menu', 'validate', 'getMenu');
$app->post('/login', 'validate', 'authenticateUser');
$app->get('/logout', 'destroySession');
$app->get('/locations', 'validate', 'getLocations');
$app->get('/', function() use ($app)
{
    $app->halt(404);
});

$app->run();

function getLocations()
{
    $app = \Slim\Slim::getInstance();
    $sql = "SELECT * FROM truck_locations";

    try
    {
        $db = getConnection();
    }
    catch(PDOException $e)
    {
        $app->log->error($e->getMessage());
    }
}

function authenticateUser()
{
    $app = \Slim\Slim::getInstance();
    $user;
    $sql = "SELECT `pass` FROM `users` WHERE email=:email";
    $errors = false;

    try
    {
        $body = $app->request->getBody();
        $user = json_decode($body);
        if(isset($user))
        {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->execute(array(':email' => $user->email));
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else
            $errors = true;
    }
    catch (PDOException $e)
    {
        $app->log->error($e->getMessage());
        $errors = true;
    }
    catch (Exception $e)
    {
        $app->log->error($e->getMessage());
        $errors = true;
    }

    // if no errors have occured, start new session.
    if(!$errors)
    {
        if(password_verify($user->password, $row['pass']))
        {
            newSession(sha1(SALT.$user->email));
            $_SESSION['email'] = $email;
            echo json_encode("[ { 'success': true } ]");
        }
        else //user has failed login
        echo json_encode("[ { 'failure': true } ]");
    }
    else // if errors have occured
        echo json_encode("[ { 'failure': true } ]");
}

function getMenu()
{
    $app = \Slim\Slim::getInstance();
    $sql = "SELECT `name`, `price` FROM `fixins` INNER JOIN (`fixinClass`) ON 
    (`fixins`.`fixin_classId`=`fixinClass`.`fixin_classId`) 
    WHERE `class`=:item";
    $sql_ex = "SELECT `name`, `price`, `heatRating` FROM `fixins` INNER JOIN 
    (`fixinClass`) ON (`fixinClass`.`fixin_classId`=`fixins`.`fixin_classId`)
    INNER JOIN (`sauces`) ON (`sauces`.`sauceId`=`fixins`.`fixinId`) 
    WHERE `fixinClass`.`class`=:item";
    $items = array(
        'type',
        'tortillas',
        'rice',
        'cheese',
        'beans',
        'sauces',
        'vegetables',
        'extras' 
    );

    $menu = array();

    try
    {
        $db = getConnection();
        foreach ($items as $item) {
            if($item != 'sauces')
                $stmt = $db->prepare($sql);
            else
                $stmt = $db->prepare($sql_ex);
            $stmt->execute(array(':item' => $item));
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $menu[$item] = $rows;
        }
    }

    catch (PDOException $e)
    {
        $app->log->error($e->getMessage());
        $menu = array();

    }
    echo '{"menu": '. json_encode($menu) . '}';
}

function getConnection()
{
    $dbhost = DB_HOST;
    $dbname = DB_NAME;
    $dbuser = DB_USER;
    $dbpass = DB_PASS;

    $dbset = "mysql:host=$dbhost;dbname=$dbname;";

    $db = new PDO($dbset, $dbuser, $dbpass);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $db;
}
