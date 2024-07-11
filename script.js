const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const filter=document.getElementById('filter');
const formBtn =itemForm.querySelector('button');
let isEditMode = false;

// console.log(itemList.children);// this is HTMLCollection. It is not a list...

function displayItems(){
    const itemsFromStroage= getItemsFromStorage();
    itemsFromStroage.forEach(item=>{
        addItemToDOM(item)
        checkUI()
    })
}

function onAddItemSubmit(e){
    e.preventDefault();  //cos not actually submit in this app.

    //need to validate the input.
    const newItem = itemInput.value;
    if(newItem === ''){
        alert("Please add an item")
        return; // return=> because we dont want anything to happen.
    }

    //check for edit mode
    if(isEditMode){
        const itemToEdit =itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;

    }
    
    addItemToDOM(newItem)
    addItemToStorage(newItem)
    // displayLocalData()


    checkUI();
    // itemInput.value='';
   
}

function addItemToDOM(item){
     //create new items
     const li=document.createElement('li');
     li.appendChild(document.createTextNode(item))
     // const newIcon= createIcon('fa-solid fa-xmark');   
     const btn= createButtton('remove-item btn-link text-red');
     
     li.appendChild(btn);
     itemList.appendChild(li);
     itemInput.value='';

}

function createButtton(classes){
    const newBtn= document.createElement('button');
    newBtn.className=classes;
    newBtn.appendChild(createIcon('fa-solid fa-xmark'))
    return newBtn;
 }
function createIcon(iconClass){
    const i=document.createElement('i');
    i.className=iconClass;
    return i
}

function addItemToStorage(item){
    const itemsFromStroage=getItemsFromStorage();

    itemsFromStroage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStroage))
}


function getItemsFromStorage(){
    
    let itemsFromStroage;

    if (localStorage.getItem('items')===null){
        itemsFromStroage=[];
    }else{
        itemsFromStroage=JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStroage
}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
        
    }
   }

function setItemToEdit(item){
    isEditMode =true;
    
    itemList.querySelectorAll('li').forEach(i=>i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor='#228B22';
    itemInput.value = item.textContent;

}

function removeItem(item){
    if(confirm('Are you Sure?')){
        //remove item from DOM        
        item.remove()
        //remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
   
}

function removeItemFromStorage(content){
    let itemsFromStorage = getItemsFromStorage();
    
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=>i !==content);

    //Re-set to localstorage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
    
}

function clearAll(){
   while(itemList.firstChild){
    itemList.firstChild.remove()
   }   

   // clear from localStorage
   localStorage.removeItem('items');
    
    checkUI();
}


function filterItems(e){
    const text=e.target.value.toLowerCase();
    const items= itemList.querySelectorAll('li'); 
    items.forEach(item=>{
        const itemName=item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text)!==-1){
            item.style.display='flex';
            // console.log(true);
        }else{
            item.style.display='none';
            // console.log(false);
        }
        
    })
    // console.log(text);
}
function checkUI(){

    itemInput.value='';
    const items= itemList.querySelectorAll('li');  //note: if using ...tagName('li')which is old style
    // console.log(items);                                              //then wrap it with Array.from() since it is HTMLCollection, not nodelist
   
    if (items.length===0){
        filter.style.display='none';
        clearBtn.style.display='none';
    }else{
        filter.style.display='block';
        clearBtn.style.display='block';
    }

    formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor='#333';
    isEditMode=false;

}

function init(){
    checkUI();

    //Event Listener
    itemForm.addEventListener('submit',onAddItemSubmit);
    // remove Item method- 2: using classList
    itemList.addEventListener('click',onClickItem)
    clearBtn.addEventListener('click',clearAll)
    filter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded',displayItems)
}

init()


















// remove Item method- 1: using tagName
// itemList.addEventListener('click',(e)=>{
//     if(e.target.tagName==='BUTTON' ||e.target.tagName==='I'){
//         e.target.closest('li').remove()
//     }
// })



// remove Item method- : only removing icon
// itemList.addEventListener('click',(e)=>{
//     if(e.target.parentElement.classList.contains('remove-item')){
//         e.target.closest('li').remove();
//     }
// })

