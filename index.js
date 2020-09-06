const search = document.querySelector('#container');
const input = document.querySelector('#input');
let searchAry = [];
search.addEventListener("submit",saveSearch);

init();

function init(){
    loadSearchAry();
}

function loadSearchAry(){
    if(JSON.parse(localStorage.getItem("searchRecord")) !== null){
        const parsedObject = JSON.parse(localStorage.getItem("searchRecord"));
        parsedObject.forEach(element => { 
            searchAry.push(element);
            createElement(element.text);
        });
    }
}

function saveSearch(event){
    event.preventDefault();
    const searchObject = {
        id : searchAry.length + 1,
        text : input.value,
    }
    searchAry.push(searchObject);
    createElement(searchObject.text);
    localSave(searchAry);
    input.value="";
}
function createElement(text){
    const li = document.createElement("li");
    li.style.listStyle = "none";
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.value = "❌";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.setAttribute("class","flex");
    search.appendChild(li);
}

function localSave(searchAry){
    localStorage.setItem("searchRecord",JSON.stringify(searchAry));
    const parsedObject = JSON.parse(localStorage.getItem("searchRecord"));
    console.log(parsedObject);
}

function loadRecord(){
    var value, name, item, i;

    value = document.getElementById("input").value.toUpperCase();
    console.log(value);
    item = document.getElementsByClassName("flex");
    console.log(item);
    for(i=0;i<item.length;i++){

     /* name = item[i].innerText;
      console.log(name);
      console.log(item.length);*/
      if(item[i].innerHTML.toUpperCase().indexOf(value) > -1){
        item[i].style.display = "flex";
      }else{
        item[i].style.display = "none";
      }
    }
}