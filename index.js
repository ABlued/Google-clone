const result = document.querySelector('#result');
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
            createElement(element);
        });
    }
}

function saveSearch(event){
    event.preventDefault();
    const isExist = checkExist();

    if(input.value != '' && isExist == false){

        const searchObject = {
            id : searchAry.length + 1,
            text : input.value,
        }
        console.log(searchObject);
        searchAry.push(searchObject);
        createElement(searchObject);
        localSave();
        input.value="";
    }
}
function checkExist(){
    for(searchAryValue of searchAry){
        if(input.value === searchAryValue.text)
            return true;
    }
    return false;
};

function createElement(object){
    const li = document.createElement("li");
    li.style.listStyle = "none";
    const delBtn = document.createElement("button");
    delBtn.textContent = "지우기";
    delBtn.addEventListener("click", handleDelete);
    const span = document.createElement("span");
    span.innerText = object.text;
    span.style.paddingRight = "20px";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.setAttribute("class","flex");
    li.setAttribute("id", object.id);
    result.appendChild(li);
}
function handleDelete(event) {
    const target = event.target;
    const li = target.parentElement;
    const ul = li.parentElement;
    const liId = li.id;
    ul.removeChild(li);
    searchAry = searchAry.filter(function(element){
        return element.id !== parseInt(liId);
    });
    localSave();
    console.log(searchAry);
  }
function localSave(){
    localStorage.setItem("searchRecord",JSON.stringify(searchAry));
    // const parsedObject = JSON.parse(localStorage.getItem("searchRecord"));
    // console.log(parsedObject);
}

function loadRecord(){
    var value, item, i;

    value = document.getElementById("input").value.toUpperCase();
    // console.log(value);
    item = document.getElementsByClassName("flex");
    // console.log(item);
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