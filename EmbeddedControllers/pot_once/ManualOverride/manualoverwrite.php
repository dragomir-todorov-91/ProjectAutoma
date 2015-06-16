<?php
if($_SERVER['REQUEST_METHOD'] == "POST")
{
	// Get data
	if(isset($_POST['user'])) 
	{
		//	$data=json_encode($_POST);
		$jsonString = file_get_contents("data.json");

		$conf = json_decode($jsonString);


		if(isset($_POST['user'])){	
			$conf->userid=$_POST['user'];}
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

		

		$ch = curl_init('https://api.parse.com/1/classes/Users/'.($conf->userid));

		curl_setopt($ch,CURLOPT_HTTPHEADER,array(
			'X-Parse-Application-Id: WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL',
			'X-Parse-REST-API-Key: Vq6yZVkcHJUbiCNADmMgwN5ldsvTjvS23cGTQwG7',
			'Content-Type: application/json'));
			

			
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$output = curl_exec($ch);

		echo curl_errno($ch) . '<br/>';
		echo curl_error($ch) . '<br/>';

		curl_close($ch);

		$object = json_decode($output);
		
		

		if($object->verified == true)
			$ret = file_put_contents('data.json',$data);
		else {
			echo "No Permision To Execute Operation!";
		}
	}
}
