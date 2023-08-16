document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si un token est présent dans le local storage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        // Créer le bandeau "Mode Édition" avec le bouton "Publier les changements"
        const editModeBanner = document.createElement('div');
        editModeBanner.id = 'edit-mode-banner';
        editModeBanner.innerHTML = `
            <div class="edit-mode-text">
                <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>
                Mode Édition 
                <button class="publish-changes" id="publish-changes"> publier les changements </button>
            </div>
           
        `;

        // Ajouter le bandeau au début du corps (body) de la page
        document.body.insertBefore(editModeBanner, document.body.firstChild);

        // Écouter l'événement de clic sur le bouton "Publier les changements"
        const publishButton = document.getElementById('publish-changes');
        publishButton.addEventListener('click', () => {
            alert('Changements publiés !');
        });

        // Ajouter un bouton "Modifier" dans la section "Introduction"
        const introductionSection = document.getElementById('introduction');

        const createEditButton = () => {
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Modifier`;
            return editButton;
        };

        // Déplacer le bouton sous l'image
        const introductionImage = introductionSection.querySelector('figure img');
        const introductionEditButton = createEditButton();
        introductionEditButton.addEventListener('click', () => {
            alert('Modifier la section Introduction');
        });
        introductionImage.insertAdjacentElement('afterend', introductionEditButton);

        // Ajouter un bouton "Modifier" dans la section "Portfolio"
        const portfolioSection = document.getElementById('portfolio');
        const portfolioEditButton = createEditButton();
        portfolioEditButton.addEventListener('click', () => {
            alert('Modifier la section Portfolio');
        });
        portfolioSection.insertBefore(portfolioEditButton, portfolioSection.firstElementChild);
    }
});




