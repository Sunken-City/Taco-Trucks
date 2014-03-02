<?php

/*
Will Spurgin
Session handlers in friendly function form
Made 2/28/2014
*/

function getSession()
{
    //if there is no active session
    if(!isset($_SESSION))
    {
        if(isset($_COOKIE))
        {
            reset($_COOKIE);
            $name = key($_COOKIE);
        }
        if(!isset($name))
                $name = sha1("GUEST".time());
        newSession($name);
    }
}

// this function will destory any active sessions
function newSession($name)
{
    if(isset($_SESSION))
        destroySession();
    session_name($name); // set session name
    session_start(); // resume session
}

// Session must be active
function destroySession()
{
    // destroying active session
    session_unset();
    if (ini_get("session.use_cookies"))
    {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', 1,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]);
    }
    session_destroy();
}
