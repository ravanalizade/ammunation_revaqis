apiUrl = "http://localhost:8000"

const register = () => {
    let username = document.getElementById('nameInput').value
    let email = document.getElementById('emailInput').value
    let passwd = document.getElementById('passwdInput').value

    
    const data = {
        username: username,
        email: email,
        password: passwd,
    }

    fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => console.log(response.json()))
        .catch(error => {
          console.error('Error:', error);
        });
}