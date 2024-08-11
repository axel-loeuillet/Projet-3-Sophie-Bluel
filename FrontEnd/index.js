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