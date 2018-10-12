export default function entityToString(entity){
    var div=document.createElement('div');
    div.innerHTML=entity;
    var res=div.innerText||div.textContent;
    return res;
}