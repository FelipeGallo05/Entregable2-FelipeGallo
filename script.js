const zonas = ['Esquina izquierda', 'Ala izquierda', 'Centro', 'Ala Derecha', 'Esquina Derecha' , 'Zona media izquierda', 'Zona media centro', 'Zona media derecha', 'Zona pintada']

let sesiones = []


const formulario = document.getElementById("formulario")

//Evitando que se me reinicie el formulario siempre

formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
});

const zonaDeTiro = document.getElementById('zonaDeTiro');
const tirosIntentadosIngresada = document.getElementById('tirosIntentados');
const tirosEncestadosIngresada = document.getElementById('tirosEncestados');
const submit = document.getElementById('submit')
const sesionesDeTiro = document.getElementById("sesiones")

class Sesion{
    constructor(zona, tirosIntentados, tirosEncestados){
        this.zona = zona
        this.tirosIntentados = tirosIntentados
        this.tirosEncestados = tirosEncestados
        this.porcentaje = ""
    }

    agregarPorcentaje(e){
        this.porcentaje += e
    }
}

function crearSesion(){
    let zona = JSON.parse(localStorage.getItem("Zona"))
    let tirosIntentados = JSON.parse(localStorage.getItem("Tiros Intentados"))
    let tirosEncestados = JSON.parse(localStorage.getItem("Tiros Encestados"))
    let porcentaje = JSON.parse(localStorage.getItem("Porcentaje"))

    let sesionParaAgregar = new Sesion(zona, tirosIntentados, tirosEncestados)
    sesionParaAgregar.agregarPorcentaje(porcentaje)

    sesiones.push(sesionParaAgregar)
    console.log(sesionParaAgregar)

    crearDiv()
    colorDeFondo()

    sesiones = []
}

submit.addEventListener('click', () => {
    const zona = zonaDeTiro.value
    const tirosIntentados = tirosIntentadosIngresada.value
    const tirosEncestados = tirosEncestadosIngresada.value
    let existeZona = zonas.includes(zona)
    if (!existeZona){
        alert('Ingresa una zona valida.')//No se como hacer para editar el input de zona y que se ponga rojo
        return
    }else{
        localStorage.setItem("Zona", JSON.stringify(zona))
    }
    let tirosEsPosible = Number(tirosEncestados) > Number(tirosIntentados)
    if(tirosEsPosible){
        alert('Encestaste mas tiros de los que tiraste?! Imposible...')//Lo mismo en este caso, por eso uso alert
        return
    }else{
        localStorage.setItem("Tiros Intentados", JSON.stringify(tirosIntentados))
        localStorage.setItem("Tiros Encestados", JSON.stringify(tirosEncestados))
    }
    const porcentaje1 = tirosEncestados / tirosIntentados
    const porcentaje2 = porcentaje1 * 100 
    localStorage.setItem("Porcentaje", JSON.stringify(parseInt(porcentaje2)))

    crearSesion()
})


function crearDiv(){
    sesiones.forEach(el => {
        sesionesDeTiro.innerHTML += `<div class="${colorDeFondo()} sesionesDeTiro">
            <h3> Zona : ${el.zona}</h3>
            <p>Tiros Intentados: ${el.tirosIntentados}</p>
            <p>Tiros Encestados: ${el.tirosEncestados}</p>
            <p>Porcentaje (%): ${el.porcentaje}</p>
            </div>
        `
    })
}

function colorDeFondo(){
    let porcentaje = JSON.parse(localStorage.getItem("Porcentaje"))
    if( 0 <= porcentaje && porcentaje < 30 ){
            return "abajoDelPromedio"
    }else if (30<= porcentaje && porcentaje < 40){
            return "intermedioBajoPromedio"
    }else if (40 <= porcentaje && porcentaje < 50){
            return "promedio"
    }else if(50<= porcentaje && porcentaje < 55){
            return "intermedioArribaPromedio"
    }else if (porcentaje >= 55){
            return "arribaDelPromedio"
    }
    }
