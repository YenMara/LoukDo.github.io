document.addEventListener('DOMContentLoaded', function() {
        const payment = {
          method: 'KHQR',
          fullName: localStorage.getItem('loukdo-shipping') ? JSON.parse(localStorage.getItem('loukdo-shipping')).fullName : '',
          email: localStorage.getItem('loukdo-shipping') ? JSON.parse(localStorage.getItem('loukdo-shipping')).email : '',
          phone: localStorage.getItem('loukdo-shipping') ? JSON.parse(localStorage.getItem('loukdo-shipping')).phone : ''
        };
        localStorage.setItem('loukdo-payment', JSON.stringify(payment));

        const continueBtn = document.getElementById('qr-continue-btn');
        if (continueBtn) {
          continueBtn.addEventListener('click', function() {
            window.location.href = 'checkout2.html';
          });
        }
      });