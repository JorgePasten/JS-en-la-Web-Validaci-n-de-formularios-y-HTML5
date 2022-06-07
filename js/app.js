import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); /*Selecciona todos los inputs en el html*/

/*Para cada input llama al addEventListener  cuando sale de foco(blur) y ejecuta la función valida*/
inputs.forEach((input) => {
	input.addEventListener('blur', (input) =>{
		valida(input.target);
	})
})
