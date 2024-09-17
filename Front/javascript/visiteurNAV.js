var visitBar = `
<nav class="top-bar" xmlns="http://www.w3.org/1999/html">
<div class="logo-container">

   <a href="../html/visiteur.html"><img src="../images/FINAL BLACK.png" alt="logo" class="logo-image"></a> 
</div>

<div class="top-bar-items">

    <div class="link_text">
        <a href="#">Accueil</a>
        <a href="#a-propos-nous" id="propos">A propos</a>
        <a href="#Contacts">Contacts</a>
        <a href="../html/aidevisiteur.html">Aide</a>
    </div>


    <div class="button-two">
        
    
        <div class="dropdown2">
            <div class="filtrex">
                <div class="textBox-with-icon2">
                        <input type="text" class="textBox2" style="margin-top: 1%;
                        height: 2.7vw;
                        width: 130%;
                        border: 2px solid #64379F ;
                        border-radius: 10px;
                        border-width: 100;
                        cursor: pointer;
                        outline: none;
                        font-family: poppins;" placeholder="      Explorer" readonly>
                        <img class="menu-icon2" src="../images/Down 2.png" alt="menu-icon Icon" />
                  </div>
                  <div class="option2" style="font-size: 1vw;
                  padding-left: 3px;
                  padding-right: 3px;
                  padding-top: 3px;
                  padding-bottom: 3px;
                  position: absolute;
                  top: 140%;
                  background: white;
      
                  border: 2px solid #64379F ;
                  border-radius: 6px;
                  width: 20%;
                  margin-left: 0.3%;">
                        <a href="../html/ExploreRecherche1.html" onclick="show('Recherche: chercheur')" >Recherche:Chercheur</a></br>
                        <a href="../html/ExploreRecherche2.html" onclick="show('Recherche: Publication')">Recherche:Publication</a></br>
                        <a  href="../html/ExploreRecherche4.html" onclick="show('Recherche: Projet')">Recherche:Projet</a></br>
                 </div>
            </div>
        </div>



         <button class="connect-button" onclick="redirectToSeConnecter()">Se connecter</button>


   </div>
</div>
</nav>  `



document.body.insertAdjacentHTML("afterbegin",visitBar)

function redirectToSeConnecter() {
        window.location.href = "../html/seconnecter.html";
    }
