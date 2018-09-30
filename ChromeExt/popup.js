const targetUrl = "http://localhost:3000/";

function archiveClick(){
    event.preventDefault();
    let rc = "false";
    if(document.getElementById("Full").checked){
        rc = "true";
    }
    archiveUrl = document.getElementById('webUrl').value;
    let data = "add=" + archiveUrl + "&r=" + rc;
    const http = new XMLHttpRequest();
    http.open("POST", targetUrl, true);
    http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(data);
}

function onPageDetailsReceived(pageDetails) {
    document.getElementById('webUrl').value = pageDetails.url;
}

window.addEventListener('load', function(evt) {
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('archive')
            .addEventListener('click', archiveClick);

    chrome.extension.getBackgroundPage().getPageDetails(onPageDetailsReceived);
});
