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
                <button class="publish-changes" id="publish-changes">Publier les changements</button>
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

        // Déplacer le bouton sous l'image de la section "Introduction"
        const introductionImage = introductionSection.querySelector('figure img');
        const introductionEditButton = createEditButton();
        introductionImage.insertAdjacentElement('afterend', introductionEditButton);

        // Utiliser la fonction createEditButtonPortfolio pour le bouton "Modifier" dans la section Portfolio
        const createEditButtonPortfolio = () => {
            const editButtonPortfolio = document.createElement('button');
            editButtonPortfolio.className = 'edit-button';
            editButtonPortfolio.id = 'portfolio-edit-button';
            editButtonPortfolio.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Modifier`;
            return editButtonPortfolio;
        };

        const portfolioSection = document.getElementById('portfolio');
        const portfolioEditButton = createEditButtonPortfolio();

        // Ajouter le bouton "Modifier" au début de la section Portfolio
        portfolioSection.insertBefore(portfolioEditButton, portfolioSection.firstElementChild);

        // Créer la modal en dehors de la condition
        const modal = document.createElement('div');
        modal.id = 'myModal'; // Ajout de l'ID "myModal" à la modale
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <span class="close" id="close">&times;</span>
            <p>Contenu de la modale...</p>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        const openModalButton = document.getElementById('portfolio-edit-button');
        const closeModal = document.getElementById('close');
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        openModalButton.addEventListener('click', () => {
            modal.style.display = 'block';
            overlay.style.display = 'block'; // Afficher l'overlay
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none'; // Masquer l'overlay
        });

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                modal.style.display = 'none';
                overlay.style.display = 'none'; // Masquer l'overlay si on clique à l'extérieur de la modale
            }
        });
    }
});










