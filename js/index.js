'use strict';

const btnBuscar = document.getElementById('btn-buscar');
const sectionResultados = document.getElementById('section-resultados');

const apiKey = 'dgtxueScFtSEm7995ymTf4JXw5HxiHmE88hlVMd2';

function buscar() {
	let fecha = document.getElementById('date-fecha').value;

	if (fecha) {
		let url = `https://api.nasa.gov/planetary/apod?date=${fecha}&api_key=${apiKey}`;

		fetch(url)
		.then(response => response.json())
		.then(json => mostrarData(json))
		.catch(err => console.warn('Solicitud fallida', err));
	}
}

function mostrarData(json) {
	if (!json.code) {
		let infoImg = document.getElementById('template-info-imagen').content;
		let clonInfoImg = document.importNode(infoImg, true);

		let copyright = json.copyright;
		let fecha = json.date;
		let explicacion = json.explanation;
		let titulo = json.title;
		let url = json.url;
		let urlHD = json.hdurl;

		clonInfoImg.getElementById('img').src = url;
		clonInfoImg.getElementById('img').alt = explicacion;
		clonInfoImg.getElementById('img').title = titulo;

		clonInfoImg.getElementById('titulo').textContent = titulo;
		clonInfoImg.getElementById('fecha').innerHTML = `<b>Fecha:</b> ${fecha}`;
		clonInfoImg.getElementById('copyright').innerHTML = `<b>Copyright:</b> ${copyright}`;
		clonInfoImg.getElementById('explicacion').innerHTML = `${explicacion}`;

		clonInfoImg.getElementById('link1').href = url;
		clonInfoImg.getElementById('link2').href = urlHD;

		sectionResultados.prepend(clonInfoImg);
	} else {
		console.log("Fecha invalida");
	}
}


btnBuscar.addEventListener('click', buscar);