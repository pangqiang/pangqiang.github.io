(function(){
    if(localStorage.getItem('theme-mode')){
        document.getElementsByTagName("html")[0].id=localStorage.getItem('theme-mode');
    }
}())

function darkLightToggle() {
    
    if (document.getElementById("theme-light-mode") != null) {
        document.getElementById("theme-light-mode").id="theme-dark-mode";
        localStorage.setItem('theme-mode','theme-dark-mode')
        return;
    }
    if (document.getElementById("theme-dark-mode") != null) {
        document.getElementById("theme-dark-mode").id="theme-light-mode";
        localStorage.setItem('theme-mode','theme-light-mode')
        return;
    }
}
