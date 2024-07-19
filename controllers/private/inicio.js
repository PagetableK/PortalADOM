
const MENSAJE_BIENVENIDA = document.getElementById('mensajeBienvenida');

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para validar sesiones activas.
    const INFO = await cargarPlantilla();

    let nombreCompleto = INFO[0] + ' ' + INFO[1];

    let nombreArray = nombreCompleto.split(" ");

    let nombreCapitalizado = "";

    for(var i = 0; i < nombreArray.length; i++){

        nombreCapitalizado += " "+nombreArray[i].charAt(0).toUpperCase() + nombreArray[i].substring(1);
    }

    MENSAJE_BIENVENIDA.textContent = 'Bienvenido,' + nombreCapitalizado;
});