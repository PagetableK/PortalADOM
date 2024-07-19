function mailCodigo(){
    let params = {
        correo: 'pablo14gamerx3@gmail.com',
        codigo: 'Hola123',
        to_name: 'Pablo'
    }

    emailjs.send('service_vzkz32o', 'template_9ew81bd', params).then(alert("Código de recuperación enviado"));
}