

const form = document.querySelector("#addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

let tasks = [];

if (localStorage.getItem("tasks")){
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function(item){
    renderTask(item);
});

form.addEventListener("submit", addItem);

filter.addEventListener("keyup", filterItems);

itemsList.addEventListener("click", removeItem);


function renderTask(taskText){

    var newElement = document.createElement("li");
    newElement.className = "list-group-item";
    

    newElement.appendChild(document.createTextNode(taskText));
    
    

    var deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";
    

    newElement.appendChild(deleteBtn);
    

    itemsList.prepend(newElement);
};

function addItem(e){
    e.preventDefault(); 
    
    var newItemText = document.getElementById("newItemText").value;

    renderTask(newItemText);

    tasks.push(newItemText);
    
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("newItemText").value = "";
    
};


function removeItem(e){

    if (e.target.hasAttribute("data-action") && e.target.getAttribute("data-action") == "delete"){
        if(confirm("Удалить задачу?")){
            e.target.parentNode.remove();
        };

        const taskText = e.target.closest('.list-group-item').firstChild.textContent;
        const index = tasks.findIndex(function(item){
            if (taskText === item){
                return true
            };
        });
        if (index !== -1){
            tasks.splice(index, 1);
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

};


function filterItems(e){

    var searchedText = e.target.value.toLowerCase();


    var items = itemsList.querySelectorAll("li");


    items.forEach(function(items){

        var itemsText = items.firstChild.textContent.toLowerCase();
        

        if (itemsText.indexOf(searchedText) != -1){
            items.style.display = "block";
        } else{
            items.style.display = "none";
        };

    });


};