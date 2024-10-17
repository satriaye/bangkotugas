<?php require_once 'vendor/autoload.php';

// Membangun jalur absolut ke file template
$templateFilePath=__DIR__ . '/templateRPD6.docx';

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
$nama2 = isset($_POST['nama2']) ? $_POST['nama2'] : '';
$nip2 = isset($_POST['nip2']) ? $_POST['nip2'] : '';
$pangkat2 = isset($_POST['pangkat2']) ? $_POST['pangkat2'] : '';
$jabatan2 = isset($_POST['jabatan2']) ? $_POST['jabatan2'] : '';
$nama3 = isset($_POST['nama3']) ? $_POST['nama3'] : '';
$nip3 = isset($_POST['nip3']) ? $_POST['nip3'] : '';
$pangkat3 = isset($_POST['pangkat3']) ? $_POST['pangkat3'] : '';
$jabatan3 = isset($_POST['jabatan3']) ? $_POST['jabatan3'] : '';
$nama4 = isset($_POST['nama4']) ? $_POST['nama4'] : '';
$nip4 = isset($_POST['nip4']) ? $_POST['nip4'] : '';
$pangkat4 = isset($_POST['pangkat4']) ? $_POST['pangkat4'] : '';
$jabatan4 = isset($_POST['jabatan4']) ? $_POST['jabatan4'] : '';
$nama5 = isset($_POST['nama5']) ? $_POST['nama5'] : '';
$nip5 = isset($_POST['nip5']) ? $_POST['nip5'] : '';
$pangkat5 = isset($_POST['pangkat5']) ? $_POST['pangkat5'] : '';
$jabatan5 = isset($_POST['jabatan5']) ? $_POST['jabatan5'] : '';
$nama6 = isset($_POST['nama6']) ? $_POST['nama6'] : '';
$nip6 = isset($_POST['nip6']) ? $_POST['nip6'] : '';
$pangkat6 = isset($_POST['pangkat6']) ? $_POST['pangkat6'] : '';
$jabatan6 = isset($_POST['jabatan6']) ? $_POST['jabatan6'] : '';

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
    $templateProcessor->setValue('nama2', $nama2);
    $templateProcessor->setValue('nip2', $nip2);
    $templateProcessor->setValue('pangkat2', $pangkat2);
    $templateProcessor->setValue('jabatan2', $jabatan2);
    $templateProcessor->setValue('nama3', $nama3);
    $templateProcessor->setValue('nip3', $nip3);
    $templateProcessor->setValue('pangkat3', $pangkat3);
    $templateProcessor->setValue('jabatan3', $jabatan3);
    $templateProcessor->setValue('nama4', $nama4);
    $templateProcessor->setValue('nip4', $nip4);
    $templateProcessor->setValue('pangkat4', $pangkat4);
    $templateProcessor->setValue('jabatan4', $jabatan4);
    $templateProcessor->setValue('nama5', $nama5);
    $templateProcessor->setValue('nip5', $nip5);
    $templateProcessor->setValue('pangkat5', $pangkat5);
    $templateProcessor->setValue('jabatan5', $jabatan5);
    $templateProcessor->setValue('nama6', $nama6);
    $templateProcessor->setValue('nip6', $nip6);
    $templateProcessor->setValue('pangkat6', $pangkat6);
    $templateProcessor->setValue('jabatan6', $jabatan6);

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
