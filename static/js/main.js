document.addEventListener('DOMContentLoaded', function() {
    // Form submission loading state
    const cloneForm = document.getElementById('clone-form');
    if (cloneForm) {
        cloneForm.addEventListener('submit', function(e) {
            // Show loading state
            this.classList.add('loading');
            
            // Validate the URL
            const urlInput = document.getElementById('url');
            let url = urlInput.value.trim();
            
            // Add https:// if no protocol is specified
            if (url && !url.match(/^https?:\/\//i)) {
                urlInput.value = 'https://' + url;
            }
            
            // Feedback to user
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Cloning...';
            submitBtn.disabled = true;
            
            // Form will submit normally
        });
    }
    
    // Enable Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length > 0) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Automatic dismissal of alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
    
    // Confirmation for delete actions
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm(this.dataset.confirm)) {
                e.preventDefault();
                return false;
            }
        });
    });
});
