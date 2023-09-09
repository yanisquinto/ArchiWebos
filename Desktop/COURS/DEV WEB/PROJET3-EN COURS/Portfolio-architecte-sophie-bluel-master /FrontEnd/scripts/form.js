document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById("uploadForm");
    const categorySelect = document.getElementById("category");
    const photoInput = document.getElementById("image");
    const photoIcon = document.getElementById("photo-icon");
    const photoPreview = document.getElementById("photo-preview");
    const photoLabel = document.getElementById("photoLabel");
    const fileName = document.getElementById("fileName");
    const customFileButton = document.querySelector(".custom-file-button");
    const myModal = document.getElementById("myModal");

    async function uploadImage(formData) {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token d\'authentification manquant.');
            return;
        }

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: headers,
            });

            const data = await response.json();
            console.log('Photo téléversée avec succès !');

            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.style.display = 'none'; // Vous pouvez également utiliser iframe.remove() pour le supprimer complètement
            }

            // Marquer la soumission du formulaire
            localStorage.setItem('formSubmitted', 'true');

            // Rediriger l'utilisateur vers index.html après la soumission réussie
            window.location.href = 'index.html';

        } catch (error) {
            console.error(error.message);
        }
    }

    async function loadCategories() {
        try {
            const response = await fetch("http://localhost:5678/api/categories");
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des catégories');
            }
            const categories = await response.json();
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    function resetModal() {
        myModal.classList.remove("show");
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        photoIcon.style.display = 'block';
        customFileButton.style.display = 'block';
        photoLabel.style.backgroundColor = '';
        fileName.textContent = '';
    }

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

    function closeModal() {
        const myModal = document.getElementById("myModal");
        myModal.style.display = "none";
    }

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(uploadForm);
        const selectedPhoto = photoInput.files[0];
        if (!selectedPhoto) {
            alert('Veuillez sélectionner une photo avant de soumettre le formulaire.');
            return;
        }

        uploadImage(formData);
    });

    loadCategories();
});


