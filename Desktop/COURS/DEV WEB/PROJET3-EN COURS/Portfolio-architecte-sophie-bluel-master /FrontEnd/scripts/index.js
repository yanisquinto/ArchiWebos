// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne les éléments HTML nécessaires
    const gallerySection = document.getElementById('gallery'); // Section où les images seront affichées
    const filtersContainer = document.getElementById('filters'); // Conteneur des filtres

    // Définition des catégories de filtres avec leurs ID et noms
    const categories = [
        { id: -1, name: 'Tous' },
        { id: 1, name: 'Objets' },
        { id: 2, name: 'Appartements' },
        { id: 3, name: 'Hôtels & restaurants' }
    ];

    // Création des boutons de filtres en utilisant les catégories définies
    categories.forEach(category => {
        const button = document.createElement('button'); // Crée un élément bouton
        button.textContent = category.name; // Définit le texte du bouton avec le nom de la catégorie
        button.setAttribute('data-category', category.id); // Attribut personnalisé pour stocker l'ID de catégorie
        filtersContainer.appendChild(button); // Ajoute le bouton au conteneur des filtres
    });

    // Fonction pour filtrer et afficher les images en fonction de la catégorie sélectionnée
    function filterAndDisplayImages(categoryId, data) {
        gallerySection.innerHTML = ''; // Efface le contenu actuel de la galerie

        // Filtre les images en fonction de la catégorie sélectionnée
        const filteredImages = data.filter(image => categoryId === -1 || image.categoryId === categoryId);

        // Parcours les images filtrées et les affiche
        filteredImages.forEach(image => {
            const figure = document.createElement('figure'); // Crée un élément de figure
            const img = document.createElement('img'); // Crée un élément d'image
            const figcaption = document.createElement('figcaption'); // Crée un élément de légende

            img.src = image.imageUrl; // Définit l'URL de la source de l'image
            img.alt = image.title; // Définit le texte alternatif de l'image

            figcaption.textContent = image.title; // Définit le texte de la légende

            figure.appendChild(img); // Ajoute l'image à la figure
            figure.appendChild(figcaption); // Ajoute la légende à la figure

            gallerySection.appendChild(figure); // Ajoute la figure à la section de la galerie
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

        filterAndDisplayImages(-1, data); // Affiche toutes les images par défaut

        // Sélectionne tous les boutons de filtres
        const filterButtons = filtersContainer.querySelectorAll('button');
        
        // Ajoute un gestionnaire d'événement pour chaque bouton de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le rechargement par défaut de la page
                const categoryId = parseInt(button.getAttribute('data-category'));
                filterAndDisplayImages(categoryId, data); // Filtrer et afficher les images
            });
        });
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
});


