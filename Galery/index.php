<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeri Foto</title>
  <link rel="stylesheet" href="./assets/css/style.css">
</head>
<body>
  <header>
    <h1>Galeri Foto</h1>
  </header>

  <!-- Form Upload -->
  <section class="form-section">
  <form class="form-style" action="upload.php" method="POST" enctype="multipart/form-data">
    <div>
      <label for="file-input">Pilih File</label>
      <input type="file" id="file-input" name="file" onchange="previewImage(event)">
      <button type="submit">Upload</button>
    </div>
    <div class="preview-container" id="preview-container">
      <img id="preview-image" alt="Preview Image" style="display: none;">
    </div>
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
