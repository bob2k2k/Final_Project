<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Top Ten Tic Tac Toe Winners</title>
</head>
<body>
    <h1>Top 10 Tic Tac Toe Winners</h1>

    <table>
        <thead>
            <th>Name</th>
            <th>Number of Wins</th>
        </thead>
        <tbody>
            <td></td>
            <td></td>
        </tbody>
    </table>


<?php
     $dbServername = "localhost";
     $dbUsername = "root";
     $dbPassword = "";
     $dbName = "winnerdb";
 
     $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
 
     $sql = "SELECT * FROM wongames;";
 
     $run = mysqli_query($conn, $sql);

    // $resultCheck = mysqli_num_row($run);

    // if ($resultCheck > 0){
    //     while ($row = mysqli_fetch_assoc($run)){
    //         echo $row['winnername'];
    //     }
    // }


     echo "<script>console.log(".json_encode($run).")</script>";
 
     $conn->close();

?>


</body>
</html>