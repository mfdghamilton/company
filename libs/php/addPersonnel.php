<?php

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$id = $_POST['id'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	$departmentID = $_POST['departmentID'];

    if (!empty($firstName) && !empty($lastName) && !empty($email)) {

		$stmt = $conn->prepare("INSERT INTO personnel (id, firstName, lastName, email, departmentID) 
		VALUES(?, ?, ?, ?, ?)");
		$stmt->bind_param("isssi", $id, $firstName, $lastName, $email, $departmentID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
	}


?>