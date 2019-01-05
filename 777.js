var idcount = 0;
var currentNode;
var count = [0, 0, 0, 0, 0, 0, 0];
//順序:cpu,mb,ssd,hdd,ram,vga,pow
var typeName = ["CPU", "MB", "SSD", "傳統硬碟", "RAM", "VGA", "電源供應器"];

window.fbAsyncInit = function() {
  FB.init({
    appId            : '190381168487019',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.2'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  if (ev.target.tagName.toLowerCase() == "img")//防止圖片塞在圖片內
    return;
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
function dropDel(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById(data).remove();
  document.getElementById(data + "Plate").remove();
  count[whichType(data)]--;
}

function whichType(c) {
  if (c == "R72700" || c == "fx8350" || c == "i38100k" || c == "i74790k" || c == "i78700k" || c == "i99900k" || c == "R32200G") return 0;
  if (c == "H310M-K" || c == "PRIMEZ390-A" || c == "ROGSTRIXB350-FGAMING" || c == "ROGSTRIXX470-FGAMING" || c == "b85pro") return 1;
  if (c == "970EVONVMe1TB" || c == "970EVONVMe2TB" || c == "A1000480G" || c == "UV500480G") return 2;
  if (c == "HDD") return 3;
  if (c == "1333" || c == "3000RGB" || c == "hyperx2400" || c == "3000") return 4;
  if (c == "GTX1066" || c == "GTX1080TI" || c == "RTX2070" || c == "RTX2080TI") return 5;
  if (c == "pow") return 6;
}

function insert(x, y, z, pic, h, w) {
  if (count[whichType(pic)] > 0 && whichType(pic) != 4) {
    alert("已經有" + typeName[whichType(pic)] + "了！！不能貪心歐＜３");
    return;
  }
  count[whichType(pic)]++;
  currentNode = document.getElementById("content");
  var plateNode = document.createElement("div");
  plateNode.setAttribute("class", "plate");
  plateNode.setAttribute("id", pic + "Plate");
  plateNode.setAttribute("style", "top:" + x + "px;left:" + y + "px;z-index:" + z + ";width:" + w + "px;height:" + h + "px;");
  plateNode.setAttribute("ondrop", "drop(event)");
  plateNode.setAttribute("ondragover", "allowDrop(event)");
  var newNode = document.createElement("img");
  plateNode.appendChild(newNode);
  newNode.setAttribute("id", pic);
  newNode.setAttribute("width", w);
  newNode.setAttribute("height", h);
  newNode.setAttribute("src", typeName[whichType(pic)] + "/" + pic + ".png");
  newNode.setAttribute("style", "z-index:" + z + ";");
  newNode.setAttribute("ondragstart", "drag(event)");
  newNode.draggable = "true";

  currentNode.appendChild(plateNode);
  /*localStorage.setItem(idcount+"-id", document.getElementById( "pic" ).value);
  localStorage.setItem(idcount+"-x", document.getElementById( "x" ).value);
  localStorage.setItem(idcount+"-y", document.getElementById( "y" ).value);
  localStorage.setItem("idcount", idcount);*/
}


function insertmb(pic) {
  if (count[1] > 0) {
    alert("已經有mb了！！不能貪心歐＜３");
    return;
  }
  count[1]++;
  currentNode = document.getElementById("content");
  //CPU
  var plateCpuNode = document.createElement("div");
  plateCpuNode.setAttribute("class", "MBPlateCpu");
  plateCpuNode.setAttribute("id", pic + "CpuPlate");
  if (pic == "H310M-K") {
    plateCpuNode.setAttribute("style", "top:163px;left:412px;z-index:2;width:125px;height:125px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateCpuNode.setAttribute("style", "top:150px;left:400px;z-index:2;width:85px;height:85px;");
  }
  if (pic == "b85pro") {
    plateCpuNode.setAttribute("style", "top:163px;left:412px;z-index:2;width:125px;height:125px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateCpuNode.setAttribute("style", "top:158px;left:420px;z-index:2;width:85px;height:85px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateCpuNode.setAttribute("style", "top:163px;left:412px;z-index:2;width:125px;height:125px;");
  }
  plateCpuNode.setAttribute("ondrop", "drop(event)");
  plateCpuNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateCpuNode);
  //PCIE
  var platePcieNode = document.createElement("div");
  platePcieNode.setAttribute("class", "MBPlatePcie");
  platePcieNode.setAttribute("id", pic + "PciePlate");
  if (pic == "H310M-K") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "PRIMEZ390-A") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "b85pro") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  platePcieNode.setAttribute("ondrop", "drop(event)");
  platePcieNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(platePcieNode);
  //VGA
  var plateVGANode = document.createElement("div");
  plateVGANode.setAttribute("class", "MBPlateVga");
  plateVGANode.setAttribute("id", pic + "VgaPlate");
  if (pic == "H310M-K") {
    plateVGANode.setAttribute("style", "top:355px;left:165px;z-index:2;width:425px;height:90px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateVGANode.setAttribute("style", "top:355px;left:180px;z-index:2;width:425px;height:80px;");
  }
  if (pic == "b85pro") {
    plateVGANode.setAttribute("style", "top:355px;left:180px;z-index:2;width:425px;height:80px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateVGANode.setAttribute("style", "top:355px;left:180px;z-index:2;width:425px;height:80px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateVGANode.setAttribute("style", "top:355px;left:180px;z-index:2;width:425px;height:80px;");
  }
  plateVGANode.setAttribute("ondrop", "drop(event)");
  plateVGANode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateVGANode);
  //RAM
  var plateRAM1Node = document.createElement("div");
  plateRAM1Node.setAttribute("class", "MBPlateRam");
  plateRAM1Node.setAttribute("id", pic + "Ram1Plate");
  if (pic == "H310M-K") {
    plateRAM1Node.setAttribute("style", "top:40px;left:623px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM1Node.setAttribute("style", "top:40px;left:623px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "b85pro") {
    plateRAM1Node.setAttribute("style", "top:40px;left:623px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM1Node.setAttribute("style", "top:40px;left:623px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM1Node.setAttribute("style", "top:40px;left:623px;z-index:2;width:20px;height:368px;");
  }
  plateRAM1Node.setAttribute("ondrop", "drop(event)");
  plateRAM1Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM1Node);
  //RAM
  var plateRAM2Node = document.createElement("div");
  plateRAM2Node.setAttribute("class", "MBPlateRam");
  plateRAM2Node.setAttribute("id", pic + "Ram2Plate");
  if (pic == "H310M-K") {
    plateRAM2Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM2Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "b85pro") {
    plateRAM2Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM2Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM2Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  plateRAM2Node.setAttribute("ondrop", "drop(event)");
  plateRAM2Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM2Node);
  //MBpic
  var newNode = document.createElement("img");
  newNode.setAttribute("id", pic);
  newNode.setAttribute("class", 'MB');
  if (pic == "H310M-K") {
    newNode.setAttribute("width", 600);
  }
  if (pic == "PRIMEZ390-A") {
    newNode.setAttribute("width", 500);
  }
  if (pic == "b85pro") {
    newNode.setAttribute("width", 600);
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    newNode.setAttribute("width", 600);
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    newNode.setAttribute("width", 600);
  }
  newNode.setAttribute("height", 600);
  newNode.setAttribute("src", typeName[whichType(pic)] + "/" + pic + ".png");
  newNode.setAttribute("style", "top:0px;left:150px;z-index:1;");
  newNode.setAttribute("ondragstart", "drag(event)");
  newNode.draggable = false;
  currentNode.appendChild(newNode);
  /*localStorage.setItem(idcount+"-id", document.getElementById( "pic" ).value);
  localStorage.setItem(idcount+"-x", document.getElementById( "x" ).value);
  localStorage.setItem(idcount+"-y", document.getElementById( "y" ).value);
  localStorage.setItem("idcount", idcount);*/
}

function del(){
  localStorage.removeItem(this.innerHTML);
  this.remove();
}

function show(tag){
  var obj = JSON.parse(localStorage.getItem(tag))
  var x = document.getElementById("content").childNodes;
  for(var i=x.length-1;i>=0;i--){
    if(x[i].id!="trash")  
      x[i].remove();
  }
  for(var i=0;i<7;i++){
    count[i]=0;
  }
  if(obj.CPU!="none")
    insert(10,20,2,obj.CPU,100,100);
  if(obj.MB!="none")
    insertmb(obj.MB);
  if(obj.SSD!="none")
    insert(150,750,2,obj.SSD,75,225)
  if(obj.HDD!="none")
    insert(10,20,2,obj.HDD,100,100);
  if(obj.RAM1!="none")
    insert(150,750,2,obj.RAM1,75,225)
  if(obj.RAM2!="none")
    insert(10,20,2,obj.CPU,100,100);
  if(obj.RAM3!="none")
    insert(10,20,2,obj.CPU,100,100);
  if(obj.RAM4!="none")
    insert(10,20,2,obj.CPU,100,100);
  if(obj.VGA!="none")
    insert(250,750,2,obj.VGA,75,350)
  if(obj.POW!="none")
    insert(10,20,2,obj.CPU,100,100);
}

function save(){//第一次用json就上手
  for(var i=0;i<localStorage.length;i++)
    if(localStorage.key(i)==document.getElementById("tag").value){
      alert("已經有這個tag了，請換個tag名稱!");
      return;
    }
  var x = document.getElementById("content").childNodes;
    var ramCount = 1;
    var obj={CPU:'none', MB:'none', SSD:'none', HDD:'none', RAM1:'none', RAM2:'none', RAM3:'none', RAM4:'none',  VGA:'none', POW:'none'};
    for(var i=0;i<x.length;i++){
        if(x[i].nodeName=="IMG")
          obj.MB=x[i].id;
        else if(x[i].nodeName=="DIV"){
          if(x[i].hasChildNodes){
            var t = x[i].childNodes;
            for(var j=0;j<t.length;j++){
              if(t[j].nodeName=="IMG"){//順序:cpu,mb,ssd,hdd,ram,vga,pow
                if(whichType(t[j].id)==0)
                    obj.CPU=t[j].id;
                if(whichType(t[j].id)==2)
                  obj.SSD=t[j].id;
                if(whichType(t[j].id)==3)
                  obj.HDD=t[j].id;
                if(whichType(t[j].id)==4){
                  if(ramCount==1)
                    obj.RAM1=t[j].id;
                  else if(ramCount==2)
                    obj.RAM2=t[j].id;
                  else if(ramCount==3)
                    obj.RAM3=t[j].id;
                  else if(ramCount==4)
                    obj.RAM4=t[j].id;
                  ramCount++;
                }
                if(whichType(t[j].id)==5)
                  obj.VGA=t[j].id;
                if(whichType(t[j].id)==6)
                  obj.POW=t[j].id;
              }
            }
          }
        }
    }
    localStorage.setItem(document.getElementById("tag").value,JSON.stringify(obj));
    currentNode = document.getElementById("saveList");
    var newNode = document.createElement("li");
    newNode.setAttribute("id", "savetag:"+document.getElementById("tag").value);
    newNode.setAttribute("onclick", "show('"+document.getElementById('tag').value+"')");
    newNode.innerHTML = document.getElementById("tag").value;
    currentNode.appendChild(newNode);
}

function start(){
  currentNode = document.getElementById("saveList");
  for(var i=0;i<localStorage.length;i++){
    var newNode = document.createElement("li");
    newNode.setAttribute("id", "savetag:"+localStorage.key(i));
    newNode.setAttribute("onclick", "show('"+localStorage.key(i)+"')");
    newNode.innerHTML = localStorage.key(i);
    currentNode.appendChild(newNode);
    console.log("fuck");
  }
}

window.addEventListener("load",start,false);