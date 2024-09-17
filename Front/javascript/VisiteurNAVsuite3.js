
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
    const resultList = document.querySelector('.publication-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        const searchQuery = document.querySelector('.rechercher').value.trim();

        // Envoi de la requête AJAX avec Fetch
        fetch(`http://127.0.0.1:8000/api/encadrements/genesearch/?q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MzMxNDE3LCJpYXQiOjE3MTQzMzA4MTcsImp0aSI6ImYyODI3N2M2NDEzNDQ0ZWU4NjRiODFkNTA1MGY5ZTZkIiwidXNlcl9pZCI6MjJ9.1i5FH27KRdX1SgIV6CR1I53qRv2xHvM2vURpy2sDSWs' // Remplacez par votre jeton d'accès
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
                window.location.href = '../html/notFound1.html';
            } else {
                resultList.innerHTML = '';

            // Boucle à travers les résultats et les affiche sur la page
            data.forEach(item => {
                const encadrementHTML = `
                    <li>
                        <span>${item.intitule}</span>
                        <span>${item.type_encadrement}</span>
                        <span>${item.annee_debut}</span>
                        <span>${item.annee_fin}</span>
                        <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                resultList.insertAdjacentHTML('beforeend', encadrementHTML);
            });
        }
        })
        .catch(error => {
           console.error('Error fetching data:', error);
            window.location.href = '../html/notFound3.html';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.querySelector('.button-filtrer');
    const resultList = document.querySelector('.publication-list');

    filterButton.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        const searchQuery = document.querySelector('.rechercher').value.trim();
        const typeEncadrement = document.querySelector('.filtre3 .textBox').value.trim();
        const dateDebut = document.querySelector('#yearInput1').value.trim();
        const dateFin = document.querySelector('#yearInput2').value.trim();
        const motCle = document.querySelector('.filtre4 .textBox').value.trim();

        // Envoi de la requête AJAX avec Fetch
        fetch(`http://127.0.0.1:8000/api/encadrements/search/?q=${searchQuery}&type_encadrement=${typeEncadrement}&date_debut=${dateDebut}&date_fin=${dateFin}&mot_cle=${motCle}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MzM2OTk2LCJpYXQiOjE3MTQzMzYzOTYsImp0aSI6ImZkMDJkNDYxYTA3ZDRkODVhMWYwZjZkYWRlNjRjMTM1IiwidXNlcl9pZCI6MjJ9.38UvBOIvoCEUORXaRcCj0LB7AKLVaMagEYle2GZL5AM' // Remplacez par votre jeton d'accès
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
                window.location.href = '../html/notFound1.html';
            } else {
                      resultList.innerHTML = '';

                      // Boucle à travers les résultats et les affiche sur la page
                      data.forEach(item => {
                          const encadrementHTML = `
                    <li>
                        <span>${item.intitule}</span>
                        <span>${item.type_encadrement}</span>
                        <span>${item.annee_debut}</span>
                        <span>${item.annee_fin}</span>
                        <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                    </li>
                `;
                          resultList.insertAdjacentHTML('beforeend', encadrementHTML);
                      });
                  }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            window.location.href = '../html/notFound3.html';
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8000/api/encadrements/', {
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
            const encadrementHTML = `
                <li>
                    <span>${item.intitule}</span>
                    <span>${item.type_encadrement}</span>
                    <span>${item.annee_debut}</span>
                    <span>${item.annee_fin}</span>
                    <span class="more" onclick="redirectToDetails('${item.detail_url}')">details</span>
                </li>
            `;
            resultList.insertAdjacentHTML('beforeend', encadrementHTML);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


function redirectToDetails(detailUrl) {
    // Extraire l'ID de la publication depuis l'URL
    const encadrementId = detailUrl.match(/\/(\d+)\/$/)[1];

    // Stocker l'ID de la publication, le nom et le prénom du chercheur, ainsi que le rang du chercheur dans la session
    sessionStorage.setItem('id_encadrement', encadrementId);


    // Redirection vers la page voirpublication.html
    window.location.href = '../html/voirencadrement.html';
}