<?php
// Include confi.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tuts_rest";
if($_SERVER['REQUEST_METHOD'] == "POST"){
 // Get data
 if(isset($_POST['user'])) {
//	$data=json_encode($_POST);
$jsonString = file_get_contents("data.json");

$conf = json_decode($jsonString);


if(isset($_POST['sleeptime'])){
	$conf->sleeptime=$_POST['sleeptime'];}
if(isset($_POST['turnaircond'])){
	$conf->turnaircond=$_POST['turnaircond'];}
if(isset($_POST['turnlight'])){
	$conf->turnlight=$_POST['turnlight'];}
if(isset($_POST['temperature'])){
	$conf->temperature=$_POST['temperature'];}
if(isset($_POST['lightlevel'])){
	$conf->lightlevel=$_POST['lightlevel'];}
	


	
$data = json_encode($conf);
//print_r($data);
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$user=$_POST['user'];
$sql = "SELECT verified FROM users WHERE userid=$user";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["verified"]. "<br>" ;
		if($row["verified"]==1)
			$ret = file_put_contents('data.json',$data);
		else {
			echo "No Permision To Execute Operation!";
		}
    }
} else {
    echo "No Permision To Execute Operation!";
}
mysqli_close($conn);
 
}
 
 }
