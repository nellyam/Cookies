const affichage = document.querySelector(".affichage");
const btns = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input");
const infoTxt = document.querySelector(".info-txt");
let dejaFait = false;


const today = new Date();

const nextWeek = new Date(today.getTime() +  7 * 24 * 60 * 60 * 1000); 
// let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour

let day = ('0' + nextWeek).slice(9, 11);
let month = ('0' +(today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector("input[type='date']").value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener("click", btnAction)
});

function btnAction(e) {
    let nvObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute("name");
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
       
    });

     let description = e.target.getAttribute('data-cookie');

        if(description === "creer") {
            creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
        } else if(description === "toutAfficher") {
            listeCookies();
        }  
}

function  creerCookie(name, value, exp) {
    infoTxt.innerText = "";
    affichage.innerHTML = "";
    
    // Si le cookie a un même nom
    let cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
        cookie = cookie.trim();
       let formatCookie = cookie.split("=")
       console.log(formatCookie);

       if(encodeURIComponent(name) === formatCookie[0]) {
        dejaFait = true;
       }
    })

    if(dejaFait) {
        infoTxt.innerText = "Un cookie existe déjà";
        dejaFait = false;
        return;
    }
   

    // Si le cookie n'a pas de nom
    if(name.length === 0) {
        infoTxt.innerText = "Impossible de créér un cookie sans nom";
        return;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement("li");
    info.innerText = `Cookie ${name} créé`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}


function listeCookies() {
    let cookies = document.cookie.split("; ");
    if(cookies.join() === "") {
        infoTxt.innerText = "Pas de cookies à afficher";
        return;
    }

    cookies.forEach(cookie => {
        cookie = cookie.trim();
         let formatCookie = cookie.split("=");
         let item = document.createElement("li");
         infoTxt.innerText = "Cliquer sur un cookie pour supprimer"
         item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, value: ${decodeURIComponent(formatCookie[1])}`;
         affichage.appendChild(item);

         // suppression cookie
         item.addEventListener("click", () => {
             document.cookie = `${formatCookie[0]}=;expires=${new Date(0)}`;
             item.innerText = `Cookie ${formatCookie[0]} supprimé`;
             setTimeout(() => {
                 item.remove();
             }, 1000);
         })
        });

}


