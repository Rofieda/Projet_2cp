/*
$(document).ready(function() {
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

    // Function to check if the access token is expired
    function isTokenExpired(token) {
        // Assuming the token has an 'expires_at' field indicating its expiration time
        const expiresAt = token.expires_at; // Replace 'expires_at' with the actual field name
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

        // Check if the token has expired by comparing its expiration time with the current time
        return expiresAt < currentTime;
    }

    // Event listener for the form submission
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        var formData = {
            email: $('#email').val(),
            password: $('#password').val()
            // Add other form fields as needed
        };

        // Perform your asynchronous form submission using AJAX
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/auth/login/',
            method: 'POST',
            data: formData,
            success: function(response) {
                // Add additional user information to the response
                response.id = response.id;
                response.role = response.role;
                response.full_name = response.full_name;
                response.access_token = response.access_token;
                response.refresh_token = response.refresh_token;
                // Store user information in session storage
                sessionStorage.setItem('user_info', JSON.stringify(response));
                // Redirect to the home page
                window.location.href = 'C:\\Users\\ASUS TUF A15\\PycharmProjects\\Auth2\\front\\html\\accueil.html';
            },
            error: function(xhr, status, error) {
                // Handle login error
                console.error(error); // Log the error for debugging
                // Display error message to the user, if needed
            }
        });
    });

    // Event listener for the "Connectez-vous maintenant" button click
    $('.signup-btn').click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        $('#login-form').submit(); // Trigger the form submission
    });

    // Check if access token is valid
    if (isAccessTokenValid()) {
        // Token is valid, user is authenticated
        // Proceed with normal operations
    } else {
        // Access token is expired or not present
        // Attempt to refresh the access token using the refresh token
        refreshAccessToken();
    }
});

// Function to refresh the access token
function refreshAccessToken() {
    // Retrieve refresh token from session storage
    const refresh_token = JSON.parse(sessionStorage.getItem('user_info')).refresh_token;
    if (refresh_token) {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/auth/token/refresh/',
            method: 'POST',
            data: { refresh: refresh_token },
            success: function(response) {
                // Update the access token in session storage
                const userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                userInfo.access_token = response.access; // Mise à jour du token d'accès rafraîchi
                sessionStorage.setItem('user_info', JSON.stringify(userInfo)); // Stocker uniquement le token d'accès rafraîchi
                // Retry the original request or perform other actions
            },
            error: function(xhr, status, error) {
                // Handle token refresh error
                console.error(error);
                // Redirect the user to the login page or display an error message
            }
        });
    } else {
        // Redirect the user to the login page if there is no refresh token
    }
}
 */
// Function to check if the access token is valid


$(document).ready(function() {
    // Function for form submission
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        var formData = {
            email: $('#email').val(),
            password: $('#password').val()
            // Add other form fields as needed
        };

        // Perform asynchronous form submission using AJAX
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/auth/login/',
            method: 'POST',
            data: formData,
            success: function(response) {
                // Store specific user information in session storage
                var userInfo = {
                    id: response.id,
                    role: response.role,
                    full_name: response.full_name,
                    access_token: response.access_token,
                    refresh_token: response.refresh_token
                };
                sessionStorage.setItem('user_info', JSON.stringify(userInfo));

                // Redirect to different pages based on user role
                var role = response.role;
                switch (role) {
                    case 'assistant':
                        window.location.href = 'C:\\Users\\THINKPAD E14\\Desktop\\Projet_test\\Front\\html\\accueilass.html';
                        break;
                    case 'chercheur':
                        window.location.href = 'C:\\Users\\THINKPAD E14\\Desktop\\Projet_test\\Front\\html\\accueil.html';
                        break;
                    case 'admin':
                        window.location.href = 'C:\\Users\\THINKPAD E14\\Desktop\\Projet_test\\Front\\html\\accueiladmin.html';
                        break;
                    default:
                        console.error('Unknown user role: ' + role);
                        // Redirect to a default page or handle error as needed
                        break;
                }
            },
            error: function(xhr, status, error) {
                // Handle login error
                console.error(error); // Log the error for debugging
                // Display error message to the user, if needed
            }
        });
    });

    // Event listener for the "Connectez-vous maintenant" button click
    $('.signup-btn').click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        $('#login-form').submit(); // Trigger the form submission
    });

    // Check if access token is valid

});


//mot de passe :
// Gestionnaire d'événements pour le clic sur le bouton "Réinitialiser votre mot de passe"
// Fonction pour obtenir les paramètres de l'URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fonction pour exécuter la méthode PATCH
// Fonction pour exécuter la méthode POST de réinitialisation de mot de passe
function resetPassword() {
    // Récupérer l'email de réinitialisation
    const resetEmail = document.getElementById('reset-email').value.trim();
    const csrftoken = getCookie('csrftoken');

    // Envoyer une requête AJAX au backend pour réinitialiser le mot de passe
    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/auth/password-reset/',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken  // Ajouter le jeton CSRF à l'en-tête de la requête
        },
        data: { email: resetEmail },
        success: function (response) {
            // Afficher un message de succès ou rediriger l'utilisateur
            console.log('Mot de passe réinitialisé avec succès !');

            // Rediriger vers la page de confirmation ou afficher la fenêtre de redéfinition de mot de passe
            // En fonction de votre implémentation backend

            // Une fois que la réinitialisation est réussie, appeler la fonction pour mettre à jour le mot de passe

        },
        error: function (xhr, status, error) {
            // Gérer les erreurs de réinitialisation du mot de passe
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        }
    });
}
document.getElementById('reset-password-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire
    resetPassword();
});
function extractUidb64AndToken() {
    const url = window.location.href;
    const parts = url.split('/');
    const uidb64 = parts[parts.length - 2]; // Dernière partie de l'URL
    const token = parts[parts.length - 1]; // Dernière partie de l'URL
    return { uidb64, token };
}
function confirmPassword() {
    const { uidb64, token } = extractUidb64AndToken();
    const csrftoken = getCookie('csrftoken');

    // Envoyer une requête AJAX au backend pour valider le token
    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/auth/my-view/',
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken  // Ajouter le jeton CSRF à l'en-tête de la requête
        },
        success: function (response) {
            // Traiter la réponse du serveur en cas de succès
            console.log('Token validé avec succès !');

            // Une fois que le token est validé, appeler la fonction pour mettre à jour le mot de passe
        updatePassword(uidb64, token)
        },
        error: function (xhr, status, error) {
            // Gérer les erreurs en cas de validation du token échouée
            console.error('Erreur lors de la validation du token :', error);
        }
    });
}

function closeModal() {
    const modalRedPassword = document.getElementById('modal-red-password');
    const overlay = document.getElementById('overlay');
    modalRedPassword.style.display = 'none';
    overlay.style.display = 'none';
}
function updatePassword() {
    // Récupérer les valeurs saisies pour le nouveau mot de passe
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmNewPassword = document.getElementById('confirm-new-password').value.trim();
    const uidb64 = document.getElementById('uidb64').value.trim(); // Get uidb64 from input field
    const token = document.getElementById('token').value.trim(); // Get token from input field
    const csrftoken = getCookie('csrftoken');
    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmNewPassword) {
        console.error('Les mots de passe ne correspondent pas.');
        return;
    }

    // Envoyer une requête PATCH au backend pour mettre à jour le mot de passe
    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/auth/set-new-password/',
        method: 'PATCH',
        headers: {
            'X-CSRFToken': csrftoken  // Ajouter le jeton CSRF à l'en-tête de la requête
        },
        data: {
            password: newPassword,
            confirm_password: confirmNewPassword,
            uidb64: uidb64,
            token: token
        },
        success: function (response) {
            // Traiter la réponse du serveur en cas de succès
            console.log('Mot de passe mis à jour avec succès !');
            closeModal();
        },
        error: function (xhr, status, error) {
            // Gérer les erreurs en cas d'échec de la mise à jour du mot de passe
            console.error('Erreur lors de la mise à jour du mot de passe :', error);
        }
    });
}

// Attach event listener to the "Enregistrer" button
document.getElementById('red-password-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire
    updatePassword(); // Call the updatePassword function
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Recherchez le jeton CSRF dans les cookies
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// Sélectionnez le lien "Mot de passe oublié ?"
const forgotPasswordLink = document.getElementById('forgot-password-link');

// Sélectionnez l'overlay
const overlay = document.getElementById('overlay');

// Ajoutez un gestionnaire d'événements au clic sur le lien "Mot de passe oublié ?"
forgotPasswordLink.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien

    // Affiche l'overlay
    overlay.style.display = 'block';
});

// Récupérer les éléments nécessaires
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const resetPasswordBtn = document.getElementById('reset-password-btn');


// Fonction pour afficher la modal lorsque le lien "Mot de passe oublié ?" est cliqué
forgotPasswordLink.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block'; // Afficher l'ombre
});

// Fonction pour fermer la modal lorsque l'utilisateur clique sur le bouton de fermeture
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none'; // Masquer l'ombre
});

// Fonction pour fermer la modal lorsque l'utilisateur clique en dehors de celle-ci
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        overlay.style.display = 'none'; // Masquer l'ombre
    }
});

// Vous pouvez ajouter ici la logique pour réinitialiser le mot de passe lorsque l'utilisateur clique sur le bouton "Réinitialiser votre mot de passe"
resetPasswordBtn.addEventListener('click', () => {
    // Ajoutez ici la logique de réinitialisation du mot de passe
});

//pour switch entre mdpss visible et invisible
document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('.toggle-password');
    const iconImage = document.querySelector('.toggle-password img');

    togglePassword.addEventListener('click', function () {
        let input = document.getElementById('password');

        // Stocker le type actuel du champ de mot de passe
        const currentType = input.getAttribute('type');

        // Modifier le type du champ de mot de passe
        input.setAttribute('type', currentType === 'password' ? 'text' : 'password');

        // Changer l'image de l'icône
        iconImage.src = currentType === 'password' ? '../images/visible.png' : '../images/hide.png';

        // Rétablir le focus sur le champ de mot de passe après le changement
        input.focus();

        // Appliquer ou supprimer les styles du champ de mot de passe visible
        if (currentType === 'password') {
            input.classList.add('visible-password');
        } else {
            input.classList.remove('visible-password');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments du formulaire et des messages d'erreur
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailErrorMessage = document.getElementById('email-error');
    const passwordErrorMessage = document.getElementById('password-error');
    const icon1 = document.querySelector('.icon1');
    const icon2 = document.querySelector('.icon2');

    // Sélection du bouton de connexion
    const loginButton = document.querySelector('.signup-btn');

    // Gestionnaire d'événement pour le clic sur le bouton de connexion
    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validation de l'e-mail
        if (!validateEmail(email)) {
            emailInput.classList.add('error');
            emailErrorMessage.textContent = 'Adresse e-mail invalide';
            icon1.style.top = 'calc(50% - 10px)';
        } else {
            emailInput.classList.remove('error');
            emailErrorMessage.textContent = '';
            icon1.style.top = 'calc(70% - 10px)';
        }

        // Validation du mot de passe
        if (!validatePassword(password)) {
            passwordInput.classList.add('error');
            passwordErrorMessage.textContent = 'Mot de passe incorrect';
            icon2.style.top = 'calc(50% - 9px)';
        } else {
            passwordInput.classList.remove('error');
            passwordErrorMessage.textContent = '';
            icon2.style.top = 'calc(70% - 9px)';
        }

        // Si les deux champs sont valides, soumettre le formulaire
        if (validateEmail(email) && validatePassword(password)) {
            form.submit();
        }
    });

    // Fonction pour valider l'e-mail
    function validateEmail(email) {
        if (email.trim() === '') {
            return false;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Fonction pour valider le mot de passe
    function validatePassword(password) {
        return password.length >= 8;
    }


});



//pour mess error de reinitialisation
const rresetEmailInput = document.getElementById('reset-email');
const rresetEmailError = document.getElementById('reset-email-error');

const resetEmailInput = document.getElementById('reset-email');
const resetEmailError = document.getElementById('reset-email-error');

// Sélectionnez le bouton de réinitialisation du mot de passe
const rresetPasswordBtn = document.getElementById('reset-password-btn');

// Ajoutez un gestionnaire d'événements au clic sur le bouton de réinitialisation
resetPasswordBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher la soumission du formulaire

    const resetEmail = resetEmailInput.value.trim();

    // Validation de l'e-mail de réinitialisation
    if (!validateResetEmail(resetEmail)) {
        resetEmailInput.classList.add('error'); // Ajouter la classe d'erreur pour le champ e-mail de réinitialisation
        resetEmailInput.style.border = '1px solid red'; // Appliquer une bordure rouge à tous les côtés
        resetEmailError.textContent = 'Adresse e-mail invalide'; // Afficher le message d'erreur
    } else {
        resetEmailInput.classList.remove('error'); // Supprimer la classe d'erreur
        resetEmailInput.style.borderBottom = ''; // Réinitialiser la bordure
        resetEmailError.textContent = ''; // Réinitialiser le message d'erreur
    }
});

// Fonction pour valider l'e-mail de réinitialisation
function validateResetEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


// Gestionnaire d'événements pour la soumission du formulaire de réinitialisation  
// Fonction pour valider l'adresse e-mail
// Définition de la fonction de validation de l'e-mail
function validateEmail(email) {
    // Vérifier si l'e-mail est vide
    if (email.trim() === '') {
        return false;
    }

    // Vérifier si l'e-mail correspond au format attendu
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Associer la fonction validateEmail au clic sur le bouton "Réinitialiser votre mot de passe"
document.getElementById('reset-password-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher la soumission du formulaire

    const resetEmail = resetEmailInput.value.trim();

    if (!validateResetEmail(resetEmail)) {
        resetEmailError.textContent = 'Adresse e-mail invalide';
        resetEmailError.style.display = 'block'; // Afficher le message d'erreur
    } else {
        resetEmailError.textContent = ''; // Réinitialiser le message d'erreur
        resetEmailError.style.display = 'none'; // Masquer le message d'erreur
        // Ajoutez ici la logique pour réinitialiser le mot de passe
    }
});




// de redefinition de mots de passe 
document.addEventListener('DOMContentLoaded', function () {
    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const modal = document.getElementById('modal');
    const modalRedPassword = document.getElementById('modal-red-password');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.querySelector('.close');
    const cancelResetBtn = document.getElementById('cancel-reset-btn');
    const resetEmailInput = document.getElementById('reset-email');
    const resetEmailError = document.getElementById('reset-email-error');

    // Fonction pour afficher le modal de redéfinition de mot de passe
    function openModalRedPassword() {
        modal.style.display = 'none'; // Masquer la première modal
        modalRedPassword.style.display = 'block'; // Afficher la seconde modal
        overlay.style.display = 'block';
    }

    // Fonction pour masquer le modal
    function closeModal() {
        modal.style.display = 'none';
        modalRedPassword.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Écouter le clic sur le bouton "Réinitialiser votre mot de passe"
    resetPasswordBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher la soumission du formulaire

        const resetEmail = resetEmailInput.value.trim();

        if (!validateResetEmail(resetEmail)) {
            resetEmailError.textContent = 'Adresse e-mail invalide';
            resetEmailError.style.display = 'block'; // Afficher le message d'erreur
        } else {
            resetEmailError.textContent = ''; // Réinitialiser le message d'erreur
            resetEmailError.style.display = 'none'; // Masquer le message d'erreur

            // Si l'adresse e-mail est valide, ouvrir le modal de redéfinition de mot de passe
            openModalRedPassword();
        }
    });

    // Écouter le clic sur le bouton de fermeture du modal
    closeModalBtn.addEventListener('click', closeModal);
    cancelResetBtn.addEventListener('click', closeModal);

    // Écouter le clic en dehors du modal pour le fermer
    overlay.addEventListener('click', closeModal);
});

//annueler de la redefinitionn 
document.addEventListener('DOMContentLoaded', function () {
    const cancelResetBtn = document.getElementById('cancel-reset-btn');
    const modalRedPassword = document.getElementById('modal-red-password');
    const overlay = document.getElementById('overlay');

    // Fonction pour fermer la fenêtre modale de réinitialisation de mot de passe
    function closeResetPasswordModal() {
        modalRedPassword.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Écouter le clic sur le bouton "Annuler"
    cancelResetBtn.addEventListener('click', function () {
        closeResetPasswordModal(); // Appeler la fonction pour fermer la fenêtre modale
    });
});


// test de validité de mot de passe
document.addEventListener('DOMContentLoaded', function () {
    const resetEmailInput = document.getElementById('reset-email');
    const newPasswordInput = document.getElementById('reset-password');
    const confirmNewPasswordInput = document.getElementById('confirm-reset-password');
    const redPasswordBtn = document.getElementById('red-password-btn');
    const cancelResetBtn = document.getElementById('cancel-reset-btn');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');

    // Fonction pour valider le mot de passe
    function validatePassword(password) {
        return password.length >= 8;
    }

    // Fonction pour afficher les erreurs de validation du mot de passe
    function displayPasswordErrors() {
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        // Valider le nouveau mot de passe
        if (!validatePassword(newPassword)) {
            newPasswordError.textContent = 'Le mot de passe doit contenir au moins 8 caractères.';
            newPasswordError.style.display = 'block'; // Afficher le message d'erreur
        } else {
            newPasswordError.textContent = ''; // Réinitialiser le message d'erreur
            newPasswordError.style.display = 'none'; // Masquer le message d'erreur
        }

        // Valider la confirmation du nouveau mot de passe
        if (newPassword !== confirmNewPassword) {
            confirmNewPasswordError.textContent = 'Les mots de passe ne correspondent pas.';
            confirmNewPasswordError.style.display = 'block'; // Afficher le message d'erreur
        } else {
            confirmNewPasswordError.textContent = ''; // Réinitialiser le message d'erreur
            confirmNewPasswordError.style.display = 'none'; // Masquer le message d'erreur
        }
    }

    // Écouter le clic sur le bouton "Enregistrer" pour redéfinir le mot de passe
    redPasswordBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher la soumission du formulaire

        // Afficher les erreurs de validation du mot de passe
        displayPasswordErrors();

        // Récupérer les valeurs saisies
        const resetEmail = resetEmailInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        // Si les deux champs sont valides
        if (validatePassword(newPassword) && newPassword === confirmNewPassword) {
            // Ici, vous pouvez implémenter la logique pour réinitialiser le mot de passe
            console.log('Mot de passe réinitialisé avec succès !');
            // Réinitialiser les champs du formulaire ou effectuer d'autres actions
        }
    });

    // Écouter le clic sur le bouton "Annuler"
    cancelResetBtn.addEventListener('click', function () {
        // Réinitialiser les champs du formulaire ou effectuer d'autres actions si nécessaire
        resetEmailInput.value = '';
        newPasswordInput.value = '';
        confirmNewPasswordInput.value = '';
        newPasswordError.textContent = '';
        confirmNewPasswordError.textContent = '';
        newPasswordError.style.display = 'none';
        confirmNewPasswordError.style.display = 'none';
    });
});

//test et visibilite de mp lors la redef
document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButtons = document.querySelectorAll('.toggle-password2');

    togglePasswordButtons.forEach(function (togglePassword) {
        const iconImage = togglePassword.querySelector('img');
        const input = togglePassword.previousElementSibling; // Sélectionne l'élément input précédent

        togglePassword.addEventListener('click', function () {
            const currentType = input.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';

            // Changer le type du champ de mot de passe
            input.setAttribute('type', newType);

            // Mettre à jour l'icône en fonction du nouveau type de champ de mot de passe
            if (newType === 'text') {
                iconImage.src = '../images/visible.png'; // Utilise l'icône "visible"
                iconImage.alt = '../Icône password visible';
            } else {
                iconImage.src = '../images/hide.png'; // Utilise l'icône "hide"
                iconImage.alt = 'Icône password caché';
            }

            // Rétablir le focus sur le champ de mot de passe après le changement
            input.focus();

            // Appliquer ou supprimer les styles du champ de mot de passe visible
            if (newType === 'text') {
                input.classList.add('visible-password');
            } else {
                input.classList.remove('visible-password');
            }
        });
    });
});

//test de validite de mdps de redefinition 
document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.querySelector('input[name="new-password"]');
    const confirmNewPasswordInput = document.querySelector('input[name="confirm-new-password"]');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');
    const saveButton = document.getElementById('red-password-btn');

    // Fonction pour valider la longueur du mot de passe
    function validatePasswordLength(password) {
        return password.length >= 8;
    }

    function displayErrorMessage(input, errorElement, message) {
        console.log('Affichage de l\'erreur pour l\'input :', input);
        errorElement.textContent = message;
        input.classList.add('invalid');

        // Cibler l'icône associée à cet input
        const iconImage = input.nextElementSibling.querySelector('img.icon2');
        if (iconImage) {
            iconImage.style.top = 'calc(50% - 9px)'; // Ajuster la position de l'icône
        }

        // Référence au conteneur parent pour modifier la bordure
        const passwordContainer = input.parentNode;
        newPasswordInput.style.border = '1px solid red'; // Appliquer une bordure rouge
        confirmNewPasswordInput.style.border = '1px solid red'; // Appliquer une bordure rouge
    }

    function clearErrorMessage(input, errorElement) {
        console.log('Effacement de l\'erreur pour l\'input :', input);
        errorElement.textContent = '';
        input.classList.remove('invalid');

        // Cibler l'icône associée à cet input pour réinitialiser sa position
        const iconImage = input.nextElementSibling.querySelector('img.icon2');
        if (iconImage) {
            iconImage.style.top = 'calc(50% - 0px)'; // Réinitialiser la position de l'icône
        }

        // Référence au conteneur parent pour réinitialiser la bordure
        newPasswordInput.style.border = ''; // Réinitialiser la bordure
        confirmNewPasswordInput.style.border = ''; // Réinitialiser la bordure
    }


    // Gestionnaire d'événements pour le clic sur le bouton "Enregistrer"
    saveButton.addEventListener('click', function (event) {
        // Effacer les messages d'erreur précédents
        clearErrorMessage(newPasswordInput, newPasswordError);
        clearErrorMessage(confirmNewPasswordInput, confirmNewPasswordError);

        // Récupérer les valeurs des champs de mot de passe
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        // Vérifier si les mots de passe ont au moins 8 caractères
        if (!validatePasswordLength(newPassword)) {
            displayErrorMessage(newPasswordInput, newPasswordError, 'Le mot de passe doit comporter au moins 8 caractères.');
        }

        if (!validatePasswordLength(confirmNewPassword)) {
            displayErrorMessage(confirmNewPasswordInput, confirmNewPasswordError, 'Le mot de passe doit comporter au moins 8 caractères.');
        }

        // Vérifier si les deux champs de mot de passe correspondent
        if (newPassword !== confirmNewPassword) {
            displayErrorMessage(confirmNewPasswordInput, confirmNewPasswordError, 'Les mots de passe ne correspondent pas.');
        }

        // Empêcher l'envoi du formulaire si des erreurs sont présentes
        if (newPassword.length < 8 || confirmNewPassword.length < 8 || newPassword !== confirmNewPassword) {
            event.preventDefault(); // Empêche l'action par défaut du bouton (envoi du formulaire)
        }
    });
});



/************************************************************* */



//pour le retour a la page precedente 
function goBack() {
    window.history.back(); // Utilisation de l'historique de navigation pour revenir en arrière
}
