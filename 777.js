var idcount = 0;
var currentNode;
var count = [0, 0, 0, 0, 0, 0, 0];
var ramPosition = [0, 0, 0, 0];
var vidplay = 1;
var work = 1;
var obj = { CPU: 'none', MB: 'none', SSD: 'none', HDD: 'none', RAM1: 'none', RAM2: 'none', RAM3: 'none', RAM4: 'none', VGA: 'none', POW: 'none' };
//順序:cpu,mb,ssd,hdd,ram,vga,pow
var typeName = ["CPU", "MB", "SSD", "HDD", "RAM", "VGA", "POW"];

window.fbAsyncInit = function () {
  FB.init({
    appId: '190381168487019',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.2'
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
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
  if (whichType(data) == 1 || whichType(data) == 3 || whichType(data) == 6)//防止mb,hdd,pow亂動
    return;
  ev.target.appendChild(document.getElementById(data));
}
function dropDel(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (whichType(data) == 1) {
    var r = confirm("如果要將主機板移除，其他零件也會一並移除歐\n請先確認已儲存您的清單以免清單遺失<3\n確認移除嗎?");
    if (r) {
      var x = document.getElementById("content").childNodes;
      for (var i = x.length - 1; i >= 0; i--) {
        if (x[i].id != "trash")
          x[i].remove();
      }
      for (var i = 0; i < 7; i++)
        count[i] = 0;
      for (var i = 0; i < 4; i++)
        ramPosition[i] = 0;
    }
    else
      return;
  }
  else if (whichType(data) == 3) {
    document.getElementById(data).remove();
    document.getElementById("hdd").remove();
    count[whichType(data)]--;
  }
  else if (whichType(data) == 6) {
    document.getElementById(data).remove();
    document.getElementById("pow").remove();
    count[whichType(data)]--;
  }
  else if (whichType(data) == 4) {
    document.getElementById(data).remove();
    document.getElementById(data + "Plate").remove();
    ramPosition[parseInt(data.charAt(0))] = 0;
    count[whichType(data)]--;
  }
  else {
    document.getElementById(data).remove();
    document.getElementById(data + "Plate").remove();
    count[whichType(data)]--;
  }
}

function whichType(c) {
  if (!c) return -1;
  if (c == "R72700" || c == "fx8350" || c == "i38100k" || c == "i74790k" || c == "i78700k" || c == "i99900k" || c == "R32200G") return 0;
  if (c == "H310M-K" || c == "PRIMEZ390-A" || c == "ROGSTRIXB350-FGAMING" || c == "ROGSTRIXX470-FGAMING" || c == "b85pro") return 1;
  if (c == "970EVONVMe1TB" || c == "970EVONVMe2TB" || c == "A1000480G" || c == "UV500480G") return 2;
  if (c == "SEAGATE HDD 1T" || c == "SEAGATE HDD 2T" || c == "SEAGATE HDD 3T" || c == "SEAGATE HDD 4T") return 3;
  if (c == "DDR3 1333 4GB" || c == "DDR4 3000 RGB 8GB" || c == "DDR4 2400 8GB" || c == "DDR4 3000 16GB") return 4;
  if (c == "GTX1066" || c == "GTX1080TI" || c == "RTX2070" || c == "RTX2080TI") return 5;
  if (c == "COOLERMASTER 450W" || c == "COOLERMASTER 550W" || c == "COOLERMASTER 650W" || c == "COOLERMASTER 850W") return 6;
  if (c.search("DDR3 1333 4GB") != -1 || c.search("DDR4 3000 RGB 8GB") != -1 || c.search("DDR4 2400 8GB") != -1 || c.search("DDR4 3000 16GB") != -1) return 4;
}

function whichLag(c) {
  if (c == "R72700" || c == "R32200G") return "am4";
  if (c == "i38100k" || c == "i78700k" || c == "i99900k") return 1151;
  if (c == "H310M-K" || c == "PRIMEZ390-A") return 1151;
  if (c == "ROGSTRIXB350-FGAMING" || c == "ROGSTRIXX470-FGAMING") return "am4";
  if (c == "b85pro" || c == "i74790k") return 1150;
}

function whichDdr(c) {
  if (c == "i74790k" || c.search("DDR3 1333 4GB") != -1)
    return "DDR3";
  else
    return "DDR4";
}

function insert(x, y, z, pic, h, w) {
  currentNode = document.getElementById("content");
  if (whichType(pic) == 6) {
    if (count[6] != 0) {
      document.getElementById("pow").remove();
      count[6] = 0;
    }
    var plateNode = document.createElement("div");
    plateNode.setAttribute("class", "plate");
    plateNode.setAttribute("id", "pow");
    plateNode.setAttribute("style", "top:" + x + "px;left:" + y + "px;z-index:" + z + ";width:" + w + "px;height:" + h + "px;");
    var newNode = document.createElement("img");
    plateNode.appendChild(newNode);
    newNode.setAttribute("id", pic);
    newNode.setAttribute("src", typeName[whichType(pic)] + "/" + pic + ".png");
    newNode.setAttribute("style", "z-index:" + z + ";");
    newNode.setAttribute("width", w + "px");
    newNode.setAttribute("height", h + "px");
    newNode.setAttribute("ondragstart", "drag(event)");
    newNode.draggable = "true";
    currentNode.appendChild(plateNode);
    count[6] = 1;
    return;
  } if (whichType(pic) == 3) {
    if (count[3] != 0) {
      document.getElementById("hdd").remove();
      count[3] = 0;
    }
    var plateNode = document.createElement("div");
    plateNode.setAttribute("class", "plate");
    plateNode.setAttribute("id", "hdd");
    plateNode.setAttribute("style", "top:" + x + "px;left:" + y + "px;z-index:" + z + ";width:" + w + "px;height:" + h + "px;");
    var newNode = document.createElement("img");
    plateNode.appendChild(newNode);
    newNode.setAttribute("id", pic);
    newNode.setAttribute("src", typeName[whichType(pic)] + "/" + pic + ".png");
    newNode.setAttribute("style", "z-index:" + z + ";");
    newNode.setAttribute("width", w + "px");
    newNode.setAttribute("height", h + "px");
    newNode.setAttribute("ondragstart", "drag(event)");
    newNode.draggable = "true";
    currentNode.appendChild(plateNode);
    count[3] = 1;
    return;
  }
  if (count[whichType(pic)] > 0 && whichType(pic) != 4) {
    alert("已經有" + typeName[whichType(pic)] + "了！！不能貪心歐＜３");
    return;
  }
  var plus = 0;
  if (whichType(pic) == 4) {
    var i;
    if (count[whichType(pic)] > 3) {
      alert("那麼多" + typeName[whichType(pic)] + "要幹嘛！！不能貪心歐＜３");
      return;
    }
    else {
      for (i = 0; i < 4; i++) {
        if (ramPosition[i] == 0) {
          ramPosition[i] = 1;
          break;
        }
        else
          plus += w;
      }
    }

  }
  count[whichType(pic)]++;
  var plateNode = document.createElement("div");
  plateNode.setAttribute("class", "plate");
  if (whichType(pic) == 4)
    plateNode.setAttribute("id", i + "-" + pic + "Plate");
  else
    plateNode.setAttribute("id", pic + "Plate");
  plateNode.setAttribute("style", "top:" + x + "px;left:" + (y + plus) + "px;z-index:" + z + ";width:" + w + "px;height:" + h + "px;");
  plateNode.setAttribute("ondrop", "drop(event)");
  plateNode.setAttribute("ondragover", "allowDrop(event)");
  var newNode = document.createElement("img");
  plateNode.appendChild(newNode);
  if (whichType(pic) == 4)
    newNode.setAttribute("id", i + "-" + pic);
  else
    newNode.setAttribute("id", pic);
  newNode.setAttribute("width", w);
  newNode.setAttribute("height", h);
  newNode.setAttribute("src", typeName[whichType(pic)] + "/" + pic + ".png");
  newNode.setAttribute("style", "z-index:" + z + ";");
  newNode.setAttribute("ondragstart", "drag(event)");
  newNode.draggable = "true";
  currentNode.appendChild(plateNode);
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
  plateCpuNode.setAttribute("class", "plate");
  //MBPlateCpu
  plateCpuNode.setAttribute("id", pic + "CpuPlate");
  if (pic == "H310M-K") {
    plateCpuNode.setAttribute("style", "top:163px;left:447px;z-index:2;width:125px;height:125px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateCpuNode.setAttribute("style", "top:143px;left:462px;z-index:2;width:97px;height:85px;");
  }
  if (pic == "b85pro") {
    plateCpuNode.setAttribute("style", "top:133px;left:440px;z-index:2;width:110px;height:90px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateCpuNode.setAttribute("style", "top:150px;left:481px;z-index:2;width:96px;height:82px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateCpuNode.setAttribute("style", "top:153px;left:475px;z-index:2;width:95px;height:80px;");
  }
  plateCpuNode.setAttribute("ondrop", "drop(event)");
  plateCpuNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateCpuNode);
  //PCIE
  var platePcieNode = document.createElement("div");
  platePcieNode.setAttribute("class", "plate");
  //MBPlatePcie
  platePcieNode.setAttribute("id", pic + "PciePlate");
  if (pic == "H310M-K") {
    platePcieNode.setAttribute("style", "top:445px;left:420px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "PRIMEZ390-A") {
    platePcieNode.setAttribute("style", "top:507px;left:445px;z-index:2;width:250px;height:30px;");
  }
  if (pic == "b85pro") {
    platePcieNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    platePcieNode.setAttribute("style", "top:300px;left:425px;z-index:2;width:145px;height:35px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    platePcieNode.setAttribute("style", "top:505px;left:558px;z-index:2;width:135px;height:25px;");
  }
  platePcieNode.setAttribute("ondrop", "drop(event)");
  platePcieNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(platePcieNode);
  //VGA
  var plateVGANode = document.createElement("div");
  plateVGANode.setAttribute("class", "plate");
  //MBPlateVga
  plateVGANode.setAttribute("id", pic + "VgaPlate");
  if (pic == "H310M-K") {
    plateVGANode.setAttribute("style", "top:348px;left:215px;z-index:2;width:420px;height:85px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateVGANode.setAttribute("style", "top:290px;left:200px;z-index:2;width:350px;height:80px;");
  }
  if (pic == "b85pro") {
    plateVGANode.setAttribute("style", "top:280px;left:220px;z-index:2;width:375px;height:80px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateVGANode.setAttribute("style", "top:395px;left:210px;z-index:2;width:370px;height:80px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateVGANode.setAttribute("style", "top:290px;left:183px;z-index:2;width:385px;height:75px;");
  }
  plateVGANode.setAttribute("ondrop", "drop(event)");
  plateVGANode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateVGANode);
  //RAM1
  var plateRAM1Node = document.createElement("div");
  plateRAM1Node.setAttribute("class", "plate");
  //MBPlateRam
  plateRAM1Node.setAttribute("id", pic + "Ram1Plate");
  if (pic == "H310M-K") {
    plateRAM1Node.setAttribute("style", "top:40px;left:658px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM1Node.setAttribute("style", "top:40px;left:635px;z-index:2;width:15px;height:270px;");
  }
  if (pic == "b85pro") {
    plateRAM1Node.setAttribute("style", "top:36px;left:623px;z-index:2;width:18px;height:270px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM1Node.setAttribute("style", "top:44px;left:647px;z-index:2;width:15px;height:282px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM1Node.setAttribute("style", "top:50px;left:648px;z-index:2;width:15px;height:280px;");
  }
  plateRAM1Node.setAttribute("ondrop", "drop(event)");
  plateRAM1Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM1Node);
  //RAM2
  var plateRAM2Node = document.createElement("div");
  plateRAM2Node.setAttribute("class", "plate");
  //MBPlateRam
  plateRAM2Node.setAttribute("id", pic + "Ram2Plate");
  if (pic == "H310M-K") {
    plateRAM2Node.setAttribute("style", "top:40px;left:682px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM2Node.setAttribute("style", "top:40px;left:660px;z-index:2;width:15px;height:270px;");
  }
  if (pic == "b85pro") {
    plateRAM2Node.setAttribute("style", "top:36px;left:645px;z-index:2;width:18px;height:270px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM2Node.setAttribute("style", "top:44px;left:672px;z-index:2;width:15px;height:282px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM2Node.setAttribute("style", "top:50px;left:667px;z-index:2;width:15px;height:280px;");
  }
  plateRAM2Node.setAttribute("ondrop", "drop(event)");
  plateRAM2Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM2Node);
  //RAM3
  if (pic != "H310M-K") {
    var plateRAM3Node = document.createElement("div");
    plateRAM3Node.setAttribute("class", "plate");
    //MBPlateRam
    plateRAM3Node.setAttribute("id", pic + "Ram3Plate");
    plateRAM3Node.setAttribute("ondrop", "drop(event)");
    plateRAM3Node.setAttribute("ondragover", "allowDrop(event)");
    currentNode.appendChild(plateRAM3Node);
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM3Node.setAttribute("style", "top:40px;left:685px;z-index:2;width:15px;height:270px;");
  }
  if (pic == "b85pro") {
    plateRAM3Node.setAttribute("style", "top:36px;left:667px;z-index:2;width:18px;height:270px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM3Node.setAttribute("style", "top:44px;left:697px;z-index:2;width:15px;height:282px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM3Node.setAttribute("style", "top:50px;left:690px;z-index:2;width:15px;height:280px;");
  }

  //RAM4
  if (pic != "H310M-K") {
    var plateRAM4Node = document.createElement("div");
    plateRAM4Node.setAttribute("class", "plate");
    //MBPlateRam
    plateRAM4Node.setAttribute("id", pic + "Ram4Plate");
    plateRAM4Node.setAttribute("ondrop", "drop(event)");
    plateRAM4Node.setAttribute("ondragover", "allowDrop(event)");
    currentNode.appendChild(plateRAM4Node);
  }
  if (pic == "PRIMEZ390-A") {
    plateRAM4Node.setAttribute("style", "top:40px;left:710px;z-index:2;width:15px;height:270px;");
  }
  if (pic == "b85pro") {
    plateRAM4Node.setAttribute("style", "top:36px;left:689px;z-index:2;width:18px;height:270px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM4Node.setAttribute("style", "top:44px;left:722px;z-index:2;width:15px;height:282px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM4Node.setAttribute("style", "top:50px;left:712px;z-index:2;width:15px;height:280px;");
  }

  //HDD
  var plateHddNode = document.createElement("div");
  plateHddNode.setAttribute("class", "MBPlateHdd");
  plateHddNode.setAttribute("id", pic + "HddPlate");
  plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:120px;height:25px;");
  plateHddNode.setAttribute("ondrop", "drop(event)");
  plateHddNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateHddNode);
  //POW
  var platePowNode = document.createElement("div");
  platePowNode.setAttribute("class", "MBPlatePow");
  platePowNode.setAttribute("id", pic + "PowPlate");
  if (pic == "H310M-K") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:150px;height:25px;");
  }
  if (pic == "PRIMEZ390-A") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:150px;height:25px;");
  }
  if (pic == "b85pro") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:150px;height:25px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:150px;height:25px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:150px;height:25px;");
  }
  platePowNode.setAttribute("ondrop", "drop(event)");
  platePowNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(platePowNode);
  //MBpic
  var newNode = document.createElement("img");
  newNode.setAttribute("id", pic);
  newNode.setAttribute("class", 'MB');
  if (pic == "H310M-K") {
    newNode.setAttribute("width", 600);
  }
  if (pic == "PRIMEZ390-A") {
    newNode.setAttribute("width", 600);
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
  newNode.setAttribute("style", "top:0px;left:185px;z-index:1;");
  newNode.setAttribute("ondragstart", "drag(event)");
  newNode.draggable = true;
  currentNode.appendChild(newNode);
}

function check() {
  var x = document.getElementById("content").childNodes;
  var ramCount = 1;
  obj.CPU=obj.MB=obj.SSD=obj.HDD=obj.RAM1= obj.RAM2=obj.RAM3=obj.RAM4=obj.VGA=obj.POW="none";
  for (var i = 0; i < x.length; i++) {
    if (x[i].nodeName == "IMG" && x[i].id != "trash")
      obj.MB = x[i].id;
    else if (x[i].nodeName == "DIV") {
      if (x[i].hasChildNodes) {
        var t = x[i].childNodes;
        for (var j = 0; j < t.length; j++) {
          if (t[j].nodeName == "IMG") {//順序:cpu,mb,ssd,hdd,ram,vga,pow
            if (whichType(t[j].id) == 0)
              obj.CPU = t[j].id;
            if (whichType(t[j].id) == 2)
              obj.SSD = t[j].id;
            if (whichType(t[j].id) == 3)
              obj.HDD = t[j].id;
            if (whichType(t[j].id) == 4) {
              if (ramCount == 1)
                obj.RAM1 = t[j].id.slice(2, t[j].id.length);
              else if (ramCount == 2)
                obj.RAM2 = t[j].id.slice(2, t[j].id.length);
              else if (ramCount == 3)
                obj.RAM3 = t[j].id.slice(2, t[j].id.length);
              else if (ramCount == 4)
                obj.RAM4 = t[j].id.slice(2, t[j].id.length);
              ramCount++;
            }
            if (whichType(t[j].id) == 5)
              obj.VGA = t[j].id;
            if (whichType(t[j].id) == 6)
              obj.POW = t[j].id;
          }
        }
      }
    }
  }//end load
  var text = "";
  text += "處理器: " + obj.CPU + "\n";
  text += "主機板: " + obj.MB + "\n";
  text += "固態硬碟: " + obj.SSD + "\n";
  text += "機械硬碟: " + obj.HDD + "\n";
  text += "記憶體: " + obj.RAM1;
  if (obj.RAM2 != "none")
    text += "   " + obj.RAM2;
  if (obj.RAM3 != "none")
    text += "\n   " + obj.RAM3;
  if (obj.RAM4 != "none")
    text += "   " + obj.RAM4;
  text += "\n獨立顯示卡: " + obj.VGA + "\n";
  text += "電源供應器: " + obj.POW + "\n";
  document.getElementById("explain2").innerText = text;
  var shareTar = "這是我用這個網站配出來的電競神機，左打69核處理器，右打87G顯示卡\n";
  shareTar+=text;
  document.getElementById('shareBtn').onclick = function() {
    FB.ui({
      method: 'share',
      display: 'popup',
      quote : shareTar,
      href: 'https://kangwei0988.github.io/htmlFinalProject/%E6%9C%9F%E6%9C%AB%E5%B0%88%E6%A1%88',
    }, function(response){});}
}

function deltag(tar) {
  localStorage.removeItem(tar);
  document.getElementById("savetag:" + tar).remove();
}

function show(tag) {
  if(vidplay==0) return;
  var obj = JSON.parse(localStorage.getItem(tag))
  var x = document.getElementById("content").childNodes;
  for (var i = x.length - 1; i >= 0; i--) {
    if (x[i].id != "trash" && x[i].id != "myVideo0" && x[i].id != "myVideo1"&& x[i].id != "myVideo2")
      x[i].remove();
  }
  for (var i = 0; i < 7; i++) {
    count[i] = 0;
  }
  for (var i = 0; i < 4; i++)
    ramPosition[i] = 0;
  if (obj.CPU != "none")
    insert(10, 20, 2, obj.CPU, 100, 100);
  if (obj.MB != "none")
    insertmb(obj.MB);
  if (obj.SSD != "none")
    insert(180, 790, 2, obj.SSD, 75, 225)
  if (obj.HDD != "none")
    insert(380, 790, 2, obj.HDD, 200, 170);
  if (obj.RAM1 != "none")
    insert(175, 20, 2, obj.RAM1, 400, 40);
  if (obj.RAM2 != "none")
    insert(175, 20, 2, obj.RAM2, 400, 40);
  if (obj.RAM3 != "none")
    insert(175, 20, 2, obj.RAM3, 400, 40);
  if (obj.RAM4 != "none")
    insert(175, 20, 2, obj.RAM4, 400, 40);
  if (obj.VGA != "none")
    insert(280, 790, 2, obj.VGA, 75, 350);
  if (obj.POW != "none")
    insert(10, 790, 2, obj.POW, 150, 150);
  document.getElementById("tag").value = tag;
}

function save() {//第一次用json就上手
  for (var i = 0; i < localStorage.length; i++)
    if (localStorage.key(i) == document.getElementById("tag").value) {
      alert("已經有這個tag了，請換個tag名稱!");
      return;
    }
  var x = document.getElementById("content").childNodes;
  if(!document.getElementById("tag").value){
    window.alert("請輸入存檔名，不可空白呦!");
  }
  if(document.getElementById("tag").value){
  document.getElementById("tag").setAttribute("float","left");
  localStorage.setItem(document.getElementById("tag").value, JSON.stringify(obj));
  currentNode = document.getElementById("saveList");
  var btn = document.createElement("button");
  btn.innerHTML = "刪除";
  btn.setAttribute("type", "button");
  btn.setAttribute("style", ";width:55px;height:20px;border-radius: 8px; background-color: white");
  btn.setAttribute("onclick", "deltag('" + document.getElementById("tag").value + "')");
  var sbtn = document.createElement("button");
  sbtn.setAttribute("onclick", "show('" + document.getElementById('tag').value + "')");
  sbtn.innerHTML = "讀取";
  sbtn.setAttribute("type", "button");
  sbtn.setAttribute("style", "width:55px;height:20px;border-radius: 8px; background-color: white");
  var newNode = document.createElement("li");
  newNode.setAttribute("id", "savetag:" + document.getElementById("tag").value);
  newNode.innerHTML = document.getElementById("tag").value;
  newNode.appendChild(sbtn);
  newNode.appendChild(btn);
  currentNode.appendChild(newNode);
  window.alert("成功儲存 tag:" + document.getElementById("tag").value)
  }
}

function start() {
  setInterval("check()", 300);
  currentNode = document.getElementById("saveList");
  for (var i = 0; i < localStorage.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = "刪除";
    btn.setAttribute("type", "button");
    btn.setAttribute("style", ";width:55px;height:20px;border-radius: 8px; background-color: white");
    btn.setAttribute("onclick", "deltag('" + localStorage.key(i) + "')");
    var sbtn = document.createElement("button");
    sbtn.setAttribute("onclick", "show('" + localStorage.key(i) + "')");
    sbtn.innerHTML = "讀取";
    sbtn.setAttribute("type", "button");
    sbtn.setAttribute("style", "width:55px;height:20px;border-radius: 8px; background-color: white");
    var newNode = document.createElement("li");
    newNode.setAttribute("id", "savetag:" + localStorage.key(i));
    newNode.innerHTML = localStorage.key(i);
    newNode.appendChild(sbtn);
    newNode.appendChild(btn);
    currentNode.appendChild(newNode);
  }

}

function boom() {
  vidplay=0;
  currentNode = document.getElementById("content");
  var newNode = document.createElement("img");
  newNode.setAttribute("src", "win8.gif");
  newNode.setAttribute("id", "boom");
  currentNode.appendChild(newNode);
  currentNode = document.getElementById("content");
  var new2Node = document.createElement("img");
  new2Node.setAttribute("src", "69082.gif");
  new2Node.setAttribute("id", "boom");
  setTimeout(function () { newNode.remove(); currentNode.appendChild(new2Node);}, 3000);
}

function boost() {
  if (vidplay == 0) return;//防止重複撥放
  //確認各零件
  var nodeList;
  var x = document.getElementById("content").childNodes;
  var mb = "";
  for (var i = 0; i < x.length; i++) {
    if (whichType(x[i].id) == 1) {
      mb = x[i].id;
    }
  }
  if (mb == "") {//有無主機板
    boom();
    setTimeout(function () { document.getElementById("boom").remove(); alert("沒有主機板"); vidplay=1;}, 6000);
    return;
  }
  if (!document.getElementById(mb + "CpuPlate").hasChildNodes()) {//有無cpu
    boom();
    setTimeout(function () { document.getElementById("boom").remove(); alert("沒有CPU"); vidplay=1;}, 6000);
    return;
  }
  else {//是cpu對嗎
    nodeList = document.getElementById(mb + "CpuPlate").childNodes;
    if (whichType(nodeList[0].id) != 0) {
      boom();
      setTimeout(function () { document.getElementById("boom").remove(); alert("cpu槽插錯了!"); vidplay=1;}, 6000);
      return;
    }
  }
  if (mb == "H310M-K") {//唯一ram插槽2個
    console.log(mb);
    if (!(document.getElementById(mb + "Ram1Plate").hasChildNodes() || document.getElementById(mb + "Ram2Plate").hasChildNodes())) {//有無記憶體
      boom();
      setTimeout(function () { document.getElementById("boom").remove(); alert("沒有記憶體!"); vidplay=1;}, 6000);
      return;
    }
    else {//有無插錯
      nodeList = document.getElementById(mb + "Ram1Plate").childNodes;
      if (document.getElementById(mb + "Ram1Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id)); vidplay=1;}, 6000);
          return;
        }
      }
      nodeList = document.getElementById(mb + "Ram2Plate").childNodes;
      if (document.getElementById(mb + "Ram2Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id)); vidplay=1;}, 6000);
          return;
        }
      }
    }
  }
  else {//其他主板
    if (!(document.getElementById(mb + "Ram1Plate").hasChildNodes() || document.getElementById(mb + "Ram2Plate").hasChildNodes() || document.getElementById(mb + "Ram3Plate").hasChildNodes() || document.getElementById(mb + "Ram4Plate").hasChildNodes())) {//有無記憶體
      boom();
      setTimeout(function () { document.getElementById("boom").remove(); alert("沒有記憶體!"); vidplay=1;}, 6000);
      return;
    }
    else {//有無插錯
      nodeList = document.getElementById(mb + "Ram1Plate").childNodes;
      if (document.getElementById(mb + "Ram1Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id));vidplay=1;}, 6000);
          return;
        }
      }
      nodeList = document.getElementById(mb + "Ram2Plate").childNodes;
      if (document.getElementById(mb + "Ram2Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id)); vidplay=1;}, 6000);
          return;
        }
      }
      nodeList = document.getElementById(mb + "Ram3Plate").childNodes;
      if (document.getElementById(mb + "Ram3Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id)); vidplay=1;}, 6000);
          return;
        }
      }
      nodeList = document.getElementById(mb + "Ram4Plate").childNodes;
      if (document.getElementById(mb + "Ram4Plate").hasChildNodes()) {
        if (whichType(nodeList[0].id) != 4) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("記憶體槽插錯了!"); vidplay=1;}, 6000);
          return;
        }
        else if (whichDdr(document.getElementById(mb + "CpuPlate").childNodes[0].id) != whichDdr(nodeList[0].id)) {
          boom();
          setTimeout(function () { document.getElementById("boom").remove(); alert("CPU不支援" + whichDdr(nodeList[0].id)); vidplay=1;}, 6000);
          return;
        }
      }
    }
  }
  if (!(document.getElementById(mb + "PciePlate").hasChildNodes() || document.getElementById("hdd")!=null)) {//有無開機碟
    boom();
    setTimeout(function () { document.getElementById("boom").remove(); alert("沒有開機碟!"); vidplay=1;}, 6000);
    return;
  }
  else {//有開機碟
    nodeList = document.getElementById(mb + "PciePlate").childNodes;
    if (document.getElementById(mb + "PciePlate").hasChildNodes())
      if (whichType(nodeList[0].id) != 2) {
        boom();
        setTimeout(function () { document.getElementById("boom").remove(); alert("PCIE槽插錯了!"); vidplay=1;}, 6000);
        return;
      }
  }
  if (!document.getElementById("pow")) {//有無電源
    boom();
    setTimeout(function () { document.getElementById("boom").remove(); alert("沒有電源!"); vidplay=1;}, 6000);
    return;
  }
  if (!document.getElementById(mb + "VgaPlate").hasChildNodes()) {//有無顯卡
    var x = document.getElementById(mb + "CpuPlate").childNodes;
    if (x[0].id == "R72700") {
      boom();
      setTimeout(function () { document.getElementById("boom").remove(); alert("2700無內顯，需搭配獨立顯卡\n沒有顯示晶片!"); vidplay=1;}, 6000);
      return;
    }
  }
  else {
    nodeList = document.getElementById(mb + "VgaPlate").childNodes;
    if (whichType(nodeList[0].id) != 5) {
      boom();
      setTimeout(function () { document.getElementById("boom").remove(); alert("PCI槽插錯了!"); vidplay=1;}, 6000);

      return;
    }
  }
  //檢查腳位
  nodeList = document.getElementById(mb + "CpuPlate").childNodes;
  if (whichLag(mb) != whichLag(nodeList[0].id)) {
    boom();
    setTimeout(function () { document.getElementById("boom").remove(); alert("cpu和主機板的腳位不合!!"); vidplay=1;}, 6000);
    return;
  }
  var ran = Math.floor(Math.random()*3);
  var vid = document.getElementById("myVideo"+ran);
  console.log("myVideo"+ran);
  if(ran!=1)
    ran=0;
  //vid.hidden=false;
  vidplay = 0;
  currentNode = document.getElementById("content");
  var newNode = document.createElement("img");
  newNode.setAttribute("src", "win8.gif");
  newNode.setAttribute("id", "boom");
  currentNode.appendChild(newNode);
  
  setTimeout(function () {newNode.remove();  vid.hidden = false; vid.volume = 0; vid.currentTime=0; vid.play();}, 2000);
  
  setTimeout(function () { vid.hidden = true;  vidplay = 1; }, 12000+1000*ran);
  setTimeout(function () { alert("組裝神機大成功!\n大吉大利，今晚打10個<3"); }, 12100+1000*ran);

}//成功啟動  順序:cpu,mb,ssd,hdd,ram,vga,pow

function mouseOver(e) {
  var text = "";
  if (e.target.id == "i38100k")
    text = "產品名稱: Core i3-8100K<br>時脈(GHz):3.60G<br>內顯:UHD 630<br>腳位:1151<br>代號:Coffee Lake<br>製程:14nm<br>核心/執行緒: 4C / 4T<br>TDP:65W<br>支援記憶體:DDR4-2400";
  else if(e.target.id=="i74790k")
    text = "產品名稱: Core i7-4790K<br>時脈(GHz):4.00G<br>內顯:HD4600<br>腳位:1150<br>代號:Haswell Refresh<br>製程:22nm<br>核心/執行緒: 4C / 8T<br>TDP:88W<br>支援記憶體:DDR3-1600";
  else if(e.target.id=="i78700k")
    text = "產品名稱: Core i7-8700K<br>時脈(GHz):3.70G<br>內顯:UHD 630<br>腳位:1151<br>代號:Coffee Lake<br>製程:14nm<br>核心/執行緒: 6C / 12T<br>TDP:95W<br>支援記憶體:DDR4-2666";
  else if(e.target.id=="i99900k")
    text = "產品名稱: Core i9-9900K<br>時脈(GHz):3.60G<br>內顯:UHD 630<br>腳位:1151<br>代號:Coffee Lake<br>製程:14nm<br>核心/執行緒: 6C / 12T<br>TDP:95W<br>支援記憶體:DDR4-2666";
  else if(e.target.id=="R32200G")
    text = "產品名稱: R3-2200G <br>時脈(GHz):3.50G<br>內顯:Radeon Vega 8<br>腳位:AM4<br>代號:Raven Ridge<br>製程:14nm<br>核心/執行緒: 4C / 4T<br>TDP:65W<br>支援記憶體:DDR4-2666";
  else if(e.target.id=="R72700")
    text = "產品名稱: R7-2700<br>時脈(GHz):3.20G<br>內顯: 無<br>腳位:AM4<br>代號:Pinnacle Ridge<br>製程:12nm<br>核心/執行緒: 8C / 16T<br>TDP:65W<br>支援記憶體:DDR4-3200";
  else if(e.target.id=="H310M-K")
    text = "華碩 PRIME H310M-K<br>◆ 支援CPU ：1151腳位(intel 8代) <br>◆ 記憶體 ：2x DIMM / 32GB DDR4(max) <br>◆ 顯示輸出：1x D-Sub / 1x DVI <br>◆ 擴充插槽：1x PCIe 3.0x16 / 2x PCIe 3.0x1<br>◆ 主板尺寸：M-ATX<br>ASUS OptiMem： 仔細繞接佈線及通孔以維持訊號完整性，進而提升記憶體穩定性。<br>Fan Xpert： 靈活的風扇控制功能帶來極致散熱和靜音效果，加上 GPU 溫度感測，降低遊戲時的溫度。<br>5X 防護 III： 多重硬體防護，提供全方位保護。";
  else if(e.target.id=="PRIMEZ390-A") 
    text = "華碩 PRIME Z390-A<br>◆ 支援CPU ：1151腳位(intel 9/8代) <br>◆ 記憶體 ：4x DIMM / 64GB DDR4(max) <br>◆ 顯示輸出：1x D-Sub / 1x DVI <br>◆ 擴充插槽：1x PCIe 3.0x16 / 2x PCIe 3.0x16 / 3x PCIe 3.0x1 <br>◆ USB插槽 ：4x USB 3.1 Gen2 / 5xUSB 3.1 Gen1 / 6x USB 2.0/1.1 <br>◆ 主板尺寸：M-ATX<br>ASUS Aura Sync：可控制的內建 RGB 燈效，能輕鬆與不斷擴充的 Aura 支援硬體產品系列同步";
  else if(e.target.id=="ROGSTRIXB350-FGAMING")
      text="華碩 ROG STRIX B350-F GAMING<br>◆ 支援CPU ：AMD4腳位<br>◆ 記憶體 ：4x DIMM / 64GB DDR4(max) <br>◆ 顯示輸出：1x D-Sub / 1x DVI <br>◆ 擴充插槽：1x PCIe 3.0x16 / 2x PCIe 3.0x16 / 3x PCIe 2.0x1 <br>◆ USB插槽 ：2x USB 3.1 Gen2 / 4x USB 3.1 Gen1 / 6x USB 2.0/1.1 <br>◆ 主板尺寸：ATX <br>Aura Sync RGB LED：令人驚嘆的同步燈效和兩個Aura 4針腳RGB接頭";
  else if(e.target.id=="ROGSTRIXX470-FGAMING")
      text="華碩 ROG STRIX X470-F GAMING<br>◆ 支援CPU ：AM4腳位(AMD) <br>◆ 記憶體 ：4x DIMM / 64GB DDR4(max) <br>◆ 擴充插槽：2x PCIe 3.0x16 / 1x PCIe 2.0x16 <br>◆ USB插槽 ：2x USB 3.1 Gen2 / 4x USB 3.1 Gen1 <br>◆ 主板尺寸：ATX <br>Aura Sync RGB LED：同步的RGB照明技術能與支援Aura Sync 的廣大PC組件搭配，並支援可編程RGB燈條及 Phillip Hue 智慧照明。<br>內建 M.2 散熱器：為M.2 驅動器全面散熱，提供一致的存儲效能並增強可靠性";
  else if(e.target.id=="b85pro")
      text = "華碩 B85M-G<br>◆ 支援CPU ：1150腳位(intel 4代) <br>◆ 記憶體 ：4x DIMM / 32GB DDR3(max) <br>◆ 顯示輸出：1x D-Sub / 1x DVI <br>◆ 擴充插槽：1x PCIe 3.0x16 / 1x PCIe 2.0x16 /2x PCIe 2.0x1 / 3x PCI <br>◆ USB插槽 ：4x USB 3.0 / 8x USB 2.0/1.1 <br>◆ 主板尺寸：ATX <br>SupremeFX - 無懈可擊的聲音效果，彷彿置身遊戲中！<br>>Intel Gigabit 乙太網路與 GameFirst II - 連線速度無比迅速！";
  else if(e.target.id=="970EVONVMe1TB")
    text="SAMSUNG 三星 970 EVO 1TB NVMe M.2 2280 PCIe 固態硬碟<br>採用最新的V-NAND技術與新增強的Phoenix控制器<br>專為頻繁從事影音製作、編輯或模擬等高工作量的技術用戶、遊戲玩家與專業人士設計 <br>讀:3400/寫:2500/TLC";
  else if(e.target.id=="970EVONVMe2TB")
    text ="SAMSUNG 三星 970 EVO 2TB NVMe M.2 2280 PCIe 固態硬碟<br>採用最新的V-NAND技術與新增強的Phoenix控制器 <br>讀取速度3,400MB/s，寫入速度2,500MB/s<br>專為頻繁從事影音製作、編輯或模擬等高工作量的技術用戶、遊戲玩家與專業人士設計 ";
  else if(e.target.id=="UV500480G")
    text = "金士頓 Kingston UV500 (M.2 2280) 120GB SSD 固態硬碟 (SUV500M8/120G)<br>讀520M/寫320M/3D TLC<br>晶片：NAND TLC;Marvell Dean控制器 <br>加密保護：具備TCG Opal 2.0 256位元硬體加密技術  ";
  else if(e.target.id=="A1000480G")
    text="金士頓 Kingston A1000 480GB M.2 2280 PCIe NVMe? Gen 3.0x2 SSD 固態硬碟<br>讀1500M/寫900M/3D TLC/<br>隨機4k讀/寫:高達100K/90KIOPS <br>單面設計－適合輕薄筆記型電腦";
  else if(e.target.id=="GTX1066")
    text = "華碩 DUAL-GTX1060-O6G雪原豹<br>繪圖核心：GTX 1060<br>記憶體:6GB GDDR5<br>核心時脈：1785MHz<br>CUDA 數：1280<br>輸出介面：1*DVI-D / 2*HDMI / 2*DP<br>電源接口：1*6pin<br>顯卡長度：24.2公分<br>建議功耗:120W";
  else if(e.target.id=="GTX1080TI")
    text = "華碩 TURBO-GTX1080TI-11G<br>繪圖核心：GTX 1080Ti<br>記憶體:11GB GDDR5X<br>核心時脈：1480MHz<br>CUDA 數：3584<br>輸出介面：1*DVI-D / 2*HDMI / 2*DP<br>電源接口：1*6pin/1*8pin<br>顯卡長度：26.67公分<br>建議功耗:250w";
  else if(e.target.id=="RTX2070")
    text = "華碩 DUAL-RTX2070-8G<br>繪圖核心：RTX 2070<br>記憶體:8GB GDDR6<br>核心時脈：1620MHz<br>CUDA 數：2304<br>輸出介面：1*HDMI /3*DP/1*USB Type-C<br>電源接口：1*6pin + 1*8pin<br>顯卡長度：26.8公分<br>建議功耗:185w";
  else if(e.target.id=="RTX2080TI")
    text ="華碩 DUAL-RTX2080Ti-11G<br>繪圖核心：RTX 2080 Ti<br>記憶體:11GB GDDR6<br>核心時脈：1545MHz<br>CUDA 數：4352<br>輸出介面：1*HDMI / 3*DP/1*USB Type-C<br>電源接口：2*8pin<br>顯卡長度：26.8公分<br>建議功耗:260w" ;
  else if(e.target.id=="COOLERMASTER 450W")
    text = "酷碼 CM GX 450W/銅牌/DC-DC架構/單路 12V<br>型號	RS450-ACAAB3<br>類型	Intel Form Factor ATX 12V V2.31<br>尺寸 (寬 / 高 / 深)	150 x 140 x 86mm <br>輸入電壓	100-240Vac<br>輸入頻率	47-63Hz<br>電源良好信號	100~500ms<br>80 PLUS銅牌 (Bronze)認證：在50%負載下轉換效率可達85%。<br>100%全日系電容，確保性能表現與穩定度。";
  else if(e.target.id=="COOLERMASTER 550W")
    text = "酷碼 CM GX 550W/銅牌/DC-DC架構/單路 12V<br>型號	RS550-ACAAB3<br>類型	Intel Form Factor ATX 12V V2.31<br> 尺寸 (寬 / 高 / 深)	150 x 140 x 86mm <br>輸入電壓	100-240Vac<br>輸入範圍?	全範圍<br>輸入頻率	47-63Hz<br>電源良好信號	100~500ms<br>80 PLUS銅牌 (Bronze)認證：在50%負載下轉換效率可達85%。<br>100%全日系電容，確保性能表現與穩定度。";
  else if(e.target.id=="COOLERMASTER 650W")
    text ="酷碼 MasterWatt 650W/銅牌/半模<br>型號	MPX-6501-AMAAB<br>類型	ATX 12V V2.4<br>尺寸 (長 x 寬 x 高)	140 x 150 x 86 mm<br>輸入電壓	100-240 Vac<br>輸入電流	10-5 A<br>輸入頻率	50-60 Hz<br>電源良好信號	100-500 ms<br>MasterWatt 是一款擁有創新半無風扇模式的 80 PLUS 銅牌電源供應器。";
  else if(e.target.id=="COOLERMASTER 850W") 
    text = "酷碼 Master V 850W/金牌/全模<br>類型	Intel Form Factor ATX 12V V2.31<br>尺寸 (寬 / 高 / 深)	150 x 170 x 86mm<br>輸入電壓	90-264Vac<br>輸入電流	5 - 10A<br>輸入頻率	50-60Hz<br>電源良好信號	100~500ms<br>通過 80 Plus 金牌認證，半載 (50%) 下可提供高達 93 % 的轉換效率<br>搭載 135 mm FDB 風扇，安靜又耐用<br>100% 高品質日系電容，提供最佳的性能表現與可靠度";
  else if(e.target.id.search("1333")!=-1)
    text = "Kingston 4GB DDR3 1333 桌上型記憶體<br>★桌上型電腦專用 <br>★規格：DDR3-1333 <br>★容量：4GB <br>★針腳：240-pin";
  else if(e.target.id.search("2400")!=-1)
    text = "HyperX FURY DDR4-2400 8GB 桌上型超頻記憶體<br>◆最高2400MHz自動超頻 <br>◆1.2V 低電耗 <br>◆支援Intel X99主板 <br>◆黑色時尚矮版散熱片 ";
  else if(e.target.id.search("3000 16G")!=-1)
    text = "HyperX Predator DDR4 3000 16GB桌上型超頻記憶體<br>◆16GB多工處理不lag<br>◆3000MHz展現王者效能 <br>◆支援X99主板和Intel i7 CPU <br>◆Intel XMP一秒超頻 <br>◆比DDR3更省電 <br>◆頂級消光黑散熱片散熱效率佳";
  else if(e.target.id.search("3000 RGB")!=-1)
    text = "HyperX Predator DDR4 3000 8GB桌上型超頻記憶體<br>◆8GB大容量多工處理lag <br>◆3000Hz展現王者效能 <br>◆支援X99主板和Intel i7 CPU <br>◆Intel XMP一秒超頻 <br>◆比DDR3更省電 <br>◆頂級消光黑散熱片散熱效率佳 ";
  else if(e.target.id=="SEAGATE HDD 1T")
    text = "Seagate【BarraCuda】新梭魚 1TB 3.5吋桌上型硬碟<br>◆容量:1TB <br>◆SATA 6Gb/s <br>◆7200轉 高效能 <br>◆64MB緩衝記憶體";
  else if(e.target.id=="SEAGATE HDD 2T")
    text = "Seagate【BarraCuda】新梭魚 2TB 3.5吋桌上型硬碟<br>◆容量：2TB <br>◆SATA 6Gb/s <br>◆7200轉 高效能 <br>◆256MB緩衝記憶體 <br>◆工作負載55TB/年 <br>◆低功耗省電 ";
  else if(e.target.id=="SEAGATE HDD 3T")
    text = "Seagate【BarraCuda】新梭魚 3TB 3.5吋桌上型硬碟<br>◆容量：3TB <br>◆SATA 6Gb/s <br>◆5400轉 <br>◆256MB緩衝記憶體 <br>◆工作負載55TB/年 <br>◆低功耗省電 ";
  else if(e.target.id=="SEAGATE HDD 4T")
    text = "Seagate【BarraCuda】新梭魚 4TB 3.5吋桌上型硬碟<br>◆容量：4TB <br>◆SATA 6Gb/s <br>◆5400轉 <br>◆256MB緩衝記憶體 <br>◆工作負載55TB/年<br>◆低功耗省電 ";
  document.getElementById("explain1").innerHTML = text;
} // end function mouseOver
var bkcount;
function doSomeThing(){
  if(bkcount==5){
    document.getElementById("backpic").remove();
    document.getElementById("back").remove();
    document.getElementById("backbtn").remove();
    bkcount=1;
  }
  else{
    currentNode = document.body;
    document.getElementById("backpic").remove();
    var backpic = document.createElement("img");
    backpic.setAttribute("src","introduce/"+bkcount+".jpg")
    backpic.setAttribute("id","backpic");
    currentNode.appendChild(backpic);
    bkcount++;
  }
  
}

function introduce(){
  currentNode = document.body;
  var back = document.createElement("img");
  back.setAttribute("src","introduce/10.jpg")
  back.setAttribute("id","back");
  back.setAttribute("width","100%");
  back.setAttribute("height","100%");
  currentNode.appendChild(back);
  var backpic = document.createElement("img");
  backpic.setAttribute("src","introduce/1.jpg")
  backpic.setAttribute("id","backpic");
  currentNode.appendChild(backpic);
  bkcount=2;
  var backbtn = document.createElement("img");
  backbtn.setAttribute("onclick","doSomeThing()");
  backbtn.setAttribute("src","next.png");
  backbtn.setAttribute("id","backbtn");
  currentNode.appendChild(backbtn);
}


document.addEventListener("mouseover", mouseOver, false);