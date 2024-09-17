// Récupérer le canvas
var ctx = document.getElementById('courbe-activite').getContext('2d');

// Données du graphique
var data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [{
        label: 'Activité',
        borderColor: '#365486',
        borderWidth: 2,
        pointBackgroundColor: '#365486', // Correction ici
        pointRadius: 4,
        pointHoverRadius: 6,
        data: [12, 19, 3, 5, 2, 3] // Données d'activité par mois
    }]
};

var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

// Créer la courbe d'activité
var courbeActivite = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

function showNotification() {
    var notificationWindow = document.getElementById("notification-window");
    notificationWindow.style.display = "block";
}

function closeNotification() {
    var notificationWindow = document.getElementById("notification-window");
    notificationWindow.style.display = "none";
}


function toggleIcon(button) {
    var img = button.querySelector('img');
    var fixDiv = document.querySelector('.fix');

    if (img.getAttribute('src') === '../images/Down Circle 2.png') {
        img.setAttribute('src', '../images/Up Circle 2.png');
        document.getElementById('originalInfo').style.display = 'none';
        document.getElementById('alternateInfo').style.display = 'flex';
        fixDiv.style.display = 'block'; // Garder la div fix visible
    } else {
        img.setAttribute('src', '../images/Down Circle 2.png');
        document.getElementById('originalInfo').style.display = 'flex';
        document.getElementById('alternateInfo').style.display = 'none';
        fixDiv.style.display = 'block'; // Garder la div fix visible
    }
}


// Sélectionner les éléments left et right
var leftElement = document.querySelector('.left');
var rightElement = document.querySelector('.right');

// Sélectionner les boutons de défilement
var leftScrollButton = document.querySelector('.left-scroll');
var rightScrollButton = document.querySelector('.right-scroll');

// Gérer le défilement vers la gauche
leftScrollButton.addEventListener('click', function () {
    // Vérifier si l'élément right est actuellement visible
    if (rightElement.classList.contains('active')) {
        // Déplacer les éléments left et right d'une certaine distance vers la gauche
        leftElement.style.transform = 'translateX(0)';
        rightElement.style.transform = 'translateX(-100%)';

        // Ajouter la classe active à leftElement et supprimer la classe active de rightElement
        leftElement.classList.add('active');
        rightElement.classList.remove('active');
    }
});

// Gérer le défilement vers la droite
rightScrollButton.addEventListener('click', function () {
    // Vérifier si l'élément left est actuellement visible
    if (leftElement.classList.contains('active')) {
        // Déplacer les éléments left et right d'une certaine distance vers la droite
        leftElement.style.transform = 'translateX(-100%)';
        rightElement.style.transform = 'translateX(0)';

        // Ajouter la classe active à rightElement et supprimer la classe active de leftElement
        rightElement.classList.add('active');
        leftElement.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', () => {
            menu.classList.toggle('show');
            caret.classList.toggle('rotate');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                menu.classList.remove('show');
                caret.classList.remove('rotate');
            });
        });
    });

    // Fermer le menu déroulant lors d'un clic en dehors
    window.addEventListener('click', function (e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.querySelector('.menu').classList.remove('show');
                dropdown.querySelector('.caret').classList.remove('rotate');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Données de répartition des sexes
    const data = {
        labels: ['Homme', 'Femme'],
        datasets: [{
            label: 'Répartition des sexes',
            data: [45, 55], // Ici, 45% d'hommes et 55% de femmes (ce sont des valeurs arbitraires)
            backgroundColor: ['#007bff', '#ff1493'] // Couleurs pour les segments du graphique
        }]
    };

    // Configuration du graphique
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Position de la légende
                },
                title: {
                    display: true,
                    text: 'Répartition des sexes'
                }
            }
        }
    };

    // Création du graphique
    const ctx = document.getElementById('sexeChart').getContext('2d');
    const myChart = new Chart(ctx, config);
});

// Fonction pour récupérer le contenu des paragraphes introduits manuellement par l'utilisateur
function obtenirContenuParagraphes() {
    // Sélection de l'élément contenant les informations personnelles
    var rightInfo = document.querySelector('.right-info');

    // Sélection de tous les paragraphes à l'intérieur de cet élément
    var paragraphs = rightInfo.querySelectorAll('p');

    // Création d'un tableau pour stocker le contenu des paragraphes
    var paragraphContents = [];

    // Itération sur les paragraphes pour récupérer leur contenu et les stocker dans le tableau
    paragraphs.forEach(function (paragraph) {
        paragraphContents.push(paragraph.textContent);
    });

    // Retourner le tableau contenant le contenu des paragraphes
    return paragraphContents;
}

// Exemple d'utilisation : lorsque l'utilisateur souhaite obtenir le contenu des paragraphes
var contenuParagraphes = obtenirContenuParagraphes();

// Faites ce que vous voulez avec le contenu, par exemple, l'afficher dans la console
console.log(contenuParagraphes);

function applyChanges() {
    // Remplacer le contenu de left-pub-info
    var leftPubInfo = document.querySelector('.left-pub-info2');
    leftPubInfo.innerHTML = `
        <p>Titre de conférence-journal :</p>
        <p>Type :</p>
        <p>Périodicité:</p>
        <p>Acronyme :</p>
        <p>lien de site Conférence-Journal :</p>
        <p>Core Classification :</p>
        <p>Scimago Classification :</p>
        <p>Qualis Classification :</p>
        <p>Dgrsdt Classification :</p>
    `;

    // Remplacer les inputs et selects
    var rightPubInfo = document.querySelector('.input-select');
    rightPubInfo.innerHTML = `
    <input type="text" id="titre" name="titre" value="international design & test symposium">
    <select id="rang1" name="rang1" >
        <option value="" disabled selected></option>
        <option value="1" selected>Conférence</option>
        <option value="2">Revue</option>
    </select>
    <select id="rang2" name="rang2">
        <option value="" disabled selected></option>
        <option value="1">Ad hoc</option>
        <option value="2">Continuelle</option>
        <option value="4">Saisonniére</option>
        <option value="3" selected>Mensuelle</option>
        <option value="5">Bimensuelle</option>
        <option value="6">Trimestrielle</option>
        <option value="7">Semestrielle</option>
        <option value="8">Annuelle</option>
        <option value="9">Biennale</option>
        <option value="10">Triennale</option>
        <option value="11">Quadriennale</option>
        <option value="12">Quinquemestrielle</option>
        <option value="13">Hebdomadaire</option>
        <option value="14">Biquadrimestrielle</option>
        <option value="15">Spéciale/Supplémentaire</option>
        <option value="16">autre</option>
    </select>
    <input type="text" id="acronyme" name="acronyme" value="JSHJZ">
    <input type="text" id="lien" name="lien">
    <select id="rang2" name="rang2">
        <option value="" disabled selected></option>
        <option value="1">A*</option>
        <option value="2" selected>A</option>
        <option value="3">B</option>
        <option value="4">C</option>
    </select>
    <select id="rang3" name="rang3">
        <option value="" disabled selected></option>
        <option value="1" selected>Q1</option>
        <option value="2">Q2</option>
        <option value="3">Q3</option>
        <option value="4">Q4</option>
    </select>
    <select id="rang4" name="rang4">
        <option value="" disabled selected></option>
        <option value="1" selected>A1</option>
        <option value="2">A2</option>
        <option value="3">B1</option>
        <option value="4">B2</option>
        <option value="5">B3</option>
        <option value="6">B4</option>
        <option value="7">B5</option>
        <option value="8">C</option>
    </select>
    <select id="rang5" name="rang5">
        <option value="" disabled selected></option>
        <option value="1" selected>A</option>
        <option value="2">B</option>
        <option value="3">Autre</option>
    </select>
    `;

    // Supprimer le bouton Suivant s'il existe
    var suivantButton = document.querySelector('.suivant-button');
    if (suivantButton) {
        suivantButton.parentNode.removeChild(suivantButton);
    }

    // Garder le bouton "Appliquer" à sa place
    var appliquerButton = document.querySelector('.Appliquer-button');
    var pubContent = document.querySelector('.pub');
    pubContent.appendChild(appliquerButton);
}



///ta3 dynamique 
// infos.js

document.addEventListener('DOMContentLoaded', () => {
    // Utilisez fetch pour récupérer les données depuis le backend
    fetch('URL_DE_VOTRE_API')
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les éléments HTML avec les données reçues
            document.getElementById('titre').value = data.titre;
            document.getElementById('annee').value = data.annee;
            document.getElementById('acronyme').value = data.acronyme;
            document.getElementById('lien').value = data.lien;
            document.getElementById('rang2').value = data.rang;
            document.getElementById('volume').value = data.volume;
            document.getElementById('prolongements').value = data.prolongements;
            document.getElementById('conf-journal').value = data.confJournal;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
});

// mess a affiche apres modification
function showPopup() {
    var popup = document.getElementById('popup');

    // Créer un overlay pour capturer les clics en dehors du popup
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Ajouter un événement de clic à l'overlay pour fermer le popup
    overlay.addEventListener('click', function () {
        // Masquer le popup
        popup.classList.remove('active');

        // Supprimer l'overlay
        document.body.removeChild(overlay);
    });
    // Afficher le popup
    popup.classList.add('active');
}


//ki ykliqui modifer ttbdl sfha ta3 pub
function redirectToSecondPage() {
    window.location.href = "../html/modifierpubliactionapresclique.html"; // Redirection vers la deuxième page
}

// Ajouter un gestionnaire d'événement au clic sur le bouton "Modifier"
const modifierButton = document.getElementById("modifier-button");
modifierButton.addEventListener("click", redirectToSecondPage);

//ki ykliqui modifer ttbdl sfha ta3 projet
function redirectTomodiferPage() {
    window.location.href = "../html/modifierprojetapresclique.html"; // Redirection vers la deuxième page
}

// Ajouter un gestionnaire d'événement au clic sur le bouton "Modifier"
const mmodifierButton = document.getElementById("modifier-button");
mmodifierButton.addEventListener("click", redirectTomodiferPage);

//ki ykliqui modifer ttbdl sfha ta3 encadrement
function redirectTommodiferPage() {
    window.location.href = "../html/modifierencadrementapresclique.html"; // Redirection vers la deuxième page
}

// Ajouter un gestionnaire d'événement au clic sur le bouton "Modifier"
const mmmodifierButton = document.getElementById("modifier-button");
mmmodifierButton.addEventListener("click", redirectTommodiferPage);


//pour le retour a la page precedente 
function goBack() {
    window.history.back(); // Utilisation de l'historique de navigation pour revenir en arrière
}



/*******redirection ta3 ki ykliqui 3la les lien cliquer ici****/
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les liens avec la classe "redirect-link"
    const redirectLinks = document.querySelectorAll('.redirect-link');

    // Ajouter un écouteur d'événement click à chaque lien
    redirectLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Empêcher le comportement par défaut du lien (redirection)
            event.preventDefault();

            // Obtenir l'URL de redirection à partir de l'attribut href du lien
            const redirectUrl = link.getAttribute('href');

            // Rediriger l'utilisateur vers l'URL
            window.location.href = redirectUrl;
        });
    });
});


/************************************* */
//pour naviguer d'un profil a un autre 
// Fonction pour naviguer vers le profil précédent
function goToPreviousProfile() {
    // Obtenir tous les profils disponibles
    const profiles = document.querySelectorAll('.left');

    // Trouver le profil actuellement affiché
    let currentProfile;
    profiles.forEach(profile => {
        if (!profile.classList.contains('hidden')) {
            currentProfile = profile;
        }
    });

    // Masquer le profil actuel
    currentProfile.classList.add('hidden');

    // Trouver le profil précédent
    let previousProfile;
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i] === currentProfile) {
            previousProfile = profiles[i === 0 ? profiles.length - 1 : i - 1];
            break;
        }
    }

    // Afficher le profil précédent
    previousProfile.classList.remove('hidden');
}

// Fonction pour naviguer vers le profil suivant
function goToNextProfile() {
    // Obtenir tous les profils disponibles
    const profiles = document.querySelectorAll('.left');

    // Trouver le profil actuellement affiché
    let currentProfile;
    profiles.forEach(profile => {
        if (!profile.classList.contains('hidden')) {
            currentProfile = profile;
        }
    });

    // Masquer le profil actuel
    currentProfile.classList.add('hidden');

    // Trouver le profil suivant
    let nextProfile;
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i] === currentProfile) {
            nextProfile = profiles[i === profiles.length - 1 ? 0 : i + 1];
            break;
        }
    }

    // Afficher le profil suivant
    nextProfile.classList.remove('hidden');
}

// Ajouter des événements de clic aux boutons de navigation
document.querySelector('.left-scroll').addEventListener('click', goToPreviousProfile);
document.querySelector('.right-scroll').addEventListener('click', goToNextProfile);


/**************************** */