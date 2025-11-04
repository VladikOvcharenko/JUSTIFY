<?php
// Настройки
$to = "vvs4008lawyer@ukr.net, alvogroupp@gmail.com, reg.dmitry.bo@gmail.com"; // Кому отправлять
$subject = "Повідомлення з контактної форми"; // Тема письма

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Проверяем обязательные поля
if ($name === '' || $phone === '') {
    http_response_code(400);
    echo "Будь ласка, заповніть усі обов'язкові поля.";
    exit;
}

// Формируем тело письма
$body = "
<b>Ім'я:</b> $name<br>
<b>Телефон:</b> $phone<br>
<b>Повідомлення:</b><br>
$message
";

// Заголовки письма
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
$headers .= "From: Contact Form <no-reply@" . $_SERVER['HTTP_HOST'] . ">\r\n";

// Отправляем письмо
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Ваше повідомлення успішно надіслано!";
} else {
    http_response_code(500);
    echo "Помилка при надсиланні повідомлення. Спробуйте пізніше.";
}
?>
