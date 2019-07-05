class SetLogin{

    constructor(user,password){
        this.user = user;
        this.password = password;
    }

    login(){
        return new Promise(resolve =>{

            var xhr = new XMLHttpRequest();
            xhr.open("POST","http://localhost:8000/enteruser");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onloadend = ()=> resolve(JSON.parse(xhr.responseText));
            xhr.send(JSON.stringify( { user: this.user, password: this.password } ));

        })
        
    }
    register(){
        return new Promise((resolve,reject)=>{
            let Petition = new XMLHttpRequest();
            Petition.open("POST","http://localhost:8000/adduser");
            Petition.setRequestHeader("Content-Type", "application/json")
            Petition.onloadend = ()=> resolve(JSON.parse(Petition.responseText) );
            Petition.send(JSON.stringify({user:this.user,password:this.password}) );

        });
    }
}