document.addEventListener('DOMContentLoaded', function () {
    const addPhotoButton = document.getElementById("addPhotoButton");
    const uploadForm = document.getElementById("uploadForm");
    const categorySelect = document.getElementById("category");

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

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(uploadForm);
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            console.log("Photo téléversée avec succès !");
            refreshModalContent(); // Vous devez définir la fonction refreshModalContent pour actualiser le contenu si nécessaire
        } else {
            console.error("Erreur lors du téléversement de la photo.");
        }
    });

    addPhotoButton.addEventListener("click", () => {
        document.getElementById("photo").click();
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

            const goBackButton = document.getElementById("goBackButton");

            const goToModalButton = document.getElementById("goToModalButton");
            const myModal = document.getElementById("myModal");
        
            // Fonction pour ouvrir la modale
            function openModal() {
                myModal.classList.add("show"); // Ajoute la classe "show" pour afficher la modale
            }
        
            goToModalButton.addEventListener("click", (event) => {
                event.preventDefault();
                openModal(); // Appelle la fonction d'ouverture de la modale lorsque le lien est cliqué
            });
    }
});
