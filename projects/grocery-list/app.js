// PROPERTIES
let btnAddItem = document.getElementById('btnAddItem');
let item = document.getElementById('item');
let items = document.getElementById('items');
let groceryItems = [];
// EVENTS
btnAddItem.addEventListener('click', addItem);
item.addEventListener('keyup', (e)=>{
    if(e.key=="Enter")addItem();
});
// FUNCTIONS
function addItem(){
    if(!item.value)return;
    groceryItems.push(new GroceryItem({
        id: groceryItems.length,
        title: item.value
    }));
    item.value = "";
    displayItems();
}
function displayItems(){
    let display = ``;
    for (let i = 0; i < groceryItems.length; i++) {
        const item = groceryItems[i];
        display += getTemplate(item);
    }
    items.innerHTML = display;
}
function editItem(id){
    let theItem = null;
    for (let i = 0; i < groceryItems.length; i++) {
        const gItem = groceryItems[i];
        if(gItem.id===id){
            theItem = gItem;
            break;
        }
    }
    if(!theItem)return;
    item.value = theItem.title;
    // EDIT BTNS
    
}
function deleteItem(id){
    let index = null;
    for (let i = 0; i < groceryItems.length; i++) {
        const g = groceryItems[i];
        if(g.id===id){index=i;break;}
    }
    if(!index && index != 0) return;
    groceryItems.splice(index,1);
}
function done(id){
    let item = getItem(id);
    if(!item)return;
    displayItems();
}
function undone(id){
    let item = getItem(id);
    if(!item)return;
    item.isDone = false;
    displayItems();
}
function getItem(id){
    for (let i = 0; i < groceryItems.length; i++) {
        const g = groceryItems[i];
        if(g.id===id)return g;
    }
    return null;
}
function getTemplate(i){
    if(!i)return``;
    return `
        <div class="ligne box item">
            <h3 class="subtitle has-text-centered">${i.title}</h3>
            <i class="btn-icon fas ${i.isDone ? "fa-times" : "fa-check"}" title="${i.isDone ? "Done" : "Undone"}" onclick="${i.isDone ? "undone("+i.id+")" : "done("+i.id+")"}" style="color:${i.isDone ? "orange" : "green"};"></i>
            <i class="btn-icon fas fa-edit" style="color:blue;" title="Edit" onclick="editItem(${i.id})"></i>
            <i class="btn-icon fas fa-trash" style="color:red;" title="Delete" onclick="deleteItem(${i.id});"></i>
        </div>
    `;
}