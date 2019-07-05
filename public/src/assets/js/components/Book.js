class Book{

    constructor(board){
        this.board = board;
    }
     add(){

         let container = snip("div",this.board).attr({class:"Container"});
          Main = snip("div",container).attr({class:"modaladd"})
         let head = snip("div",Main).attr({class:"head"}).textContent = "ADD BOOK";
         let form = snip("form",Main);

         let name = snip("input",form).attr({type:"text",placeholder:"Name of the book"});
         let author = snip("input",form).attr({type:"text",placeholder:"Name of the author"});
         let description = snip("textarea",form).css({color:"#000"}).attr({placeholder:"Insert description here...",rows:"4",cols:"50"});
         let footer = snip("footer",Main).attr({class:"footer"});

        snip("button",footer).attr({onclick:save.bind(this)}).textContent = "Save";
        snip("button",footer).attr({onclick:()=>container.remove()}).textContent = "Cancel";

             function save(){
                 Provider.post("/adding",
                     {
                     userid : JSON.parse(localStorage.session)._id,
                     name:name.value,
                     description:description.value,
                     author:author.value,
                     date : new Date().toISOString(),
                     lastModification : false
                     } ).then(r =>{
                         container.remove();
                         new Modal("Succes","Vailid information",(board)=>{
                             board.remove();
                             let Showbooks  = document.querySelector("div.Showbooks");
                             Showbooks.remove();
                             new Books(this.board);
                        
                            })
                         });

             }
     }

     edit(userid,bookid){


          return new Promise((resolve,rejects)=>{


              Provider.get(`/get/${userid}/${bookid}`).then(res =>{

                 let container = snip("div",this.board).attr({class:"Container"});

                    let Main = snip("div",container).attr({class:"modaladd"})
                    let head = snip("div",Main).attr({class:"head"}).textContent = "UPDATE BOOK";
                    let form = snip("form",Main);
            
                    let name = snip("input",form).attr({type:"text",placeholder:"Name of the book",value:res[0].name});
                    let author = snip("input",form).attr({type:"text",placeholder:"Name of the author",value:res[0].author});

                    let description = snip("textarea",form).css({color:"#000"})
                    .attr({placeholder:"Insert description here...",rows:"4",cols:"50",value:res[0].description});
            
                    let footer = snip("footer",Main).attr({class:"footer"});

            [
                {
                    title:"Save",
                    cb:update,
                    background:"#30BF48"
                },
                {
                    title:"Delete",
                    cb:remove,
                    background:"#c0392b"
                }
                ,
                {
                    title:"Cancel",
                    cb:()=>container.remove(),
                    background:"#d35400"
                }
            ].forEach(btn => snip("button",footer).attr({onclick:btn.cb}).css({background:btn.background}).textContent = btn.title );

             function update(){

                 Provider.put(`/modify/${userid}/${bookid}`,{
                     name:name.value,
                     description:description.value,
                     author:author.value
                 }).then((response)=>{
                         container.remove();
                         new Modal("UPDATE BOOK","SUCCESS",(p)=>{
                            p.remove()
                            resolve(1);
                         });
                });
            }

            function remove() {
                 new Modal("DELETE BOOK","SUCCESS",(p)=>{
                     Provider.delete("/remove/"+bookid).then(r=>{
                         container.remove();
                             p.remove();
                             resolve(1);
                     })
                 })
            }

        })




     })

    }
}