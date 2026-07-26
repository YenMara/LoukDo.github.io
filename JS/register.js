document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('exampleInputPassword').value;
            const confirmPassword = document.getElementById('exampleInputConfirmPassword').value;
            if (form.checkValidity() && password === confirmPassword) {
              window.location.href = 'index.html';
            } else if (password !== confirmPassword) {
              alert('Passwords do not match.');
            } else {
              form.reportValidity();
            }
          });
        }
      });