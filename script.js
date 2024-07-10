const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const filter=document.getElementById('filter');

// console.log(itemList.children);// this is HTMLCollection. It is not a list...

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
    li.appendChild(btn);
    itemList.appendChild(li);
    checkUI();
    itemInput.value='';
   
}
function removeItem(e){
    if(e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')){
       if(confirm("Are you sure")){
        e.target.closest('li').remove()
        checkUI()
    }}    
}
function clearAll(){
   while(itemList.firstChild){
    itemList.firstChild.remove()
   }   
    
    checkUI();
}

function filterItems(e){
    const text=e.target.value.toLowerCase();
    const items= itemList.querySelectorAll('li'); 
    items.forEach(item=>{
        const itemName=item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text)!==-1){
            item.style.display='flex';
            console.log(true);
        }else{
            item.style.display='none';
            console.log(false);
        }

        
    })
    console.log(text);
}
function checkUI(){
    const items= itemList.querySelectorAll('li');  //note: if using ...tagName('li')which is old style
    // console.log(items);                                              //then wrap it with Array.from() since it is HTMLCollection, not nodelist
   
    if (items.length===0){
        filter.style.display='none';
        clearBtn.style.display='none';
    }else{
        filter.style.display='block';
        clearBtn.style.display='block';
    }

}



checkUI();

//Event Listener
itemForm.addEventListener('submit',addItem);
// remove Item method- 2: using classList
itemList.addEventListener('click',removeItem)
clearBtn.addEventListener('click',clearAll)
filter.addEventListener('input', filterItems);


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

