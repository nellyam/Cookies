const affichage = document.querySelector(".affichage");
const btns = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input");
const infoTxt = document.querySelector(".info-txt");
let dejaFait = false;

let today = new Date();
let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

let day = ('0' + nextWeek).slice(9, 11);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = today.getFullYear();

document.querySelector("input[type='date']").value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener("click", btnAction)
});


function btnAction(e) {
    let nvObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute("name");
        let value = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = value;
    });
    let description = e.target.getAttribute("data-cookie");

    if(description == "creer") {
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire)
    } else {
        listeCookies();
    }
}


function  creerCookie(name, value, exp) {
    infoTxt.innerText = "";
    affichage.innerHTML = "";

    // Si cookie existe déjà
    let cookies = document.cookie;
    cookies = cookies.split(";");
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split("=");

        if(formatCookie[0] == encodeURIComponent(name)) {
            infoTxt.innerHTML = "Cookie existe déjà"; // dif
            return; 
        }

    });

    // Si le cookie n'a pas de nom 
    if(name == "") {// dif
        infoTxt.innerText = "Cookie doit avoir un nom"; 
        return; 
    }


    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement("li")
    info.innerText = `Cookie ${name} créé`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}



function listeCookies() {
    let cookies = document.cookie;
    
    if(cookies.length === 0) {
       infoTxt.innerHTML = "Il n'y a pas de cookies";
       return;
    }

    cookies = cookies.split(";");
    cookies.forEach(cookie => {
        let item = document.createElement("li")
        cookie = cookie.trim();
        let formatCookie = cookie.split("=");
        item.innerText = `Name: ${decodeURIComponent(formatCookie[0])}, value : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(li);
        infoTxt.innerText = 'Cliquer sur cookie pour supprimer !';
        
        //suppresion de cookie
        li.addEventListener("click", () => {

            document.cookie = `${formatCookie[0]}=;expires=${new Date(0)}`;
            li.innerText = "Cookie supprimé";
            setTimeout(() => {
                li.remove();
            }, 1500);
        });
    });

}

