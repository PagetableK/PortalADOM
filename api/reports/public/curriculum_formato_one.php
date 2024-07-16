<?php
require_once('../../helpers/report.php');
require_once('../../models/data/aspirantes_data.php');
 
$pdf = new Report;
$pdf->startReport('Curriculum');
$curriculum = new AspirantesData;
 
if ($dataCurriculum = $curriculum->reallCurriculum()) {
    $pdf->setFillColor(154, 173, 233);
    $pdf->setDrawColor(154, 173, 233);
    $pdf->setFont('Arial', 'B', 12);
 
    foreach ($dataCurriculum as $rowCurriculum) {
        // Sección de Información Personal
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Informacion Personal', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['ID']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Apellido:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['apellido_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Correo:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['correo_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Fecha Nacimiento:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['fecha_nacimiento']), 1, 1);
 
        $pdf->cell(40, 10, 'Genero:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['genero_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Estado:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['estado_aspirante']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Educación
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Educacion', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID Estudio:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['id_estudio']), 1, 1);
 
        $pdf->cell(40, 10, 'Título Estudio:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['titulo_estudio']), 1, 1);
 
        $pdf->cell(40, 10, 'Grado Académico:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_grado']), 1, 1);
 
        $pdf->cell(40, 10, 'Fecha Finalización:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['fecha_finalizacion_estudio']), 1, 1);
 
        $pdf->cell(40, 10, 'Institución:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_institucion_estudio']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Certificaciones
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Certificaciones', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID Certificado:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['id_certificado']), 1, 1);
 
        $pdf->cell(40, 10, 'Título Certificado:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['titulo_certificado']), 1, 1);
 
        $pdf->cell(40, 10, 'Institución:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['institucion_certificado']), 1, 1);
 
        $pdf->cell(40, 10, 'Fecha Finalización:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['fecha_finalizacion_certificado']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Experiencia Laboral
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Experiencia Laboral', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID Experiencia:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['id_experiencia']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre Empresa:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_empresa']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre Cargo:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_cargo']), 1, 1);
 
        $pdf->cell(40, 10, 'Fecha Inicio:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['fecha_inicio']), 1, 1);
 
        $pdf->cell(40, 10, 'Fecha Fin:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['fecha_fin']), 1, 1);
 
        $pdf->cell(40, 10, 'Descripción Puesto:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['descripcion_puesto']), 1, 1);
 
        $pdf->cell(40, 10, 'Área Laboral:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_area']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Referencias
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Referencias', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'Nombre Referencia:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_referencia']), 1, 1);
 
        $pdf->cell(40, 10, 'Apellido Referencia:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['apellido_referencia']), 1, 1);
 
        $pdf->cell(40, 10, 'Puesto Trabajo:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['puesto_trabajo']), 1, 1);
 
        $pdf->cell(40, 10, 'Teléfono Referencia:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['telefono_referencia']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Idiomas
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Idiomas', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID Idioma:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['id_idioma_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre Idioma:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_idioma']), 1, 1);
 
        $pdf->cell(40, 10, 'Nivel:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nivel_idioma']), 1, 1);
 
        $pdf->ln(10);
 
        // Sección de Habilidades
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Habilidades', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID Habilidad:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['id_habilidad_aspirante']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre Habilidad:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_habilidad']), 1, 1);
 
        $pdf->cell(40, 10, 'Nivel:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nivel_habilidad']), 1, 1);
 
        $pdf->ln(20); // Espacio antes de la siguiente sección de datos
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay categorías para mostrar'), 1, 1, 'C', 1);
}
 
$pdf->output('I', 'curriculum.pdf');
?>