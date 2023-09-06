document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById("uploadForm");
    const categorySelect = document.getElementById("category");
    const photoInput = document.getElementById("photo");
    const photoIcon = document.getElementById("photo-icon");
    const photoPreview = document.getElementById("photo-preview");
    const photoLabel = document.getElementById("photoLabel");
    const fileName = document.getElementById("fileName");

    // Charger les catégories depuis l'API
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        });

    // Fonction pour téléverser l'image en requête POST
    async function uploadImage(formData) {
        try {
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

            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json();
            refreshModalContent();
            console.log('Photo téléversée avec succès !');
            return data;
        } catch (error) {
            console.error('Erreur lors du téléversement de l\'image :', error);
            throw error;
        }
    }

    // Gestionnaire d'événements pour le téléversement de la photo
    uploadForm.addEventListener("submit", async (event) => {
        
        const formData = new FormData(uploadForm);

        try {
            await uploadImage(formData);
            refreshModalContent();
            console.log('Photo téléversée avec succès !');
        } catch (error) {
            console.error('Erreur lors du téléversement de l\'image :', error);
        }
    });

    const customFileButton = document.querySelector(".custom-file-button");

    photoInput.addEventListener('change', (event) => {
        const selectedPhoto = event.target.files[0];

        if (selectedPhoto) {
            const photoUrl = URL.createObjectURL(selectedPhoto);
            photoPreview.src = photoUrl;
            photoPreview.style.display = 'block';
            photoIcon.style.display = 'none';
            customFileButton.style.display = 'none';
            photoLabel.style.backgroundColor = '#E8F1F6';
        } else {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
            photoIcon.style.display = 'block';
            customFileButton.style.display = 'block';
            photoLabel.style.backgroundColor = '';
            fileName.textContent = '';
        }
    });

    const goBackButton = document.getElementById("goBackButton");
    const goToModalButton = document.getElementById("goToModalButton");
    const myModal = document.getElementById("myModal");

    function openModal() {
        myModal.classList.add("show");
    }

    goToModalButton.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
    });
});
