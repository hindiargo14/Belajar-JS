<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeri Foto</title>
  <link rel="stylesheet" href="./assets/style/style.css">
</head>
<body>
  <header>
    <h1>Galeri Foto</h1>
  </header>

  <!-- Form Upload -->
  <section class="upload-section">
    <form action="upload.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="photo" required>
      <button type="submit">Upload Foto</button>
    </form>
  </section>

  <!-- Galeri -->
  <main class="gallery-container">
    <?php
    $folder = './uploads/';
    $files = array_diff(scandir($folder), array('.', '..'));
    foreach ($files as $file): ?>
      <div class="gallery-item">
        <img src="<?= $folder . $file ?>" alt="Gallery Image">
        <form action="delete.php" method="POST" class="delete-form">
          <input type="hidden" name="filename" value="<?= $file ?>">
          <button type="submit">Hapus</button>
        </form>
      </div>
    <?php endforeach; ?>
  </main>

  <script src="./assets/js/script.js"></script>
</body>
</html>
