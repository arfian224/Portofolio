<?php
$name = htmlspecialchars($_POST['name']);
$wa   = htmlspecialchars($_POST['wa']);
$message   = htmlspecialchars($_POST['message']);
// Simpan ke file
$file = fopen("leads.txt","a");
fwrite($file,"$nama | $wa\n | message");
fclose($file);

// Buat pesan WhatsApp otomatis
$pesan = "Halo, saya $nama. Saya tertarik dengan jasa yang anda tawarkan. Nomor saya: $wa. Saya ingin tampilan websitenya seperti ini: $message.";

// Encode biar aman di URL
$pesan = urlencode($pesan);

// Redirect ke WhatsApp dengan pesan
header("Location: https://wa.me/6285711018490?text=$pesan");
exit();
?>