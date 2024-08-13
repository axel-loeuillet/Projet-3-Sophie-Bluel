//RÉCUPÉRATION DES PROJETS DEPUIS L'API
const works = await getWorks()
function getWorks() {
    return fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .catch(error => ('Error:', error));
}
console.log(works)


//AFFICHAGE DES PROJETS DANS LA GALERIE
function genererWorks(works) {
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
genererWorks(works)

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
    genererWorks(filtreIdTous);
});

//FILTRAGE DES PROJETS PAR CATÉGORIE
const btnId1 = document.querySelector('[data-categorie-id="1"]');
const buttons = document.querySelectorAll(".category-btn")
btnId1.addEventListener("click", function () {
    const filtreId1 = works.filter(function (works) {
        return works.categoryId === 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(filtreId1);
});

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const dataCategoryId = button.getAttribute("data-categorie-id")
        const filtreId1 = works.filter(function (works) {
            return works.categoryId === Number(dataCategoryId);
        })
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(filtreId1);
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

affichageModal.addEventListener("click", () => {
    console.log('displayModal')
    modalContainer.style.display = "flex"
})
closeModal.addEventListener("click", () => {
    console.log('.fa-xmark')
    modalContainer.style.display = "none";
})
modalContainer.addEventListener("click", (e) => {
    console.log(e.target.className)
    if (e.target.className == "containerModals") {
        modalContainer.style.display = "none";
    }
})

//AFFICHAGE DE LA GALLERY DANS LA MODALE
for (let index = 0; index < works.length; index++) {
    const data = works[index];

    const modalContent = document.querySelector(".modalContent");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i")
    trash.classList.add("fa-solid", "fa-trash-can")
    trash.id = data.id
    img.src = data.imageUrl
    span.appendChild(trash)
    figure.appendChild(span)
    figure.appendChild(img)
    modalContent.appendChild(figure)
}
