<?php
class JsonDatabase {
    private $jsonFile;

    public function __construct($jsonFile) {
        $this->jsonFile = $jsonFile;
    }

    public function getUsers() {
        $usersJson = file_get_contents($this->jsonFile);
        return json_decode($usersJson, true);
    }
    public function saveUsers($users) {
        $usersJson = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($this->jsonFile, $usersJson);
    }
}
?>
