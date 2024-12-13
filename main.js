import "./style.css";
//path:main.js
const app = document.querySelector(/*selecteur CSS*/ "#app");

// const header = document.querySelector(/*selecteur*/ "header"); //un seul next sister qui est div#app
// console.log(app);
// const colors = ["pink", "purple", "skyblue"];
// let i = 0;
// setInterval(() => {
//   app.style.background = colors[i];
//   i++;
//   if (i > colors.length - 1) i = 0;
// }, 1000);

// //firstChild : récupere le 1er enfant peut importe son type
// //firstElementChild récupere le premier enfant qui est un élement
// console.log(app.firstElementChild); //=><h1>...</h1>
// /*
// DOm sa représente une structure d arbre ,le DOM va gérer les eventListener,les élements,les selecteur et etc
// puis il a les API WEB , setTimeout,window,setInterval,sessionStorage,navigation,cookies,localStorage,fetch fait partie du WEB API
// */
// console.log({
//   parent: app.parentElement,
//   prevSister: app.previousElementSibling, //<header>header</header>
//   nextSister: app.nextElementSibling, //<footer>footer</footer>
//   firstchild: app.firstElementChild, //<h1>first child</h1>
//   lastchild: app.lastElementChild, //<h2>Last Child</h2>
//   children: app.children, //un tableau qui représente HTMLCollection(3)[h1,p,h2]
// }); //le parent de app est body
// //un élement n aura toujours qu une qeule soeur previous et une seul soeur next
// //previous sister <- element -> next sister

// document.getElementById; //pourquoi on récupere principalement avec les id ? car ils sont uniques
// //->document.querySelector('#id')
// document.getElementsByClassName;
// //document.querySelector(".className");
// document.getElementsByTagName;
// //document.querySelector("tagName");

// //Deconseille
// app.innerHTML = `
//     <div><h1>Salut</h1></div>
// `;

// // console.log(div); //=><div></div>
// // console.log({
// //   parent: div.parentElement, //null
// //   content: div.innerHTML, //''
// // });

// //Conseillé car plus de flexibilité car dands le 1er si on en a besoin on va devoir les récupérer alors que là on a direct leur réference
// const div = document.createElement("div");
// const title = document.createElement("h1");
// // title.className = "bigTitle";

// title.innerText = "jean!";
// // title.classList.add("title", "bigTitle");
// // title.id="Mon Super Title";
// div.appendChild(title); //<div><h1></h1></div>
// app.appendChild(div); //<div id="app">...<div></div></div>
// console.log({
//   parent: div.parentElement, //null
//   content: div.innerHTML, //''
//   children: app.children,
// });
// const input = document.createElement("input");
// div.appendChild(input);
// // setInterval(() => {
// //   input.value += "M";
// // }, 1000);
// console.log(app.children[0]);
const startButton = document.querySelector("#start");
//n hésitez pas à lire la MDN docs
/*AEL Lessons 
    addEventListener(type de l event,Listener)
    addEventListener(type,Listener,options)
    addEventListener(type,Listener,useCapture)
*/
// startButton.addEventListener("click", () => alert(" start click"));
// //Dans le debuggoeur chrome quand tu vas vers element tu selectionne le button Start dans la partie Event Listeners tu peux voir click
// //si on va plus en détails il y a le useCapture qui est intéressant et le handler:()=>{alert("click")}
// app.addEventListener("click", () => alert("App click"));
// //ici c est d abord le start click puis le App click
// document.body.addEventListener("click", () => console.log("body click"));

// //ici c est d abord le start click puis le App click et enfin la console donne body click
//__________________

//Dans le debuggoeur chrome quand tu vas vers element tu selectionne le button Start dans la partie Event Listeners tu peux voir click
//si on va plus en détails il y a le useCapture qui est intéressant et le handler:()=>{alert("click")}
// app.addEventListener("click", () => alert("App click"));
// document.body.addEventListener("click", () => console.log("body click"));
// startButton.addEventListener("click", () => alert(" start click"));
//ici le start click est toujours affiché le premier
//Alors comment JS gere ses event
/*
    Soit une appli tel que dans l arbre du DOM
    body -> #app -> section -> article -> button
    les events dans JS 
        body-capture-> #app -capture-> section -> article -> button
        par defaut :button-bubble->article-bubble->section-bubble->#app-bubble->body
    */

// app.addEventListener("click", () => console.log("[app] clicked"), true);
// document.body.addEventListener("click", () => console.log("[body] clicked"));
// startButton.addEventListener("click", () => console.log("start clicked"), true);
/*
[app clicked]
start clicked
body clicked 
*/

// app.addEventListener("click", () => console.log("[app] clicked"), true);
// document.body.addEventListener(
//   "click",
//   () => console.log("[body] clicked"),
//   true
// );
// startButton.addEventListener("click", () => console.log("start clicked"), true);
/*
Console:
    [body] clicked
    [app] clicked
    start clicked
    Maintenant si on inspecte Element dans button start il y a maintenant 3 eventListeners body div#app et button#start
    Et useCapture:true
*/
const colors = ["red", "blue", "green"];
let i = 0;
startButton.addEventListener("click", (element) => {
  app.style.backgroundColor = colors[i];
  i++;
  if (i > colors.length - 1) i = 0;
});
