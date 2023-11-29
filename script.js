const form = document.querySelector('.my-form')
const display = document.querySelector('.display-message');
const input = document.querySelector('#input-item');
const submitBtn = document.querySelector('.submit-btn');
//contaner will be used for hiding the list before hand and showing after adding the value.
const container = document.querySelector('.shop-container');
const list = document.querySelector('.shop-list');
const clearBtn = document.querySelector('.clear-btn');

//Evenet listener for form submit
form.addEventListener("submit", addItem);

//Clear items usng clearBtn
clearBtn.addEventListener("click", clearItems);
//INDEXD
//Function for adding item into the list
function addItem(e){
    console.log("Adding new comment");
    e.preventDefault();
    const value = input.value;

    //Generate unique id for all items.
    const date = new Date();
    const id = parseInt(Math.random()*date.getTime()).toString();
    //console.log("ID is : "+ id);

    if(value !== ""){
        //Dynamically create item and assign it a unique id.
        const element = document.createElement("article");
        let attribute = document.createAttribute("unique-id");
        attribute.value = id;
        element.setAttributeNode(attribute);
        element.classList.add("shop-item"); //MIGHT BE AN ERROR

        element.innerHTML = `<p class="item-title">${value}</p>
        <div class="btn-container">
            <button type="button" id="delete-btn">Delete</button>
        </div>
        `;

        //Access the delete button
        const deleteBtn = element.querySelector("#delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        //Append childNode to the parentNode i.e 'list' object is the parent.
        list.appendChild(element);
        displayMessage("Item added", "success");

        addToLocalStorage(id, value);

        //Clear item from the input field after adding.
        setDefault();

        //Show the container which was invisible until now using, show-container class.
        container.classList.add("show-container");
        /*
        Next thing to do tommorow.
        1.Add to local storage function.
        2.Clear the input-item/input field after adding the item after 2 seconds.
        3.Add delete item function for delete-btn.
        4.Add clear item function to clear-item btn.
        */

    }
    else{
        //Disaply the color coded message
        displayMessage("Please enter an item!", "fail");
    }
}
//Display message function
function displayMessage(message, action){
    display.textContent = message;
    display.classList.add(`display-${action}`);

    //Remove the message after 1 seconds
    setTimeout(function(){
        display.textContent="";
        display.classList.remove(`display-${action}`);
    }, 1000);
}

function displayMessageDuplicate(message, action){
    display.textContent = message;
    display.classList.add(`display-${action}`);

    //Remove the message after 1 seconds
    setTimeout(function(){
        display.textContent="";
        display.classList.remove(`display-${action}`);
    }, 1000);
}

function clearItems(){
    const myItems = document.querySelectorAll(".shop-item");
    //remove all the items.
    if(myItems.length > 0){
        myItems.forEach(function(myItem){
            list.removeChild(myItem);
        });
    }
    //hide the container again by hiding the class.
    container.classList.remove("show-container");
    displayMessage("Cleared items.", "success");

    //Remove from local storage
    clearLocalStorage();
    //localStorage.removeItem('list');
}

function deleteItem(e){
    //Access two parents above so that you can delete the specific child.
    const element = e.currentTarget.parentElement.parentElement;
    //Extract the unique id.
    const elementId = element.getAttributeNode("unique-id").value;
    list.removeChild(element);
    //console.log(element);
    console.log("Unique id deleting is :", elementId);
    //Hide container if no elements are there after deleting
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    //Remove from local storage
    deleteFromLocalStorage(elementId);
    displayMessage("Deleted the Item", "fail");
}

function addToLocalStorage(key, value){
    //setItem("key", "value")
    //getItem("key")
    //removeItem("key")
    //key/name:value pairs(strings)
    const obj = {myKey:key, myValue:value};
    //myItems : An array consisting of objects.
    let myItems = getLocalStorage();
    myItems.push(obj);
    localStorage.setItem("myList", JSON.stringify(myItems));
}
function deleteFromLocalStorage(key){
    let tempItems = getLocalStorage();
    /*console.log("Removing........");
    for(let x in tempItems){
        const ob = Object.keys(x);
        console.log(ob[0]);
    }*/
    tempItems = tempItems.filter(function(itm){
        //Return all the items except the key item.Thereby deleting it.
        if(itm.myKey !== key){
            return itm;
        }
    });
    //Override the local storage with the new list.
    localStorage.setItem("myList", JSON.stringify(tempItems));
}

function clearLocalStorage(){
    localStorage.removeItem("myList");
}

//Get the current list/stage of local storage.
function getLocalStorage(){
    if(localStorage.getItem("myList")=== null){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem("myList"));
    }
}

function setDefault(){
    input.value = "";
}


