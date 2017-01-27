<?php

    include('config.php');

    $conn = new mysqli($MySql_server, $MySql_user, $MySql_pass, $MySql_db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST['user']) && isset($_POST['email']))
    {
        $username = mysqli_real_escape_string($conn,$_POST['user']);
        $email = mysqli_real_escape_string($conn,$_POST['email']);

        $sql = "INSERT INTO active_users (username,email) VALUES ('$username', '$email')";
        
        if($conn->query($sql)==TRUE)
        {
            $last_id = $conn->insert_id;
            echo $last_id;
        }
    }
    else
    {
        echo "0";
    }

    /*$sql = "SELECT id, username FROM active_users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["username"]."<br>";
        }
    }*/

