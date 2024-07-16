<?php
require_once('../../helpers/report.php');
require_once('../../models/data/aspirantes_data.php');
 
$pdf = new Report;
$pdf->startReport('Curriculum');
$curriculum = new AspirantesData;
 
if ($dataCurriculum = $curriculum->reallCurriculum()) {
    $pdf->setFillColor(154, 173, 233);
    $pdf->setDrawColor(154, 173, 233);
    $pdf->setFont('Arial', 'B', 14);
    foreach ($dataCurriculum as $rowCurriculum) {
        // Title
        $pdf->cell(0, 10, 'Curriculum Vitae', 0, 1, 'C');
        $pdf->ln(10);
 
        // Personal Information
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Información Personal', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
        $pdf->setFont('Arial', '', 11);
 
        $pdf->cell(40, 10, 'ID:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['ID']), 1, 1);
 
        $pdf->cell(40, 10, 'Nombre:', 1);
        $pdf->cell(150, 10, $pdf->encodeString($rowCurriculum['nombre_aspirante']), 1, 1);
 
        // Additional Personal Info
        $fields = [
            'Apellido' => $rowCurriculum['apellido_aspirante'],
            'Correo' => $rowCurriculum['correo_aspirante'],
            'Fecha Nacimiento' => $rowCurriculum['fecha_nacimiento'],
            'Género' => $rowCurriculum['genero_aspirante'],
            'Estado' => $rowCurriculum['estado_aspirante'],
        ];
        foreach ($fields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
        $pdf->ln(5);
 
        // Education Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Educación', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $educationFields = [
            'ID Estudio' => $rowCurriculum['id_estudio'],
            'Título Estudio' => $rowCurriculum['titulo_estudio'],
            'Grado Académico' => $rowCurriculum['nombre_grado'],
            'Fecha Finalización' => $rowCurriculum['fecha_finalizacion_estudio'],
            'Institución' => $rowCurriculum['nombre_institucion_estudio'],
        ];
 
        foreach ($educationFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(5);
 
        // Certifications Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Certificaciones', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $certificationFields = [
            'ID Certificado' => $rowCurriculum['id_certificado'],
            'Título Certificado' => $rowCurriculum['titulo_certificado'],
            'Institución' => $rowCurriculum['institucion_certificado'],
            'Fecha Finalización' => $rowCurriculum['fecha_finalizacion_certificado'],
        ];
 
        foreach ($certificationFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(5);
 
        // Work Experience Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Experiencia Laboral', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $experienceFields = [
            'ID Experiencia' => $rowCurriculum['id_experiencia'],
            'Nombre Empresa' => $rowCurriculum['nombre_empresa'],
            'Nombre Cargo' => $rowCurriculum['nombre_cargo'],
            'Fecha Inicio' => $rowCurriculum['fecha_inicio'],
            'Fecha Fin' => $rowCurriculum['fecha_fin'],
            'Descripción Puesto' => $rowCurriculum['descripcion_puesto'],
            'Área Laboral' => $rowCurriculum['nombre_area'],
        ];
 
        foreach ($experienceFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(5);
 
        // References Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Referencias', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $referenceFields = [
            'Nombre Referencia' => $rowCurriculum['nombre_referencia'],
            'Apellido Referencia' => $rowCurriculum['apellido_referencia'],
            'Puesto Trabajo' => $rowCurriculum['puesto_trabajo'],
            'Teléfono Referencia' => $rowCurriculum['telefono_referencia'],
        ];
 
        foreach ($referenceFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(5);
 
        // Languages Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Idiomas', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $languageFields = [
            'ID Idioma' => $rowCurriculum['id_idioma_aspirante'],
            'Nombre Idioma' => $rowCurriculum['nombre_idioma'],
            'Nivel' => $rowCurriculum['nivel_idioma'],
        ];
 
        foreach ($languageFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(5);
 
        // Skills Section
        $pdf->setFillColor(220, 230, 241);
        $pdf->cell(0, 10, 'Habilidades', 1, 1, 'C', 1);
        $pdf->setFillColor(255, 255, 255);
 
        $skillFields = [
            'ID Habilidad' => $rowCurriculum['id_habilidad_aspirante'],
            'Nombre Habilidad' => $rowCurriculum['nombre_habilidad'],
            'Nivel' => $rowCurriculum['nivel_habilidad'],
        ];
 
        foreach ($skillFields as $label => $value) {
            $pdf->cell(40, 10, $label . ':', 1);
            $pdf->cell(150, 10, $pdf->encodeString($value), 1, 1);
        }
 
        $pdf->ln(10);
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay información para mostrar'), 1, 1, 'C', 1);
}
 
$pdf->output('I', 'curriculum.pdf');
?>