const deleteBtn = document.getElementById('deleteBtn');
if (deleteBtn) {
    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const blogId = deleteBtn.getAttribute('data-id');

        const confirmed = confirm('Are you sure you want to delete this blog?');
        if (!confirmed) return;

        try {
            const res = await fetch(`/blogs/${blogId}`, {
                method: 'DELETE'
            });

            const data = await res.json();
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        }
        catch (err) {
            console.log('Failed to delete blog: ', err);
        }
    })
}