

document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  const buttons = document.querySelectorAll(".button-links");

  // Function to toggle button background color
  function toggleButtonColor(button) {
    button.classList.toggle("clicked");
  }

  // Function to toggle submenu visibility and icon (if present)
  function toggleSubMenu(button) {
    const subMenu = button.querySelector(".sub_sub_menu");
    if (subMenu) {
      // Toggle submenu visibility
      subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
      console.log(subMenu.style.display);
      // Update icon based on submenu visibility
      const icon = button.querySelector(".fa-angle-down");
      const iconup = button.querySelector(".fa-chevron-up");
      if (icon) { //down
        if (subMenu.style.display === "block") {
          icon.classList.remove("fa-angle-down");
          icon.classList.add("fa-chevron-up");
          console.log("first case");
        }
      }

      if (iconup) {
        if (subMenu.style.display === "none") {
          console.log("second case");

          iconup.classList.remove("fa-chevron-up");
          iconup.classList.add("fa-angle-down");
        }
      }
    }
  }

  // Close all submenus initially (optional)
  buttons.forEach(function (button) {
    const subMenu = button.querySelector(".sub_sub_menu");
    if (subMenu) {
      subMenu.style.display = "none"; // Initially hide all submenus
    }
  });

  // Add event listeners to buttons
  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Prevent default action (e.g., following a link)
      event.preventDefault();

      // Reset the state of previously selected button (optional)
      resetPreviousButtonState(button);


      // Toggle the button's state
      toggleButtonColor(button);

      // Toggle the submenu and icon
      toggleSubMenu(button);
    });
  });

  // Function to reset the state of the previously selected button (optional)
  function resetPreviousButtonState(clickedButton) {
    const buttonsToSkip = ["recherche", "accueil"]; // Buttons to exclude from reset
    if (!buttonsToSkip.includes(clickedButton.textContent.toLowerCase())) {
      const previousClickedButton = document.querySelector(".button-links.clicked");
      if (previousClickedButton && previousClickedButton !== clickedButton) {
        toggleButtonColor(previousClickedButton);
        toggleSubMenu(previousClickedButton);

        const previousIcon = previousClickedButton.querySelector(".fa-angle-down");
        if (previousIcon) {
          previousIcon.classList.remove("fa-chevron-up");
          previousIcon.classList.add("fa-angle-down"); // Default down arrow
          if (previousClickedButton.querySelector(".sub_sub_menu").style.display === "block") {
            previousIcon.classList.remove("fa-angle-down");
            previousIcon.classList.add("fa-chevron-up"); // Up arrow if submenu is still open
          }
        }
      }
    }
  }


  // Add event listeners to sub-menu items to prevent click event from bubbling up (optional)
  const subMenus = document.querySelectorAll(".sub_menu");
  subMenus.forEach(function (subMenu) {
    subMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
});
/**************** */
/*
//de notification
document.addEventListener('DOMContentLoaded', function () {
  const notifButton = document.getElementById('notifButton');
  const notificationPanel = document.getElementById('notificationPanel');

  notifButton.addEventListener('click', function () {
    notificationPanel.classList.toggle('visible'); // Ajoute ou supprime la classe 'visible'
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const settingsButton = document.querySelector('.settings button');
  const settingsPanel = document.createElement('div');
  settingsPanel.id = 'settingsPanel';
  settingsPanel.innerHTML = `
      <h3>Paramètres</h3>
      <label for="color">Couleur :</label>
      <input type="color" id="color" name="color" value="#ff0000"><br><br>
      <label for="language">Langue :</label>
      <select id="language" name="language">
          <option value="fr">Français</option>
          <option value="en">English</option>
      </select>
  `;
  document.body.appendChild(settingsPanel);


  settingsButton.addEventListener('click', function () {
    settingsPanel.style.display = 'block';
  });

  helpButton.addEventListener('click', function () {
    helpPanel.style.display = 'block';
  });

  // Fermer les panneaux en cliquant à l'extérieur
  document.addEventListener('click', function (event) {
    if (!settingsButton.contains(event.target) && !settingsPanel.contains(event.target)) {
      settingsPanel.style.display = 'none';
    }

  });
});


document.addEventListener('DOMContentLoaded', function () {
  const helpButton = document.getElementById('helpButton');
  const helpPanel = document.getElementById('helpPanel');
  const userInput = document.getElementById('userInput');
  const sendMessageButton = document.getElementById('sendMessageButton');
  const chatMessages = document.getElementById('chatMessages');

  helpButton.addEventListener('click', function () {
    helpPanel.classList.toggle('hidden');
  });

  sendMessageButton.addEventListener('click', function () {
    const question = userInput.value.trim();
    if (question !== '') {
      appendUserMessage(question);
      userInput.value = ''; // Effacer le champ de saisie après l'envoi
      // Ici, vous pouvez appeler votre fonction pour gérer la réponse à la question
      // getChatGPTResponse(question);
      simulateResponse(question);
    }
  });

  function appendUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
  }

  function appendGPTMessage(message) {
    const gptMessage = document.createElement('div');
    gptMessage.classList.add('gpt-message');
    gptMessage.textContent = message;
    chatMessages.appendChild(gptMessage);
  }

  // Fonction factice pour simuler la réponse de l'assistant
  function simulateResponse(question) {
    const answer = "Voici la réponse à votre question : " + question;
    appendGPTMessage(answer);
  }
});


/*********************************************************** */
// ajout.js



/****************************changer couleur******* */
function redirectToProfilePage() {
  // Redirection vers la page du profil de l'utilisateur
  window.location.href = '../html/voirprofildechercheurluimeme.html';
}


function toggleColorPickerModal() {
  const modal = document.getElementById('colorPickerModal');
  modal.style.display = 'block';
}

function closeColorPickerModal() {
  const modal = document.getElementById('colorPickerModal');
  modal.style.display = 'none';
}
// Fonction pour changer la couleur de la barre latérale
function changeSidebarColor(color) {
  const sidebar = document.querySelector('.sidebar');
  const buttonLinks = document.querySelectorAll('.button-links');

  // Fonction pour générer la couleur hover à partir de la couleur de base
  function getHoverColor(baseColor) {
    return lightenDarkenColor(baseColor, 20); // Augmente la luminosité de 20%
  }

  // Fonction pour générer la couleur clicked à partir de la couleur de base
  function getClickedColor(baseColor) {
    return darkenColor(baseColor, 20); // Assombrit la couleur de 20%
  }

  // Fonction générique pour ajuster la luminosité d'une couleur (en hexadécimal)
  function lightenDarkenColor(color, percent) {
    let num = parseInt(color.slice(1), 16);
    let amt = Math.round(2.55 * percent);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00FF) + amt;
    let g = (num & 0x0000FF) + amt;
    r = Math.min(255, Math.max(0, r));
    b = Math.min(255, Math.max(0, b));
    g = Math.min(255, Math.max(0, g));
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }

  // Fonction pour assombrir une couleur (en hexadécimal)
  function darkenColor(color, percent) {
    let num = parseInt(color.slice(1), 16);
    let amt = Math.round(2.55 * percent);
    let r = (num >> 16) - amt;
    let b = ((num >> 8) & 0x00FF) - amt;
    let g = (num & 0x0000FF) - amt;
    r = Math.min(255, Math.max(0, r));
    b = Math.min(255, Math.max(0, b));
    g = Math.min(255, Math.max(0, g));
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  }

  // Mettre à jour la couleur de fond de la barre latérale
  sidebar.style.backgroundColor = color;

  // Mettre à jour les couleurs des boutons et ajouter les événements hover et clicked
  buttonLinks.forEach((button) => {
    button.style.backgroundColor = color;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = getHoverColor(color);
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = color;
    });

    button.addEventListener('click', () => {
      button.classList.toggle('clicked');
      if (button.classList.contains('clicked')) {
        button.style.backgroundColor = getClickedColor(color);
      } else {
        button.style.backgroundColor = getHoverColor(color);
      }
    });
  });

  // Enregistrer la couleur sélectionnée dans le stockage local
  localStorage.setItem('sidebarColor', color);
}

// Fonction pour charger la couleur depuis le stockage local
function loadSidebarColor() {
  const savedColor = localStorage.getItem('sidebarColor');
  if (savedColor) {
    changeSidebarColor(savedColor); // Appliquer la couleur sauvegardée
  }
}

// Appeler loadSidebarColor au chargement de la page pour charger la couleur sauvegardée
document.addEventListener('DOMContentLoaded', () => {
  loadSidebarColor(); // Charger la couleur sauvegardée au chargement de la page

  // Écouter les événements de changement de couleur
  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) {
    colorPicker.addEventListener('input', (event) => {
      const selectedColor = event.target.value;
      changeSidebarColor(selectedColor); // Appliquer la nouvelle couleur sélectionnée
    });
  }
});

/***************************************de deconnection */
// Fonction pour afficher la modal de déconnexion
// Function to display the logout modal
function afficherModalDeconnexion() {
  // Create the overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  
  // Create the modal
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('modal', 'modal-small');
  
  // Modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  const deconnexionDiv = document.createElement('div');
  deconnexionDiv.id = 'deconnexion';
  
  const iconDeconnexion = document.createElement('img');
  iconDeconnexion.src = '../images/deconnexion.png';
  iconDeconnexion.alt = 'icon-deconnexion';
  iconDeconnexion.classList.add('icon-deconnexion');
  
  const spanDeconnexion = document.createElement('span');
  spanDeconnexion.textContent = 'Déconnexion';
  
  const confirmationMessage = document.createElement('p');
  confirmationMessage.textContent = 'Êtes-vous sûr de vouloir vous déconnecter ?';
  
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  
  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancel-reset';
  cancelButton.textContent = 'Annuler';
  
  const deconnexionButton = document.createElement('button');
  deconnexionButton.id = 'dec-btn';
  deconnexionButton.textContent = 'Se déconnecter';
  
  // Modal structure
  deconnexionDiv.appendChild(iconDeconnexion);
  deconnexionDiv.appendChild(spanDeconnexion);
  
  modalContent.appendChild(deconnexionDiv);
  modalContent.appendChild(confirmationMessage);
  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(deconnexionButton);
  modalContent.appendChild(buttonContainer);
  
  modal.appendChild(modalContent);
  
  // Add the modal to the page
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
  
  // Event handler for the Cancel button
  cancelButton.addEventListener('click', () => {
      cacherModalDeconnexion();
  });
  
  // Event handler for the Logout button
  deconnexionButton.addEventListener('click', () => {
      // Redirect to seconnecter.html
      window.location.href = 'seconnecter.html';
      // Hide the modal after redirection
      cacherModalDeconnexion();
  });
  
  // Display the modal
  overlay.style.display = 'block';
  modal.style.display = 'block';
}

// Function to hide the logout modal
function cacherModalDeconnexion() {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  
  // Remove the modal from the page
  if (overlay && modal) {
      overlay.style.display = 'none';
      modal.style.display = 'none';
      // Clean up elements to prevent memory leaks
      overlay.remove();
      modal.remove();
  }
}

// Call the function to display the modal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const deconnecterButton = document.getElementById('link_deconnecter');

  if (deconnecterButton) {
      deconnecterButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent the default behavior of the link
          afficherModalDeconnexion();
      });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const buttonLinks  = document.querySelectorAll('.button-links');

  buttonLinks.forEach((button) => {
      button.addEventListener('click', (event) => {
          const link = button.querySelector('a'); // Find the link inside the button

          if (link) {
              const href = link.getAttribute('href'); // Get the href attribute of the link
              if (href && href !== '#') {
                  window.location.href = href; // Redirect to the URL specified in href
              }
          }
      });
  });
});
