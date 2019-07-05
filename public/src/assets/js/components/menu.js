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
        let vertical_menu = snip("div",this.board).attr({class:"Vertical-menu close"});
        let btnOpen = snip("button",vertical_menu).attr({class:"btnOpen"})

        snip("i",btnOpen).attr({class:"far fa-arrow-alt-circle-right"}).css({fontSize:"34px"});

        let ul = snip("ul",vertical_menu);
        [
            {
                title:"ADD BOOK",
                cb:addBook,
                icon:"fas fa-plus"
            }, 
            {
                title:"MY BOOKS",
                cb:viewmybook,
                icon:"fas fa-book"
            },
            {
                title:"BOOKS",
                cb:viewAllbook,
                icon:"fas fa-book-open"
            }
        ].forEach((option, i)=>{
            let li = snip("li",ul).attr({onclick:option.cb.bind(this)});
            li.textContent = option.title;
            let icon = snip("i",li).attr({class:option.icon})
        });


        let logout = snip("div",vertical_menu).attr({class:"logOut",onclick:LogOut}).css({cursor:"pointer"});
        logout.textContent = "Log Out";
        snip("i",logout).attr({class:"fas fa-sign-out-alt"}).css({marginLeft:"14px"})


        btnOpen.addEventListener("click",()=>{
            if(vertical_menu.classList.contains("close")){
                vertical_menu.classList.remove("close");
                vertical_menu.classList.add("open");
                btnOpen.innerHTML = "";
                snip("i",btnOpen).attr({class:"far fa-arrow-alt-circle-left"}).css({fontSize:"34px"});
            }else{
                vertical_menu.classList.remove("open");
                vertical_menu.classList.add("close");
                btnOpen.innerHTML = "";
                snip("i",btnOpen).attr({class:"far fa-arrow-alt-circle-right"}).css({fontSize:"34px"});
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