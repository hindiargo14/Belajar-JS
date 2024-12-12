<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['filename'])) {
  $file = './uploads/' . $_POST['filename'];

  if (file_exists($file)) {
    unlink($file);
    echo "Foto berhasil dihapus.";
  } else {
    echo "Foto tidak ditemukan.";
  }
}

header('Location: index.php');
