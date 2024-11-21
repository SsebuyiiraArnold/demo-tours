<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collecting form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $country = htmlspecialchars($_POST['country']);
    $message = htmlspecialchars($_POST['message']);

    // Validating required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Email details
    $to = "ssebuyiiraarnold@gmail.com"; 
    $subject = "New Message from Contact Form";
    $body = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Country: $country\n
        Message:\n$message
    ";
    $headers = "From: $email";

    // Sending email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
