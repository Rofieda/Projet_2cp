
let selectedOptions = {
    type: null,
    acronyme: null,
};





function show(Explorer) {
    selectedOptions.Explorer = (selectedOptions.Explorer=== Explorer) ? null : Explorer;
    document.querySelector('.filtrex .textBox2').value = selectedOptions.Explorer ? Explorer : '';
}


let dropdown2s = document.querySelectorAll('.dropdown2');

dropdown2s.forEach(dropdown2 => {
    let menuIcon2 = dropdown2.querySelector('.menu-icon2');

    dropdown2.onclick = function() {
        menuIcon2.classList.toggle('active');
        dropdown2.classList.toggle('active');
    };
});



/*___________________________________________________________*/




let dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    let menuIcon = dropdown.querySelector('.menu-icon');

    dropdown.onclick = function() {
        menuIcon.classList.toggle('active');
        dropdown.classList.toggle('active');
    };
});


function showType(type) {
    selectedOptions.type = (selectedOptions.type === type) ? null : type;
    document.querySelector('.filtre2 .textBox').value = selectedOptions.type ? type : '';
}
       document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.partie-recherche form');
    const resultList = document.querySelector('.publication-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        const searchQuery = document.querySelector('.rechercher').value.trim();

        // Envoi de la requête AJAX avec Fetch
        fetch(`http://127.0.0.1:8000/api/publications/gsearch/?q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MzMxNjA5LCJpYXQiOjE3MTQzMzEwMDksImp0aSI6ImZjODIwNWM3Y2M4ZDQ5MzFhZmEyOTg4YzAxYTE1M2Q3IiwidXNlcl9pZCI6MjJ9.TvvM_3jlE4X5dfPZ57GiTEfuL9w4yDwcoSl1yv3wpYY' // Remplacez par votre jeton d'accès
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Efface le contenu actuel de la liste des résultats
          if (data.length === 0) {
                // No results found, redirect to notFound.html
                window.location.href = '../html/notFound1.html';
            } else {
                resultList.innerHTML = '';

            // Boucle à travers les résultats et les affiche sur la page
            data.forEach(item => {
                const publicationHTML = `
                    <li>
                        <span>${item.titre_publication}</span>
                        <span>${item.p_type}</span>
                        <span>${item.annee}</span>
                        <span>${item.acronyme}</span>
                        <span>${item.citations}</span>
                         <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                resultList.insertAdjacentHTML('beforeend', publicationHTML);
            });
        }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            window.location.href = '../html/notFound2.html';
        });
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.querySelector('.button-filtrer');
    const resultList = document.querySelector('.publication-list');

    filterButton.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        const searchQuery = document.querySelector('.rechercher').value.trim();
        const type = document.querySelector('.filtre2 .textBox').value.trim();
        const acronyme = document.querySelector('.filtre3 .textBox').value.trim();
        const annee = document.querySelector('.filtre1 .textBox').value.trim();
        const motCle = document.querySelector('.filtre4 .textBox').value.trim();

        // Envoi de la requête AJAX avec Fetch
        fetch(`http://127.0.0.1:8000/api/publications/search/?q=${searchQuery}&p_type=${type}&acronyme=${acronyme}&annee=${annee}&mot_cle=${motCle}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MzM2MjczLCJpYXQiOjE3MTQzMzU2NzMsImp0aSI6IjJmNGNkNWQ3ZDg3ZTQ4MGQ4MzExMjIzM2I5NzJkMDMwIiwidXNlcl9pZCI6MjJ9.9EBP8onqG0dHiIM_AhId9cMgZ4eCxSY0FqzY40oaDiI ' // Remplacez par votre jeton d'accès
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                // No results found, redirect to notFound.html
                window.location.href = '..html/notFound2.html';
            } else {
                resultList.innerHTML = '';

                // Boucle à travers les résultats et les affiche sur la page
                data.forEach(item => {
                    const publicationHTML = `
                    <li>
                        <span>${item.titre_publication}</span>
                        <span>${item.p_type}</span>
                        <span>${item.annee}</span>
                        <span>${item.acronyme}</span>
                        <span>${item.citations}</span>
                         <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                    resultList.insertAdjacentHTML('beforeend', publicationHTML);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            window.location.href = '../html/notFound2.html';
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const resultList = document.querySelector('.publication-list');

    // Fetch pour récupérer les données de l'API
    fetch('http://127.0.0.1:8000/api/publicationslist/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Autres en-têtes requis, par exemple pour l'authentification
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Votre code pour générer dynamiquement la liste des chercheurs à partir des données récupérées
        // Par exemple :
        resultList.innerHTML = ''; // Effacer le contenu précédent de la liste
        data.forEach(item => {
            const publicationHTML = `
                    <li>
                        <span>${item.titre_publication}</span>
                        <span>${item.p_type}</span>
                        <span>${item.annee}</span>
                        <span>${item.acronyme}</span>
                        <span>${item.citations}</span>
                       <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                    resultList.insertAdjacentHTML('beforeend', publicationHTML);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);

    });
});

function redirectToDetails(detailUrl) {
    // Extraire l'ID de la publication depuis l'URL
    const publicationId = detailUrl.match(/\/(\d+)\/$/)[1];

    // Stocker l'ID de la publication, le nom et le prénom du chercheur, ainsi que le rang du chercheur dans la session
    sessionStorage.setItem('id_publication', publicationId);


    // Redirection vers la page voirpublication.html
    window.location.href = '../html/voirpublication2.html';
}
