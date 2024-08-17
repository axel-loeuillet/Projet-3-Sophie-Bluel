//RÉCUPÉRATION DES PROJETS DEPUIS L'API
const works = await getWorks()
function getWorks() {
    return fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .catch(error => ('Error:', error));
}
console.log(works)

//AFFICHAGE DES PROJETS DANS LA GALERIE
function displayWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const data = works[i];
        let gallery = document.querySelector(".gallery");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figCaption = document.createElement("figcaption");
        figCaption.textContent = data.title;
        img.src = data.imageUrl;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallery.appendChild(figure);
    }
}
displayWorks(works)

//RÉCUPÉRATION DES PROJETS
const categories = await getListOfCategories()
console.log(categories)

function getListOfCategories() {
    return fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .catch(error => ('Error:', error));
}

//CRÉATION BUTTON "TOUS"
let category = document.querySelector(".category");
let btnTous = document.createElement("button");
btnTous.textContent = "Tous";
btnTous.setAttribute("data-categorie-id", "Tous");
category.appendChild(btnTous)
btnTous.addEventListener("click", function () {
})


//CRÉATION DES FILTRES DE CATÉGORIE
for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    let btn = document.createElement("button");
    btn.textContent = categorie.name;
    btn.classList.add("category-btn")
    btn.setAttribute("data-categorie-id", categorie.id)
    category.appendChild(btn)
    btn.addEventListener("click", function () {
    })
}

//FILTRAGE DES PROJETS DANS LA CATÉGORIE "TOUS"
const btnIdTous = document.querySelector('[data-categorie-id="Tous"]');
btnIdTous.addEventListener("click", function () {
    const filtreIdTous = works.filter(function (works) {
        return works.categoryId === 1, 2, 3;
    })
    document.querySelector(".gallery").innerHTML = "";
    displayWorks(filtreIdTous);
});

//FILTRAGE DES PROJETS PAR CATÉGORIE
const btnId1 = document.querySelector('[data-categorie-id="1"]');
const buttons = document.querySelectorAll(".category-btn")
btnId1.addEventListener("click", function () {
    const filtreId1 = works.filter(function (works) {
        return works.categoryId === 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    displayWorks(filtreId1);
});

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const dataCategoryId = button.getAttribute("data-categorie-id")
        const filtreId1 = works.filter(function (works) {
            return works.categoryId === Number(dataCategoryId);
        })
        document.querySelector(".gallery").innerHTML = "";
        displayWorks(filtreId1);
    })
});

//PARTIE CONNEXION

//AFFICHAGE MODE EDITION
if (sessionStorage.getItem("authToken")) {
    //CREATION ET AFFICHAGE DE LA BANNIÈRE
    const divBanner = document.createElement("div")
    divBanner.classList = "banner-hidden"
    const paragraph = document.createElement("p")
    paragraph.textContent = ' Mode édition ';
    const icon = document.createElement('i');
    icon.className = 'fa-regular fa-pen-to-square';
    paragraph.prepend(icon);
    divBanner.appendChild(paragraph)
    document.querySelector('body').appendChild(divBanner);
    //CHANGEMENT DU BOUTON "LOGIN" EN "LOGOUT"
    const loginBtn = document.querySelector(".cta-login")
    loginBtn.innerText = ""
    loginBtn.textContent = "logout"
    //DISPARITION DES FILTRES DE CATEGORIE
    category = document.querySelector(".category")
    category.innerText = ""
    //AJOUT DU BOUTON "MODIFIER"
    const divModify = document.createElement("div");
    const linkModify = document.createElement("a");
    const iconModify = document.createElement("i");
    linkModify.setAttribute("href", "#modal");
    linkModify.classList.add("modify")
    linkModify.textContent = " modifier ";
    linkModify.style.textDecoration = 'none';
    linkModify.style.color = 'black';
    iconModify.className = "fa-regular fa-pen-to-square";
    linkModify.prepend(iconModify);
    divModify.appendChild(linkModify);
    document.querySelector(".category").appendChild(divModify);
}

//PARTIE MODALE

//OUVERTURE ET FERMETURE DE LA MODALE AU "CLICK"
const affichageModal = document.querySelector(".modify")
const modalContainer = document.querySelector(".containerModals")
const closeModal = document.querySelector(".containerModals .fa-xmark")
const galleryModal = document.querySelector(".galleryModal")
affichageModal.addEventListener("click", () => {
    modalContainer.style.display = "flex"
})
closeModal.addEventListener("click", () => {
    console.log('.fa-xmark')
    modalContainer.style.display = "none";
})
modalContainer.addEventListener("click", (e) => {
    if (e.target.className == "containerModals") {
        modalContainer.style.display = "none";
    }
})

//AFFICHAGE DE LA GALLERY DANS LA MODAL
async function displayGalleryModal() {
    galleryModal.innerHTML = ""
    const gallery = await getWorks()
    gallery.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")
        trash.id = work.id
        img.src = work.imageUrl
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        galleryModal.appendChild(figure)
    })
    deleteWork()
}
displayGalleryModal()

//SUPPRESSION DES TRAVAUX DEPUIS LA MODALE
function deleteWork() {
    const AllBtnDelete = document.querySelectorAll(".fa-trash-can")
    AllBtnDelete.forEach(trash => {
        trash.addEventListener("click", (e) => {
            const id = trash.id
            const token = sessionStorage.getItem("authToken")
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }
                // Supprimer l'élément du DOM après une suppression réussie
                const figureToDelete = trash.closest('figure');
                if (figureToDelete) {
                    figureToDelete.remove();
                }
                console.log(`Élément avec l'id ${id} supprimé avec succès`);
            }).catch(error => {
                console.error('Erreur:', error);
            })
        })
    })
}

//AFFICHAGE DU DEUXIEME CONTENU DE LA MODALE 
const btnAddPicture = document.querySelector(".modalGallery button");
const modalAddWork = document.querySelector(".modalAddWork");
const modalGallery = document.querySelector(".modalGallery")
const arrowLeft = document.querySelector(".fa-arrow-left")
const mark = document.querySelector(".modalAddWork .fa-xmark")

function displayAddModal() {
    btnAddPicture.addEventListener("click", () => {
        modalAddWork.style.display = "flex"
        modalGallery.style.display = "none"
    })
    arrowLeft.addEventListener("click", () => {
        modalAddWork.style.display = "none"
        modalGallery.style.display = "flex"
    })
    mark.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })
}
displayAddModal()

//PREVIEW DE L'IMAGE UPLOAD
const previewImg = document.querySelector(".containerFile img")
const inputFile = document.querySelector(".containerFile input")
const labelFile = document.querySelector(".containerFile label")
const iconFile = document.querySelector(".containerFile .fa-image")
const p = document.querySelector(".containerFile p")

inputFile.addEventListener("change", () => {
    const file = inputFile.files[0]
    console.log(file)
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result
            previewImg.style.display = "flex"
            labelFile.style.display = "none"
            iconFile.style.display = "none"
            p.style.display = "none"
        }
        reader.readAsDataURL(file)
    }
})

//AJOUT LISTE DES CATÉGORIES DANS L'INPUT SELECT
async function displayCategoryModal() {
    const select = document.querySelector(".modalAddWork select")
    const categorys = await getListOfCategories()
    categorys.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    })
}
displayCategoryModal()

//REQUETE POST POUR AJOUTER UN NOUVEAU PROJET

const form = document.querySelector(".modalAddWork form ")
const title = document.querySelector(".modalAddWork #title")
const categorys = document.querySelector(".modalAddWork #category")
const btnForm = document.querySelector(".modalAddWork button")

btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (!inputFile.files[0] || !title.value || !categorys.value) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }

    const formData = new FormData();

    formData.append("image", inputFile.files[0])
    formData.append("title", title.value)
    formData.append("category", categorys.value)

    const token = sessionStorage.getItem("authToken")

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

        .then(response => response.json())
        .then(result => {
            //AFFICHAGE DYNAMIQUE DANS LA GALLERY 
            console.log(result)
            let gallery = document.querySelector(".gallery");
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figCaption = document.createElement("figcaption");
            figCaption.textContent = result.title;
            img.src = result.imageUrl;
            figure.appendChild(img);
            figure.appendChild(figCaption);
            gallery.appendChild(figure);
            //AFFICHAGE DYNAMIQUE DANS LA GALERIE DE LA MODALE
            const figureModal = document.createElement("figure");
            const imgModal = document.createElement("img");
            const span = document.createElement("span");
            const trash = document.createElement("i")
            trash.classList.add("fa-solid", "fa-trash-can")
            trash.id = result.id
            imgModal.src = result.imageUrl
            span.appendChild(trash)
            figureModal.appendChild(span)
            figureModal.appendChild(imgModal)
            galleryModal.appendChild(figureModal)
        })
        .catch(erreur => {
            console.error('Erreur :', erreur);
        })
});