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

        // Création de la modale
        const modal = document.createElement('div');
        modal.id = 'myModal'; // Ajout de l'ID "myModal" à la modale
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <span class="close" id="close">&times;</span>
            <h1 class="modal-title">Galerie</h1>
        `;

        // Ajout du bouton "Ajouter une image"
        const addButton = document.createElement('button');
        addButton.textContent = 'Ajouter une image';
        addButton.addEventListener('click', () => {
            const form = document.createElement('form');

            // Récupérez les catégories depuis l'API
            fetch('http://localhost:5678/api/categories', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(categories => {
                // Créez une liste déroulante (select) pour les catégories
                const categorySelect = document.createElement('select');
                categorySelect.id = 'category';
                categorySelect.name = 'category';

                // Remplissez la liste déroulante avec les catégories depuis l'API
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });

                // Ajoutez les champs au formulaire
                form.innerHTML = `
                    <label for="image">Image :</label>
                    <input type="file" id="image" name="image" accept="image/*" required>
                    <br>
                    <label for="title">Titre :</label>
                    <input type="text" id="title" name="title" required>
                    <br>
                    <label for="category">Catégorie :</label>
                `;

                // Ajoutez la liste déroulante des catégories au formulaire
                form.appendChild(categorySelect);

                // Ajoutez le reste du formulaire
                form.innerHTML += `
                    <br>
                    <button type="submit">Envoyer</button>
                `;

                // Écoutez l'événement de soumission du formulaire
                form.addEventListener('submit', (event) => {
                    event.preventDefault(); // Empêchez la soumission par défaut du formulaire
                    const formData = new FormData(form);

                    // Appelez la fonction pour téléverser l'image
                    uploadImage(formData);
                });

                modalContent.appendChild(form);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories :', error);
            });
        });

        // Fonction pour téléverser l'image en requête POST
        function uploadImage(formData) {
            // Récupérez le token d'authentification depuis le stockage local
            const token = localStorage.getItem('token');

            // Vérifiez si le token existe
            if (!token) {
                console.error('Token d\'authentification manquant.');
                return;
            }

            // Définissez l'en-tête Authorization avec le token
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: headers, // Ajoutez l'en-tête Authorization
            })
            .then(response => response.json())
            .then(data => {
                refreshModalContent();
            })
            .catch(error => {
                console.error('Erreur lors du téléversement de l\'image :', error);
            });
        }

        modalContent.appendChild(addButton);

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
            refreshModalContent(); // Rafraîchir le contenu de la modale
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none'; 
        });

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                modal.style.display = 'none';
                overlay.style.display = 'none'; // Fermer la modale si on clique ailleurs sur la page
            }
        });

        // Création une fonction pour mettre à jour le contenu de la modale
        function refreshModalContent() {
            //requête GET à l'API pour récupérer les données de la galerie
            fetch('http://localhost:5678/api/works', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const modalContent = document.querySelector('.modal-content');

                // Nettoyez le contenu existant de la modale
                modalContent.innerHTML = `
                    <span class="close" id="close">&times;</span>
                    <h1 class="modal-title">Galerie</h1>
                `;

                // Ajouter chaque image avec le bouton "Supprimer"
                data.forEach(imageData => {
                    const imageElement = document.createElement('img');
                    imageElement.src = imageData.imageUrl;
                    imageElement.classList.add('modal-image');
                    modalContent.appendChild(imageElement);

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('icon-button');
                    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>'; 
                    deleteButton.addEventListener('click', () => {
                        const confirmDelete = confirm('Voulez-vous vraiment supprimer cette image ?');
                        if (confirmDelete) {
                            // Récupérez le token d'authentification depuis le stockage local
                            const token = localStorage.getItem('token');

                            // Vérifiez si le token existe
                            if (!token) {
                                console.error('Token d\'authentification manquant.');
                                return;
                            }

                            // Définissez l'en-tête Authorization avec le token
                            const headers = new Headers();
                            headers.append('Authorization', `Bearer ${token}`);

                            // Effectuez la requête DELETE avec l'en-tête d'authentification
                            fetch(`http://localhost:5678/api/works/${imageData.id}`, {
                                method: 'DELETE',
                                headers: headers, // Ajoutez l'en-tête Authorization
                            })
                            .then(() => {
                                // L'image a été supprimée avec succès, rafraîchissez la modale
                                refreshModalContent();
                            })
                            .catch(error => {
                                console.error('Erreur lors de la suppression de l\'image :', error);
                            });
                        }
                    });

                    modalContent.appendChild(deleteButton);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de la galerie :', error);
            });
        }
    }
});

