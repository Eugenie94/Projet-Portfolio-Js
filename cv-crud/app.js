// J'importe les données

import {
    cvs
} from "./cv.js";

console.table(cvs);

// // Upload image JS
// var inputFile = document.createElement('input');
// inputFile.type = 'file';
// inputFile.accept = 'image/*';
// inputFile.addEventListener('change', function () {
//     var reader = new FileReader();
//     reader.readAsDataURL(inputFile.files[0]);
//     console.log('Done');
// });
// document.getElementById('form')[0].appendChild(inputFile);



// Dans le fichier app.js, je créée une nouvelle fonction fetchAllCvs() qui va nous permettre d'afficher la liste des films à afficher en HTML.

function fetchAllCvs(cvs) {
    // Je récupère l'élement
    const elApp = document.getElementsByTagName("tbody")[0];
    elApp.innerHTML = "";

    let data = "";
    // Je récupère les données données (avec un ajout du button modification avec pour valeur index)
    // add <td>${p.image}</td> apres
    cvs.forEach((c, index) => {
        data += `<tr>
<td>${c.name}</td>
<td>${c.propos}</td>
<td>${c.experiences}</td>
<td>${c.formations}</td>
<td>${c.competences}</td>

<td>
<button class="edit btn btn-sm btn-outline-success" value="${index}">Modifier</button>
<button class="delete btn btn-sm btn-outline-danger" value="${index}">Supprimer</button>
</td>
</tr>`;
    });

    // J'affiche les éléments dans le HTML
    elApp.innerHTML += data;


    //____________________________________ DEBUT D'AJOUT D'UNE LIGNE ____________________________________ //

    // J'ajoute un eventListerner au clic sur le bouton d'enregistrement du formulaire.

    document.getElementById("form-save").addEventListener("click", function () {
        // Récupération des champs
        const name = document.getElementById("name").value;
        const propos = document.getElementById("propos").value;
        const experiences = document.getElementById("experiences").value;
        const formations = document.getElementById("formations").value;
        const competences = document.getElementById("competences").value;
        // const image = document.getElementById("image").value;

        //  && image add apres
        if (name && propos && experiences && formations && competences) {
            // Nouvelle ligne
            const cv = {
                name: name,
                propos: propos,
                experiences: experiences,
                formations: formations,
                competences: competences,
            };

            // J'ajoute la nouvelle ligne
            cvs.push(cv);

            // Notification d'ajout
            ajout();

            // Je créée une nouvelle fonction hideForm.

            function hideForm() {
                elForm.style.display = "none";
                elContent.style.display = "block";

                document.getElementById("name").value = "";
                document.getElementById("propos").value = "";
                document.getElementById("experiences").value = "";
                document.getElementById("formations").value = "";
                document.getElementById("competences").value = "";
            }

            // J'appelle ma fonction hideForm
            hideForm();


            // J'affiche le nouveau tableau
            return fetchAllCvs(cvs);
        }


    });



    // J'ajoute un eventListerner au clic sur le bouton annulation du formulaire

    document.getElementById("form-cancel").addEventListener("click", function () {

        // Je créée une nouvelle fonction hideForm.
        function hideForm() {
            elForm.style.display = "none";
            elContent.style.display = "block";

            document.getElementById("name").value = "";
            document.getElementById("propos").value = "";
            document.getElementById("experiences").value = "";
            document.getElementById("formations").value = "";
            document.getElementById("competences").value = "";
        }

        hideForm();
    });

    //__________________________________ FIN D'AJOUT D'UNE LIGNE ___________________________________ //


    //__________________________________ DEBUT MODIFICATION ET SUPPRESSION D'UNE LIGNE ____________________________ //

    // Je créée chaque bouton "Editer"
    document.querySelectorAll("button.edit").forEach(b => {
        b.addEventListener("click", function () {
            return editCv(this.value);
        });
    });

    // Je créée chaque bouton "Supprimer"
    document.querySelectorAll("button.delete").forEach(b => {
        b.addEventListener("click", function () {
            return deleteCv(this.value);
        });
    });


    // Je créée une nouvelle fonction editcv avec en paramètre l'index de la ligne.

    function editCv(index) {
        // Je récupère la ligne via son index
        const cv = cvs.find((c, i) => {
            return i == index;
        });

        // J'alimente les champs
        document.getElementById("name").value = cv.name;
        document.getElementById("propos").value = cv.propos;
        document.getElementById("experiences").value = cv.experiences;
        document.getElementById("formations").value = cv.formations;
        document.getElementById("competences").value = cv.competences;
        document.getElementById("hidden").value = index;

        displayForm();

        cvs.push(cv);

        // Notification de modification
        modification();

        // Dans cette condition, je vérifie si l'utilisateur fait une modification (on utilise la fonction splice) ou un ajout de données (fonction push).
        if (document.getElementById("hidden").value.length > 0) {
            cvs.splice(document.getElementById("hidden").value, 1, cv);
        } else {
            cvs.push(cv);
        }
    }


    // Je créée la notification de modification de projet.
    function ajout() {
        alert('Votre projet à bien été ajouté.');
    }


    // Je créée la notification de modification de projet.
    function modification() {
        alert('Votre modification a bien été prise en compte.');
    }

    // Je créée la notification de suppression de projet.
    function suppression() {
        alert('Votre suppression a bien été prise en compte.');
    }

    // Je créée une nouvelle fonction deletecv avec en paramètre l'index de la ligne.

    function deleteCv(index) {
        if (confirm("Confirmez-vous la suppression de cet élement ?")) {
            cvs.splice(index, 1);
            fetchAllCvs(cvs);
        }

        // Notification de suppression
        suppression();
    }

    //__________________________________ FIN MODIFICATION ET SUPPRESSION D'UNE LIGNE ____________________________ //

}

fetchAllCvs(cvs);



// Je cache ce formulaire en JavaScript.

const elForm = document.getElementById("form");
elForm.style.display = "none";
const elContent = document.getElementById("content");


// J'ajoute un eventListerner au clic sur le bouton d'ajout.

document.getElementById("form-add").addEventListener("click", function () {
    displayForm();
});


// Cela appel la fonction displayForm pour afficher le formulaire et masquer le reste du contenu.

function displayForm() {
    elForm.style.display = "block";
    elContent.style.display = "none";
}