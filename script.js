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
    li.innerHTML=`
          ${newItem}
          <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
          </button>`
     

    itemList.appendChild(li);


    itemInput.value=''






    // itemList.forEach(item=>{
    //     if(newItem===item){
    //         itemList.remove(item)
    //     }
    // })
}




itemForm.addEventListener('submit',addItem);