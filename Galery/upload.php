<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
  $uploadDir = './uploads/';
  $uploadFile = $uploadDir . basename($_FILES['photo']['name']);

  if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadFile)) {
    echo "Foto berhasil diunggah.";
  } else {
    echo "Gagal mengunggah foto.";
  }
}

header('Location: index.php');
