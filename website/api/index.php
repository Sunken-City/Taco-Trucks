<?php
require '../../vendor/autoload.php';
require_once('../../init.php');
require_once('../../lib/password.php');


$app = new \Slim\Slim();

$app->get('/menu', 'getMenu');

$app->run();

function getConnection()
{
    $dbhost = DB_HOST;
    $dbname = DB_NAME;
    $dbuser = DB_USER;
    $dbpass = DB_PASS;
    // $dbchar = DB_CHAR;

    $db = new PDO('mysql:host=127.0.0.1;dbname=taco_truck', $dbuser, $dbpass);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $db;
}

function authenticateUser()
{
    $request = Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "SELECT `pass` FROM `users` WHERE email=:email";
    $errors = false;

    try
    {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->execute(array(':email' => $user->email));
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    catch (PDOException $e)
    {
        $errors = true;
    }

    if(!$errors)
    {
        if(password_verify($user->password, $row['pass']))
        {
            if(session_status() == PHP_SESSION_ACTIVE)
            {
                    // destroying old active session
                $_SESSION = array();
                if (ini_get("session.use_cookies"))
                {
                    $params = session_get_cookie_params();
                    setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]);
                }
                session_destroy();
            }

            session_name(sha1($username));
            session_start();
            $_SESSION['user_email'] = $user->email;
        }
    }
}

function getMenu()
{
    $sql = "SELECT `name`, `price` FROM `fixins` INNER JOIN (`fixinClass`) ON (`fixins`.`fixin_classId`=`fixinClass`.`fixin_classId`) WHERE `class`=:item";
    $sql_ex = "SELECT `name`, `price`, `heatRating` FROM `fixins` INNER JOIN (`fixinClass`) ON (`fixinClass`.`fixin_classId`=`fixins`.`fixin_classId`)
    INNER JOIN (`sauces`) ON (`sauces`.`sauceId`=`fixins`.`fixinId`) WHERE `fixinClass`.`class`=:item";
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
        $menu['e'] = $e->getMessage();

    }
    echo '{"menu": '. json_encode($menu) . '}';
}

