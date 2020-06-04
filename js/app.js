//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


// classes names needed to deal with elements easily
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//GET ITEM from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    //set the id to the last one in the list
    id= LIST.length;
    //load the list to the interface
    loadList(LIST);
}else{
    //if data isnt empty
    LIST = [];
    id = 0;
}


// to load items to UI we need to use the loop to the list

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the localstorage i.e will help to remove all the data in the list
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


//show current date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("ne-NE",options);


//add to do function

function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item"> 
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i> 
                    <p class="text ${LINE}">${toDo}</p> 
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


//add an item tothe list usser the enter the key
document.addEventListener("keyup",function(even){  
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isnt empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
}); 


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


// remove to do task
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


//target the items created dynamically

list.addEventListener("click", function(event){
    //return clicked element inside list
    const element = event.target;

    //complete or delete
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);//will underline the list and check the button
    }else if(elementJob == "delete"){
        removeToDo(element);//remove item frpm the list
    }
    //add to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});