const targetUrl = "";

function archiveClick(){
    event.preventDefault();
    FirstLevel = true;
    if(document.getElementById("Full").checked){
        FirstLevel = false;
    }
    var data = {
        webToArchive = document.getElementById('webUrl').value,
        firstLevel = FirstLevel
    }
    $.post(targetUrl, data, function(data, status){
        console.log(`Data: ${data} status:${status}`);
    });

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
