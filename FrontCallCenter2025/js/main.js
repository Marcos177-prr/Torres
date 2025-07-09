import { showSideMenu } from "./sidemenu.js";
window.addEventListener('load', init);

var sideMenuVisible = false;

function init (){
    console.log('Initializing application...');
    showSideMenu();
}

export function toggleSideMenu() {
    sideMenuVisible = !sideMenuVisible;
    if (sideMenuVisible) {
        document.getElementById('side-menu').style.display = 'block';
        document.getElementById('content').style.width = 'calc(100% - 250px)';
    }
    else{
        document.getElementById('side-menu').style.display = 'none';
        document.getElementById('content').style.width = '100%';
    }
}