function wsearch() {
    var data = { name: "David" };
    var template = "Hey <b>{{=it.name}}</b>, you own me money.";
    var templateFunction = doT.template(template);
    var html = templateFunction(data);
    document.body.innerHTML += html;
}

function city_search() {
    var inp = document.getElementById("wsearch");
    console.log(inp.value);
}