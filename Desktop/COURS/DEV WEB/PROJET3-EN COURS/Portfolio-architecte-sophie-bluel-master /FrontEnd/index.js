
document.addEventListener('DOMContentLoaded', function() {
    // APPEL DE L'API AVEC FETCH
    fetch('http://localhost:5678/api/works', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        // Traitement des données récupérées
        console.log(data);

        const gallerySection = document.getElementById('gallery');

        data.forEach(image => {
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
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
});




// CREATELEMENT POUR EXTRAIRE LES DONNEES DE L'API//

const imageData = [
    {
      id: 1,
      title: 'Abajour Tahina',
      imageUrl: 'http://localhost:5678/images/abajour-tahina1651286843956.png',
      categoryId: 1,
      userId: 1,
      createdAt: '2022-08-17T08:34:03.959Z',
      updatedAt: '2022-08-17T08:34:03.959Z'
    },
    {
      id: 2,
      title: 'Appartement Paris V',
      imageUrl: 'http://localhost:5678/images/appartement-paris-v1651287270508.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:34:30.508Z',
      updatedAt: '2022-08-17T08:34:30.508Z'
    },
    {
      id: 3,
      title: 'Restaurant Sushisen - Londres',
      imageUrl: 'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png',
      categoryId: 3,
      userId: 1,
      createdAt: '2022-08-17T08:34:50.271Z',
      updatedAt: '2022-08-17T08:34:50.271Z'
    },
    {
      id: 4,
      title: 'Villa “La Balisiere” - Port Louis',
      imageUrl: 'http://localhost:5678/images/la-balisiere1651287350102.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:35:00.102Z',
      updatedAt: '2022-08-17T08:35:00.102Z'
    },
    {
      id: 5,
      title: 'Structures Thermopolis',
      imageUrl: 'http://localhost:5678/images/structures-thermopolis1651287380258.png',
      categoryId: 1,
      userId: 1,
      createdAt: '2022-08-17T08:35:20.258Z',
      updatedAt: '2022-08-17T08:35:20.258Z'
    },
    {
      id: 6,
      title: 'Appartement Paris X',
      imageUrl: 'http://localhost:5678/images/appartement-paris-x1651287435459.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:35:35.459Z',
      updatedAt: '2022-08-17T08:35:35.459Z'
    },
    {
      id: 7,
      title: 'Pavillon “Le coteau” - Cassis',
      imageUrl: 'http://localhost:5678/images/le-coteau-cassis1651287469876.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:35:49.876Z',
      updatedAt: '2022-08-17T08:35:49.876Z'
    },
    {
      id: 8,
      title: 'Villa Ferneze - Isola d’Elba',
      imageUrl: 'http://localhost:5678/images/villa-ferneze1651287511604.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:36:03.755Z',
      updatedAt: '2022-08-17T08:36:03.755Z'
    },
    {
      id: 9,
      title: 'Appartement Paris XVIII',
      imageUrl: 'http://localhost:5678/images/appartement-paris-xviii1651287541053.png',
      categoryId: 2,
      userId: 1,
      createdAt: '2022-08-17T08:36:13.119Z',
      updatedAt: '2022-08-17T08:36:13.119Z'
    },
    {
      id: 10,
      title: 'Bar “Lullaby” - Paris',
      imageUrl: 'http://localhost:5678/images/bar-lullaby-paris1651287567130.png',
      categoryId: 3,
      userId: 1,
      createdAt: '2022-08-17T08:36:27.240Z',
      updatedAt: '2022-08-17T08:36:27.240Z'
    },
    {
      id: 11,
      title: 'Hotel First Arte - New Delhi',
      imageUrl: 'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png',
      categoryId: 3,
      userId: 1,
      createdAt: '2022-08-17T08:36:45.585Z',
      updatedAt: '2022-08-17T08:36:45.585Z'
    }
  ];

  

