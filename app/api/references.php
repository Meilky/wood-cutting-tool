<?php

$data = [
	[
		"name" => "Canvas 2d rendering context",
		"description" => "Utiliser pour les references du context 2d des canvas javascript pour faire aparaitre les coupures.",
		"link" => "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
	],
	[
		"name" => "React lifecycle",
		"description" => "Utiliser pour baser le cycle de mes composent sur ceux des composent de React.",
		"link" => "https://www.w3schools.com/react/react_lifecycle.asp"
	],
	[
		"name" => "Html element",
		"description" => "Utiliser pour les reference au element html.",
		"link" => "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"
	],
	[
		"name" => "Css flex box",
		"description" => "Utiliser pour la nav bar.",
		"link" => "https://www.w3schools.com/css/css3_flexbox_container.asp"
	]
];

header('Content-Type: application/json'); 

echo json_encode($data);
?>
