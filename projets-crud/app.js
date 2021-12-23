// J'importe les données

import {
    projects
} from "./projects.js";

console.table(projects);


// Dans le fichier app.js, je créée une nouvelle fonction fetchAllProjects() qui va nous permettre d'afficher la liste des films à afficher en HTML.

function fetchAllProjects(projects) {
    // Je récupère l'élement
    const elApp = document.getElementsByTagName("tbody")[0];
    elApp.innerHTML = "";

    let data = "";
    // Je récupère les données données (avec un ajout du button modification avec pour valeur index)
    projects.forEach((p, index) => {
        data += `<tr>
<td>${p.name}</td>
<td>${p.description}</td>
<td>${p.url}</td>
<td>${p.image}</td>

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
        const description = document.getElementById("description").value;
        const url = document.getElementById("url").value;
        const image = document.getElementById("image").value;

        if (name && description && url && image) {
            // Nouvelle ligne
            const project = {
                name: name,
                description: description,
                url: url,
                image: image
            };

            // J'ajoute la nouvelle ligne
            projects.push(project);

            // Notification d'ajout
            ajout();

            // Je créée une nouvelle fonction hideForm.

            function hideForm() {
                elForm.style.display = "none";
                elContent.style.display = "block";

                document.getElementById("name").value = "";
                document.getElementById("description").value = "";
                document.getElementById("url").value = "";
                document.getElementById("image").value = "";
            }

            // J'appelle ma fonction hideForm
            hideForm();


            // J'affiche le nouveau tableau
            return fetchAllProjects(projects);
        }


    });



    // J'ajoute un eventListerner au clic sur le bouton annulation du formulaire

    document.getElementById("form-cancel").addEventListener("click", function () {

        // Je créée une nouvelle fonction hideForm.
        function hideForm() {
            elForm.style.display = "none";
            elContent.style.display = "block";

            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("url").value = "";
            document.getElementById("image").value = "";
        }

        hideForm();
    });

    //__________________________________ FIN D'AJOUT D'UNE LIGNE ___________________________________ //


    //__________________________________ DEBUT MODIFICATION ET SUPPRESSION D'UNE LIGNE ____________________________ //

    // Je créée chaque bouton "Editer"

    document.querySelectorAll("button.edit").forEach(b => {
        b.addEventListener("click", function () {
            return editProject(this.value);
        });

    });

    // Je créée chaque bouton "Supprimer"
    document.querySelectorAll("button.delete").forEach(b => {
        b.addEventListener("click", function () {
            return deleteProject(this.value);
        });
    });

    // Je créée une nouvelle fonction editProject avec en paramètre l'index de la ligne.

    function editProject(index) {
        // Je récupère la ligne via son index
        const project = projects.find((p, i) => {
            return i == index;
        });

        // J'alimente les champs
        document.getElementById("name").value = project.name;
        document.getElementById("description").value = project.description;
        document.getElementById("url").value = project.url;
        // document.getElementById("image").value = project.image;
        document.getElementById("hidden").value = index;

        displayForm();

        projects.push(project);

        // Notification de modification
        modification();

        // Dans cette condition, je vérifie si l'utilisateur fait une modification (on utilise la fonction splice) ou un ajout de données (fonction push).
        if (document.getElementById("hidden").value.length > 0) {
            projects.splice(document.getElementById("hidden").value, 1, project);
        } else {
            projects.push(project);
        }

    }

    // Je créée la notification de modification de projet.
    function ajout() {
        alert('Votre projet à bien été ajouté.');
    }


    // Je créée la notification de modification de projet.
    function modification() {
        alert('Votre modification a bien été prise en compte.', 1000);
    }

    // Je créée la notification de suppression de projet.
    function suppression() {
        alert('Votre suppression a bien été prise en compte.');
    }

    // Je créée une nouvelle fonction deleteProject avec en paramètre l'index de la ligne.

    function deleteProject(index) {
        if (confirm("Confirmez-vous la suppression de ce projet ?")) {
            projects.splice(index, 1);
            fetchAllProjects(projects);
        }

        // Notification de suppression
        suppression();
    }

    //__________________________________ FIN MODIFICATION ET SUPPRESSION D'UNE LIGNE ____________________________ //

}

fetchAllProjects(projects);


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