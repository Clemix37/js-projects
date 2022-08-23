class GroceryList {
    #items;
    constructor(){
        this.#items = [];
    }
    get items(){return this.#items;}
    getItem(id){
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if(item.id===id)return item;
        }
        return null;
    }
    addItem(i){
        this.#items.push(i);
        return this;
    }
    deleteItem(id){
        for (let i = 0; i < this.#items.length; i++) {
            const item = this.#items[i];
            if(item.id===id){
                this.#items.splice(i,1);
                return this;
            }
        }
        return this;
    }
    done(id){
        let item = this.getItem(id);
        item.isDone = true;
        return this;
    }
    undone(id){
        let item = this.getItem(id);
        item.isDone = false;
        return this;
    }
    #getTemplate(i){
        if(!i)return``;
        return `
            <div class="ligne box item">
                <h3 class="subtitle has-text-centered">${i.title}</h3>
                <i class="btn-icon fas ${i.isDone ? "fa-times" : "fa-check"}" title="${i.isDone ? "Undone" : "Done"}" onclick="${i.isDone ? "undone("+i.id+")" : "done("+i.id+")"}" style="color:${i.isDone ? "orange" : "green"};"></i>
                <i class="btn-icon fas fa-edit" style="color:blue;" title="Edit" onclick="editItem(${i.id})"></i>
                <i class="btn-icon fas fa-trash" style="color:red;" title="Delete" onclick="deleteItem(${i.id});"></i>
            </div>
        `;
    }
    display(container){
        let display = ``;
        for (let i = 0; i < this.#items.length; i++) {
            const item = this.#items[i];
            display += this.#getTemplate(item);
        }
        container.innerHTML = display;
    }
}