// PROPERTIES
const btnAddItem = document.getElementById('btnAddItem');
const item = document.getElementById('item');
const items = document.getElementById('items');
const groceryList = new GroceryList();
// EVENTS
btnAddItem.addEventListener('click', addItem);
item.addEventListener('keyup', (e)=>{
    if(e.key=="Enter")addItem();
});
// FUNCTIONS
function addItem(){
    if(!item.value)return;
    let title = item.value;
    item.value = "";
    groceryList.addItem(new GroceryItem({
        id: groceryList.getNextId(),
        title,
    })).display(items);
}
function editItem(id){
    let theItem = groceryList.getItem(id);
    if(!theItem)return;
    item.value = theItem.title;
    // EDIT BTNS
    
}
function deleteItem(id){
    groceryList.deleteItem(id).display(items);
}
function done(id){
    groceryList.done(id).display(items);
}
function undone(id){
    groceryList.undone(id).display(items);
}