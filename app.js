// Obtengo los diferentes input por su id.
const nomb = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const mail = document.getElementById("mail");
const contraseña = document.getElementById("contraseña");
const buscador = document.getElementById("buscaNomb");
const buscador2 = document.getElementById("buscaNomb2");
const registro = document.getElementById("registro");
const phone = document.getElementById("celular");
const asignador = document.getElementById("asignar");
const opciones = document.getElementById("trat");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const turn = document.getElementById("turnList");
const contacto = document.getElementById("contacto");
const limpiador = document.getElementById("clean");
const nuevaCuenta = document.getElementById("nuevaCuenta");
const tieneCuenta = document.getElementById("tieneCuenta");
const crearCuenta = document.getElementById("registrar");
const ex = document.getElementById("EX");
const ex2 = document.getElementById("EX2");
const logIn = document.getElementById("log-in");


// Mostrar cajas donde se ingresan los datos para registrarse o loguearse.
nuevaCuenta.addEventListener("click", () => {
    crearCuenta.showModal();
});

ex.addEventListener("click", () => {
    crearCuenta.close();
})

tieneCuenta.addEventListener("click", () => {
    logIn.showModal();
});

ex2.addEventListener("click", () => {
    logIn.close();
})

/* AHORA HAY QUE CHEQUEAR SI EXISTE EL CLIENTE, E IDEINTIFICAR QUIEN ESTÁ REGISTRADO,
PARA DE AHI OBTENER LOS DATOS DEL TURNO.

*IDENTIFICAR CLIENTE REGISTRADO

*ASIGNAR EL TURNO DESEADO DENTRO DEL OBJETO

* CREAR UN REGISTRO CON LOS TURNOS ANTERIORES

*DAR POSIBILIDAD DE CANCELAR EL TURNO Y DESHACER CON 10SEGUNDOS DE TIEMPO





AHORA PARA EL ADMINISTRADOR: REGISTRAR LOS TURNOS TOMADOS SEGUN LO QUE SE LE ASIGNÓ A CADA CLIENTE.*/


registro.addEventListener("click", registrar);
asignador.addEventListener("click", asignar)


class cliente{
    constructor(nombre, apellido, edad, celular, email, contraseña){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.celular = celular;
        this.turno = false;
        this.email = email;
        this.contraseña = contraseña;
    }
    
}

class tratamientos{
    constructor (tipo, precio, duracion){
        this.tipo = tipo;
        this.precio = precio;
        this.duracion = duracion;   
    }
}

let tratamiento = [];
let clientes = [];

tratamiento.push(new tratamientos("quiropraxia", 2500, "1hs"))
tratamiento.push(new tratamientos("kinesiologia", 1500, "1hs"))
tratamiento.push(new tratamientos("Spa", 3500, "3hs"))

// Agrego los tratamientos a localStorage.
localStorage.setItem("Tratamientos", JSON.stringify(tratamiento))



//Registro nuevos clientes y los almaceno en el localStorage.
function registrar(){
    clientes.push(new cliente(nomb.value, lastName.value, parseInt(age.value), parseInt(phone.value), mail.value, contraseña.value));
    Toastify({

        text: "Se ha registrado a: " + nomb.value + " " + lastName.value,
        
        duration: 3000,

        style:{
            background: "green"
        }
        
    }).showToast();
    console.log(clientes);
    
    localStorage.setItem("clientes", JSON.stringify(clientes));

    
}


const quePaciente = localStorage.getItem("clientes");

if(quePaciente !== null){
        clientes = JSON.parse(quePaciente);
        
}    
    
console.log(clientes)

function asignar(){

    for(let paciente of clientes){
        if(paciente.nombre === buscador.value){
            paciente.turno = true; 
        }
        
        if(paciente.turno === true ){
            switch(trat.value){
                case "quiropraxia":
                    paciente.turno = "Quiropraxia";
                    crearTurno()
                    break;
                case "kinesiologia":
                    paciente.turno = "Kinesiología";
                    crearTurno()
                    break;
                case "spa":
                    paciente.turno = "Spa";
                    crearTurno()
                    break;    
    
            }
        }
    }

}


//Cuando se asigna un turno a un cliente, se crea un cartel con el turno correspondiente.
function crearTurno(){
    let buscar = buscador.value;
    for(let pacient of clientes){
        const ul = document.createElement('p');
        ul.innerHTML = `<div class ="turno">
                            ${pacient.nombre} tiene turno a ${pacient.turno}, el día ${fecha.value} a las ${hora.value}
                        </div>`; 
        if(buscar === pacient.nombre){                     
            turn.appendChild(ul);
        }
    }
    e.preventDefault()
}


// Se elimina el turno
limpiador.addEventListener("click", () => {
    turn.remove()
})




// BUSCADOR DE NRO DE TELÉFONO
buscador2.addEventListener('change', () => {
    let valor = buscador2.value;
    console.log(valor)
    for(const cte of clientes){
        let dato = document.createElement('p');
        dato.innerHTML = `Nombre: ${cte.nombre}<br>
                        Teléfono: ${cte.celular}`;
        if(valor === cte.nombre){
            contacto.appendChild(dato); 
        }                 
    }
});



