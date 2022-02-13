<?php

$data = [
	[
		"name" => "2x4",
		"width" => 4,
		"heigth" => 2
	],
	[
		"name" => "2x6",
		"width" => 6,
		"heigth" => 2
	],
	[
		"name" => "4x4",
		"width" => 4,
		"heigth" => 4
	]
];

header('Content-Type: application/json'); 

echo json_encode($data);
?>
