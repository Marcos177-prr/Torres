async function loadSideMenu() {
    return await fetch ('json/menu.json').then((response) => {
        return response.json();
    }).catch((error) => {
        console.error(error);
    });
}

export function showSideMenu(){
    var sideMenu = document.getElementById('side-menu');
    sideMenu.innerHTML= ''; //EMPTY MENU
    loadSideMenu().then((response) =>{

        response.options.forEach(option => {
            sideMenu.appendChild(drawOption(option));
        });

    })
}

function drawOption(option){
    console.log(option);
    var divOption = document.createElement('div');
    divOption.id = 'side-menu-option' + option.id;
    divOption.className = 'side-menu-option';
    divOption.addEventListener('click', () => {
        loadComponent(option.component)
    });
    // ICON
    var divIcon = document.createElement('div');
    divIcon.style.background = option.color;
    divOption.appendChild(divIcon);
    var icon = document.createElement('i');
    icon.className = 'fas fa-' + option.icon;
    divIcon.appendChild(icon);
    // TEXT
    var divText = document.createElement('div');
    divText.className = 'side-menu-label';
    divText.innerText = option.text;
    divOption.appendChild(divText);

    return divOption;
}

function loadComponent(component) {
    var url = component + '/index.html';
    var urlCode = '../'+ component + '/code.js'; 
    fetch(url)
        .then((response) => {return response.text();})
        .then((html) => {loadHTML(html);})
        .then(()=>{importModule(urlCode);})
        .catch((error) => {console.error('Invalid HTML file');});
}

async function importModule(moduleUrl) {
    console.log('importing module:', moduleUrl);
    const { init } = await import(moduleUrl);
    init();
    
}