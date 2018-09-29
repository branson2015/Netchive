

function archiveClick(){
    event.preventDefault();
    alert(document.getElementById("webUrl").value);
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