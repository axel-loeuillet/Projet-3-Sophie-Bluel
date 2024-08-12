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

//RÉCUPÉRATION DES CATEGORIES DEPUIS L'API
const categories = await getListOfCategories()
console.log(categories)
function getListOfCategories() {
    return fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .catch(error => ('Error:', error));
}

//CREATION DU BOUTON "TOUS"
let category = document.querySelector(".category");
console.log(category)
let btnTous = document.createElement("button");
btnTous.textContent = "Tous";
btnTous.setAttribute("data-categorie-id", "Tous");
category.appendChild(btnTous);
btnTous.addEventListener("click", function () {
})

//AFFICHAGE DES BOUTONS DE CATEGORIE DANS LA GALERIE
function displayListOfCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        let btn = document.createElement("button");
        btn.textContent = categorie.name;
        btn.classList.add("category-btn")
        btn.setAttribute("data-categorie-id", categorie.id)
        category.appendChild(btn)
        console.log(btn)
        btn.addEventListener("click", function () {
        })
    }
}
displayListOfCategories(categories)


