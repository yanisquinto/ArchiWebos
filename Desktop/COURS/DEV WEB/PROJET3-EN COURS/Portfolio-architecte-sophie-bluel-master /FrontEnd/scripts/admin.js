document.addEventListener('DOMContentLoaded', function () {
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
        modal.id = 'myModal';
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <span class="close" id="close">&times;</span>
            <h2 class="delete-gallery">supprimer la galerie</h2>
            <h1 class="modal-title">Galerie photo</h1>
            <button class="button-add-img" id="addButton">Ajouter une image</button>
        `;

        // Ajout du bouton "Ajouter une image" (première modale)
        const addButton = document.createElement('button');
        addButton.textContent = 'Ajouter une image';
        addButton.classList.add('button-add-img');
        addButton.addEventListener('click', () => {
            // Créez un élément iframe
            const iframe = document.createElement('iframe');
            iframe.src = 'form.html'; // Spécifiez l'URL de la page à charger dans l'iframe
            iframe.style.width = '100%';
            iframe.style.height = '100%';

            // Ajoutez l'iframe au contenu de la modale
            const modalContent = document.querySelector('.modal-content'); // Assurez-vous de cibler la première modale
            modalContent.innerHTML = ''; // Effacez le contenu existant de la modale
            modalContent.appendChild(iframe);

            // Sélectionnez le bouton "Fermer" (X) dans la modale
            const closeModal = document.getElementById('close');

            // Ajoutez un gestionnaire d'événement pour le clic sur le bouton "Fermer"
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none'; // Fermez la modale
                overlay.style.display = 'none'; // Masquez l'overlay

                // Rechargez la page initiale de la modale (form.html)
                const iframe = document.createElement('iframe');
                iframe.src = 'form.html';
                iframe.style.width = '100%';
                iframe.style.height = '100%';

                // Remplacez le contenu actuel de la modale par l'iframe
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = ''; // Effacez le contenu existant de la modale
                modalContent.appendChild(iframe);
            });

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

                    // Ajoutez le bouton "Envoyer" au formulaire
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Envoyer';
        form.appendChild(submitButton);

                    // Écoutez l'événement de soumission du formulaire
                    form.addEventListener('submit', (event) => {
                        event.preventDefault(); // Empêchez la soumission par défaut du formulaire
                        const formData = new FormData(form);

                        // Appelez la fonction pour téléverser l'image
                        uploadImage(formData);
                    });

                  // Ajoutez l'écouteur d'événement de soumission du formulaire
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Empêchez la soumission par défaut du formulaire
            const formData = new FormData(form);

            // Appelez la fonction pour téléverser l'image
            uploadImage(formData);
        });

        // Ajoutez le formulaire à l'élément avec la classe "form-container" (ajustez la classe selon votre HTML)
        const formContainer = document.getElementById('formcontainer'); 
        formContainer.appendChild(form);
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
                headers: headers,
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

        // Gestionnaire d'événement pour ouvrir la modale
        openModalButton.addEventListener('click', () => {
            modal.style.display = 'block';
            overlay.style.display = 'block'; // Afficher l'overlay
            refreshModalContent(); // Rafraîchir le contenu de la modale
        });

        // Gestionnaire d'événement pour fermer la modale en cliquant sur le bouton "Fermer" (X)
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none';

            // Appelez la fonction pour restaurer la page initiale de la modale
            restoreInitialModalPage();
        });

        // Gestionnaire d'événement pour fermer la modale en cliquant sur le côté (overlay)
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                
                // Appelez la fonction pour restaurer la page initiale de la modale
                restoreInitialModalPage();
            }
        });

        // Gestionnaire d'événement pour fermer la modale en appuyant sur la touche "Échap"
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                
                // Appelez la fonction pour restaurer la page initiale de la modale
                restoreInitialModalPage();
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

                    // Création des boutons "delete"
                    data.forEach(imageData => {
                        const imageContainer = document.createElement('div');
                        imageContainer.classList.add('image-container');

                        const imageElement = document.createElement('img');
                        imageElement.src = imageData.imageUrl;
                        imageElement.classList.add('modal-image');
                        imageContainer.appendChild(imageElement);

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
                                        console.error
                                    });
                            }
                        });

                        // Ajoutez le bouton "Supprimer" au conteneur de l'image
                        imageContainer.appendChild(deleteButton);

                        // Ajoutez le conteneur de l'image (avec l'image et le bouton "Supprimer") à la modale
                        modalContent.appendChild(imageContainer);
                    });
                    const galleryBar = document.createElement('div');
                    galleryBar.classList.add('border-modal');
                    modalContent.appendChild(galleryBar);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données de la galerie :', error);
                });
        }

        // Fonction pour restaurer la page initiale de la modale
        function restoreInitialModalPage() {
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <span class="close" id="close">&times;</span>
                <h2 class="delete-gallery">supprimer la galerie</h2>
                <h1 class="modal-title">Galerie photo</h1>
                <button class="button-add-img" id="addButton">Ajouter une image</button>
            `;
        
            // Rétablissez le bouton "Ajouter une image" et le gestionnaire d'événements
            const addButton = document.getElementById('addButton');
            addButton.addEventListener('click', () => {
                const iframe = document.createElement('iframe');
                iframe.src = 'form.html';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                modalContent.innerHTML = '';
                modalContent.appendChild(iframe);
            });
        }
        
        const imageInput = document.getElementById('image');
    const previewImage = document.getElementById('preview-image');

    // Écoutez l'événement "change" de l'input de type fichier
    imageInput.addEventListener('change', (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            // Créez un objet URL pour afficher l'image dans l'élément <img>
            const imageUrl = URL.createObjectURL(selectedImage);
            previewImage.src = imageUrl;
            previewImage.style.display = 'block'; // Affichez l'élément <img>
        } else {
            previewImage.src = '';
            previewImage.style.display = 'none'; // Cachez l'élément <img> si aucune image n'est sélectionnée
        }
    });
        
        
    }
});


