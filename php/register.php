<?php
require_once 'classes/JsonDatabase.php';
require_once 'classes/User.php';

$jsonFile = "../db/users.json";

$errors = [];

$registerLogin = $_POST['login'];
$registerPassword = $_POST['password'];
$registerConfirmPassword = $_POST['confirmPassword'];
$registerEmail = $_POST['email'];
$registerName = $_POST['name'];

$database = new JsonDatabase($jsonFile);

$users = $database->getUsers();

if (strlen($registerLogin) < 6) {
    $errors['login'] = 'Логин должен содержать не менее 6 символов.';
}

if (strlen($registerPassword) < 6) {
    $errors['password'] = 'Пароль должен содержать не менее 6 символов.';
} elseif ($registerPassword !== $registerConfirmPassword) {
    $errors['confirmPassword'] = 'Пароли не совпадают.';
}

if (!filter_var($registerEmail, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Некорректный email.';
}

if (strlen($registerName) < 2) {
    $errors['name'] = 'Имя должно содержать не менее 2 символов.';
}

if (isset($users[$registerLogin])) {
    $errors['login'] = 'Пользователь с таким логином уже существует.';
}

if (!empty($errors)) {
    echo json_encode(['errors' => $errors]);
    exit;
}

$salt = uniqid();

$hashedPassword = sha1($salt . $registerPassword);

$newUser = new User($registerLogin, $hashedPassword, $registerEmail, $registerName);

$users[$registerLogin] = [
    'password' => $hashedPassword,
    'salt' => $salt,
    'email' => $registerEmail,
    'name' => $registerName
];

$database->saveUsers($users);

echo json_encode(['message' => 'Регистрация прошла успешно!']);
?>
