document.addEventListener('DOMContentLoaded', function () {
    var data = {
        datasets: [{
            data: [8,7,0],
            backgroundColor: ['#DDACF5', '#75E8E7', '##508bc9']
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
                labels: {
                    color: '#333', // Couleur des étiquettes
                    font: {
                        size: 14 // Taille de la police des étiquettes
                    }
                }
            }
        },
        cutoutPercentage: 70, // Pourcentage de découpe du centre du cercle (plus le nombre est élevé, plus le cercle est petit)
        elements: {
            arc: {
                // Rendre les parties du cercle un peu plus arrondies
                borderRadius: 10
            }
        }
    };

    var ctx = document.getElementById('encadrementsChart').getContext('2d');
    var encadrementsChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

    // Couleurs pour chaque colonne du diagramme
    var colors = [
        '#95A4FC', // 95A4FC
        '#75E8E7', // 75E8E7
        '#DBD5D5', // DBD5D5
        '#DDACF5', // DDACF5
        '#A8C5DA', // A8C5DA
        '#365486'  // 365486
    ];

    // Données fictives pour les publications par mois
    var publicationsData = {
        labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [{
            // Le label est vide pour supprimer le titre par défaut
            label: '',
            data: [19, 40, 44, 44, 38, 43, 36, 46, 27, 31, 46, 41],
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    };

    // Options du diagramme à colonnes
    var publicationsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false // Pour supprimer la légende à côté du graphique
        },
        title: {
            display: false // Pour supprimer le titre du graphique
        },
        plugins: {
            legend: {
                display: false // Pour supprimer les carrés de couleur de la légende
            }
        },
    };

    // Création du diagramme à colonnes
    var publicationsCanvas = document.getElementById('publicationCanvas').getContext('2d');
    var publicationsChart = new Chart(publicationsCanvas, {
        type: 'bar',
        data: publicationsData,
        options: publicationsOptions
    });

    // Gestion du clic sur le bouton "Voir profil"
  /*  const voirProfilButton1 = document.querySelector('.voir-profil1');
    voirProfilButton1.addEventListener('click', function () {
        // Effectuer une requête à l'API pour obtenir l'ID du chercheur le plus cité
        fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTgyNTQ2LCJpYXQiOjE3MTQ1ODE5NDYsImp0aSI6Ijc1OTUyMWY1MDRhMjQwNzI5MTI4YmVkZTYzNjg3NDhlIiwidXNlcl9pZCI6MjJ9.xB5IPIzsmmtsJN0QUVyFhXGzvK8CInryPo5tOxZEWtU'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Stocker l'ID du chercheur le plus cité dans la session
            sessionStorage.setItem('id_chercheur', data.id_chercheur);
            // Rediriger vers la page du profil du chercheur
            window.location.href = '../html/voirprofilautrechercheur.html';
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'ID du chercheur le plus cité:', error));
    });*/

    // Fonction pour obtenir le token d'accès valide depuis la session


    // Reste du code JavaScript existant...
  /*  const voirProfilButton1 = document.querySelector('.voir-profil1');
voirProfilButton1.addEventListener('click', function () {
    // Function to get the access token
    function getAccessToken() {
        const userInfo = sessionStorage.getItem('user_info');
        if (!userInfo) {
            return null;
        }
        return JSON.parse(userInfo).access_token;
    }

    // Function to refresh the access token
    function refreshAccessToken(callback) {
        const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
        if (refresh_token) {
            $.ajax({
                url: 'http://127.0.0.1:8000/api/v1/auth/token/refresh/',
                method: 'POST',
                data: { refresh: refresh_token },
                success: function(response) {
                    const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                    userInfo.access_token = response.access;
                    sessionStorage.setItem('user_info', JSON.stringify(userInfo));
                    callback(response.access); // Call the callback function with the new access token
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    // Redirect the user to the login page or display an error message
                }
            });
        } else {
            // Redirect the user to the login page if there is no refresh token
        }
    }

    // Function to fetch data with access token
    function fetchWithAccessToken(token) {
        // Effectuer une requête à l'API pour obtenir l'ID du chercheur le plus cité
        fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    // If token has expired, refresh the token and retry the request
                    refreshAccessToken(newToken => {
                        fetchWithAccessToken(newToken);
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            // Stocker l'ID du chercheur le plus cité dans la session
            sessionStorage.setItem('id_chercheur', data.id_chercheur);
            // Rediriger vers la page du profil du chercheur
            window.location.href = '../html/voirprofilautrechercheur.html';
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'ID du chercheur le plus cité:', error));
    }

    // Fetch the access token
    const accessToken = getAccessToken();

    if (accessToken) {
        // Fetch data with the existing access token
        fetchWithAccessToken(accessToken);
    } else {
        // Refresh the access token and then fetch data
        refreshAccessToken(newAccessToken => {
            fetchWithAccessToken(newAccessToken);
        });
    }
});*/
    /*
const voirProfilButton1 = document.querySelector('.voir-profil1');
voirProfilButton1.addEventListener('click', function () {
    // Function to get the access token
    function getAccessToken() {
        const userInfo = sessionStorage.getItem('user_info');
        if (!userInfo) {
            return null;
        }
        return JSON.parse(userInfo).access_token;
    }

    // Function to refresh the access token
    function refreshAccessToken(callback) {
        const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
        if (refresh_token) {
            $.ajax({
                url: 'http://127.0.0.1:8000/api/v1/auth/token/refresh/',
                method: 'POST',
                data: { refresh: refresh_token },
                success: function(response) {
                    const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                    userInfo.access_token = response.access;
                    sessionStorage.setItem('user_info', JSON.stringify(userInfo));
                    callback(response.access); // Call the callback function with the new access token
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    // Redirect the user to the login page or display an error message
                }
            });
        } else {
            // Redirect the user to the login page if there is no refresh token
        }
    }

    // Function to fetch data with access token
    function fetchWithAccessToken(token) {
        // Effectuer une requête à l'API pour obtenir l'ID du chercheur le plus cité
        fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    // If token has expired, refresh the token and retry the request
                    refreshAccessToken(newToken => {
                        fetchWithAccessToken(newToken);
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            // Stocker l'ID du chercheur le plus cité dans la session
            sessionStorage.setItem('id_chercheur', data.id_chercheur);
            // Rediriger vers la page du profil du chercheur
            window.location.href = '../html/voirprofilautrechercheur.html';
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'ID du chercheur le plus cité:', error));
    }

    // Function to check if the access token is expired
    function isTokenExpired(token) {
        // Assuming the token has an 'exp' field indicating its expiration time
        const expiresAt = token.exp; // Replace 'exp' with the actual field name
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

        // Check if the token has expired by comparing its expiration time with the current time
        return expiresAt < currentTime;
    }

    // Function to check if the access token is valid
    function isAccessTokenValid() {
        const userInfo = sessionStorage.getItem('user_info');
        if (!userInfo) {
            return false;
        }
        const { access_token } = JSON.parse(userInfo);
        // Check if the access token exists and is not expired
        return access_token !== null && !isTokenExpired(access_token);
    }

    // Check if access token is valid
    if (isAccessTokenValid()) {
        // Fetch the access token
        const accessToken = getAccessToken();

        if (accessToken) {
            // Check if the access token is expired
            if (isTokenExpired(accessToken)) {
                // If expired, refresh the access token and then fetch data
                refreshAccessToken(newAccessToken => {
                    fetchWithAccessToken(newAccessToken);
                });
            } else {
                // If not expired, fetch data with the existing access token
                fetchWithAccessToken(accessToken);
            }
        } else {
             window.location.href = '../html/seconnecter.html';
        }
    } else {
        // Refresh the access token and then fetch data
        refreshAccessToken(newAccessToken => {
            fetchWithAccessToken(newAccessToken);
        });
    }
});

*/

  /*  async function getAccessToken() {
    await refreshAccessToken();
    return sessionStorage.getItem('access_token');
}

async function refreshAccessToken() {
    // Retrieve refresh token from session storage
    const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
    if (refresh_token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refresh_token })
            });
            const data = await response.json();
            // Update the access token in session storage
            const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
            sessionStorage.setItem('access_token', data.access);
            sessionStorage.setItem('user_info', JSON.stringify(userInfo)); // Store all updated user information
            // Retry the original request or perform other actions
        } catch (error) {
            // Handle token refresh error
            console.error(error);
            // Redirect the user to the login page or display an error message
        }
    } else {
        // Redirect the user to the login page if there is no refresh token
    }
}

const voirProfilButton1 = document.querySelector('.voir-profil1');
voirProfilButton1.addEventListener('click', async function () {
    try {
        // Effectuer une requête à l'API pour obtenir l'ID du chercheur le plus cité
        const accessToken = await getAccessToken();
        const response = await fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken // Utilisez la fonction getAccessToken pour obtenir le token valide
            }
        });
        const data = await response.json();
        // Stocker l'ID du chercheur le plus cité dans la session
        sessionStorage.setItem('id_chercheur', data.id_chercheur);
        // Rediriger vers la page du profil du chercheur
        window.location.href = '../html/voirprofilautrechercheur.html';

    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID du chercheur le plus cité:', error);
    }
});*/
  /* const voirProfilButton1 = document.querySelector('.voir-profil1');
    voirProfilButton1.addEventListener('click', function () {
        // Effectuer une requête à l'API pour obtenir l'ID du chercheur le plus cité
        fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAccessToken() // Utilisez la fonction getAccessToken pour obtenir le token valide
            }
        })
        .then(response => response.json())
        .then(data => {
            // Stocker l'ID du chercheur le plus cité dans la session
            sessionStorage.setItem('id_chercheur', data.id_chercheur);
            // Rediriger vers la page du profil du chercheur
            window.location.href = '../html/voirprofilautrechercheur.html';
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'ID du chercheur le plus cité:', error));
    });
*/
    // Autres événements et fonctions JavaScript...

/*
// Function to refresh the access token
function refreshAccessToken(refresh_token, callback) {
    if (refresh_token) {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/auth/token/refresh/',
            method: 'POST',
            data: { refresh: refresh_token },
            success: function(response) {
                // Store the new access token in session storage
                sessionStorage.setItem('access_token', response.access);
                // Call the callback function passing the refresh_token
                callback(refresh_token);
            },
            error: function(xhr, status, error) {
                console.error(error);
                // Redirect the user to the login page or display an error message
            }
        });
    }
}

// Function to start the token refresh timer
function startTokenRefreshTimer() {
    setInterval(function() {
        // Retrieve the refresh token from session storage
        const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
        // Call refreshAccessToken function passing refresh_token
        refreshAccessToken(refresh_token, function(newAccessToken) {
            console.log('Access token refreshed:', newAccessToken);
        });
    }, 300000); // Refresh every 5 minutes (300,000 milliseconds)
}

// Function to get the access token from session storage
function getAccessTokenFromSession() {
    return sessionStorage.getItem('access_token');
}

// Start the token refresh timer when the page loads
startTokenRefreshTimer();
*/
// Assign event listener to voirProfilButton1
const voirProfilButton1 = document.querySelector('.voir-profil1');
voirProfilButton1.addEventListener('click', function () {
    // Fetch data with the access token from session storage
    fetch('http://127.0.0.1:8000/api/chercheur-plus-cite/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + getAccessTokenFromSession() // Use the function to get the access token
        }
    })
    .then(response => response.json())
    .then(data => {
        // Store the ID of the most cited researcher in the session
        sessionStorage.setItem('id_chercheur', data.id_chercheur);
        // Redirect to the researcher's profile page
        window.location.href = '../html/voirprofilautrechercheur.html';
    })
    .catch(error => console.error('Error fetching the ID of the most cited researcher:', error));
});
    const voirPublicationButton = document.querySelector('.voir-pub');
    voirPublicationButton.addEventListener('click', function () {
        // Faire une requête à l'API pour récupérer les détails de la publication la plus citée
        fetch('http://127.0.0.1:8000/api/publication-plus-cite/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'Bearer ' + getAccessToken()
               // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTg2MjQ4LCJpYXQiOjE3MTQ1ODU2NDgsImp0aSI6ImJkYzU0YTE0ZGVmNTRmZmRiZGIyZDEzMTUxMGJkMDAwIiwidXNlcl9pZCI6MjJ9.vrF6UyYvFyCzxxR9CKewgpC-1pJZRpFwsWeumz1tF7Y'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        })
        .then(data => {
            // Stocker l'ID de la publication dans la session
            sessionStorage.setItem('id_publication', data.id);
            // Stocker les noms et prénoms des chercheurs dans la session
            const chercheursNoms = data.chercheurs.map(chercheur => `${chercheur.nom_chercheur} ${chercheur.prenom_chercheur}`);
            sessionStorage.setItem('chercheurs_noms', JSON.stringify(chercheursNoms));
            // Rediriger vers la page de détails de la publication
            window.location.href = '../html/voirpublication.html';
        })
         .catch(error => {
            if (error.message === 'Invalid access token') {
                refreshAccessToken(); // Refresh the access token if it's invalid
            } else {
                console.error('Erreur lors de la récupération des détails de la publication :', error);
            }
        });
    });

      const voirProfilButton = document.querySelector('.voir-profil2');

        voirProfilButton.addEventListener('click', function () {
            // Effectuez une requête AJAX pour appeler la vue backend
            fetch('http://127.0.0.1:8000/api/chercheurs-plus-cite/')


                .then(response => response.json())
                .then(data => {
                    // Stockez les IDs des chercheurs dans la session
                    sessionStorage.setItem('idsChercheurs', JSON.stringify(data.ids_chercheurs));
                    // Redirigez vers la page voirprofilmultiple.html
                    window.location.href = '../html/voirprofilmultiple.html';
                })
                .catch(error => console.error('Error:', error));
        });
});
/*function getAccessToken() {
       refreshAccessToken()
       return sessionStorage.getItem('access_token');
    }
function refreshAccessToken() {
    // Retrieve refresh token from session storage
    const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
    if (refresh_token) {
        fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refresh_token })
        })
        .then(response => response.json())
        .then(response => {
            // Update the access token in session storage
            const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
            sessionStorage.setItem('access_token', response.access);
            sessionStorage.setItem('user_info', JSON.stringify(userInfo)); // Store all updated user information
            // Retry the original request or perform other actions
        })
        .catch(error => {
            // Handle token refresh error
            console.error(error);
            // Redirect the user to the login page or display an error message
        });
    } else {
        // Redirect the user to the login page if there is no refresh token
    }
}*/