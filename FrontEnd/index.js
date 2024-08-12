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

//Récupération des catégories depuis l'API
const categories = await getListOfCategories()
console.log(categories)

function getListOfCategories() {
    return fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .catch(error => ('Error:', error));
}

//création bouton Tous
let category = document.querySelector(".category");
let btnTous = document.createElement("button");
btnTous.textContent = "Tous";
btnTous.setAttribute("data-categorie-id", "Tous");
category.appendChild(btnTous)
btnTous.addEventListener("click", function () {
})


//creation des boutons de catégories
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

//affichage de tous les projets dans la catégorie "Tous"
const btnIdTous = document.querySelector('[data-categorie-id="Tous"]');
btnIdTous.addEventListener("click", function () {
    const filtreIdTous = works.filter(function (works) {
        return works.categoryId === 1, 2, 3;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(filtreIdTous);
});

//filtrage des projets par catégories
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