function addItem(event){
    event.preventDefault();
    let text=document.getElementById("todo-input");
    db.collection("todo-items").add({
        text:text.value,
        status:"active"
    })
    text.value="";
}
function getItems()
{
    db.collection("todo-items").onSnapshot((snapshot)=>{
        // console.log("Snapshot");
        let items=[];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id:doc.id,
                ...doc.data()
            })
        })
        generateItems(items);
    });
}
function generateItems(items){
    let itemsHtml="";
    items.forEach((item)=>{
        // console.log(item);
        itemsHtml+=`
        <div class="todo-item">
        <div class="check">
            <div data-id="${item.id}" class="check-mark ${item.status=="completed"?"checked" :""}">
                <img src="./assets/icon-check.svg">
            </div>
        </div>
        <div class="todo-text ${item.status=="completed"?"checked" :""}">
            ${item.text}
        </div>
        <div data-id="${item.id}"class="cross-mark">
            <img src="./assets/icon-cross.svg">
        </div>
    </div>
    `
    })
    document.querySelector('.todo-items').innerHTML=itemsHtml;
    document.querySelector('.items-left').innerHTML=items.length+` items`;
    createEventListeners();
    crossMark();
    

}
function createEventListeners(){
    // console.log("event");
    let todoCheckMarks=document.querySelectorAll(".todo-item .check-mark ");
    todoCheckMarks.forEach((checkMark)=>{
        checkMark.addEventListener("click",function(){
            markCompleted(checkMark.dataset.id);

        })
    })
}
function markCompleted(id)
{
    // from a database
    // console.log(id);
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            let status=doc.data().status;
            if(status=="active"){
                // console.log("completed");
                item.update({
                    status:"completed"
                })
            }else if(status=="completed"){
                // console.log("active")
                item.update({
                    status:"active"
                })
            }
        }

    })
}
function crossMark(){
           // console.log("event");
        let crossMark=document.querySelectorAll(".todo-item .cross-mark ");
        crossMark.forEach((cross)=>{
            cross.addEventListener("click",function(){
                deleteItem(cross.dataset.id);
    
            })
        })
}
function deleteItem(id){
    console.log(id);
    let item=db.collection("todo-items").doc(id);
    item.delete().then(() => {
        console.log("Document successfully deleted!");
    });

}
getItems();
// Additional features
function changeTheme(){
    let themeIcon=document.querySelector('.theme');
            document.body.classList.toggle('light')
            if(document.body.classList.contains('light')){
                themeIcon.src = './assets/icon-moon.svg'
            }else{
                themeIcon.src = './assets/icon-sun.svg'
            }
}
function clearCompleted(){
    // console.log("clicked");
    db.collection("todo-items").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let items=[];
        querySnapshot.docs.forEach((doc)=>{
                items.push({
                    id:doc.id,
                    ...doc.data()
                })

            });
            Delete(items);
        });
    });

}
function Delete(items){
    items.forEach((item)=>{
        if(item.status=='completed'){
            let del=db.collection("todo-items").doc(item.id);
            del.delete().then(() => {
                console.log("Document successfully deleted!");
            });

        }

    });

}
