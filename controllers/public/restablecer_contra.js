
const API_ASPIRANTE = 'services/public/aspirantes_service.php';

const FORM_CORREO = document.getElementById('formCorreo'), FORM_CODIGO = document.getElementById('formCodigo'),
    FORM_CONTRA = document.getElementById('formContra');

const CONTENEDOR_CORREO = document.getElementById('contenedorCorreo'), CONTENEDOR_CODIGO = document.getElementById('contenedorCodigo'),
    CONTENEDOR_CONTRA = document.getElementById('contenedorContra');

let codigo = '', id = 0;

FORM_CORREO.addEventListener('submit', async (e) => {

    e.preventDefault();

    const FORM = new FormData(FORM_CORREO);

    const DATA = await fetchData(API_ASPIRANTE, 'verificarCorreo', FORM);

    if (DATA.status) {

        id = DATA.dataset.id_aspirante;
        // Variable donde se almacenará el id.
        let resultado = '';
        // Se definen los caracteres que se utilizarán en el id.
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // Se almacena la longitud de la cadena de caracteres en el string.
        const longitudCaracteres = caracteres.length;
        // Se inicializa la variable.
        let contador = 0;
        // Se realiza una iteración para obtener un nuevo caracter por cada iteración.
        while (contador < 10) {
            // Se almacena el caracter random en la variable.
            resultado += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));
            contador += 1;
        }
        // Se asigna el código a la variable.
        codigo = resultado;

        let params = {
            correo: FORM_CORREO['correo'].value.trim(),
            code: codigo,
            to_name: DATA.dataset.correo_aspirante
        }

        emailjs.send('service_vzkz32o', 'template_9ew81bd', params).then(sweetAlert(1, "Código de recuperación enviado, revise su bandeja de entrada", false));

        CONTENEDOR_CORREO.classList.add('d-none');

        CONTENEDOR_CODIGO.classList.remove('d-none');
    } else {

        sweetAlert(3, 'El correo no se encuentra afiliado a ninguna cuenta', false);
    }
});

FORM_CODIGO.addEventListener('submit', async (e) => {

    e.preventDefault();

    if(FORM_CODIGO['codigo'].value.trim() == codigo){

        CONTENEDOR_CONTRA.classList.remove('d-none');
        
        CONTENEDOR_CODIGO.classList.add('d-none');

        await sweetAlert(4, 'Ingrese su nueva contraseña', false);
    } else{

        sweetAlert(3, 'El código no es correcto', false);
    }
});

FORM_CONTRA.addEventListener('submit', async(e) => {

    e.preventDefault();

    if(FORM_CONTRA['contra'].value.trim() == "" || FORM_CONTRA['contraRepetir'].value.trim() == ""){

        sweetAlert(3, 'Asegúrese de rellenar los campos', false);
    } else if(FORM_CONTRA['contra'].value.trim() != FORM_CONTRA['contraRepetir'].value.trim()){

        sweetAlert(3, 'Las contraseñas no coinciden', false);
    } else{

        const FORM = new FormData(FORM_CONTRA);

        FORM.append('idAspirante', id);

        const DATA = await fetchData(API_ASPIRANTE, 'restablecerContra', FORM);

        if(DATA.status){

            sweetAlert(1, 'Contraseña restablecida', false, 'index.html');
        } else{

            sweetAlert(2, 'Ocurrió un error al restablecer la constraseña', false);
        }
    }
});