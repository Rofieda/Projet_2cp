
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
    document.querySelector('.filtre3 .textBox').value = selectedOptions.type ? type : '';
}








  
const yearInput1 = document.getElementById('yearInput1');
const yearInput2 = document.getElementById('yearInput2');
const errorMessage1 = document.getElementById('errorMessage1');
const errorMessage2 = document.getElementById('errorMessage2');

yearInput1.addEventListener('input', () => {

  const year = yearInput1.value.trim();

  yearInput1.addEventListener('keydown', (event) => {
if (event.keyCode === 13) {
    if (yearInput1.value.length >= 4 && yearInput1.value !== '' && year <= 2024 && year > 1990) {
        errorMessage1.textContent = ''; 
    } else {
        errorMessage1.textContent = 'Erreur : Année invalide .';
        errorMessage1.style.color = 'red';
        errorMessage1.style.fontSize = '12px';
    }
}
});

      
  while (isNaN(year) || year > 2024 || year < 1990) {


    if (event.keyCode === 13) {
     if (year.length < 4) {
      errorMessage1.textContent = 'Erreur : Année invalide.';
      errorMessage1.style.color = 'red';
      errorMessage1.style.fontSize = '12px';
      return;
    }

    if (year === '' ) {
      // Effacer le message d'erreur
      errorMessage1.textContent = '';
      return;
    }
    }

    if (year === '' ) {
      // Effacer le message d'erreur
      errorMessage1.textContent = '';
      return;
    }


    if (isNaN(year)) {
      // Afficher un message d'erreur
      errorMessage1.textContent = 'Erreur : Veuillez entrer une année valide.';
      errorMessage1.style.color = 'red';
      errorMessage1.style.fontSize = '12px';
      return;
    }

    if ((year > 2024 || year < 1990)) {

      if (year.length < 4) {
      errorMessage1.textContent = '';
      return;
    }
      else {
      // Afficher un message d'erreur
      errorMessage1.textContent = 'Erreur : Année invalide .';
      errorMessage1.style.color = 'red';
      errorMessage1.style.fontSize = '12px';
      return;
    }
  }
  
  }

  errorMessage1.textContent = '';
  validateYearOrder(year, yearInput2.value.trim(), errorMessage2);
});



//--------------------------------------------------------------------------------------------//

yearInput2.addEventListener('input', () => {

  const year = yearInput2.value.trim();
  const startYear = parseInt(yearInput1.value.trim());
  const endYear = parseInt(yearInput2.value.trim());

  yearInput2.addEventListener('keydown', (event) => {
if (event.keyCode === 13) {
    if (yearInput2.value.length >= 4 && yearInput2.value !== '' && year <= 2024 && year > 1990) {
        errorMessage2.textContent = ''; 
    } else {
        errorMessage2.textContent = 'Erreur : Année invalide.';
        errorMessage2.style.color = 'red';
        errorMessage2.style.fontSize = '12px';
    }
}
});

  while (isNaN(year) || year > 2024 || year < 1990) {

    if (event.keyCode === 13) {
     if (year.length < 4) {
      errorMessage2.textContent = 'Erreur : Année invalide.';
      errorMessage2.style.color = 'red';
      errorMessage2.style.fontSize = '12px';
      return;
    }

    if (year === '' ) {
      // Effacer le message d'erreur
      errorMessage2.textContent = '';
      return;
    }
    }

    if (year === '' ) {
      // Effacer le message d'erreur
      errorMessage2.textContent = '';
      return;
    }


    if (isNaN(year)) {
      // Afficher un message d'erreur
      errorMessage2.textContent = 'Erreur : Veuillez entrer une année valide.';
      errorMessage2.style.color = 'red';
      errorMessage2.style.fontSize = '12px';
      return;
    }

    if ((year > 2024 || year < 1990)) {

      if (year.length < 4) {
      errorMessage2.textContent = '';
      return;
      }
      else  {
      // Afficher un message d'erreur
      errorMessage2.textContent = 'Erreur : Année invalide.';
      errorMessage2.style.color = 'red';
      errorMessage2.style.fontSize = '12px';
      return;
      }
      if ((year.length < 4) && event.keyCode === 13) {
      errorMessage2.textContent = 'Erreur : Année invalide.';
      errorMessage2.style.color = 'red';
      errorMessage2.style.fontSize = '12px';
      return;
      }
      }
  }


  validateYearOrder(yearInput1.value.trim(), year, errorMessage1);
  });

  function validateYearOrder(startYear, endYear, errorMessage) {
    if (parseInt(endYear) < parseInt(startYear)) {
      errorMessage.textContent = 'Erreur : Année invalide(fin<debut)';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '12px';
    } else {
      errorMessage.textContent = '';
}
}
   document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.partie-recherche form');
    const filterButton = document.querySelector('.button-filtrer');
    const resultList = document.querySelector('.publication-list');

    // Fonction pour afficher les résultats de la recherche ou des filtres
    function displayResults(data) {
        // Réinitialiser le contenu de la liste des projets
        resultList.innerHTML = '';

        // Boucle à travers les résultats et les affiche sur la page
        data.forEach(item => {
            const projetHTML = `
                <li>
                    <span>${item.titre_projet}</span>
                    <span>${item.domaine}</span>
                    <span>${item.annee_debut}</span>
                    <span>${item.annee_fin}</span>
                    <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                </li>
            `;
            resultList.insertAdjacentHTML('beforeend', projetHTML);
        });
    }

    // Écouter la soumission du formulaire de recherche
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        const searchQuery = document.querySelector('.rechercher').value.trim();
        fetch(`http://127.0.0.1:8000/api/projets/gensearch/?q=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    // Rediriger vers la page notFound.html si aucun résultat n'est trouvé
                    window.location.href = '../html/notFound4.html';
                } else {
                    // Afficher les résultats sur la page
                    displayResults(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                window.location.href = '../html/notFound4.html';
            });
    });

    // Écouter le clic sur le bouton de filtrage
    filterButton.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        const searchQuery = document.querySelector('.rechercher').value.trim();
        const domaine = document.querySelector('.filtre3 .textBox').value.trim();
        const dateDebut = document.querySelector('#yearInput1').value.trim();
        const dateFin = document.querySelector('#yearInput2').value.trim();
        const motCle = document.querySelector('.filtre4 .textBox').value.trim();
        fetch(`http://127.0.0.1:8000/api/projets/search/?q=${searchQuery}&domaine=${domaine}&date_debut=${dateDebut}&date_fin=${dateFin}&mot_cle=${motCle}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    // Rediriger vers la page notFound.html si aucun résultat n'est trouvé
                    window.location.href = '../html/notFound4.html';
                } else {
                    // Afficher les résultats sur la page
                    displayResults(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                window.location.href = '../html/notFound4.html';
            });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8000/api/projetslists/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const resultList = document.querySelector('.publication-list');

        // Effacer le contenu existant de la liste
        resultList.innerHTML = '';

        // Boucle à travers les résultats et les affiche sur la page

        data.forEach(item => {
                    const projetHTML = `
                    <li>
                        <span>${item.titre_projet}</span>
                        <span>${item.domaine}</span>
                        <span>${item.annee_debut}</span>
                        <span>${item.annee_fin}</span>
                        <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                    resultList.insertAdjacentHTML('beforeend', projetHTML);
                });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
function redirectToDetails(detailUrl) {
    // Extraire l'ID de la publication depuis l'URL
    const projetId = detailUrl.match(/\/(\d+)\/$/)[1];

    // Stocker l'ID de la publication, le nom et le prénom du chercheur, ainsi que le rang du chercheur dans la session
    sessionStorage.setItem('id_projet', projetId);


    // Redirection vers la page voirpublication.html
    window.location.href = '../html/voirprojet.html';
}
