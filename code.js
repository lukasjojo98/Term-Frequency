var request = new XMLHttpRequest();
request.open("GET","frequency.json", false);
request.send(null);
let jsonData = JSON.parse(request.responseText);

request.open("GET","results2.json", false);
request.send(null);
let resultJson = JSON.parse(request.responseText);

document.addEventListener("DOMContentLoaded", event =>{
    for(let i = 0; i < jsonData.length; i++){
        let newItem = document.createElement("div");
        newItem.className = "word";
        let pElement = document.createElement("p");
        pElement.innerHTML = jsonData[i][0] + "("+ jsonData[i][1] +")"; 
        newItem.append(pElement);
        document.querySelector("body").append(newItem);
    }
    let words = document.querySelectorAll(".word");
        for(let i = 0; i < words.length; i++){
            words[i].addEventListener("click", (event) => {
                words[i].querySelector("p").className = "selected word";
                if(!(words[i].querySelector("ul") == null)){
                    words[i].querySelector("ul").remove();
                    words[i].querySelector("p").className = "word";

                }
                else if(!(words[i].querySelector(".similar") == null)){
                    words[i].querySelector(".similar").remove();
                    words[i].querySelector("p").className = "word";
                }
                else{
                let similarWords = document.createElement("div");
                similarWords.className = "similar";
                if(resultJson[i] == "Word not found in vocabulary"){
                similarWords.innerHTML = resultJson[i];   
                words[i].append(similarWords);
                }
                else {
                let uList = document.createElement("ul");
                uList.className = "list";
                for(let j = 0; j < resultJson[i].length; j++){
                    let listItem = document.createElement("li");
                    
                    listItem.innerHTML = resultJson[i][j];
                    uList.append(listItem);
                }
                words[i].append(uList);
                }
            }
            });
        }
});
