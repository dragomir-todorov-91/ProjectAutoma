<?php
require 'parse_sdk/autoload.php';

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseACL;
use Parse\ParsePush;
use Parse\ParseUser;
use Parse\ParseInstallation;
use Parse\ParseException;
use Parse\ParseAnalytics;
use Parse\ParseFile;
use Parse\ParseCloud;
use Parse\ParseClient;

$verified = false;

$app_id = "WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL";
$rest_key = "Vq6yZVkcHJUbiCNADmMgwN5ldsvTjvS23cGTQwG7";
$master_key = "tzRN8jcc6x9zO59h1zbO2TgVLH8A4GeAVd1o0lgz";

ParseClient::initialize( $app_id, $rest_key, $master_key );


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



$query = new ParseQuery("Users");
// Get a specific object:
$object = $query->get($_POST['user']);
$query->limit(2); // default 100, max 1000

// Just the first result:
$first = $query->first();

if($first->get("verified") == true)
	$ret = file_put_contents('data.json',$data);
else {
	echo "No Permision To Execute Operation!";
}

