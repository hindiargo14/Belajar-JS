<?php
// Pastikan file di-upload dengan aman
if (isset($_FILES['file'])) {
    $errors = [];
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    // Tentukan ekstensi file yang diizinkan
    $allowed_ext = ['jpg', 'jpeg', 'png', 'gif'];

    // Cek apakah ekstensi file valid
    if (!in_array($file_ext, $allowed_ext)) {
        $errors[] = "Ekstensi file tidak valid. Gunakan JPG, JPEG, PNG, atau GIF.";
    }

    // Jika tidak ada error, upload file
    if (empty($errors)) {
        $upload_dir = './uploads/';
        // Jika folder uploads belum ada, buat folder
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        // Tentukan nama file yang akan disimpan
        $file_path = $upload_dir . basename($file_name);

        // Pindahkan file ke folder uploads
        if (move_uploaded_file($file_tmp, $file_path)) {
            echo "File berhasil diupload!";
        } else {
            echo "Gagal mengupload file.";
        }
    } else {
        // Tampilkan pesan error
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
} else {
    echo "Tidak ada file yang dipilih.";
}

header('Location: index.php');
