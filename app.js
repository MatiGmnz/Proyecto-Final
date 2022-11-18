// Obtengo los diferentes input por su id.
const nomb = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const mail = document.getElementById("mail");
const contraseña = document.getElementById("contraseña");
const buscador = document.getElementById("buscaNomb");
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
const inicioSesion = document.getElementById("inicioSesion");
const correoExiste = document.getElementById("mailExiste");
const contraExiste = document.getElementById("passwordExiste");



class cliente{
    constructor(nombre, apellido, edad, celular, email, contraseña, turnoActual, historial){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.celular = celular;
        this.turno = false;
        this.email = email;
        this.contraseña = contraseña;
        this.turnoActual = turnoActual;
        this.historial = historial;
    }
    
};

class losTurnos{
    constructor(tratamiento, estaFecha, estaHora){
        this.tratamiento = tratamiento;
        this.estaFecha = estaFecha;
        this.estaHora = estaHora;
    }
}

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
});


registro.addEventListener("click", registrar);




let clientes = [];
let tratamientos = [];


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
    
console.log(clientes);


// Inicio sesion si el cliente ya está registrado
inicioSesion.addEventListener("click", () => {
    const user = clientes.find(el => el.email === correoExiste.value);
    console.log(user);

    user.contraseña === contraExiste.value ? console.log(`ha ingresado ${user.nombre}`) : console.log("no hay usuario registrado"); 


//En esta funcion se le permite al cliente logueado solicitar el turno que desee
    asignador.addEventListener("click", asignar);

    function asignar(){
        user.turno = true;
        user.turnoActual = [];
        user.historial = [];

        if(user.turno === true ){
            switch(trat.value){
                case "quiropraxia":
                    user.turno = "Quiropraxia";
                    user.turnoActual.push(new losTurnos(trat.value, fecha.value, hora.value))
                    //user.historial.push(trat.value, fecha.value, hora.value)
                    console.log("turno actual:" + user.turnoActual.tratamiento)
                    crearTurno()
                    break;
                case "kinesiologia":
                    user.turno = "Kinesiología";
                    user.turnoActual.push(new losTurnos(trat.value, fecha.value, hora.value))
                    console.log("turno actual:" + user.turnoActual.tratamiento)
                    crearTurno()
                    break;
                case "spa":
                    user.turno = "Spa";
                    user.turnoActual.push(new losTurnos(trat.value, fecha.value, hora.value))
                    console.log("turno actual:" + user.turnoActual.tratamiento)
                    crearTurno()
                    break;
            }
        }
    }
    



    //Cuando se asigna un turno a un cliente, se crea un cartel con el turno correspondiente.
    function crearTurno(){
        
            const ul = document.createElement('p');
            ul.innerHTML = `<div class ="turno">
                                ${user.nombre} tiene turno a ${trat.value}, el día ${fecha.value} a las ${hora.value}
                            </div>
                            <button onclick="transpaso()">Confimar</button>`; 
                                
            turn.appendChild(ul);  
        
    }



    // Renderizo los tratamientos cargados en la API
    async function showTratamientos(){
    const response = await fetch("https://api.npoint.io/8cd7747040e28db5e61f");
    const listaTratamientos = await response.json();

    console.log(listaTratamientos);

    for(let lista of listaTratamientos){
        let dato = document.createElement('p');
        dato.innerHTML = `Tratamiento: ${lista.nombre}<br>
                        Duración: ${lista.duracion} minutos.<br>
                        Precio: "$"${lista.precio}`;

        contacto.appendChild(dato)
    }
}
showTratamientos()

});

