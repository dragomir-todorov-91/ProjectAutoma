<?php
// Include confi.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tuts_rest";
if($_SERVER['REQUEST_METHOD'] == "POST"){
 // Get data
  if(isset($_POST['user']) && isset($_POST['sleeptime']) && isset($_POST['turnaircond'])) {

	
	$data=json_encode($_POST);
     
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
			echo "No Permition To Execute Operation!";
		}
    }
} else {
    echo "No Permition To Execute Operation!";
}

mysqli_close($conn);
 
}

 
 }
