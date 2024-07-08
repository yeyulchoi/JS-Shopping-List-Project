const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
console.log(itemList);
//Event Listener

function addItem(e){
    e.preventDefault();  //cos not actually submit in this app.

    //need to validate the input.
    const newItem = itemInput.value;
    if(newItem === ''){
        alert("Please add an item")
        return; // return=> because we dont want anything to happen.
    }
   
    //create new items

    const li=document.createElement('li');
    li.appendChild(document.createTextNode(newItem))
    const newIcon= createIcon('fa-solid fa-xmark');   
    const btn= createButtton('remove-item btn-link text-red');
    
    li.appendChild(btn);
    itemList.appendChild(li);

    function createButtton(classes){
       const newBtn= document.createElement('button');
       newBtn.className=classes;
       newBtn.appendChild(newIcon)
       return newBtn;
    }
    
    function createIcon(iconClass){
        const i=document.createElement('i');
        i.className=iconClass;
        return i
    }
   
    itemInput.value='';
   
}




itemForm.addEventListener('submit',addItem);