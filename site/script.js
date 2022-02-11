const plankTypes = document.getElementById("plankTypes");

const fillPlankTypes = async () =>{
	const req = await fetch("/api/plankTypes.php");
	const data = await req.json();

	for(const plank of data){
		let e = document.createElement("li");

		e.innerText = plank.name;

		plankTypes.append(e);
	}
}

fillPlankTypes()
