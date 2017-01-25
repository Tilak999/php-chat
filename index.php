<?php

    include('config.php');

    $conn = new mysqli($MySql_server, $MySql_user, $MySql_pass, $MySql_db);

    if ($conn->connect_error) {
        echo "ii";
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, username FROM active_users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["username"]."<br>";
        }
    }

