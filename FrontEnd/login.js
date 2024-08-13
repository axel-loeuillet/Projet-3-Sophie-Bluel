let formulaireDeConnexion = document.querySelector("form")
formulaireDeConnexion.addEventListener("submit", function (event) {
    event.preventDefault()

    let user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    }

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.token) {
                const token = result.token
                sessionStorage.setItem("authToken", token);
                console.log(sessionStorage)
                window.location.href = "index.html"

            } else {
                alert("Erreur dans l’identifiant ou le mot de passe");
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert("Une erreur est survenue, veuillez réessayer.");
        });
})