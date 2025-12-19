<?php
/* =====================================
   PREMIUM PORTFOLIO PHP BACKEND
   Purpose:
   - Contact form handler
   - Simple security
   - Ready for hosting (shared hosting friendly)
   ===================================== */

// ================= CONFIG =================
$site_name   = "Premium Portfolio";
$admin_email = "admin@emailanda.com"; // GANTI EMAIL
$success_url = "success.html";
$error_url   = "error.html";

// ================= SANITIZE FUNCTION =================
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// ================= ONLY POST =================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: $error_url");
    exit;
}

// ================= GET DATA =================
$name    = clean_input($_POST['name'] ?? '');
$email   = clean_input($_POST['email'] ?? '');
$message = clean_input($_POST['message'] ?? '');

// ================= VALIDATION =================
if (empty($name) || empty($email) || empty($message)) {
    header("Location: $error_url");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: $error_url");
    exit;
}

// ================= EMAIL CONTENT =================
$subject = "New Message from $site_name";
$body = "
Name    : $name
Email   : $email
--------------------------
$message
--------------------------
Sent from Portfolio Website
";

$headers = "From: $site_name <no-reply@portfolio.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// ================= SEND EMAIL =================
if (mail($admin_email, $subject, $body, $headers)) {
    header("Location: $success_url");
} else {
    header("Location: $error_url");
}
exit;
?>

/* =====================================
   HOW TO USE:
   1. Save as contact.php
   2. Form HTML:
      <form action="contact.php" method="POST">
        <input name="name">
        <input name="email">
        <textarea name="message"></textarea>
      </form>
   3. Upload to hosting
   ===================================== */
