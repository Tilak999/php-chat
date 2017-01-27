<?php

    include('config.php');

    $conn = new mysqli($MySql_server, $MySql_user, $MySql_pass, $MySql_db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST['id']))
    {
        $id = mysqli_real_escape_string($conn,$_POST['id']);
    
        $sql = "SELECT * FROM user_messages WHERE user_id=$id OR receiver_id=$id ORDER BY time DESC";
        $result = $conn->query($sql);

        if($result->num_rows > 0)
        {
            echo '{ "count":"'.$result->num_rows.'","array":[';
            while($row = $result->fetch_assoc())
            {
                if($row['user_id']==$id) $from = "user";
                else $from = "admin";
                
                $msg = $row['message'];
                echo '{"from":"'.$from.'","msg":"'.$msg.'"},';
            }
            echo '{"from":"end","msg":"end"}]}';
        }
    }
    else
    {
        echo "0";
    }