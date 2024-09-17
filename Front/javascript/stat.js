

document.addEventListener('DOMContentLoaded', function () {
    // Générer un nombre aléatoire de chercheurs entre 1 et 100
    var nombreChercheurs = Math.floor(Math.random() * 100) + 1;

    // Sélection de l'élément contenant le nombre de chercheurs
    var nombreChercheursSpan = document.querySelector('.nombre-chercheurs');

    // Afficher le nombre de chercheurs
    nombreChercheursSpan.textContent = nombreChercheurs;
});




//daira nisbita ta3 critere1 : chercheur, grade recherche

//de valeur a cote de stat numerique de grade de recherche 
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les paragraphes <p> contenant <span class="value">
    var paragraphs = document.querySelectorAll('.left-cont-stati2 p');

    // Parcourir chaque paragraphe
    paragraphs.forEach(function (paragraph) {
        // Récupérer le span de valeur à l'intérieur du paragraphe
        var valueSpan = paragraph.querySelector('.value');
        if (!valueSpan) return; // S'il n'y a pas de span avec la classe "value", passer au suivant

        // Récupérer la valeur numérique à partir du contenu du <span class="value">
        var value = parseInt(valueSpan.textContent);

        // Créer un nouvel élément <span> pour afficher la valeur à côté du paragraphe
        var numberSpan = document.createElement('span');
        numberSpan.textContent = value;

        // Créer un espace (texte) avec une marge à droite pour séparer le nombre du texte du paragraphe
        var space = document.createTextNode(' ');
        space.style.marginRight = '0.5rem'; // Ajuster la marge droite selon vos besoins

        // Insérer le nombre après le <span class="value">
        paragraph.insertBefore(numberSpan, valueSpan.nextSibling);

        // Insérer l'espace avec la marge après le nombre
        paragraph.insertBefore(space, numberSpan.nextSibling);

        // Supprimer le span original avec la classe "value" (pour éviter la duplication)
        paragraph.removeChild(valueSpan);
    });
});

//daira nisbita ta3 critere1 : chercheur, etablissement


//daira nisbita ta3 critere1 : chercheur, sexe


//daira nisiba ta3 criter1=enc , critere 2= encadre par 
document.addEventListener('DOMContentLoaded', function () {
    var data = {
        labels: ['Encadreur', 'Co-encadreur'],
        datasets: [{
            data: [50, 50], // 50% pour 'Femme', 50% pour 'Homme'
            backgroundColor: ['#DDACF5', '#75E8E7'] // Couleurs correspondantes pour 'Femme' et 'Homme'
        }]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        plugins: {
            legend: {
                display: false
            }
        },
        cutoutPercentage: 70,
        elements: {
            arc: {
                borderRadius: 10
            }
        }
    };

    var ctx = document.getElementById('recherchechart6').getContext('2d');
    var rechercheChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

    // Mettre à jour les légendes avec les pourcentages
    var legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(function (item, index) {
        var label = item.querySelector('.legend-label');
        var colorCircle = item.querySelector('.legend-circle');
        var percentage = data.datasets[0].data[index];

        // Ajouter la couleur à gauche du label
        colorCircle.style.float = 'left';
        colorCircle.style.marginRight = '25px';

        // Mettre à jour le texte du label avec le pourcentage
        label.innerHTML = '<span style="color: black;">' + label.textContent + '</span>';
        label.innerHTML += '<span style="margin-left: 80px; color: black;">' + percentage + '%</span>';
    });
});

//diagramme de criter 01 = projet
document.addEventListener('DOMContentLoaded', function () {
    // Données du diagramme en colonnes
    var equipeLabels = ['équipe 1', 'équipe 2', 'équipe 3', 'équipe 4', 'équipe 5', 'équipe 6'];
    var nombreProjets = [10, 15, 8, 20, 7, 13]; // Nombre de projets par équipe

    var equipeData = {
        labels: equipeLabels,
        datasets: [{
            label: '',
            data: nombreProjets,
            backgroundColor: ['#95A4FC', '#75E8E7', '#DBD5D5', '#DDACF5', '#A8C5DA', '#365486'] // Couleurs par équipe
        }]
    };

    var equipeOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                }
            }
        },
        plugins: {
            legend: {
                display: false // Masquer la légende
            }
        }
    };

    var equipeCtx = document.getElementById('column3-chart').getContext('2d');
    var equipeChart = new Chart(equipeCtx, {
        type: 'bar',
        data: equipeData,
        options: equipeOptions
    });
});

//cercle de crite1= projet
document.addEventListener('DOMContentLoaded', function () {
    // Données du diagramme en cercle
    var chercheurData = {
        labels: ['Chef d\'équipe', 'Membre'],
        datasets: [{
            data: [50, 50], // 50% pour 'Chef d'équipe', 50% pour 'Membre'
            backgroundColor: ['#DDACF5', '#75E8E7'] // Couleurs correspondantes
        }]
    };

    var chercheurOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        plugins: {
            legend: {
                display: false
            }
        },
        cutoutPercentage: 70,
        elements: {
            arc: {
                borderRadius: 10
            }
        }
    };

    var chercheurCtx = document.getElementById('recherchechart5').getContext('2d');
    var chercheurChart = new Chart(chercheurCtx, {
        type: 'doughnut',
        data: chercheurData,
        options: chercheurOptions
    });
});

document.addEventListener('DOMContentLoaded', function () {
    
    var nombreProjet = Math.floor(Math.random() * 100) + 1;

    var nombreProjetSpan = document.querySelector('.nombre-Projets');

    if (nombreProjetSpan) {
        nombreProjetSpan.textContent = nombreProjet;
        nombreProjetSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});






document.addEventListener('DOMContentLoaded', function () {
    var nombrePublications = Math.floor(Math.random() * 100) + 1;
    var nombrePublicationsSpan = document.querySelector('.nombre-publications');
    if (nombrePublicationsSpan) {
        nombrePublicationsSpan.textContent = nombrePublications;
        nombrePublicationsSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var nombreEncadrement = Math.floor(Math.random() * 100) + 1;
    var nombreEncadrementSpan = document.querySelector('.nombre-encadrements');
    if (nombreEncadrementSpan) {
        nombreEncadrementSpan.textContent = nombreEncadrement;
        nombreEncadrementSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});






document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les liens avec la classe 'lien-plus-cite'
    var liensPlusCite = document.querySelectorAll('.lien-plus-cite');
    liensPlusCite.forEach(function (lien) {
        lien.addEventListener('click', function (event) {
            event.preventDefault(); // Empêcher le comportement par défaut du lien (redirection)

            // Rediriger l'utilisateur vers une autre page HTML
            window.location.href = 'voir publication.html';
        });
    });

    // Sélectionner tous les liens avec la classe 'lien-plus-recent'
    var liensPlusRecent = document.querySelectorAll('.lien-plus-recent');
    liensPlusRecent.forEach(function (lien) {
        lien.addEventListener('click', function (event) {
            event.preventDefault(); // Empêcher le comportement par défaut du lien (redirection)

            // Rediriger l'utilisateur vers une autre page HTML
            window.location.href = 'voir publication.html';
        });
    });
});

/**************************************************************************************** */

//choix des criteres 
document.addEventListener('DOMContentLoaded', function () {
    // Sélection du premier critère
    const critere1Select = document.getElementById('critere1');

    // Sélection du deuxième critère
    const critere2Select = document.getElementById('critere2');

    // Options spécifiques pour le critère "Chercheur" dans le deuxième critère
    const chercheurOptions = ['sexe', 'grade', 'role', 'etablissement', 'diplome'];

    // Options spécifiques pour le critère "Publication" dans le deuxième critère
    const publicationOptions = ['type'];

    // Options spécifiques pour le critère "Encadrement" dans le deuxième critère
    const encadrementOptions = ['type'];

    // Options spécifiques pour le critère "Projet" dans le deuxième critère
    const projetOptions = ['chef projet'];

    // Ajouter une option placeholder "Critère 02 :" au chargement de la page
    const placeholderOption = new Option('Critère 02 :', '');
    placeholderOption.disabled = true;
    critere2Select.appendChild(placeholderOption);

    const datesInputs = document.querySelectorAll('.dates input');
    datesInputs.forEach(input => {
        input.disabled = false;
        input.classList.remove('disabled-input');
    });

    function updateCritere2Options() {
        // Récupérer la valeur sélectionnée dans le premier critère
        const critere1Value = critere1Select.value;

        // Ajouter le placeholder au critère 2
        critere2Select.appendChild(placeholderOption);


        // Activer les éléments de la classe 'dates' par défaut
        const datesInputs = document.querySelectorAll('.dates input');

        datesInputs.forEach(input => {
            input.disabled = false; // Activer les input
            input.classList.remove('disabled-input'); // Retirer la classe de style
        });

        // Effacer les options existantes du critère 2 sauf le placeholder
        critere2Select.querySelectorAll('option:not(:first-child)').forEach(option => option.remove());

        // Ajouter les options spécifiques en fonction de la valeur sélectionnée dans le premier critère
        switch (critere1Value) {
            case 'option1': // Chercheur
                addOptionsToCritere2(chercheurOptions);
                // Désactiver les éléments de la classe 'dates' si critère 1 = Chercheur
                datesInputs.forEach(input => {
                    input.disabled = true; // Désactiver les input
                    input.classList.add('disabled-input'); // Ajouter la classe de style
                });
                break;
            case 'option2':
                addOptionsToCritere2(publicationOptions);
                break;
            case 'option3':
                addOptionsToCritere2(encadrementOptions);
                break;
            
            default:
                // Aucune option spécifique sélectionnée
                critere2Select.disabled = true;
                break;
        }

        // Activer le deuxième critère une fois les options mises à jour
        critere2Select.disabled = (critere1Value === '');
        critere2Select.classList.toggle('disabled-select', critere1Value === '');

        // Désactiver les éléments de la classe 'dates' si le deuxième critère est désactivé
        if (critere2Select.disabled) {
            datesInputs.forEach(input => {
                input.disabled = true; // Désactiver les input
                input.classList.add('disabled-input'); // Ajouter la classe de style
            });
        }

        // Vérifier si le champ doit être remplacé par un champ texte (input)
        const selectedOption = critere2Select.value;
        const requiresTextInput = selectedOption === 'encadré par' || selectedOption === 'écrit par' || selectedOption === 'chef projet';

        // Remplacer le critère 2 par un champ texte si nécessaire
        if (requiresTextInput) {
            replaceSelectWithInput();
        }
    }

    // Fonction pour ajouter des options au critère 2 à partir d'un tableau d'options
    function addOptionsToCritere2(optionsArray) {
        optionsArray.forEach(optionValue => {
            const optionText = getOptionText(optionValue);
            const option = new Option(optionText, optionValue);
            critere2Select.appendChild(option);
        });
    }

    // Fonction pour obtenir le texte d'une option à partir de sa valeur
    function getOptionText(optionValue) {
        switch (optionValue) {
            case 'sexe':
                return 'Sexe';
            case 'grade':
                return 'Grade';
            case 'role':
                return 'Rôle';
            case 'etablissement':
                return 'Établissement';
            case 'diplome':
                return 'Diplôme';
            case 'type':
                return 'Type';
            
          
            default:
                return ''; // Retourner une chaîne vide par défaut
        }
    }

    // Écouteur d'événement pour le changement dans le premier critère
    critere1Select.addEventListener('change', function () {
        updateCritere2Options(); // Met à jour les options du critère 2
        restoreSelect(); // Rétablit le critère 2 en tant que select si nécessaire
    });



});


/********************************************************************************************** */
document.addEventListener('DOMContentLoaded', function () {
    var validerButton = document.querySelector('.valider-button');
    const anneeDebutInput = document.getElementById('anneeDebut');
    const anneeFinInput = document.getElementById('anneeFin');


    validerButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du bouton
        
        var critere1 = document.getElementById('critere1').value;
        var critere2 = document.getElementById('critere2');
        var critere2Value = critere2.value;
        var critere2Type = critere2.tagName.toLowerCase();
        var anneeDebut = document.getElementById('anneeDebut').value.trim();
        var anneeFin = document.getElementById('anneeFin').value.trim();

        var isValid = true;
        var errorMessage = '';
        // Fonction pour valider si une année est dans la plage spécifiée (1900-2100)
        function validateYear(year) {
            const parsedYear = parseInt(year);
            return !isNaN(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100;
        }

        // Valider critere1
        if (critere1 === '') {
            errorMessage = 'Veuillez sélectionner une option.';
            isValid = false;
        }

        // Valider critere2 selon le type
        if ((critere1 === 'option2' || critere1 === 'option3' || critere1 === 'option4')) {
            if (critere2Type === 'input' && critere2Value === '') {
                errorMessage = 'Veuillez remplir le champ nécessaire.';
                isValid = false;
            } else if (critere2Type === 'input' && !isValidName(critere2Value)) {
                errorMessage = 'Le champ ne doit contenir que des lettres.';
                isValid = false;
            } else if (critere2Type === 'select' && critere2Value === '') {
                errorMessage = 'Veuillez sélectionner une option.';
                isValid = false;
            }
        }

        if ((critere1 === 'option2' || critere1 === 'option3' || critere1 === 'option4') && (anneeDebut === '' || anneeFin === '')) {
            errorMessage = 'Veuillez remplir les dates de début et de fin.';
            isValid = false;
        } else {
            // Valider les années si elles sont fournies
            if (anneeDebut !== '' && !validateYear(anneeDebut)) {
                errorMessage = 'L\'année de début doit être comprise entre 1900 et 2100.';
                isValid = false;
            }
            if (anneeFin !== '' && !validateYear(anneeFin)) {
                errorMessage = 'L\'année de fin doit être comprise entre 1900 et 2100.';
                isValid = false;
            }
        }


        // Valider critere2 pour l'option 1
        if (critere1 === 'option1' && critere2Type === 'select' && critere2Value === '') {
            errorMessage = 'Veuillez sélectionner une option.';
            isValid = false;
        }


        if (isValid) {
            switch (critere1) {
                case 'option1':
                    redirectToURL('chercheur', encodeURIComponent(critere2Value));
                    break;
                case 'option2':
                    if (critere2Value === 'type') {
                        redirectToURL('publication', encodeURIComponent(critere2Value));
                    } else {
                        redirectToURL('publication', 'écrit-par');
                    }
                    break;
                case 'option3':
                    if (critere2Value === 'type') {
                        redirectToURL('encadrement', encodeURIComponent(critere2Value));
                    } else {
                        redirectToURL('encadrement', 'encadré-par');
                    }
                    break;
               
                default:
                    break;
            }
            // Réinitialiser les champs du formulaire après redirection confirmée
            resetFormFields();
        } else {
            // Afficher l'erreur dans le conteneur approprié
            displayErrorMessage(errorMessage);
        }
    });


    function displayErrorMessage(message) {
        var errorContainer = document.getElementById('errorContainer');
        errorContainer.textContent = message;
        errorContainer.style.color = 'red';
        errorContainer.style.fontSize = '75%';
    }


    /*
    function redirectToURL(critere1Type, critere2Value, researcherName) {
        var url;
    
        if (critere2Value) {
            url = 'critere1=' + critere1Type + ',' + critere2Value + '.html';
        } else {
            url = 'critere1=' + critere1Type + '.html';
        }
    
        // Append chercheur's name if available and critere2 is 'encadré par'
        if (critere1Type === 'encadrement' && critere2Value === 'encadré par' && researcherName) {
            url += '&chercheur=' + encodeURIComponent(researcherName);
        }
    
        // Append start and end dates
        url += '?anneeDebut=' + document.getElementById('anneeDebut').value;
        url += '&anneeFin=' + document.getElementById('anneeFin').value;
    
        window.location.href = url;
    }*/

    function redirectToURL(critere1Type, critere2Value, researcherName) {
        var url;

        if (critere2Value) {
            url = 'critere1=' + critere1Type + ',' + critere2Value + '.html';
        } else {
            url = 'critere1=' + critere1Type + '.html';
        }

        // Append chercheur's name if available and critere2 is 'encadré par'
        if (critere1Type === 'encadrement' && critere2Value === 'encadré par') {
            // Check if researcherName is not empty or null
            if (researcherName && researcherName.trim() !== '') {
                url += '&chercheur=' + encodeURIComponent(researcherName);
            }
        }

        // Append start and end dates
        url += '?anneeDebut=' + document.getElementById('anneeDebut').value;
        url += '&anneeFin=' + document.getElementById('anneeFin').value;

        window.location.href = url;
    }




    function isValidName(name) {
        // Expression régulière pour vérifier si le nom ne contient que des lettres
        return /^[a-zA-Z]+$/.test(name);
    }

    // Appel initial pour remplacer le select par un input si nécessaire au chargement de la page
    replaceSelectWithInput();
    
    function resetFormFields() {
        // Réinitialiser les champs du formulaire
        document.getElementById('critere1').value = '';
        document.getElementById('critere2').value = '';
        document.getElementById('anneeDebut').value = '';
        document.getElementById('anneeFin').value = '';
    }

});






function resetFormFields() {
    // Réinitialiser les champs input
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
        input.value = ''; // Réinitialiser la valeur de l'input à une chaîne vide
    });

    // Réinitialiser les champs select
    const selectFields = document.querySelectorAll('select');
    selectFields.forEach(select => {
        select.selectedIndex = 0; // Sélectionner le premier élément (option par défaut)
    });
}

function goBackAndResetForm() {
    resetFormFields();
    // Utilisation de l'historique de navigation pour revenir en arrière
    window.history.back();
}

// Fonction pour remplacer le select par un input si l'option est "encadré par" ou "écrit par"
function replaceSelectWithInput() {
    const critere2Select = document.getElementById('critere2');
    const selectedOption = critere2Select.value;

    if (selectedOption === 'écrit par' || selectedOption === 'encadré par' ) {
        // Création de l'input avec des styles copiés du select
        const critere2Input = document.createElement('input');
        critere2Input.type = 'text';
        critere2Input.id = 'critere2';
        critere2Input.placeholder = 'Entrez un nom...';
        critere2Input.style.width = '40%'; // Pour que l'input prenne tout l'espace restant
        critere2Input.style.backgroundColor = '#36538614'; // Par exemple, fixez la background color à gris clair
        critere2Input.style.marginBottom = '18px'; // Ajouter une marge en bas

        // Copie des styles du select vers l'input
        const computedStyles = window.getComputedStyle(critere2Select);
        critere2Input.style.font = computedStyles.font;
        critere2Input.style.fontSize = computedStyles.fontSize;
        critere2Input.style.padding = computedStyles.padding;
        critere2Input.style.outline = computedStyles.outline;

        // Supprimer la flèche de sélection du select sur l'input
        critere2Input.style.appearance = 'none';
        critere2Input.style.backgroundImage = 'none';

        // Remplacement du select par l'input
        critere2Select.parentNode.replaceChild(critere2Input, critere2Select);

        // Ajout d'un écouteur d'événement pour détecter les changements dans le nouvel input
        critere2Input.addEventListener('input', function (event) {
            console.log('Valeur entrée :', critere2Input.value);
        });
    }
}

// Fonction pour restaurer le critère 2 en tant que select avec des options spécifiques
function restoreSelect() {
    const critere2Input = document.getElementById('critere2');
    if (critere2Input && critere2Input.tagName === 'INPUT') {
        const critere2SelectNew = document.createElement('select');
        critere2SelectNew.id = 'critere2';
        critere2SelectNew.className = critere2Input.className; // Copier les classes CSS du select initial

        // Ajouter les options spécifiques en fonction du critère 1 sélectionné
        const critere1Select = document.getElementById('critere1');
        updateCritere2Options(critere1Select.value, critere2SelectNew);

        // Remplacement de l'input par le nouveau select
        critere2Input.parentNode.replaceChild(critere2SelectNew, critere2Input);

        // Écouteur d'événement pour détecter les changements dans critere1Select
        critere1Select.addEventListener('change', function () {
            updateCritere2Options(critere1Select.value, critere2SelectNew);
        });
    }
}


// Fonction pour mettre à jour les options du critère 2 en fonction de la valeur du critère 1
function updateCritere2Options(critere1Value, critere2Select) {
    // Effacer les options actuelles du critère 2
    critere2Select.innerHTML = '';

    // Ajouter le placeholder au début
    const placeholderText = 'Critère 02 :';
    const placeholderOption = new Option(placeholderText, '');
    placeholderOption.disabled = true;
    placeholderOption.hidden = true;
    critere2Select.appendChild(placeholderOption);

    // Définir les options spécifiques en fonction de critere1Value
    let optionsArray = [];

    // Ajouter le placeholder au critère 2
    critere2Select.appendChild(placeholderOption);

    switch (critere1Value) {
        case 'option1': // Chercheur
            optionsArray = ['sexe', 'grade', 'role', 'etablissement', 'diplome'];
            break;
        case 'option2': // Publication
            optionsArray = ['type'];
            break;
        case 'option3': // Encadrement
            optionsArray = ['type'];
            break;
       
        default:
            // Aucune option spécifique sélectionnée
            critere2Select.disabled = true;
            return;
    }
    // Vérifier si le champ doit être remplacé par un champ texte (input)
    const selectedOption = critere2Select.value;
    const requiresTextInput = selectedOption === 'encadré par' || selectedOption === 'écrit par' || selectedOption === 'chef projet';

    // Remplacer le critère 2 par un champ texte si nécessaire
    if (requiresTextInput) {
        replaceSelectWithInput();
    }
    // Ajouter les nouvelles options au critère 2
    optionsArray.forEach(optionValue => {
        const optionText = getOptionText(optionValue);
        const option = new Option(optionText, optionValue);
        critere2Select.appendChild(option);
    });

    // Activer le critère 2 une fois les options mises à jour
    critere2Select.disabled = false;
    // Sélectionner le placeholder par défaut
    placeholderOption.selected = true;
}

// Fonction pour obtenir le texte d'une option à partir de sa valeur
function getOptionText(optionValue) {
    switch (optionValue) {
        case 'sexe':
            return 'Sexe';
        case 'grade':
            return 'Grade';
        case 'role':
            return 'Rôle';
        case 'etablissement':
            return 'Établissement';
        case 'diplome':
            return 'Diplôme';
        case 'type':
            return 'Type';
        
       

        default:
            return ''; // Retourner une chaîne vide par défaut
    }
}

// Appel initial pour restaurer le critère 2 au chargement de la page
restoreSelect();


// Écouteur d'événement pour le changement dans le critère 2 initial
const critere2Select = document.getElementById('critere2');
critere2Select.addEventListener('change', replaceSelectWithInput);

// Appel initial pour mettre en place le comportement initial du critère 2
replaceSelectWithInput();

//verification des deux input annee 
document.addEventListener('DOMContentLoaded', function () {
    const anneeDebutInput = document.getElementById('anneeDebut');
    const anneeFinInput = document.getElementById('anneeFin');
    const errorContainer = document.getElementById('errorContainer');

    // Fonction de validation de la plage d'années
    function validateYearRange() {
        const anneeDebut = parseInt(anneeDebutInput.value);
        const anneeFin = parseInt(anneeFinInput.value);

        // Vérifier si les valeurs sont des nombres et si elles sont dans la plage spécifiée (1900 à 2100)
        const isAnneeDebutValid = !isNaN(anneeDebut) && anneeDebut >= 1900 && anneeDebut <= 2100;
        const isAnneeFinValid = !isNaN(anneeFin) && anneeFin >= 1900 && anneeFin <= 2100;

        if (!isAnneeDebutValid || !isAnneeFinValid) {
            errorContainer.textContent = 'Veuillez entrer des années comprises entre 1900 et 2100.';
            errorContainer.style.color = 'red';
            errorContainer.style.fontSize = '75%';
        } else if (anneeDebut > anneeFin) {
            errorContainer.textContent = 'L\'année de début doit être inférieure ou égale à l\'année de fin.';
            errorContainer.style.color = 'red';
            errorContainer.style.fontSize = '75%';
        } else {
            // Aucune erreur, effacer le message d'erreur
            errorContainer.textContent = '';
        }
    }

    // Écouteur d'événement pour l'entrée dans le champ anneeDebut
    anneeDebutInput.addEventListener('input', validateYearRange);

    // Écouteur d'événement pour l'entrée dans le champ anneeFin
    anneeFinInput.addEventListener('input', validateYearRange);
});


function fetchStatistics() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/get_statistics/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            updateStatistics(data);
        }
    };

    var params = {
        critere1: 'chercheur',
        critere2: 'diplome' // Change this to the desired criteria
    };

    xhr.send(JSON.stringify(params));
}

function updateStatistics(data) {
    // Update total researchers
    document.querySelector('.nombre-chercheurs').innerText = data.total_researchers;

    // Update distribution
    var distribution = data.distribution;
    for (var key in distribution) {
        var value = distribution[key];
        document.querySelector('.' + key.toLowerCase()).innerText = value;
    }

    // Update top researchers
    var topResearchers = data.top_researchers;
    var topResearchersContainer = document.querySelector('.left-cont-stati5');
    topResearchersContainer.innerHTML = '';
    topResearchers.forEach(function (researcher) {
        for (var key in researcher) {
            var value = researcher[key];
            var p = document.createElement('p');
            p.innerHTML = '<span class="label-color color1"></span><span class="value">' + value + '</span> ' + key;
            topResearchersContainer.appendChild(p);
        }
    });

    // Update diplomas
    var diplomas = data.diplomas;
    for (var key in diplomas) {
        var value = diplomas[key];
        document.querySelector('.diplome-' + key.toLowerCase()).innerText = value;
    }
}

// Call the function to fetch statistics when the page loads
window.onload = fetchStatistics;