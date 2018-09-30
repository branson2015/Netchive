const targetUrl = "http://localhost:3000/";

function archiveClick(){
    event.preventDefault();
    FirstLevel = true;
    if(document.getElementById("Full").checked){
        FirstLevel = false;
    }

    archiveUrl = document.getElementById('webUrl').value;
    data = "/archiveUrl=" + archiveUrl + "&" + "FirstLevel=" + FirstLevel.toString();
    const http = new XMLHttpRequest();
    http.open("POST", data, targetUrl);
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send();

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
