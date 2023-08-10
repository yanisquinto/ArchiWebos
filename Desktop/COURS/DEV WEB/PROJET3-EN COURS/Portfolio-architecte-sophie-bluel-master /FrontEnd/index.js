document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments HTML nécessaires
    const gallerySection = document.getElementById('gallery');
    const filtersContainer = document.getElementById('filters');

    // Définition des catégories de filtres
    const categories = [
        { id: -1, name: 'Tous' },
        { id: 1, name: 'Objets' },
        { id: 2, name: 'Appartements' },
        { id: 3, name: 'Hôtels & restaurants' }
    ];

    // Fonction pour filtrer et afficher les images en fonction de la catégorie sélectionnée
    function filterAndDisplayImages(categoryId, data) {
        gallerySection.innerHTML = ''; // Effacer le contenu actuel de la galerie

        // Filtrer les images en fonction de la catégorie sélectionnée
        const filteredImages = data.filter(image => categoryId === -1 || image.categoryId === categoryId);

        // Parcourir les images filtrées et les afficher
        filteredImages.forEach(image => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.src = image.imageUrl;
            img.alt = image.title;

            figcaption.textContent = image.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            gallerySection.appendChild(figure);
        });
    }

    // Appel à l'API pour récupérer les données des travaux de la galerie
    fetch('http://localhost:5678/api/works', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Traitement des données récupérées
        console.log(data);

        // Création des boutons de filtres
        const filterButtons = filtersContainer.querySelectorAll('button');
        filterButtons.forEach(button => {
            // Ajout d'un gestionnaire d'événement pour chaque bouton de filtre
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le rechargement par défaut de la page
                const categoryId = parseInt(button.getAttribute('data-category'));
                filterAndDisplayImages(categoryId, data); // Filtrer et afficher les images
            });
        });

        // Création des boutons de filtres à partir des catégories définies
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.setAttribute('data-category', category.id);
            filtersContainer.appendChild(button); // Ajouter le bouton au conteneur des filtres
        });

        filterAndDisplayImages(-1, data); // Afficher toutes les images par défaut
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
});
