document.addEventListener('DOMContentLoaded', function () {
    var colors = [
        '#95A4FC', // 95A4FC
        '#75E8E7', // 75E8E7
        '#DBD5D5', // DBD5D5
        '#DDACF5', // DDACF5
        '#A8C5DA', // A8C5DA
        '#365486'  // 365486
    ];

    // Récupération des étiquettes depuis la section Numériques
    var labels = Array.from(document.querySelectorAll('.left-cont-stati p')).map(function (element) {
        return element.textContent;
    });

    var gradeEnseignementOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false, // Supprime les labels de l'axe X
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Valeur' // libellé de l'axe des Y
                }
            }]
        },
        plugins: {
            legend: {
                display: false, // Supprime la légende
            },
            title: {
                display: false, // Supprime le titre
            }
        },
        barPercentage: 0.7 // Ajuste la largeur des colonnes (0.8 signifie 80% de la largeur disponible)
    };

    var gradeEnseignementCanvas = document.getElementById('column-chart');
    var gradeEnseignementContext = gradeEnseignementCanvas.getContext('2d');
    var gradeEnseignementChart = new Chart(gradeEnseignementContext, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Grade-enseignement des chercheurs',
                data: [30, 25, 30, 15, 40, 70], // Données initiales
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: gradeEnseignementOptions
    });

    // Fonction pour mettre à jour les valeurs avec les données du graphique
    function updateValues() {
        var dataValues = gradeEnseignementChart.data.datasets[0].data;
        labels.forEach(function (label, index) {
            var paragraph = document.querySelector('.left-cont-stati p:nth-child(' + (index + 1) + ')');
            var valueSpan = paragraph.querySelector('.value');
            if (valueSpan) {
                valueSpan.textContent = dataValues[index];
            }
        });
    }

    // Appel de la fonction pour mettre à jour les valeurs avec les données initiales
    updateValues();

    // Ajout d'un écouteur pour détecter les changements dans le graphique et mettre à jour les valeurs
    gradeEnseignementChart.options.animation.onComplete = function () {
        updateValues();
    };
});

document.addEventListener('DOMContentLoaded', function () {
    // Générer un nombre aléatoire de chercheurs entre 1 et 100
    var nombreChercheurs = Math.floor(Math.random() * 100) + 1;

    // Sélection de l'élément contenant le nombre de chercheurs
    var nombreChercheursSpan = document.querySelector('.nombre-chercheurs');

    // Afficher le nombre de chercheurs
    nombreChercheursSpan.textContent = nombreChercheurs;
});


document.addEventListener('DOMContentLoaded', function () {
    var colors = [
        '#C39EF3', // Couleur pour Enseignant-chercheur
        '#75E8E7', // Couleur pour Chercheur
        '#407BFF'  // Couleur pour Doctorant
    ];

    var membershipData = {
        labels: ['Enseignant-chercheur', 'Chercheur', 'Doctorant'],
        datasets: [{
            label: 'Distribution des chercheurs par qualité :',
            data: [40, 30, 20], // Exemple de données
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    };

    var membershipOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    var membershipCanvas = document.getElementById('membership-chart');
    var membershipContext = membershipCanvas.getContext('2d');
    var membershipChart = new Chart(membershipContext, {
        type: 'bar',
        data: membershipData,
        options: membershipOptions
    });

    // Diminuer la largeur des colonnes
    membershipChart.data.datasets.forEach((dataset) => {
        dataset.barPercentage = 0.5; // Réglage de la largeur des colonnes (50% de la largeur disponible)
    });

    membershipChart.update(); // Mettre à jour le graphique avec les nouvelles options
});

//daira nisbita ta3 critere1 : chercheur, grade recherche
document.addEventListener('DOMContentLoaded', function () {
    var data = {
        labels: ['Directeur de recherche', 'Maitre de recherche', 'Autre'],
        datasets: [{
            data: [50, 30, 20], // Pourcentages pour chaque partie (modifiables)
            backgroundColor: ['#DDACF5', '#75E8E7', '#95A4FC'] // Couleurs correspondantes
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

    var ctx = document.getElementById('recherchechart').getContext('2d');
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
        colorCircle.style.marginRight = '20px';

        // Mettre à jour le texte du label avec la couleur et le pourcentage
        label.innerHTML = '<span style="color: black;">' + label.textContent + '</span>';
        label.innerHTML += '<span style="margin-left: 80px; color: black;">' + percentage + '%</span>';
    });
});

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
document.addEventListener('DOMContentLoaded', function () {
    var data = {
        labels: ['ESI', 'USTHB', 'Autre'],
        datasets: [{
            data: [((22*100)/39).toFixed(2), (4*100/360).toFixed(2), (13*100/360).toFixed(2)], // Rounded to two decimal places/ Pourcentages pour chaque partie (modifiables)
            backgroundColor: ['#DDACF5', '#75E8E7', '#95A4FC'] // Couleurs correspondantes
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

    var ctx = document.getElementById('recherchechart2').getContext('2d');
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


        // Mettre à jour le texte du label avec la couleur et le pourcentage
        label.innerHTML = '<span style="color: black;">' + label.textContent + '</span>';
        label.innerHTML += '<span style="margin-left: 80px; color: black;">' + percentage + '%</span>';
    });
});

//daira nisbita ta3 critere1 : chercheur, sexe
document.addEventListener('DOMContentLoaded', function () {
    var data = {
        labels: ['Femme', 'Homme'],
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

    var ctx = document.getElementById('recherchechart3').getContext('2d');
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

//generer un nomre de projet aleatoirement 
document.addEventListener('DOMContentLoaded', function () {
    // Générer un nombre aléatoire de publications entre 1 et 100
    var nombreProjet = Math.floor(Math.random() * 100) + 1;

    // Sélection de l'élément contenant le nombre de publications
    var nombreProjetSpan = document.querySelector('.nombre-Projets');

    // Appliquer du style CSS pour ajouter une marge à droite à l'élément span
    if (nombreProjetSpan) {
        nombreProjetSpan.textContent = nombreProjet;
        nombreProjetSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});


//diagramme de colonne de cette page 



//value a cote de homme et femme 
/*document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les éléments <span class="value"> dans left-cont-stati2
    var values = document.querySelectorAll('.left-cont-stati2 .value');

    // Utiliser un ensemble (Set) pour stocker les nombres uniques
    var uniqueValues = new Set();

    // Récupérer les nombres uniques à partir des <span class="value">
    values.forEach(function (span) {
        uniqueValues.add(span.textContent);
    });

    // Sélectionner les paragraphes <p> dans left-cont-stati3
    var paragraphs = document.querySelectorAll('.left-cont-stati3 p');

    // Vérifier s'il y a le même nombre de valeurs uniques et de paragraphes
    if (uniqueValues.size === paragraphs.length) {
        // Parcourir chaque paragraphe et associer à chaque valeur unique
        var iterator = uniqueValues.values();
        for (var i = 0; i < paragraphs.length; i++) {
            // Récupérer la prochaine valeur unique
            var value = iterator.next().value;

            // Mettre à jour le texte du paragraphe avec la valeur unique
            paragraphs[i].innerHTML = '<span class="value">' + value + '</span> ' + paragraphs[i].textContent;
        }
    }
});
*/
document.addEventListener('DOMContentLoaded', function () {
    var colors = [
        '#95A4FC', // Couleur pour Licence
        '#75E8E7', // Couleur pour Doctorat
        '#DBD5D5', // Couleur pour Diplôme d'Études Supérieures
        '#DDACF5', // Couleur pour Diplôme de Formation Approfondie
        '#A8C5DA', // Couleur pour Diplôme d'Études Approfondies
        '#365486', // Couleur pour Master
        '#FFC600', // Couleur pour Ingéniorat
        '#FF5733'  // Couleur pour Autre
    ];

    // Récupération des étiquettes depuis la section diplômes
    var labels = Array.from(document.querySelectorAll('.left-cont-stati5 p')).map(function (element) {
        return element.textContent.trim(); // Récupère le texte sans espaces inutiles
    });

    // Options du graphique
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false // Masque l'axe X
            },
            y: {
                beginAtZero: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Valeur' // Libellé de l'axe Y
                }
            }
        },
        plugins: {
            legend: {
                display: false // Masque la légende
            },
            title: {
                display: false // Masque le titre
            }
        },
        barPercentage: 0.7 // Ajuste la largeur des colonnes
    };

    // Récupération du canvas pour le graphique
    var columnChartCanvas = document.getElementById('column2-chart');
    var columnChartContext = columnChartCanvas.getContext('2d');

    // Initialisation du graphique
    var columnChart = new Chart(columnChartContext, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Diplômes des chercheurs LMCS',
                data: [0, 14, 0, 0, 0, 14, 12, 0], // Données initiales (exemple)
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: chartOptions
    });

    // Fonction pour mettre à jour les valeurs avec les données du graphique
    function updateValues() {
        var dataValues = columnChart.data.datasets[0].data;
        labels.forEach(function (label, index) {
            var paragraph = document.querySelector('.left-cont-stati5 p:nth-child(' + (index + 1) + ')');
            var valueSpan = paragraph.querySelector('.value');
            if (valueSpan) {
                valueSpan.textContent = dataValues[index];
            }
        });
    }

    // Appel initial pour mettre à jour les valeurs
    updateValues();

    // Ajout d'un écouteur pour détecter les changements dans le graphique et mettre à jour les valeurs
    columnChart.options.animation.onComplete = function () {
        updateValues();
    };
});

//cercle de ctitere 1 =pub , critere 2 =type
document.addEventListener('DOMContentLoaded', function () {
    var data = {
        labels: ['Conférence', 'Journal'],
        datasets: [{
            data: [(272*100/360).toFixed(2), (107*100/360).toFixed(2)], // 50% pour 'Conférence', 50% pour 'Journal'
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

    var ctx = document.getElementById('recherchechart4').getContext('2d');
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
// Générer un nombre aléatoire de publications 

document.addEventListener('DOMContentLoaded', function () {
    // Générer un nombre aléatoire de publications entre 1 et 100
    var nombrePublications = Math.floor(Math.random() * 100) + 1;

    // Sélection de l'élément contenant le nombre de publications
    var nombrePublicationsSpan = document.querySelector('.nombre-publications');

    // Appliquer du style CSS pour ajouter une marge à droite à l'élément span
    if (nombrePublicationsSpan) {
        nombrePublicationsSpan.textContent = nombrePublications;
        nombrePublicationsSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});




//value a cote de conference et journal 

// Générer un nombre aléatoire de encadrements 

document.addEventListener('DOMContentLoaded', function () {
    // Générer un nombre aléatoire de publications entre 1 et 100
    var nombreEncadrement = Math.floor(Math.random() * 100) + 1;

    // Sélection de l'élément contenant le nombre de publications
    var nombreEncadrementSpan = document.querySelector('.nombre-encadrements');

    // Appliquer du style CSS pour ajouter une marge à droite à l'élément span
    if (nombreEncadrementSpan) {
        nombreEncadrementSpan.textContent = nombreEncadrement;
        nombreEncadrementSpan.style.marginRight = '5px'; // Ajoute une marge de 5 pixels à droite du texte
    }
});

// Fonction pour configurer le diagramme à colonnes (bar chart)
document.addEventListener('DOMContentLoaded', function () {
    var colors = [
        '#95A4FC', // 95A4FC
        '#75E8E7', // 75E8E7
        '#DBD5D5', // DBD5D5
        '#DDACF5', // DDACF5

    ];

    // Récupération des étiquettes depuis la section Numériques
    var labels = Array.from(document.querySelectorAll('.left-cont-stati6 p')).map(function (element) {
        return element.textContent;
    });

    var gradeEnseignementOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false, // Supprime les labels de l'axe X
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Valeur' // libellé de l'axe des Y
                }
            }]
        },
        plugins: {
            legend: {
                display: false, // Supprime la légende
            },
            title: {
                display: false, // Supprime le titre
            }
        },
        barPercentage: 0.6 // Ajuste la largeur des colonnes (0.8 signifie 80% de la largeur disponible)
    };

    var gradeEnseignementCanvas = document.getElementById('column4-chart');
    var gradeEnseignementContext = gradeEnseignementCanvas.getContext('2d');
    var gradeEnseignementChart = new Chart(gradeEnseignementContext, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Grade des chercheurs',
                data: [14, 14, 12,0], // Données initiales
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: gradeEnseignementOptions
    });

    // Fonction pour mettre à jour les valeurs avec les données du graphique
    function updateValues() {
        var dataValues = gradeChart.data.datasets[0].data;
        labels.forEach(function (label, index) {
            var paragraph = document.querySelector('.left-cont-stati6 p:nth-child(' + (index + 1) + ')');
            var valueSpan = paragraph.querySelector('.value');
            if (valueSpan) {
                valueSpan.textContent = dataValues[index];
            }
        });
    }

    // Appel de la fonction pour mettre à jour les valeurs avec les données initiales
    updateValues();

    // Ajout d'un écouteur pour détecter les changements dans le graphique et mettre à jour les valeurs
    gradeChart.options.animation.onComplete = function () {
        updateValues();
    };
});

// Fonction pour configurer le diagramme à secteurs (doughnut chart) pour le rôle des chercheurs dans les encadrements
document.addEventListener('DOMContentLoaded', function () {
    var colors = [
        '#C39EF3', // Couleur pour Encadreur
        '#75E8E7', // Couleur pour Co-encadreur
    ];

    var membershipData = {
        labels: ['Encadreur', 'Co-encadreur'],
        datasets: [{
            label: 'Role des chercheurs LMCS dans les encadrements depuis 2019',
            data: [40, 30], // Exemple de données
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    };

    var membershipOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false
            },
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    var membershipCanvas = document.getElementById('membership2-chart');
    var membershipContext = membershipCanvas.getContext('2d');
    var membershipChart = new Chart(membershipContext, {
        type: 'bar',
        data: membershipData,
        options: membershipOptions
    });

    // Diminuer la largeur des colonnes
    membershipChart.data.datasets.forEach((dataset) => {
        dataset.barPercentage = 0.5; // Réglage de la largeur des colonnes (50% de la largeur disponible)
    });

    membershipChart.update(); // Mettre à jour le graphique avec les nouvelles options
});


//pour aller sur une autre page si click sur clicker ici pour la page de statique critere 02= ecrit par 
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
    const publicationOptions = ['type', 'écrit par'];

    // Options spécifiques pour le critère "Encadrement" dans le deuxième critère
    const encadrementOptions = ['type', 'encadré par'];

    // Options spécifiques pour le critère "Projet" dans le deuxième critère
    const projetOptions = [ 'chef projet'];

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
            case 'option4':
                addOptionsToCritere2(projetOptions);
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
        const requiresTextInput = selectedOption === 'encadré par' || selectedOption === 'écrit par';

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
            case 'écrit par':
                return 'Écrit par';
            case 'encadré par':
                return 'Éncadré par';
            case 'chef projet':
                return 'Chef de projet';
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

    validerButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du bouton

        var critere1 = document.getElementById('critere1').value;
        var critere2 = document.getElementById('critere2');
        var critere2Value = critere2.value;
        var critere2Type = critere2.tagName.toLowerCase();
        var anneeDebut = document.getElementById('anneeDebut').value;
        var anneeFin = document.getElementById('anneeFin').value;

        var isValid = true;
        var errorMessage = '';

        if (critere1 === '' ) {
            errorMessage = 'Veuillez sélectionner une option.';
            isValid = false;
        }

        if ((critere1 === 'option2' || critere1 === 'option3') && critere2Type === 'input' && critere2Value.trim() === '') {
            errorMessage = 'Veuillez remplir le champ nécessaire.';
            isValid = false;
        }

        if ((critere1 === 'option2' || critere1 === 'option3' || critere1 === 'option4') && critere2Type === 'select' && critere2Value.trim() === '') {
            errorMessage = 'Veuillez sélectionner une option.';
            isValid = false;
        }

        if ((critere1 === 'option2' || critere1 === 'option3' || critere1 === 'option4') && (anneeDebut === '' || anneeFin === '')) {
            errorMessage = 'Veuillez remplir les dates de début et de fin.';
            isValid = false;
        }

        if ((critere1 === 'option1') && critere2Type === 'select' && critere2Value.trim() === '') {
            errorMessage = 'Veuillez sélectionner une option.';
            isValid = false;
        }

        // Ajouter une validation pour le champ critere2Value (nom seulement)
        if (isValid && critere2Type === 'input') {
            if (!isValidName(critere2Value)) {
                errorMessage = 'Le champ doit contenir uniquement des lettres .';
                isValid = false;
            }
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
                case 'option4':
                    redirectToURL('projet', 'chef-equipe');
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

    function redirectToURL(critere1Type, critere2Value) {
        var url;
        if (critere2Value) {
            url = 'critere1=' + critere1Type + ',' + critere2Value + '.html';
        } else {
            url = 'critere1=' + critere1Type + '.html';
        }
        window.location.href = url;
    }

    function isValidName(name) {
        // Expression régulière pour vérifier si le nom ne contient que des lettres
        return /^[a-zA-Z]+$/.test(name);
    }

    // Appel initial pour remplacer le select par un input si nécessaire au chargement de la page
    replaceSelectWithInput();
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

    if (selectedOption === 'écrit par' || selectedOption === 'encadré par') {
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
            optionsArray = ['type', 'écrit par'];
            break;
        case 'option3': // Encadrement
            optionsArray = ['type', 'encadré par'];
            break;
        case 'option4': // Projet
            optionsArray = [ 'chef projet'];
            break;
        default:
            // Aucune option spécifique sélectionnée
            critere2Select.disabled = true;
            return;
    }
    // Vérifier si le champ doit être remplacé par un champ texte (input)
    const selectedOption = critere2Select.value;
    const requiresTextInput = selectedOption === 'encadré par' || selectedOption === 'écrit par';

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
        case 'écrit par':
            return 'Écrit par';
        case 'encadré par':
            return 'Encadré par';
        case 'chef projet':
            return 'Chef de projet';
        
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
