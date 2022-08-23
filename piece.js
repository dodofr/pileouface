let change = document.querySelector("#choix");
let btn = document.querySelector("#btn");
let results = document.getElementById("results");
let votreChoix = document.getElementById("votreChoix");
let leResult = document.getElementById("leResult");
let token = 5;
let toke = document.getElementById("token");
let nbPile = 0;
let nbFace = 0;
let nbLance = 0;
let stats = document.getElementById("stats");
document.getElementById("c").disabled = true;
btn.disabled = true

change.addEventListener("change", () => {
  let choix = document.querySelector("#choix option:checked").value;
  pasAssez.innerHTML = ""
  btn.disabled = false

  if (choix === "0") {
    let img1 = document.querySelector("#img");
    votreChoix.innerHTML = "votre choix"
    img1.src = "images/pile.jpg";
  } else {
    let img2 = document.querySelector("#img");
    votreChoix.innerHTML = "votre choix :"
    img2.src = "images/face.jpg";
  }
});

btn.addEventListener("click", () => {
    if (token >0) {
        
    
        
    
    pasAssez.innerHTML = "" 
  let banque = getRandomInt(2);
  let joueur = document.querySelector("#choix option:checked").value;
  let text = document.querySelector("#h2result");
  nbLance++;

  if (joueur == banque) {
    text.innerHTML = "Vous avez gagné 1 token";
    token++;
  } else {
    text.innerHTML = "Vous avez perdu 1 token";
    token--;
  }

  if (banque == 0) {
    leResult.innerHTML = "La piece tombe du coté..."
    let imgresult1 = document.querySelector("#imgResult");
    imgresult1.src = "images/pile.jpg";
    results.appendChild(imgresult1);
    nbPile++;
  } else {
    leResult.innerHTML = "La piece tombe du coté..."
    let imgresult2 = document.querySelector("#imgResult");
    imgresult2.src = "images/face.jpg";
    results.appendChild(imgresult2);
    nbFace++;
  }

  stats.innerHTML =
    "nombre de pile: " +
    nbPile +
    "/" +
    nbLance +
    "<br>" +
    "nombre de face : " +
    nbFace +
    "/" +
    nbLance;
  toke.innerText = "vos tokens restants : " + token;
} else{
    pasAssez.innerHTML = "Dommage vous avez perdu !!! "
}
});





function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let cadeau = document.getElementById("cadeau");
let imgCat = document.getElementById("imgCat")
let pasAssez = document.getElementById("pasAssez")
let descri = document.getElementById("description")
let nam = document.getElementById("name")

let cat = {                             // creation de l'objet cat
      id : "",
      name :"",
      description : ""
}

cadeau.addEventListener("click", ()=>{
    pasAssez.innerHTML = ""
if (token >= 5) {
    token = token-5
    toke.innerText = "vos tokens restants : " + token;

fetch("https://api.thecatapi.com/v1/breeds")
  .then((reponse) => reponse.json())
  .then((picture) => {
  
    let catData = picture[getRandomInt(60)];        // fait le random sur le tableau de la data full
    cat.id = catData.id                             // cat.id est l'id dans l'objet cat. catData est ma data random et je vais a l'interieur dans le .id
    cat.name = catData.name                         // ca me permet d'entrer le l'id de la data dans l'id de mon cat
    cat.description = catData.description
    

    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`)  
      .then((reponse) => reponse.json())
      .then((photo) => {
        imgCat.src = photo[0].url  
        descri.innerHTML = cat.description
        nam.innerHTML = cat.name
      });
  });
  
  

} // fermeture if
else{
    pasAssez.innerHTML = "Hé Ho vous n'avez pas assez de tokens"
  }
}) // fermeture bouton

