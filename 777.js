var idcount = 0;
var currentNode;
var count = [0, 0, 0, 0, 0, 0, 0];
//順序:cpu,mb,ssd,hdd,ram,vga,pow
var typeName = ["CPU", "MB", "SSD", "傳統硬碟", "RAM", "VGA", "電源供應器"];

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
  if (c == "H310M-K" || c == "PRIMEZ390-A" || c == "ROGSTRIXB350-FGAMING" || c == "ROGSTRIXX470-FGAMING" || c == "B85pro") return 1;
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
  if (pic == "B85pro") {
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
  if (pic == "B85pro") {
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
  if (pic == "B85pro") {
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
  if (pic == "B85pro") {
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
  if (pic == "B85pro") {
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
  if (pic == "B85pro") {
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

