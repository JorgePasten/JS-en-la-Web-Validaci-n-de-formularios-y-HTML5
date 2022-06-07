const inputNacimiento = document.querySelector('#birth');

/*Se usa 'blur' para escuchar eventos cuando salga o quite el foco del input*/
/*usamos el evento.target para referenciar el objeto del evento, en este caso el ingreso de fecha*/
inputNacimiento.addEventListener('blur', (evento) => {
	validarNacimiento(evento.target)
});

/*Valida el tipo de input*/
export function valida(input) {
	const tipoDeInput = input.dataset.tipo;/*Permite leer el tipo de input mediante el dataset*/
	if(validadores[tipoDeInput]){
		validadores[tipoDeInput](input)
	}

/*Evalua si input.validity.valid es True quita la clase, si es false agrega la clase para mostrar mensaje de error*/
	if (input.validity.valid) {
		input.parentElement.classList.remove("input-contanier--invalid");/*Input es valido, remueve la clase*/
		input.parentElement.querySelector(".input-message-error").innerHTML = ""/*accede a la clase del tag <span> y le asigna una cadena vacia*/
	} else {
		input.parentElement.classList.add("input-container--invalid");/*Input no es valido, agrega la clase*/
		input.parentElement.querySelector(".input-message-error").innerHTML =
		mostrarMensajeDeError(tipoDeInput, input);/*Accede a la clase del tag <span> y asigna el tipo de error*/
	}
}

/*Arreglo con los difentes tipos de errores en los input*/
const tipoDeErrores = [
	'valueMissing',
	'typeMismatch',
	'patternMismatch',
	'customError',
];



/*Objeto con los mensajes a mostrar de acuerdo al tipo de error*/
const mensajesDeError = {
	nombre: {
		valueMissing: "El nombre no puede estar vacío",/*Indica si el valor esta faltando*/
	},

	email: {
		valueMissing: "El email no puede estar vacío",/*Indica si valor esta faltando*/
		typeMismatch: "El correo no es valido",/*Indica el tipo que es correo*/
	},

	password: {
		valueMissing: "La contraseña no puede estar vacía",/*Indica si valor esta faltando*/
		patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales",/*Evalua si la contraseña cumple con lo requerido*/
	},

	nacimiento: {
		valueMissing: "La fecha de nacimiento no puede estar vacía",/*Indica si valor esta faltando*/
		customError: "Debes tener al menos 18 años de edad",/*Mensaje de error en edad*/
	},

	number: {
		valueMissing: "El número telefónico no puede estar vacío",
		patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
	},

	direccion: {
		valueMissing: "La dirección no puede estar vacía",
		patternMismatch: "La dirección debe contener de 10 a 40 caracteres.",
	},

	ciudad: {
		valueMissing: "La ciudad no puede estar vacía",
		patternMismatch: "La ciudad debe contener de 10 a 40 caracteres.",
	},

	estado: {
		valueMissing: "El estado no puede estar vacío",
		patternMismatch: "El estado debe contener de 10 a 40 caracteres.",
	},
}



/*Objeto con los diferentes tipos de input en el html*/
const validadores = {
	nacimiento: (input) => validarNacimiento(input),
};


/*Función que devuelve el mensaje de error tomado del objeto mensajesDeError*/
function mostrarMensajeDeError(tipoDeInput, input) {
	let mensaje = "";
	/*Recorre el arreglo tipoDeErrores*/
	tipoDeErrores.forEach((error) => {
		if(input.validity[error]) {
			console.log(tipoDeInput, error);
			console.log(input.validity[error]);
			console.log(mensajesDeError[tipoDeInput][error]);
			mensaje = mensajesDeError[tipoDeInput][error];
		}
	});
	return mensaje;
}



/*función que valida si la fecha ingresada tiene 18 años o más*/
function validarNacimiento(input){ 
	const fechaCliente = new Date(input.value);/*crea la fecha que ingreso el usuario y la asigna a la var*/
	let mensaje = ""; 
	if(!mayorDeEdad(fechaCliente)){ /*Si el cliente tiene menos de 18 años, asigna frase a var mensaje*/
		mensaje = "Debes tener al menos 18 años de edad";
	}

	input.setCustomValidity(mensaje);/*Define el mensaje de validación personalizado para el elemento seleccionado con el mensaje especifico*/
}

/*función que calcular los años que tiene la fecha ingresada a partir de la fecha actual, si tiene más de 18 retorna true*/
function mayorDeEdad(fecha){
	const fechaActual = new Date();/*Var con la fecha actual*/
	/*suma 18 años al año de la fecha ingresada por el cliente, conserva mismo mes y dia ingresados*/
	const diferenciaFechas = new Date( 
		fecha.getUTCFullYear() + 18,
		fecha.getUTCMonth(),
		fecha.getUTCDate()
	);
	return diferenciaFechas < fechaActual; /*Valida si la fecha ingresada +18 años, es menor a la fecha actual| returna true si es menor*/
} 