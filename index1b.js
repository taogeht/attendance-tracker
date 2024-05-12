import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,  push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-9f559-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const classList1BInDB = ref(database, "classList1B")
const attendanceList1BInDB = ref(database, "attendanceList1B")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const attendanceListEl = document.getElementById("attendance-list")
const selectAllButtonEl = document.getElementById("select-all-button")
const dateFieldEl = document.getElementById("date-field")
dateFieldEl.valueAsNumber = Date.now()-(new Date()).getTimezoneOffset()*60000;

selectAllButtonEl.addEventListener("click", selectAllItems)

function copyDataToArray(){
    onValue(classList1BInDB, (snapshot) => {
    const dataArray = []
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        dataArray.push(childData)
    })
    console.log(dataArray)

    })
}
copyDataToArray()




function selectAllItems(){
    const items = attendanceListEl.querySelectorAll("li")
    let selectedValues = []
    let dateValue = dateFieldEl.value
    items.forEach(item => {
        item.classList.add("selected")
        selectedValues.push(item.textContent)
    })
    push(attendanceList1BInDB, [selectedValues, dateValue])
}

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
    attendanceListEl.append(newEl)

    newEl.addEventListener("dblclick", function () {
        newEl.remove();
        let indexToRemove = dataArray.indexOf(itemValue)
        if(indexToRemove != -1){
            dataArray.splice(indexToRemove, 1);
        }
    })

}
