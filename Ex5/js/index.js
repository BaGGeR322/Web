window.onload = function () {
    var animals = {
        text:"Животные",
        childs:[
            {   
                text: "Млекопитающие",
                childs: [
                    {text: "Коровы"},
                    {text: "Ослы"},
                    {text: "Собаки"},
                    {text: "Тигры"}
                ]
            },
            {
                text: "Другие",
                childs: [
                    {text: "Змеи"}, 
                    {text: "Птицы"}, 
                    {text: "Ящерицы"}
                ]
            }
        ]
    }
    var fish = {
        text: "Рыбы",
        childs: [
            {
                text: "Аквариумные", 
                childs: [
                    {text: "Гуппи"}, 
                    {text: "Скалярии"}
                ]
            }, 
            {
                text: "Морские",
                childs: [
                    {text: "Морская форель"}
                ]
            }
        ]
    }
    
    var tree = document.createElement("ul")
    formation(tree, animals)    
    formation(tree, fish)
    var body = document.getElementsByTagName("body")
    body[0].appendChild(tree)
    
    function formation(top, block)
    {
        var current = document.createElement("li")
        current.innerHTML = block.text
        if (block.hasOwnProperty("childs")) {
            var child = document.createElement("ul")
            for (let i of block.childs)
            {
                formation(child,i)
            }
            current.appendChild(child)
        }
        top.appendChild(current)
    }
    
    function recursion(parent_node)
    {
        console.log(parent_node);
        let s = parent_node.children
        if (s.length > 0)
        {
            for( let i = 0; i < s.length; i++)
                recursion(s[i]);
        }    
    }
    
    recursion(document.getElementById("html"))
}
   