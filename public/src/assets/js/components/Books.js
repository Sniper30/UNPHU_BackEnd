class Books {

     constructor(board) {
        this.board = board;
        this.render();
     }
     async render() {
         let comprobar = document.querySelector(".Showbooks");
         if (comprobar) comprobar.remove();
         let Main = snip("div", this.board).attr({ class: "Showbooks" });
         snip("span", Main).css({ fontSize: "36px" }).textContent = "Library";

         let container = snip("div", Main).attr({ class: "content" })
         let books = await Provider.get("/get/" + JSON.parse(localStorage.session)._id);
       

         for (let i = 0; i < books.length; i++) {
             const book = books[i];
             if(!book._id) return

                 let parent = snip("div", container).attr({ class: "thumbals" });
                 let p = snip("div", parent)
                     snip("div", p).textContent = book.name;
                     snip("div", p).textContent = book.author;
                     snip("div", p).textContent = book.description.substr(0, 25) + "...";

                let dateParent = snip("div", parent).attr({ class: "date" });

                 snip("div", dateParent).textContent = "Publicado : " + new Date(book.date).toDateString();

             if (book.lastModification !== null) snip("div", dateParent).textContent = "Last update : " + new Date(book.lastModification).toDateString();
                 let btn_vot = snip("button", dateParent);
            
             let a = await Provider.get("/gettingvotes/" + book._id);

                 if (a.users !== null) btn_vot.textContent = a.users.length;
                 else btn_vot.textContent = 0;
                 snip("i",btn_vot).css({color:"#c0392b"}).attr({class:"fas fa-heart"});

                 btn_vot.onclick = () => Provider.put("/update/" + book._id, { users: JSON.parse(localStorage.session)._id })
                     .then(r =>{
                         btn_vot.textContent = r[0].users.length;
                         snip("i",btn_vot).css({color:"#c0392b"}).attr({class:"fas fa-heart"});
                     })


            parent.ondblclick = () => new Book(this.board).edit(JSON.parse(localStorage.session)._id, book._id)
                 .then(() => {
                    Main.remove();
                    this.render();
                 })









        }

    }

}