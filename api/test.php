<?php require_once 'vendor/autoload.php';

// Membangun jalur absolut ke file template
$templateFilePath=__DIR__ . '/templateRPD1.docx';

// Cek apakah file template1.docx benar-benar ada di jalur tersebut
if (file_exists($templateFilePath)) {
    $phpWord=new \PhpOffice\PhpWord\PhpWord();
    $section=$phpWord->addSection();

    // Mencoba membuat instance TemplateProcessor dengan jalur file yang benar
    $templateProcessor=new \PhpOffice\PhpWord\TemplateProcessor($templateFilePath);

    // Menerima data dari formulir HTML
    $nama = isset($_POST['nama']) ? $_POST['nama'] : '';
$nip = isset($_POST['nip']) ? $_POST['nip'] : '';
$pangkat = isset($_POST['pangkat']) ? $_POST['pangkat'] : '';
$jabatan = isset($_POST['jabatan']) ? $_POST['jabatan'] : '';
$latarbelakang = isset($_POST['latarbelakang']) ? $_POST['latarbelakang'] : '';
$harimulai = isset($_POST['harimulai']) ? $_POST['harimulai'] : '';
$hariselesai = isset($_POST['hariselesai']) ? $_POST['hariselesai'] : '';
$waktuDari = isset($_POST['waktuDari']) ? $_POST['waktuDari'] : '';
$waktuSampai = isset($_POST['waktuSampai']) ? $_POST['waktuSampai'] : '';
$alamat = isset($_POST['alamat']) ? $_POST['alamat'] : '';
$tempat = isset($_POST['tempat']) ? $_POST['tempat'] : '';
$lama = isset($_POST['lama']) ? $_POST['lama'] : '';
$output = isset($_POST['output']) ? $_POST['output'] : '';
$agenda = isset($_POST['agenda']) ? $_POST['agenda'] : '';
$sarpras = isset($_POST['sarpras']) ? $_POST['sarpras'] : '';
$statuskakap = isset($_POST['statuskakap']) ? $_POST['statuskakap'] : '';
$statusjabatankakap = isset($_POST['statusjabatankakap']) ? $_POST['statusjabatankakap'] : '';
$kakap = isset($_POST['kakap']) ? $_POST['kakap'] : '';
$tanggalinput = isset($_POST['tanggalinput']) ? $_POST['tanggalinput'] : '';

    // Isi template dengan data
    $templateProcessor->setValue('nama', $nama);
    $templateProcessor->setValue('nip', $nip);
    $templateProcessor->setValue('pangkat', $pangkat);
    $templateProcessor->setValue('jabatan', $jabatan);
    $templateProcessor->setValue('latarbelakang', $latarbelakang);

    $templateProcessor->setValue('harimulai', $harimulai);
    $templateProcessor->setValue('hariselesai', $hariselesai);
    $templateProcessor->setValue('waktuDari', $waktuDari);
    $templateProcessor->setValue('waktuSampai', $waktuSampai);
    $templateProcessor->setValue('alamat', $alamat);
    $templateProcessor->setValue('tempat', $tempat);
    $templateProcessor->setValue('lama', $lama);
    $templateProcessor->setValue('agenda', $agenda);
    $templateProcessor->setValue('statuskakap', $statuskakap);
    $templateProcessor->setValue('statusjabatankakap', $statusjabatankakap);
    $templateProcessor->setValue('kakap', $kakap);
    $templateProcessor->setValue('tanggalinput', $tanggalinput);
    
    
    $textDataoutput=explode("\n", $output);
    $replacementsoutput=[];
    foreach ($textDataoutput as $lineOfText) {
        $replacementsoutput[]=['text'=>$lineOfText];}
    if ( !empty($replacementsoutput)) {
        $templateProcessor->cloneBlock('blockNameoutput', 0, true, false, $replacementsoutput);}

    $textDataagenda=explode("\n", $agenda);
    $replacementsagenda=[];
    foreach ($textDataagenda as $lineOfText) {
        $replacementsagenda[]=['text'=>$lineOfText];}
    if ( !empty($replacementsagenda)) {
        $templateProcessor->cloneBlock('blockNameagenda1', 0, true, false, $replacementsagenda);}    

    $textDatasarpras=explode("\n", $sarpras);
    $replacementssarpras=[];
    foreach ($textDatasarpras as $lineOfText) {
        $replacementssarpras[]=['text'=>$lineOfText];}
    if ( !empty($replacementssarpras)) {
        $templateProcessor->cloneBlock('blockNamesarpras', 0, true, false, $replacementssarpras);}

    // Menyiapkan headers untuk download
    header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    header('Content-Disposition: attachment;filename="Format_RPD.docx"');
    header('Cache-Control: max-age=0');

    // Menulis dokumen ke output PHP
    $templateProcessor->saveAs('php://output');
    exit;
}

else {
    // Jika file template tidak ditemukan, tampilkan pesan kesalahan
    die('Template file not found at: '. $templateFilePath);
}

?>
