// Fonction pour valider une adresse email à l'aide d'une expression régulière
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction pour créer le bouton "Appliquer" avec l'icône
function createApplyButton() {
    const applyButton = document.createElement('button');
    applyButton.className = 'apply-button';
    const applyIcon = document.createElement('img');
    applyIcon.src = '../images/Tick white.png';
    applyIcon.alt = 'Icône Appliquer';
    applyButton.appendChild(applyIcon);
    applyButton.appendChild(document.createTextNode(' Appliquer'));
    return applyButton;
}

// Fonction pour convertir un champ d'entrée en paragraphe
function convertInputToParagraph() {
    const emailInput = document.getElementById('email2');
    const emailValue = emailInput.value;

    // Validation de l'email
    if (!validateEmail(emailValue)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    const emailContainer2 = document.querySelector('.email-input2');

    // Créer un nouveau paragraphe pour afficher la valeur de l'email
    const newParagraph = document.createElement('p');
    newParagraph.textContent = emailValue;
    newParagraph.style.fontSize = '14px';
    newParagraph.style.display = 'flex'; // Utilisation de flexbox pour aligner verticalement
    newParagraph.style.alignItems = 'center';
    newParagraph.style.marginLeft = '21%'; // Pour aligner avec le label

    // Remplacer l'input par le nouveau paragraphe
    emailContainer2.replaceChild(newParagraph, emailInput);

    // Appliquer les styles de bordure
    emailContainer2.style.display = 'flex';
    emailContainer2.style.border = '1.2px solid #BBBBBB';
    emailContainer2.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    emailContainer2.style.borderRadius = '7px';
    emailContainer2.style.padding = '10px';
    emailContainer2.style.boxSizing = 'border-box';
    emailContainer2.style.marginBottom = '20px';
    emailContainer2.style.height = '60px';

    // Créer et ajouter le bouton "Modifier"
    const modifyButton = createModifyButton();
    emailContainer2.appendChild(modifyButton);

    // Supprimer le bouton "Ajouter" s'il existe
    const addButton = document.querySelector('.ajouter-button');
    if (addButton) {
        addButton.remove();
    }

    // Ajouter un écouteur d'événement sur le bouton "Modifier"
    modifyButton.addEventListener('click', () => {
        replaceParagraphWithInput(modifyButton);
    });
}

// Fonction pour remplacer un paragraphe par un champ d'entrée
function replaceParagraphWithInput(button) {
    const parentDiv = button.closest('div');

    if (parentDiv.classList.contains('email-input') || parentDiv.classList.contains('password-input') || parentDiv.classList.contains('email-input2')) {
        const paragraph = parentDiv.querySelector('p');

        if (parentDiv.classList.contains('email-input') || parentDiv.classList.contains('email-input2')) {
            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.id = 'email1';
            emailInput.name = 'email1';
            emailInput.value = paragraph.textContent;

            const emailLabel = document.createElement('label');
            emailLabel.setAttribute('for', 'email1');
            emailLabel.textContent = parentDiv.classList.contains('email-input') ? 'Email 1 :' : 'Email 2 :';

            // Ajouter le label avant d'ajouter le champ d'entrée
            parentDiv.innerHTML = ''; // Supprimer le contenu actuel de la div
            parentDiv.appendChild(emailLabel);
            parentDiv.appendChild(emailInput);

            const applyButton = createApplyButton(); // Créer le bouton "Appliquer"

            // Ajouter l'écouteur d'événement au bouton "Appliquer"
            applyButton.addEventListener('click', () => {
                const newValue = emailInput.value.trim();

                if (!validateEmail(newValue)) {
                    alert('Veuillez entrer une adresse email valide.');
                    return;
                }

                // Créer le label pour l'adresse e-mail
                const emailLabel = document.createElement('label');
                emailLabel.setAttribute('for', 'email1');
                emailLabel.textContent = parentDiv.classList.contains('email-input') ? 'Email 1 :' : 'Email 2 :';

                // Remplacer le champ d'entrée par un paragraphe avec le nouveau contenu et le bouton "Modifier"
                paragraph.textContent = newValue;
                alert('Changements appliqués avec succès !');

                const modifyButton = createModifyButton(); // Créer le bouton "Modifier"

                // Ajouter un écouteur d'événement sur le bouton "Modifier"
                modifyButton.addEventListener('click', () => {
                    replaceParagraphWithInput(modifyButton);
                });

                // Vider le contenu actuel et ajouter le label, le paragraphe et le bouton "Modifier"
                parentDiv.innerHTML = ''; // Supprimer le contenu actuel
                parentDiv.appendChild(emailLabel);
                parentDiv.appendChild(paragraph);
                parentDiv.appendChild(modifyButton);
            });

            parentDiv.appendChild(applyButton); // Ajouter le bouton "Appliquer"
        } else if (parentDiv.classList.contains('password-input')) {
            const modifyPasswordBtn = document.querySelector(".password-input .modify-button");
            const modalForgotPassword = document.getElementById("modal");
            const overlay = document.getElementById("overlay");

            // Fonction pour afficher le modal de changement de mot de passe et l'overlay
            function displayForgotPasswordModal() {
                modalForgotPassword.style.display = "block";
                overlay.style.display = "block";
                document.body.style.overflow = "hidden"; // Désactiver le défilement de la page
            }

            // Fonction pour masquer le modal de changement de mot de passe et l'overlay
            function hideForgotPasswordModal() {
                modalForgotPassword.style.display = "none";
                overlay.style.display = "none";
                document.body.style.overflow = "auto"; // Réactiver le défilement de la page
            }

            // Validation d'email
            function isValidEmail(email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            }

            // Écouteur d'événement sur le bouton "Modifier" du mot de passe
            modifyPasswordBtn.addEventListener("click", displayForgotPasswordModal);

            // Écouteur d'événement pour fermer le modal en cliquant sur le bouton de fermeture (X)
            const closeModalBtn = modalForgotPassword.querySelector(".close");
            closeModalBtn.addEventListener("click", hideForgotPasswordModal);


            // Écouteur d'événement sur le bouton "Réinitialiser votre mot de passe"
            const resetPasswordBtn = document.getElementById("reset-password-btn");
            resetPasswordBtn.addEventListener("click", function () {
                const emailInput = document.getElementById("reset-email");
                const newPasswordInput = document.getElementById("new-password");
                const confirmNewPasswordInput = document.getElementById("confirm-new-password");
                const uidb64Input = document.getElementById("uidb64");
                const tokenInput = document.getElementById("token");

                const emailError = document.getElementById("reset-email-error");
                const newPasswordError = document.getElementById("new-password-error");
                const confirmNewPasswordError = document.getElementById("confirm-new-password-error");

                // Réinitialiser les messages d'erreur
                emailError.textContent = "";
                newPasswordError.textContent = "";
                confirmNewPasswordError.textContent = "";

                // Récupérer les valeurs des champs
                const email = emailInput.value.trim();
                const newPassword = newPasswordInput.value.trim();
                const confirmNewPassword = confirmNewPasswordInput.value.trim();
                const uidb64 = uidb64Input.value.trim();
                const token = tokenInput.value.trim();

                // Validation d'email
                if (!isValidEmail(email)) {
                    emailError.textContent = "Veuillez saisir une adresse e-mail valide.";
                    emailError.style.color = "red";
                    emailError.style.fontSize = "14px";
                    emailError.style.marginLeft = "-10%";


                    return; // Arrêter l'exécution de la fonction si l'email n'est pas valide
                }

                // Afficher la nouvelle fenêtre de réinitialisation de mot de passe si l'email est valide
                const modalRedPassword = document.getElementById("modal-red-password");
                const overlay = document.getElementById("overlay");

                modalForgotPassword.style.display = "none"; // Masquer le modal actuel
                overlay.style.display = "none"; // Masquer l'overlay
                overlay.style.overflow = "hidden"; // Masquer l'overlay


                modalRedPassword.style.display = "block"; // Afficher la nouvelle fenêtre de réinitialisation
                overlay.style.display = "block"; // Afficher l'overlay



                // Écouteur d'événement sur le bouton "Annuler" du nouveau modal de réinitialisation
                const cancelResetBtn = document.getElementById("cancel-reset-btn");
                cancelResetBtn.addEventListener("click", function () {
                    // Mettez ici la logique pour annuler la réinitialisation de mot de passe
                    modalRedPassword.style.display = "none"; // Masquer le nouveau modal
                    overlay.style.display = "none"; // Masquer l'overlay
                    // Réinitialiser les champs si nécessaire
                    document.body.style.overflow = "auto"; // Réactiver le défilement de la page

                });
            });


        }


    }
}

document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButtons = document.querySelectorAll('.toggle-password2');

    togglePasswordButtons.forEach(function (togglePassword) {
        const iconImage = togglePassword.querySelector('img');
        const input = togglePassword.previousElementSibling;

        togglePassword.addEventListener('click', function () {
            const currentType = input.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';

            input.setAttribute('type', newType);

            if (newType === 'text') {
                iconImage.src = '../images/visible.png';
                iconImage.alt = 'Icône password visible';
            } else {
                iconImage.src = '../images/hide.png';
                iconImage.alt = 'Icône password caché';
            }

            input.focus(); // Rétablir le focus sur le champ de mot de passe après le changement
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.querySelector('input[name="new-password"]');
    const confirmNewPasswordInput = document.querySelector('input[name="confirm-new-password"]');
    const emailInput = document.getElementById('reset-email');
    const uidb64Input = document.getElementById('uidb64');
    const tokenInput = document.getElementById('token');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');
    const saveButton = document.getElementById('red-password-btn');

    // Fonction pour valider la longueur du mot de passe
    function validatePasswordLength(password) {
        return password.length >= 8;
    }

   // Fonction pour afficher un message d'erreur avec style
function displayErrorMessage(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('invalid');
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '11.5px';
    errorElement.style.marginLeft = '-5%';
    errorElement.style.marginBottom = '0'; // Réduit l'espace en dessous du message d'erreur

    const modalLargeElement = document.querySelector('.modal-large');
    if (modalLargeElement) {
        modalLargeElement.style.height = 'auto'; // Réinitialiser la hauteur à 'auto'
    }
}



    // Fonction pour effacer un message d'erreur
    function clearErrorMessage(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('invalid');
    }

    // Gestionnaire d'événements pour le clic sur le bouton "Enregistrer"
    saveButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Effacer les messages d'erreur précédents
        clearErrorMessage(newPasswordInput, newPasswordError);
        clearErrorMessage(confirmNewPasswordInput, confirmNewPasswordError);

        // Récupérer les valeurs des champs de mot de passe
        const newPassword = newPasswordInput.value.trim();
        const confirmNewPassword = confirmNewPasswordInput.value.trim();
        const email = emailInput.value.trim();
        const uidb64 = uidb64Input.value.trim();
        const token = tokenInput.value.trim();

        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Effacer les messages d'erreur précédents
        clearErrorMessage(newPasswordInput, newPasswordError);
        clearErrorMessage(confirmNewPasswordInput, confirmNewPasswordError);


        // Vérifier la longueur des mots de passe
        if (!validatePasswordLength(newPassword)) {
            displayErrorMessage(newPasswordInput, newPasswordError, 'Le mot de passe doit comporter au moins 8 caractères.');
        }

        if (!validatePasswordLength(confirmNewPassword)) {
            displayErrorMessage(confirmNewPasswordInput, confirmNewPasswordError, 'Le mot de passe doit comporter au moins 8 caractères.');
        }

        // Vérifier si les mots de passe correspondent
        if (newPassword !== confirmNewPassword) {
            displayErrorMessage(confirmNewPasswordInput, confirmNewPasswordError, 'Les mots de passe ne correspondent pas.');
    }

        // Vérifier si tous les champs requis sont remplis
        if (!newPassword || !confirmNewPassword || !email || !uidb64 || !token) {
            alert('Veuillez remplir tous les champs requis.');
            return; // Arrêter l'exécution si un champ requis est vide
        }

        // Si tous les champs sont valides et remplis, vous pouvez soumettre le formulaire
        alert('Formulaire prêt à être envoyé !');
        // Soumettre le formulaire ou exécuter d'autres actions ici
        // Vous pouvez ajouter ici la logique pour envoyer les données à votre backend
    });
});


// Fonction pour créer le bouton "Modifier"
function createModifyButton() {
    const modifyButton = document.createElement('button');
    modifyButton.className = 'modify-button';
    const modifyIcon = document.createElement('img');
    modifyIcon.src = '../images/Edit 1.png';
    modifyIcon.alt = 'Icône Modifier';
    modifyButton.appendChild(modifyIcon);
    modifyButton.appendChild(document.createTextNode(' Modifier'));
    return modifyButton;
}

// Ajout d'un écouteur d'événement sur chaque bouton "Modifier"
document.addEventListener('DOMContentLoaded', () => {
    const modifyButtons = document.querySelectorAll('.modify-button');
    modifyButtons.forEach(button => {
        button.addEventListener('click', () => {
            replaceParagraphWithInput(button);

            // Afficher l'icône de visibilité du mot de passe lorsque le bouton "Modifier" est cliqué
            const toggleIcon = document.querySelector('.toggle-password');
            if (toggleIcon) {
                toggleIcon.style.display = 'inline-block';
            }
        });
    });

    // Ajout d'un écouteur d'événement sur le bouton "Ajouter"
    const addButton = document.querySelector('.ajouter-button');
    if (addButton) {
        addButton.addEventListener('click', convertInputToParagraph);
    }
});

/*********************************************** */
function modifierInfos() {
    // Ajouter une marge à .left-info
    const leftInfoContainer = document.querySelector('.left-info');
    leftInfoContainer.style.margin = '8px'; // Ajouter une marge de 20px (ou ajustez selon vos besoins)


    const fieldsToEdit = [
        { selector: '.right-info p:nth-child(1)', type: 'input', label: 'Nom' },
        { selector: '.right-info p:nth-child(2)', type: 'input', label: 'Prénom' },
        { selector: '.right-info p:nth-child(3)', type: 'radio', label: 'Sexe', options: ['Femme', 'Homme'] },
        { selector: '.right-info p:nth-child(4)', type: 'select', label: 'Etablissement', options: ['ESI', 'USTHB', 'Autre'] },
        {
            selector: '.right-info p:nth-child(5)', type: 'select', label: 'Diplome', options: ['Licence',
                'Doctorat',
                'Diplôme d\'Études Supérieures',
                'Diplôme de Formation Approfondie',
                'Diplôme d\'Études Approfondies',
                'Master',
                'Ingéniorat',
                'Autre']
        },
        { selector: '.right-info p:nth-child(6)', type: 'input', label: 'Numéro de téléphone' },
        { selector: '.right-info p:nth-child(7)', type: 'input', label: 'DPLP lien' },
        { selector: '.right-info p:nth-child(8)', type: 'input', label: 'Research gate lien' },
        { selector: '.right-info p:nth-child(9)', type: 'input', label: 'Google scholar lien' },
        { selector: '.right-info p:nth-child(10)', type: 'input', label: 'Site web' },
        { selector: '.right-info p:nth-child(11)', type: 'input', label: 'ORCIDE' },
        { selector: '.right-info p:nth-child(12)', type: 'input', label: 'H-index' },
        { selector: '.right-info p:nth-child(13)', type: 'input', label: 'Equipe' },
        { selector: '.right-info p:nth-child(14)', type: 'select', label: 'Qualite', options: ['Enseignant-Chercheur', 'Chercheur', 'Doctorant', 'Autre'] },
        { selector: '.right-info p:nth-child(15)', type: 'select', label: 'Grade-enseignement', options: ['Professeur', 'MCA', 'MCB', 'MAA', 'MAB', 'Doctorant', 'NULL'] },
        { selector: '.right-info p:nth-child(16)', type: 'select', label: 'Grade-recherche', options: ['Directeur de recherche', 'Maître de recherche', 'NULL'] }
    ];

    fieldsToEdit.forEach(({ selector, type, label, options }) => {
        const element = document.querySelector(selector);

        if (type === 'input') {
            let value = element.textContent.trim();

            element.innerHTML = `<input type="text" placeholder="${label}" value="${value}" onfocus="clearPlaceholder(this)">`;
        } else if (type === 'select') {
            const currentValue = element.textContent.trim();
            const selectOptions = options.map(option => `<option ${option === currentValue ? 'selected' : ''}>${option}</option>`).join('');
            element.innerHTML = `<select><option disabled selected>${label}</option>${selectOptions}</select>`;
        } else if (type === 'radio') {
            const currentValue = element.textContent.trim();
            const radioInputs = options.map(option => `
                <input type="radio" id="${option}" name="gender" value="${option}" ${option === currentValue ? 'checked' : ''}>
                <label for="${option}">${option}</label>
            `).join('');
            element.innerHTML = `<div style="display: flex; align-items: center;">${radioInputs}</div>`;
        }
    });

    // Modifier le bouton "Modifier" en "Appliquer"
    const modifierButton = document.querySelector('.modifier-button');
    modifierButton.innerHTML = '<img src="../images/Tick white.png">Appliquer';
    modifierButton.style.marginright = '-10px';
    // Changer le gestionnaire d'événement du bouton pour appliquer les modifications
    modifierButton.onclick = appliquerModifications;
}

// Fonction pour effacer le placeholder lorsqu'un champ est actif
function clearPlaceholder(input) {
    input.placeholder = '';
}
function appliquerModifications() {
    // Restaurer la marge de .left-info
    const leftInfoContainer = document.querySelector('.left-info');
    leftInfoContainer.style.margin = '2px'; // Restaurer la marge d'origine

    // Validation du champ "Numéro de téléphone"
    const telephoneInput = document.querySelector('.right-info p:nth-child(6) input');
    if (telephoneInput) {
        const telephoneValue = telephoneInput.value.trim();

        // Vérifier que le numéro de téléphone contient au moins 10 chiffres
        if (telephoneValue.length !== 10 || !/^\d+$/.test(telephoneValue)) {
            alert('Le numéro de téléphone doit contenir exactement 10 chiffres.');
            return; // Arrêter l'exécution si la validation échoue
        }
    }

    // Transformer les paragraphes contenant des liens en liens cliquables
    const paragraphs = document.querySelectorAll('.right-info p');

    paragraphs.forEach(paragraph => {
        const link = paragraph.querySelector('a.redirect-link');

        if (link) {
            const href = link.getAttribute('href');
            const linkText = link.textContent;

            // Créer un nouvel élément <a> avec le lien
            const newLink = document.createElement('a');
            newLink.href = href;
            newLink.textContent = linkText;

            // Remplacer le paragraphe par le nouvel élément <a>
            paragraph.parentNode.replaceChild(newLink, paragraph);
        }
    });

    // Appliquer les autres modifications si la validation réussit
    const fieldsToEdit = [
        '.right-info p:nth-child(1) input', // Nom
        '.right-info p:nth-child(2) input', // Prénom
        '.right-info p:nth-child(6) input', // Numéro de téléphone
        '.right-info p:nth-child(7) input', // DPLP lien
        '.right-info p:nth-child(8) input', // Research gate lien
        '.right-info p:nth-child(9) input', // Google scholar lien
        '.right-info p:nth-child(10) input', // Site web
        '.right-info p:nth-child(11) input', // ORCIDE
        '.right-info p:nth-child(12) input', // H-index
        '.right-info p:nth-child(13) input', // Equipe
        '.right-info p:nth-child(14) select', // Qualite
        '.right-info p:nth-child(4) select', // Etablissement
        '.right-info p:nth-child(5) select', // Diplome
        '.right-info p:nth-child(15) select', // Grade-enseignement
        '.right-info p:nth-child(16) select' // Grade-recherche
    ];

    fieldsToEdit.forEach(selector => {
        const inputOrSelect = document.querySelector(selector);

        if (inputOrSelect) {
            if (inputOrSelect.tagName === 'INPUT' || inputOrSelect.tagName === 'SELECT') {
                let newValue;
                if (inputOrSelect.tagName === 'INPUT') {
                    newValue = inputOrSelect.value;
                } else if (inputOrSelect.tagName === 'SELECT') {
                    newValue = inputOrSelect.options[inputOrSelect.selectedIndex].text;
                }
                const parentElement = inputOrSelect.closest('p');
                parentElement.textContent = newValue;
            }
        }
    });

    // Gérer spécifiquement le champ "Sexe" (radio buttons)
    const sexeField = document.querySelector('.right-info p:nth-child(3)');
    const selectedRadioButton = document.querySelector('.right-info p:nth-child(3) input[type="radio"]:checked');

    if (sexeField) {
        if (selectedRadioButton) {
            const selectedValue = selectedRadioButton.value;
            sexeField.textContent = selectedValue;
        } else {
            // Remettre le texte original si aucun bouton radio n'est sélectionné
            const originalText = getFieldOriginalValue('.right-info p:nth-child(3)');
            sexeField.textContent = originalText;
        }
    }

    // Afficher un message de succès
    alert('Vos informations ont été modifiées avec succès!');


    // Modifier le bouton "Appliquer" en "Modifier"
    const modifierButton = document.querySelector('.modifier-button');
    modifierButton.innerHTML = '<img src="../images/Edit 1.png">Modifier';

    // Changer le gestionnaire d'événement du bouton pour revenir à "Modifier"
    modifierButton.onclick = modifierInfos;
}

// Fonction pour récupérer le texte original d'un champ spécifique
function getFieldOriginalValue(selector) {
    const fieldElement = document.querySelector(selector);
    return fieldElement ? fieldElement.textContent.trim() : '';
}


