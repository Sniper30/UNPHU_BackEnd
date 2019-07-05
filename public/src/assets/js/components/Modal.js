class Modal{

     constructor(title,description,cb){
        this.title = title;
        this.description = description;
        this.cb = cb;
        this.succes();
     }
     succes(){

         let container = snip("div",document.body).attr({class:"Container"});

             let modal = snip("div",container).attr({class:"Modal"});

                 let head = snip("div",modal).attr({class:"head"}).textContent = this.title;

                 let body = snip("div", modal).attr({class:"body"}).textContent = this.description;

                 let footer = snip("div",modal).attr({class:"footer"});

             snip("button",footer).attr({onclick:()=>this.cb(container)}).css({background:"#30BF48"}).textContent = "Ok"
             snip("button",footer).attr({onclick:()=>container.remove()}).css({background:"#e74c3c"}).textContent = "Cancel"

     }

}