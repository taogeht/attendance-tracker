import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,  push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-9f559-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const classList1BInDB = ref(database, "classList1B")
const classList1CInDB = ref(database, "classList1C")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const attendanceListEl = document.getElementById("attendance-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(classList1BInDB, inputValue)

    clearInputFieldEl()
})

onValue(classList1BInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearAttendanceListEl()

        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToAttendanceListEl(currentItem)
        }
        
    }else {
        attendanceListEl.innerHTML = "No names here"
    }
})

function clearInputFieldEl(){
    attendanceListEl.innerHTML = ""
}

function clearAttendanceListEl(){
    attendanceListEl.innerHTML = ""
}


function appendItemToAttendanceListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `classList1B/${itemID}`)
        remove (exactLocationOfItemInDB)
    })
    attendanceListEl.append(newEl)
}
