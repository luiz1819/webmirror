document.addEventListener('DOMContentLoaded', function() {
    // URL validation
    const urlForm = document.getElementById('cloneForm');
    if (urlForm) {
        urlForm.addEventListener('submit', function(e) {
            const urlInput = document.getElementById('url');
            const urlValue = urlInput.value.trim();
            
            if (!urlValue) {
                e.preventDefault();
                showAlert('Please enter a URL', 'danger');
                return false;
            }
            
            // Show loading indicator
            const submitBtn = document.querySelector('#cloneForm button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cloning...';
            submitBtn.disabled = true;
            
            // Add a simple URL validation (not comprehensive)
            if (!urlValue.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
                e.preventDefault();
                showAlert('Please enter a valid URL', 'danger');
                submitBtn.innerHTML = 'Clone Website';
                submitBtn.disabled = false;
                return false;
            }
            
            // Continue with form submission
            return true;
        });
    }
    
    // File viewer functionality
    const fileLinks = document.querySelectorAll('.file-link');
    if (fileLinks.length > 0) {
        fileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.file-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                const filePath = this.getAttribute('data-path');
                const sessionId = this.getAttribute('data-session');
                
                viewFile(sessionId, filePath);
            });
        });
        
        // Load the first file by default
        if (fileLinks[0]) {
            fileLinks[0].click();
        }
    }
    
    // Function to view file content
    function viewFile(sessionId, filePath) {
        const contentContainer = document.getElementById('fileContent');
        const fileTitle = document.getElementById('fileTitle');
        
        if (!contentContainer || !fileTitle) return;
        
        // Show loading state
        contentContainer.innerHTML = '<div class="text-center p-5"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        fileTitle.textContent = filePath;
        
        // Fetch file content
        fetch(`/view_file/${sessionId}/${filePath}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Determine how to display the content based on content type
                if (data.content_type === 'text/html') {
                    contentContainer.innerHTML = `<pre><code class="html">${escapeHtml(data.content)}</code></pre>`;
                } else if (data.content_type === 'text/css') {
                    contentContainer.innerHTML = `<pre><code class="css">${escapeHtml(data.content)}</code></pre>`;
                } else if (data.content_type === 'text/javascript') {
                    contentContainer.innerHTML = `<pre><code class="javascript">${escapeHtml(data.content)}</code></pre>`;
                } else {
                    contentContainer.innerHTML = `<pre><code>${escapeHtml(data.content)}</code></pre>`;
                }
                
                // Highlight code if highlight.js is available
                if (window.hljs) {
                    document.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightElement(block);
                    });
                }
            })
            .catch(error => {
                contentContainer.innerHTML = `<div class="alert alert-danger">Error loading file: ${error.message}</div>`;
            });
    }
    
    // Helper function to display alerts
    function showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        if (alertContainer) {
            const alert = document.createElement('div');
            alert.className = `alert alert-${type} alert-dismissible fade show`;
            alert.role = 'alert';
            alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertContainer.appendChild(alert);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                alert.classList.remove('show');
                setTimeout(() => alert.remove(), 150);
            }, 5000);
        }
    }
    
    // Helper function to escape HTML
    function escapeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
});
