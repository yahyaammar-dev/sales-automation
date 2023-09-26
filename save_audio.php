
<?php
echo "<pre>";
print_r($_FILES[]);
echo "------------------";
echo "<br/>";
print_r($_POST[]);
echo "</pre>";
exit;
    if (isset($_POST['message'])) {
        $message = $_POST['message'];
    }

    if (isset($_POST['message_text'])) {
        $message_text = $_POST['message_text'];
    }
?>