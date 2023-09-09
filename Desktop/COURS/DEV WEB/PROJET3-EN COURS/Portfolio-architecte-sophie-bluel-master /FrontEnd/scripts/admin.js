document.addEventListener('DOMContentLoaded', function () {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        const editModeBanner = document.createElement('div');
        editModeBanner.id = 'edit-mode-banner';
        editModeBanner.innerHTML = '<div class="edit-mode-text"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i> Mode Édition <button class="publish-changes" id="publish-changes">Publier les changements</button></div>';
        document.body.insertBefore(editModeBanner, document.body.firstChild);

        const publishButton = document.getElementById('publish-changes');
        publishButton.addEventListener('click', () => {
            alert('Changements publiés !');
        });

        const introductionSection = document.getElementById('introduction');
        
        function createEditButton(text) {
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> ${text}`;
            return editButton;
        }

        const introductionImage = introductionSection.querySelector('figure img');
        const introductionEditButton = createEditButton('Modifier');
        introductionImage.insertAdjacentElement('afterend', introductionEditButton);

        function createEditButtonPortfolio() {
            const editButtonPortfolio = document.createElement('button');
            editButtonPortfolio.className = 'edit-button';
            editButtonPortfolio.id = 'portfolio-edit-button';
            editButtonPortfolio.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Modifier`;
            return editButtonPortfolio;
        }

        const portfolioSection = document.getElementById('portfolio');
        const portfolioEditButton = createEditButtonPortfolio();
        portfolioSection.insertBefore(portfolioEditButton, portfolioSection.firstElementChild);

        const modal = document.createElement('div');
        modal.id = 'myModal';
        modal.className = 'modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `<span class="close" id="close">&times;</span><h2 class="delete-gallery">supprimer la galerie</h2><h1 class="modal-title">Galerie photo</h1><button class="button-add-img" id="addButton">Ajouter une image</button>`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Ajouter une image';
        addButton.classList.add('button-add-img');
        modalContent.appendChild(addButton);

        addButton.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = 'form.html';
            iframe.style.width = '100%';
            iframe.style.height = '100%';

            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = '';
            modalContent.appendChild(iframe);

            const closeModal = document.getElementById('close');
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';

                const iframe = document.createElement('iframe');
                iframe.src = 'form.html';
                iframe.style.width = '100%';
                iframe.style.height = '100%';

                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = '';
                modalContent.appendChild(iframe);
            });

            fetch('http://localhost:5678/api/categories', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(categories => {
                    const categorySelect = document.createElement('select');
                    categorySelect.id = 'category';
                    categorySelect.name = 'category';

                    categories.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.id;
                        option.textContent = category.name;
                        categorySelect.appendChild(option);
                    });

                    const form = document.createElement('form');
                    form.id = 'uploadForm';
                    form.innerHTML = `<label for="image">Image :</label><input type="file" id="image" name="image" accept="image/*" required><br><label for="title">Titre :</label><input type="text" id="title" name="title" required><br><label for="category">Catégorie :</label>`;
                    form.appendChild(categorySelect);

                    const submitButton = document.createElement('button');
                    submitButton.type = 'submit';
                    submitButton.textContent = 'Envoyer';
                    form.appendChild(submitButton);

                    form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const formData = new FormData(form);
                        uploadImage(formData);
                    });

                    form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const formData = new FormData(form);
                        uploadImage(formData);
                    });

                    const formContainer = document.getElementById('formcontainer');
                    formContainer.appendChild(form);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des catégories :', error);
                });
        });

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
            overlay.style.display = 'block';
            refreshModalContent();
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            restoreInitialModalPage();
        });

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                restoreInitialModalPage();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                restoreInitialModalPage();
            }
        });

        function refreshModalContent() {
            fetch('http://localhost:5678/api/works', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    const modalContent = document.querySelector('.modal-content');

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
                                const token = localStorage.getItem('token');
                                if (!token) {
                                    console.error('Token d\'authentification manquant.');
                                    return;
                                }

                                const headers = new Headers();
                                headers.append('Authorization', `Bearer ${token}`);

                                fetch(`http://localhost:5678/api/works/${imageData.id}`, {
                                    method: 'DELETE',
                                    headers: headers,
                                })
                                    .then(() => {
                                        modalContent.removeChild(imageContainer);
                                    })
                                    .catch(error => {
                                        console.error('Erreur lors de la suppression de l\'image :', error);
                                    });
                            }
                        });

                        imageContainer.appendChild(deleteButton);
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

        function restoreInitialModalPage() {
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `<span class="close" id="close">&times;</span><h2 class="delete-gallery">supprimer la galerie</h2><h1 class="modal-title">Galerie photo</h1><button class="button-add-img" id="addButton">Ajouter une image</button>`;

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
        
    }
});

