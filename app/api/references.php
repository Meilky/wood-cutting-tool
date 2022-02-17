<?php

$data = [
	[
		"name" => "Canvas 2d rendering context",
		"description" => "Utilisé pour les références du context 2d des canvas javascript pour faire aparaitre les coupures.",
		"link" => "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
	],
	[
		"name" => "React lifecycle",
		"description" => "Utilisé pour baser le cycle de vie de mes \"custom component\" sur ceux de React.",
		"link" => "https://www.w3schools.com/react/react_lifecycle.asp"
	],
	[
		"name" => "Html element",
		"description" => "Utilisé pour les références au élément html.",
		"link" => "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"
	],
	[
		"name" => "Css flex box",
		"description" => "Utilisé pour la nav bar, la page des références et la page d'accueil.",
		"link" => "https://www.w3schools.com/css/css3_flexbox_container.asp"
	],
	[
		"name" => "Html form event",
		"description" => "Utilisé pour que la page ne \"reload\" pas lorsque nous cliquons sur le boutton soumettre dans la page d'accueil.",
		"link" => "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event"
	]
];

header('Content-Type: application/json'); 

echo json_encode($data);
?>
