// Fonction pour afficher une notification avec un message et une icône
function showNotification(message) {
    var notificationList = document.getElementById("notificationList");

    // Création d'un nouvel élément de notification
    var newItem = document.createElement("li");
    newItem.classList.add("notification-item");

    // Création d'un élément span pour contenir l'icône
    var iconSpan = document.createElement("span");
    iconSpan.classList.add("notification-icon");

    // Création de l'élément img pour l'icône
    var iconImg = document.createElement("img");
    var imagePath = "../images/notification-icon.png"; // Spécifier le chemin de l'icône
    iconImg.src = imagePath;
    iconImg.alt = "Notification Icon"; // Texte alternatif pour l'icône

    // Gestion d'erreur de chargement de l'icône
    iconImg.onerror = function () {
        console.error("Erreur de chargement de l'icône :", imagePath);
    };

    // Ajout de l'icône à l'élément span
    iconSpan.appendChild(iconImg);

    // Création d'un élément span pour le message de notification
    var messageSpan = document.createElement("span");
    messageSpan.classList.add("message");
    messageSpan.textContent = message;

    // Ajout de l'élément span contenant l'icône et le message à l'élément li
    newItem.appendChild(iconSpan);
    newItem.appendChild(messageSpan);

    // Ajout de l'élément à la liste des notifications (à la fin)
    notificationList.appendChild(newItem);

    // Générer un identifiant unique pour cette notification
    var notificationId = "notification_" + Date.now();

    // Sauvegarde de la notification dans le localStorage avec son identifiant
    localStorage.setItem(notificationId, message);

    // Afficher le badge de notification
    var notificationBadge = document.getElementById("notificationBadge");
    notificationBadge.style.display = "block";
}


// Fonction pour afficher toutes les notifications sauvegardées (du plus récent au plus ancien)
function displaySavedNotifications() {
    var notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = ''; // Effacer le contenu existant

    // Récupérer toutes les clés du localStorage qui commencent par "notification_"
    var keys = Object.keys(localStorage).filter(function (key) {
        return key.startsWith("notification_");
    });

    // Inverser l'ordre des clés pour afficher les notifications du plus récent au plus ancien
    keys.reverse().forEach(function (key) {
        var message = localStorage.getItem(key);

        // Créer un nouvel élément <li> pour la notification
        var newItem = document.createElement("li");
        newItem.classList.add("notification-item");

        // Créer un élément <span> pour contenir l'icône
        var iconSpan = document.createElement("span");
        iconSpan.classList.add("notification-icon");

        // Créer l'élément <img> pour l'icône
        var iconImg = document.createElement("img");
        iconImg.src = "../images/notification-icon.png"; // Spécifier le chemin de l'icône
        iconImg.alt = "Notification Icon"; // Texte alternatif pour l'icône

        // Ajouter l'icône à l'élément <span> de l'icône
        iconSpan.appendChild(iconImg);

        // Créer un élément <span> pour le message de la notification
        var messageSpan = document.createElement("span");
        messageSpan.classList.add("message");
        messageSpan.textContent = message;

        // Ajouter l'icône et le message à l'élément <li> de la notification
        newItem.appendChild(iconSpan);
        newItem.appendChild(messageSpan);

        // Ajouter la notification à la liste des notifications
        notificationList.appendChild(newItem);
    });
}

// Fonction pour basculer l'affichage du panneau de notifications
function toggleNotificationPanel() {
    var notificationPanel = document.getElementById("notificationPanel");
    var notificationBadge = document.getElementById("notificationBadge");

    // Vérifier si le panneau de notifications est actuellement ouvert
    var isPanelOpen = notificationPanel.style.display !== "none";

    if (!isPanelOpen) {
        // Afficher le panneau de notification
        displaySavedNotifications();
        notificationPanel.style.display = "block";
        notificationBadge.style.display = "none"; // Masquer le badge lorsque le panneau est ouvert
    } else {
        // Masquer le panneau de notification
        notificationPanel.style.display = "none";
        notificationBadge.style.display = "block"; // Afficher le badge lorsque le panneau est fermé
    }
}

// Appeler la fonction pour afficher les notifications sauvegardées au chargement de la page
window.onload = function () {
    displaySavedNotifications();

    // Ajouter un écouteur d'événements pour les clics sur le document
    document.addEventListener('click', function (event) {
        var notificationPanel = document.getElementById("notificationPanel");
        var notificationBadge = document.getElementById("notificationBadge");

        // Vérifier si la cible du clic n'est pas à l'intérieur du panneau de notification
        if (!notificationPanel.contains(event.target) && event.target !== notificationBadge) {
            // Masquer le panneau de notification si le clic est en dehors de celui-ci
            notificationPanel.style.display = "none";
            notificationBadge.style.display = "block"; // Afficher le badge lorsque le panneau est fermé
        }
    });
};


// Fonction pour appliquer les changements
function applyChange(message) {
    showPopup();    // Par exemple, envoyer une requête AJAX, mettre à jour les données, etc.
    showNotification(message); // Afficher la notification avec le message personnalisé
}
