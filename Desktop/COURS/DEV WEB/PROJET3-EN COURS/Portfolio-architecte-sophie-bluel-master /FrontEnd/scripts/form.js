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
            refreshModalContent(); 
        } else {
            console.error("Erreur lors du téléversement de la photo.");
        }
    });

    photoInput.addEventListener('change', (event) => {
        const selectedPhoto = event.target.files[0];

        if (selectedPhoto) {
            const photoUrl = URL.createObjectURL(selectedPhoto);
            photoPreview.src = photoUrl;
            photoPreview.style.display = 'block';
            photoIcon.style.display = 'none';
            photoInput.style.display = 'none';
            photoLabel.style.backgroundColor = '#E8F1F6';  
        } else {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
            photoIcon.style.display = 'block';
            photoInput.style.display = 'block';
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

