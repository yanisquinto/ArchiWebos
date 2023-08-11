document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si un token est déjà stocké dans le local storage
    const storedToken = localStorage.getItem('token');

    // Sélectionne l'élément HTML de la liste de navigation
    const navigationList = document.getElementById('navigation-list');

    // Si un token est présent, l'utilisateur est connecté, afficher la fonction LogOut
    if (storedToken) {
        // Supprimer l'élément de connexion (li#login-li) s'il existe
        const loginLi = document.getElementById('login-li');
        if (loginLi) {
            // Créer le nouvel élément <li> contenant le lien "Logout"
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.textContent = 'Logout';
            logoutLink.href = 'javascript:void(0)'; // C'est une pseudo-action JavaScript
            logoutLink.addEventListener('click', () => {
                // Supprimer le token du local storage lors de la déconnexion
                localStorage.removeItem('token');
                // Rediriger vers la page de connexion (ou une autre page selon vos besoins)
                window.location.href = 'login.html';
            });

            logoutLi.appendChild(logoutLink);

            // Remplacer l'élément "Login" par l'élément "Logout"
            navigationList.replaceChild(logoutLi, loginLi);
        } else {
            console.log('Élément "login-li" non trouvé.');
        }
    }
});

