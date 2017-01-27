<?php

    include('config.php');

    $conn = new mysqli($MySql_server, $MySql_user, $MySql_pass, $MySql_db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST['id']) && isset($_POST['msg']))
    {
        $id = mysqli_real_escape_string($conn,$_POST['id']);
        $msg = mysqli_real_escape_string($conn,$_POST['msg']);

        $sql = "INSERT INTO user_messages (user_id,message) VALUES ('$id', '$msg')";
        
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

