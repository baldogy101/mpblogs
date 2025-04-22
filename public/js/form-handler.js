const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

// Get route and redirect values from data attributes
const formAction = form.dataset.action;
const redirectPath = form.dataset.redirect || '/'; // fallback to homepage

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    if (usernameError) usernameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (passwordError) passwordError.textContent = '';

    // get values
    const username = form.username ? form.username.value : null;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch(formAction, {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(data);

        if (data.errors) {
            if (usernameError) usernameError.textContent = data.errors.username;
            if (emailError) emailError.textContent = data.errors.email;
            if (passwordError) passwordError.textContent = data.errors.password;
        }

        if (data.user) {
            location.assign(redirectPath);
        }
    }
    catch (err) {
        console.log(err);
    }
});
