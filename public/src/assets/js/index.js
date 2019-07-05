(()=>{

    document.addEventListener("DOMContentLoaded",()=>{
        if(!localStorage.session){
            const login = new Login(document.body);
            return;
        }else{
           let main = snip("div",document.body).attr({class:"Main"});
           new Menu(main);
           new Books(main);
        }

    })

})()