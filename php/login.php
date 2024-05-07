<?php
require_once 'classes/JsonDatabase.php';
require_once 'classes/User.php';

$jsonFile = "../db/users.json";

$errors = [];

$loginLogin = $_POST['login'];
$loginPassword = $_POST['password'];

$database = new JsonDatabase($jsonFile);

$users = $database->getUsers();

if (isset($users[$loginLogin])) {
    $userData = $users[$loginLogin];

    $storedPassword = $userData['password'];
    $salt = $userData['salt'];

    $hashedPassword = sha1($salt . $loginPassword);

    if ($hashedPassword === $storedPassword) {
        $loggedInUser = new User($loginLogin, $storedPassword, $userData['email'], $userData['name']);

        echo json_encode(['username' => $loggedInUser->getName()]);
    } else {
        echo json_encode(['error' => 'Неправильный пароль.']);
    }
} else {
    echo json_encode(['error' => 'Пользователь с таким логином не найден.']);
}
?>
