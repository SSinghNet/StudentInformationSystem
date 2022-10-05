//TODO: reset all changes when an edit is not saved.

const editStudent = () => {
    document.getElementById("studentValues").disabled = !document.getElementById("studentValues").disabled;
    
    if (document.getElementById("save").style.visibility == "hidden") {
        document.getElementById("save").style.visibility = "visible";
        document.getElementById("edit").innerHTML = "Stop Editing Student";
    } else { 
        document.getElementById("save").style.visibility = "hidden"
        document.getElementById("edit").innerHTML = "Edit Student";
    }
}