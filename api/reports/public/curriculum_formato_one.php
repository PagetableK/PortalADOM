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
 
        // Personal Information
        $pdf->setFillColor(220, 230, 241);

        $pdf->cell(62, 15, $pdf->image('../../images/aspirantes/perra.jpg' , 30, 5, 50));

        $pdf->setFont('Arial', 'B', 50); // Font, style (bold), size
        $pdf->SetXY(120, 10);
        $pdf->MultiCell(0, 10, $pdf->encodeString($rowCurriculum['NOMBRE']), 0, 'L');
 
        $pdf->Ln(20);
        
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->cell(40, 10, 'CONTACTO', 0,1);

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->Line(17, $pdf->GetY(), 50, $pdf->GetY()); // Adjust coordinates as needed
        
        $pdf->Ln(3);

        $pdf->setFont('Arial', '', 11); // Font, style (normal), size
        $fields = [
            $rowCurriculum['correo_aspirante'],
            $rowCurriculum['fecha_nacimiento'],
            $rowCurriculum['genero_aspirante'],
        ];
        foreach ($fields as $label => $value) {
            $pdf->cell(150, 10, $pdf->encodeString($value), 0, 1);
        }
        $pdf->ln(7);

        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->cell(40, 10, 'HABILIDADES', 0,1);

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->Line(17, $pdf->GetY(), 50, $pdf->GetY()); // Adjust coordinates as needed
        
        $pdf->Ln(3);

        $pdf->setFont('Arial', '', 11); // Font, style (normal), size
 
        $skillFields = [
            $rowCurriculum['nombre_habilidad'] . ': ' . $rowCurriculum['nivel_habilidad'],
        ];
        
        foreach ($skillFields as $value) {
            $pdf->cell(150, 10,'. '. $pdf->encodeString($value), 0, 1);
        }
        
        $pdf->ln(7);
 
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->cell(40, 10, utf8_decode('EDUCACIÓN'), 0,1);

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->Line(17, $pdf->GetY(), 50, $pdf->GetY()); // Adjust coordinates as needed
        
        $pdf->Ln(3);

        $pdf->setFont('Arial', '', 11); // Font, style (normal), size
 
        $educationFields = [
            '. ' .
            $rowCurriculum['nombre_grado'] ." " .
            $rowCurriculum['titulo_estudio'] .",\n" .
            $rowCurriculum['nombre_institucion_estudio'] ." " .
            $rowCurriculum['fecha_finalizacion_estudio'],
        ];
        
        $pdf->setFont('Arial', '', 12); // Ajusta la fuente según sea necesario
        foreach ($educationFields as $value) {
            $pdf->MultiCell(150, 10, $pdf->encodeString($value), 0);
        }   
        
 
        $pdf->ln(7);
 
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->cell(40, 10, 'CERTIFICADO', 0,1);

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->Line(17, $pdf->GetY(), 50, $pdf->GetY()); // Adjust coordinates as needed
        
        $pdf->Ln(3);

        $pdf->setFont('Arial', '', 12); // Font, style (normal), size
 
        $certificationFields = [
            '. ' .
            $rowCurriculum['titulo_certificado'] .",\n" .
            $rowCurriculum['institucion_certificado'] ." " .
            $rowCurriculum['fecha_finalizacion_certificado'],
        ];
 
        foreach ($certificationFields as $value) {
            $pdf->MultiCell(150, 10, $pdf->encodeString($value), 0);
        }
 
        $pdf->ln(7);
 
        // second column
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->SetXY(110, 49);
        $pdf->MultiCell(0, 10,'EXPERIENCIA LABORAL', 0, 'L');

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->SetXY(110, 60);
        $pdf->Line(112, $pdf->GetY(), 150, $pdf->GetY()); //djust coordinates as needed
        
        $pdf->Ln(3);

        $pdf->setFont('Arial', '', 12); // Font, style (normal), size
        $experienceFields = [
            $rowCurriculum['nombre_empresa'] ." " .
            $rowCurriculum['nombre_area'].",\n" .
            $rowCurriculum['nombre_cargo'].", \n" .
            $rowCurriculum['descripcion_puesto']. "\n".
            $rowCurriculum['fecha_inicio'] ."  -  " .
            $rowCurriculum['fecha_fin'].",\n",
        ];
 
        foreach ($experienceFields as $value) {
            $pdf->SetXY(110, 65);
            $pdf->MultiCell(150, 10, $pdf->encodeString($value), 0);
        }
        $pdf->ln(5);
 
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional Personal Info
        $pdf->SetXY(110, 110);
        $pdf->MultiCell(0, 10,'REFERENCIA', 0, 'L');

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->SetXY(110, 120);
        $pdf->Line(112, $pdf->GetY(), 150, $pdf->GetY()); //djust coordinates as needed
        
        $pdf->Ln(3);
 
        $pdf->setFont('Arial', '', 12); // Font, style (normal), size
        $referenceFields = [
            $rowCurriculum['APELLIDO'] . "\n".
            $rowCurriculum['puesto_trabajo'] . "\n (+503) ".
            $rowCurriculum['telefono_referencia'],
        ];
 
        foreach ($referenceFields as $value) {
            $pdf->SetXY(110, 125);
            $pdf->MultiCell(150, 10, $pdf->encodeString($value), 0);
        }
        
        $pdf->ln(5);
 
        $pdf->setFont('Arial', '', 14); // Font, style (normal), size
        // Additional idioma
        $pdf->SetXY(110, 162);
        $pdf->MultiCell(0, 10,'IDIOMAS', 0, 'L');

        $pdf->SetLineWidth(1.5);
        $pdf->SetDrawColor(0, 0, 200); // Color of the line
        $pdf->SetXY(110, 173);
        $pdf->Line(112, $pdf->GetY(), 150, $pdf->GetY()); //djust coordinates as needed
        
        $pdf->Ln(3);
 
        $pdf->setFont('Arial', '', 12); // Font, style (normal), size
 
        $languageFields = [
            '. '.
            $rowCurriculum['nombre_idioma']  . ": ".
           $rowCurriculum['nivel_idioma'],
        ];

        $initialY = 175; // Y inicial para la primera sección de idiomas
        $yIncrement = 20;

        foreach ($languageFields as $value) {
        $pdf->SetXY(110, $initialY); // Establece las coordenadas X e Y iniciales
        $pdf->MultiCell(150, 10, $pdf->encodeString($value), 0);
        $initialY + $yIncrement; // Aumenta Y para la próxima sección de idiomas
        }
 
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay información para mostrar'), 1, 1, 'C', 1);
}
 
$pdf->output('I', 'curriculum.pdf');
?>