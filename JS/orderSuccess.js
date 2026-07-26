 document.addEventListener('DOMContentLoaded', function() {
        const lastOrder = localStorage.getItem('loukdo-last-order');
        const orderDetails = document.getElementById('order-details');
        
        if (lastOrder && orderDetails) {
          try {
            const order = JSON.parse(lastOrder);
            orderDetails.innerHTML = `
              <div class="card border-0 shadow-sm rounded-4 p-4 mt-4">
                <h5 class="primary-color mb-3">Order Details</h5>
                <div class="d-flex justify-content-between">
                  <p class="fw-normal">Order Date:</p>
                  <p class="fw-normal">${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-normal">Total:</p>
                  <p class="fw-normal primary-color">${order.total}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="fw-normal">Payment:</p>
                  <p class="fw-normal">${order.payment.method || 'N/A'}</p>
                </div>
              </div>
            `;
          } catch (e) {
            console.error('Failed to load order details', e);
          }
        }
      });