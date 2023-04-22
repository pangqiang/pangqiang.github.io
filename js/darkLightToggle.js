(function(){
    const theme = localStorage.getItem('theme-mode');
    if(theme){
        document.getElementsByTagName("html")[0].classList.add(theme);
    }
}())

function darkLightToggle() {
    const _html = document.getElementsByTagName("html")[0];
    if(_html.classList.contains('dark')){
        _html.classList.remove('dark')
        localStorage.setItem('theme-mode','light')
    }else{
        _html.classList.add('dark')
        localStorage.setItem('theme-mode','dark')
    }
}
