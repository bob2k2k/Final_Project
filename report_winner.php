<?php

    function reportWinner() {
    if (isset($_GET["w1"]) && isset($_GET["w2"])) {

    }
    }

    // reportWinner();


    $dbServername = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "winnerdb";

    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
    $data = json_decode(file_get_contents("php://input"), TRUE);
    $winnerName = $data['winner'];
    // $numofwins = $_POST['numofwins'];

    $sql = "INSERT INTO wongames(winnername, numofwins) VALUES ($winnerName, 10)";

    $run = mysqli_query($conn, $sql) or die (sqli_error());
    if($run){
        echo "YAAAAAYYYYY";
    }
    else {
       echo "NOOOOO";
    }




    $conn->close();
?>