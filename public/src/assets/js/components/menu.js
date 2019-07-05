class Menu{

    constructor(board){
        this.board = board;
        this.render();
        this.vertical();
    }
    render(){
      let main = snip("div",this.board).attr({class:"Menu"});

      let logo = snip("div",main).attr({class:"Logo"});
      snip("img",logo).attr({src : './src/assets/img/unphu.png'});
      snip("span",main).textContent = "Welcome, "+ JSON.parse(localStorage.session).user;
    }

    vertical(){
        let vertical_menu = snip("div",this.board).attr({class:"Vertical-menu"});
        let btnOpen = snip("button",vertical_menu).attr({class:"btnOpen"});

        let ul = snip("ul",vertical_menu);
        [
            {
                title:"ADD BOOK",
                cb:addBook
            }, 
            {
                title:"MY BOOKS",
                cb:viewmybook
            },
            {
                title:"BOOKS",
                cb:viewAllbook
            }
        ].forEach((option, i)=>{
            let li = snip("li",ul).attr({onclick:option.cb.bind(this)});
            li.textContent = option.title;
        });


        snip("div",vertical_menu).attr({class:"logOut",onclick:LogOut}).css({cursor:"pointer"}).textContent = "Log Out";


        btnOpen.addEventListener("click",()=>{
            if(vertical_menu.classList.contains("close")){
                vertical_menu.classList.remove("close");
                vertical_menu.classList.add("open");
            }else{
                vertical_menu.classList.remove("open");
                vertical_menu.classList.add("close");
            }
        });

       function addBook(){
           new Book(this.board,"ADD BOOK").add();
       }
       function editBook() {
        new Book(this.board,"UPDATE BOOK").edit();
       }
       function viewAllbook() {
           new Search(this.board);
       }
       function viewmybook() {
           new Books(this.board)
       }
       function LogOut(){
           localStorage.removeItem("session");
           location.reload();
       }

    }

}