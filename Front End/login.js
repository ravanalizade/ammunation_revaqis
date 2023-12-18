const login = () => {
    const email = document.getElementById('loginEmailInput').value;
    const passwd = document.getElementById('loginPasswdInput').value;

    const data = {
        email: email,
        password: passwd,
    };
console.log(data);
    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Login successful');
        } else if (response.status === 401) {
            console.log('Invalid credentials');
        } else {
            console.error('Error during login:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
};
