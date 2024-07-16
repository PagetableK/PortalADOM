<?php
require_once('../../helpers/report.php');
require_once('../../models/data/aspirantes_data.php');

$pdf = new Report;
$pdf->startReport('Curriculum');
$curriculum = new AspirantesData;

if ($dataCurriculum = $curriculum->readAll()) {
    $pdf->setFillColor(154, 173, 233);
    $pdf->setDrawColor(154, 173, 233);
    $pdf->setFont('Arial', 'B', 11);
    $pdf->cell(92, 15, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(92, 15, 'Estado', 1, 1, 'C', 1);

    $pdf->setFillColor(240);
    $pdf->setFont('Arial', '', 11);

    foreach ($dataCurriculum as $rowCurriculum) {
        // Verifica si se ha creado una nueva página
        if ($pdf->getY() + 15 > 279 - 30) { // Ajusta este valor según el tamaño de tus celdas y la altura de la página
            $pdf->addPage('P', [216, 279]); // Añade una nueva página
            $pdf->setFillColor(154, 173, 233);
            $pdf->setDrawColor(154, 173, 233);
            $pdf->setFont('Arial', 'B', 11);
            // Vuelve a imprimir los encabezados en la nueva página
            $pdf->cell(92, 15, 'Nombre', 1, 0, 'C', 1);
            $pdf->cell(92, 15, 'Estado', 1, 1, 'C', 1);
        }

        $pdf->setFillColor(79, 171, 220);
        $pdf->setDrawColor(130, 196, 250);
        $pdf->setFont('Arial', 'B', 11);
        // Imprime las celdas con los datos y la imagen
        $pdf->setFillColor(255, 255, 255);
        $pdf->cell(92, 15, $pdf->encodeString($rowHamacas['NOMBRE']), 1, 0, 'C');
        $pdf->cell(92, 15, $pdf->encodeString($rowHamacas['APELLIDO']), 1, 1, 'C');
    }
} else {
    $pdf->cell(0, 15, $pdf->encodeString('No hay categorías para mostrar'), 1, 1);
}

$pdf->output('I', 'curriculum.pdf');
