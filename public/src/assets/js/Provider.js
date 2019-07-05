let api = "http://localhost:8000";
var Provider = {};
["GET","POST","PUT","DELETE","PATCH"].forEach((method)=>{
    Provider[method.toLowerCase()] = (url,data = {}) => new Promise((resolve,rejects)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(method,api+url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadend = ()=>{
            if( typeof xhr.responseText ==="string" & xhr.responseText.includes("{")){
                resolve(JSON.parse(xhr.responseText));
            }else resolve(xhr.responseText);
        };
        xhr.send(JSON.stringify(data));

    })
});