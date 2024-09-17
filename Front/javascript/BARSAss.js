var navbarItem = `     <nav>
<div class="sidebar">
    <div class="logo-container">

        <span>
            <img src="../images/FINALWHITE.png" alt="logo" class="logo-image">
        </span>
        
    </div>

    <ul class="nav-links">
        <button class="button-links" id="button-link">
            <li class="links">
                <a class="link_other" href="../html/accueilass.html">
                    <img src="../images/Vector.png" class='icon'>
                    <span class="link_name">Acceuil</span>
                </a>
            </li>
        </button>
        <button class="button-links">
            <li class="links">
                <a class="link_other" href="#">
                    <img src="../images/Search.png" class='icon'>
                    <span class="link_name"> Recherche</span>
                    <i class="fa-solid fa-angle-down" id="toggleSubMenu"></i>
                </a>
                <div class="sub_sub_menu">
                    <ul class="sub_menu">
                        <li class="sous-choice"> <i class="fa-solid fa-caret-right"></i><a class="liste_am"
                                href="../html/Recherche1ass.html"> Chercheurs</a></li>
                        <li class="sous-choice"><i class="fa-solid fa-caret-right"></i><a class="liste_am"
                                href="../html/Recherche2ass.html">Publications</a></li>
                        <li class="sous-choice"><i class="fa-solid fa-caret-right"></i><a class="liste_am"
                                href="../html/Recherche3ass.html">Encadrements </a></li>
                        <li class="sous-choice"><i class="fa-solid fa-caret-right"></i><a class="liste_am"
                                href="../html/Recherche4ass.html">Projets</a></li>
                    </ul>
                </div>
            </li>
        </button>

        <button class="button-links">
            <li class="links">
                <a class="link_other" href="#">
                    <img src="../images/news.png" class='icon'>
                    <span class="link_name"> Publications </span>
                    <i class="fa-solid fa-angle-down" id="toggleSubMenuu"></i>
                </a>
                <div class="sub_sub_menu">
                    <ul class="sub_menu">
                        <li class="sous-choice2"> <i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/Ajtpubass.html">Ajouter une
                                publication</a>
                        </li>
                        <li class="sous-choice2"> <i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/Ajtconf-revueass.html">Ajouter une
                                conf-journal</a>
                        </li>
                        <li class="sous-choice2"><i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/listedepublicationass.html">Liste des publications</a>
                        </li>
                    </ul>
                </div>
            </li>
        </button>
        <button class="button-links">
            <li class="links">
                <a class="link_other" href="#">

                    <img src="../images/encadrement.png" class='icon'>
                    <span class="link_name"> Encadrements</span>
                    <i class="fa-solid fa-angle-down" id="toggleSubMenuuu"></i>
                </a>
                <div class="sub_sub_menu">
                    <ul class="sub_menu">
                        <li class="sous-choice2"> <i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/Ajtencadrementass.html">Ajouter un Encadrement</a>
                        </li>
                        <li class="sous-choice2"><i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/listedeencadrementass.html">Liste des Encadrements</a>
                        </li>
                    </ul>
                </div>
            </li>
        </button>
        <button class="button-links">
            <li class="links">
                <a class="link_other" href="#">
                    <img src="../images/list.png" class='icon'>
                    <span class="link_name"> Projets </span>
                    <i class="fa-solid fa-angle-down" id="toggleSubMenuuuu"></i>
                </a>
                <div class="sub_sub_menu">
                    <ul class="sub_menu">
                        <li class="sous-choice"><i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/Ajtprojetass.html"> Ajouter un
                                Projet </a></li>
                        <li class="sous-choice"><i class="fa-solid fa-caret-right"></i><a class="liste2"
                                href="../html/listedeprojetass.html">Liste des Projets</a></li>
                    </ul>
                </div>
            </li>
        </button>
        <button class="button-links">
            <li class="links">
                <a class="link_other" href="../html/statistiquesass.html">
                    <img src="../images/Icons.png" class='icon'>
                    <span class="link_name"> statistique </span>
                </a>
            </li>
        </button>
        <button class="button-links">

        <li class="links">
        <a class="link_other" href="../html/chercheursass.html">
         <img src="../images/Group 3.png" class='icon'>
         <span class="link_name" >  Chercheurs </span>
     </a>
     </li>
 </button>
        </button>
        
        <button class="button-links">
            <li class="links">
                <a class="link_other" id="link_deconnecter"href="#">
                    <img src="../images/Logout.png" class='icon'>
                    <span class="link_name "> Déconnecter </span>
                </a>
            </li>
    </ul>
    </button>
</div>
</nav>

<div class="top-bar-right">
        <div class="aide">
            <button><img src="../images/help.png" alt="aide"></button>
        </div>
        <div class="settings">
            <button onclick="toggleColorPickerModal()">
                <img src="../images/paramerte.png" alt="Paramètres">
            </button>
            <div class="color-picker-modal" id="colorPickerModal">
                <div class="color-picker-modal-content">
                    <h2>
                        Changer la couleur
                        <span class="close-modal" onclick="closeColorPickerModal()">&times;</span>
                    </h2>
                    <div class="color-picker">
                        <button onclick="changeSidebarColor('#181d38')" style="--button-color: #181d38;"></button>
                        <button onclick="changeSidebarColor('#365486')" style="--button-color: #365486;"></button>
                        <button onclick="changeSidebarColor('#64379F')" style="--button-color: #64379F;"></button>
                        <button onclick="changeSidebarColor('#365486')" style="--button-color: #5b7eba;"></button>
                    </div>
            
            
                </div>
            </div>
        </div>
        <div class="notification">
            <button id="notificationBtn" onclick="toggleNotificationPanel()">
                <img src="../images/notification.png" alt="Notifications">
                <span id="notificationBadge" class="notification-badge"></span>
            </button>
            <div class="notification-panel" id="notificationPanel" style="display: none;">
                <h3>Notifications</h3>
                <ul id="notificationList" style="max-height: 120px; overflow-y: auto;">
                    <!-- List of notifications will be populated dynamically -->
                </ul>
                <button id="showMoreBtn" style="display: none;" onclick="showMoreNotifications()">Voir plus</button>
            </div>
            
        </div>
        <div class="profile" onclick="redirectToProfilePage()">
            <img src="../images/blank-profile-picture-973460_1280 copy.png" alt="Profil">
        </div>
    </div>
`


document.body.insertAdjacentHTML("afterbegin", navbarItem);


function redirectToProfilePage() {
    // Redirection vers la page du profil de l'utilisateur
    window.location.href = '../html/VoirProfilAssisstant.html';
  }
  
  
function redirectToProfilePage1() {
    // Redirection vers la page du profil de l'utilisateur
    window.location.href = '../html/aide.html';
  }
  
  