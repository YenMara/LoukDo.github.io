

 document.addEventListener('DOMContentLoaded', function() {
      const imageInput = document.getElementById('review-image');
      const previewContainer = document.getElementById('image-preview-container');
      const previewImg = document.getElementById('image-preview');

      if (imageInput && previewContainer && previewImg) {
        imageInput.addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              previewImg.src = e.target.result;
              previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
          } else {
            previewContainer.style.display = 'none';
            previewImg.src = '';
          }
        });
      }
    });