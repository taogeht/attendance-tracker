import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,  push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-9f559-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const classListInDB = ref(database, "classList1C")
const attendanceList1CInDB = ref(database, "attendanceList1C")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const attendanceListEl = document.getElementById("attendance-list")
const selectAllButtonEl = document.getElementById("select-all-button")
const dateFieldEl = document.getElementById("date-field")
dateFieldEl.valueAsNumber = Date.now()-(new Date()).getTimezoneOffset()*60000;

selectAllButtonEl.addEventListener("click", selectAllItems)

function selectAllItems(){
    const items = attendanceListEl.querySelectorAll("li")
    let selectedValues =[]
    let dateValue = dateFieldEl.value
    items.forEach(item => {
        item.classList.add("selected")
        selectedValues.push(textContent)
    })
}

onValue(classListInDB, function(snapshot){
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
        let exactLocationOfItemInDB = ref(database, `classList1C/${itemID}`)
        remove (exactLocationOfItemInDB)
    })
    attendanceListEl.append(newEl)
}

