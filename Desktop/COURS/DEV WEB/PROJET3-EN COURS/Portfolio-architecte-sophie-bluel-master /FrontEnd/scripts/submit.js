document.addEventListener('DOMContentLoaded', function () {
    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted === 'true') {
        // Ouvrir la modale
        const openModalButton = document.getElementById('portfolio-edit-button');
        openModalButton.click(); // Cliquez sur le bouton pour ouvrir la modale
        localStorage.removeItem('formSubmitted'); // Supprimer le marquage de soumission du formulaire
    }
});