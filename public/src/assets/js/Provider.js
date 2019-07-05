let api = "http://localhost:8000";
var Provider = {};
["GET","POST","PUT","DELETE","PATCH"].forEach((method)=>{
    Provider[method.toLowerCase()] = (url,data = {}) => new Promise((resolve,rejects)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(method,api+url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadend = ()=> resolve(JSON.parse(xhr.responseText));
        xhr.send(JSON.stringify(data));

    })
});