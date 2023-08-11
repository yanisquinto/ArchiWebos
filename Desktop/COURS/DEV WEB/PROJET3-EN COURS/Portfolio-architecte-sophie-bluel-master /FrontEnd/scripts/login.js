// Récupérer les éléments du formulaire
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Écouter l'événement de soumission du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    
    const email = emailInput.value;
    const password = passwordInput.value;

    // Créer l'objet avec les données à envoyer
    const data = {
        email: email,
        password: password
    };

    try {
        // Envoyer la requête POST à l'API
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        // Vérifier la réponse de l'API
        if (response.ok) {
            // Authentification réussie
            alert('Connexion réussie !');

            // Après avoir reçu le token d'authentification de l'API
            const token = responseData.token;
            const userConfiguration = responseData.configuration; // Supposons que la configuration est incluse dans la réponse

            // Stocker le token et la configuration dans le localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userConfiguration', JSON.stringify(userConfiguration));

            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                console.log('Le token est présent dans le local storage:', storedToken);
            } else {
                console.log('Le token n\'est pas présent dans le local storage.');
            }

            // Rediriger vers l'index.html après la connexion réussie
            window.location.href = 'index.html';
        } else {
            // Afficher le message d'erreur de l'API
            alert(`E-mail ou Mot de passe incorrect`);
        }
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        alert('Une erreur est survenue lors de la connexion.');
    }
});

