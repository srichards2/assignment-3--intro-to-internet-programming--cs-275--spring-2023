let modal = document.querySelectorAll('#js-triggers > li')[1]
let modalBackground = document.getElementsByClassName('modal-panel')[0]
let modalContent = document.getElementsByClassName('modal-content-pane')[0]
let menu = document.querySelectorAll('#js-triggers > li')[0]
let menuContent = document.getElementById('#menu-content > li')

window.onload = () => {
    modalContent.style.visibility = 'hidden'
}

modal.addEventListener('click', () => {
    if ( modalContent.style.visibility == "hidden" ) {
        modalBackground.style.visibility = "visible"
        modalContent.style.visibility = "visible"
    } else {
        modalBackground.style.visibility = "hidden"
        modalContent.style.visibility = "hidden"
    }
})

window.omload = () => {
    menuContent.style.visibility = 'hidden'
}

menuTrigger.addEventListener('click', () => {
    if (menuContent.style.display === "none") {
        menuContent.style.display = "block";
        modalBackground.style.visibility = "visible";
    } else {
        menuContent.style.display = "none";
        modalBackground.style.visibility = "hidden";
    }
});

