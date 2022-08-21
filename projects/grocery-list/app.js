// PROPERTIES
let btnAddItem = document.getElementById('btnAddItem');
let item = document.getElementById('item');
let items = document.getElementById('items');
let groceryItems = [];
let groceryList = new GroceryList();
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
        id: groceryItems.length,
        title
    })).display(items);
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
    groceryList.deleteItem(id).display(items);
}
function done(id){
    groceryList.done(id).display(items);
}
function undone(id){
    groceryList.undone(id).display(items);
}