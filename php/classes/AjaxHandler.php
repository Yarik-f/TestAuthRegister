<?php
class AjaxHandler {
    public static function handleRequest() {
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            if (isset($_POST['action'])) {
                $action = $_POST['action'];
                switch ($action) {
                    case 'example_action':
                        self::exampleAction();
                        break;
                    default:
                        echo json_encode(['error' => 'Неизвестное действие']);
                        break;
                }
            } else {
                echo json_encode(['error' => 'Действие не указано']);
            }
        } else {
            return;
        }
    }

    private static function exampleAction() {
        echo json_encode(['message' => 'Пример действия выполнен успешно']);
    }
}

AjaxHandler::handleRequest();
?>
