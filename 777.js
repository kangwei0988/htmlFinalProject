var idcount = 0;
var currentNode;
var count = [0, 0, 0, 0, 0, 0, 0];
var ramPosition=[0,0,0,0];
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
  if(whichType(data)==1)//防止mb亂動
    return;
  ev.target.appendChild(document.getElementById(data));
}
function dropDel(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if(whichType(data)==1){
    var r=confirm("如果要將主機板移除，其他零件也會一並移除歐\n請先確認已儲存您的清單以免清單遺失<3\n確認移除嗎?");
    if(r){
      var x = document.getElementById("content").childNodes;
      for(var i=x.length-1;i>=0;i--){
        if(x[i].id!="trash")  
          x[i].remove();
      }
      for(var i = 0;i<7;i++)
        count[i]=0;
        for(var i=0;i<4;i++)
        ramPosition[i]=0;
    }
    else
      return;
  }
  else if(whichType(data)==4){
    document.getElementById(data).remove();
    document.getElementById(data + "Plate").remove();
    ramPosition[parseInt(data.charAt(0))]=0;
    count[whichType(data)]--;
  }
  else{
    document.getElementById(data).remove();
    document.getElementById(data + "Plate").remove();
    count[whichType(data)]--;
  }
}

function whichType(c) {
  if(!c) return -1;
  if (c == "R72700" || c == "fx8350" || c == "i38100k" || c == "i74790k" || c == "i78700k" || c == "i99900k" || c == "R32200G") return 0;
  if (c == "H310M-K" || c == "PRIMEZ390-A" || c == "ROGSTRIXB350-FGAMING" || c == "ROGSTRIXX470-FGAMING" || c == "b85pro") return 1;
  if (c == "970EVONVMe1TB" || c == "970EVONVMe2TB" || c == "A1000480G" || c == "UV500480G") return 2;
  if (c == "HDD") return 3;
  if (c == "1333" || c == "3000RGB" || c == "hyperx2400" || c == "3000") return 4;
  if (c == "GTX1066" || c == "GTX1080TI" || c == "RTX2070" || c == "RTX2080TI") return 5;
  if (c == "pow") return 6;
  if(c.search("1333")!=null && c.search("3000")!=null && c.search("3000RGB") && c.search("hyperx2400")!=null) return 4;
}

function insert(x, y, z, pic, h, w) {
  if (count[whichType(pic)] > 0 && whichType(pic) != 4) {
    alert("已經有" + typeName[whichType(pic)] + "了！！不能貪心歐＜３");
    return;
  }
  var plus=0;
  if(whichType(pic)==4){
    var i;
    if(count[whichType(pic)] > 3){
      alert("那麼多" + typeName[whichType(pic)] + "要幹嘛！！不能貪心歐＜３");
      return;
    }
    else{
      for(i = 0;i<4;i++){
        if(ramPosition[i]==0){
          ramPosition[i]=1;
          break;
        }
        else
          plus+=w;
      }
    }

  }
  count[whichType(pic)]++;
  currentNode = document.getElementById("content");
  var plateNode = document.createElement("div");
  plateNode.setAttribute("class", "plate");
  if(whichType(pic)==4)
    plateNode.setAttribute("id",i +"-"+ pic + "Plate");
  else
    plateNode.setAttribute("id", pic + "Plate");
  plateNode.setAttribute("style", "top:" + x + "px;left:" + (y+plus) + "px;z-index:" + z + ";width:" + w + "px;height:" + h + "px;");
  plateNode.setAttribute("ondrop", "drop(event)");
  plateNode.setAttribute("ondragover", "allowDrop(event)");
  var newNode = document.createElement("img");
  plateNode.appendChild(newNode);
  if(whichType(pic)==4)
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
  plateVGANode.setAttribute("class", "MBPlateVga");
  plateVGANode.setAttribute("id", pic + "VgaPlate");
  if (pic == "H310M-K") {
    plateVGANode.setAttribute("style", "top:370px;left:200px;z-index:2;width:425px;height:90px;");
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
  //RAM1
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
  //RAM2
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
  //RAM3
if (pic != "H310M-K") {
  var plateRAM3Node = document.createElement("div");
  plateRAM3Node.setAttribute("class", "MBPlateRam");
  plateRAM3Node.setAttribute("id", pic + "Ram3Plate");

  if (pic == "PRIMEZ390-A") {
    plateRAM3Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "b85pro") {
    plateRAM3Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM3Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM3Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  plateRAM3Node.setAttribute("ondrop", "drop(event)");
  plateRAM3Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM3Node);
}
  //RAM4
if (pic != "H310M-K") {
  var plateRAM4Node = document.createElement("div");
  plateRAM4Node.setAttribute("class", "MBPlateRam");
  plateRAM4Node.setAttribute("id", pic + "Ram4Plate");

  if (pic == "PRIMEZ390-A") {
    plateRAM4Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "b85pro") {
    plateRAM4Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateRAM4Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateRAM4Node.setAttribute("style", "top:40px;left:650px;z-index:2;width:20px;height:368px;");
  }
  plateRAM4Node.setAttribute("ondrop", "drop(event)");
  plateRAM4Node.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateRAM4Node);
}
  //HDD
  var plateHddNode = document.createElement("div");
  plateHddNode.setAttribute("class", "MBPlateHdd");
  plateHddNode.setAttribute("id", pic + "HddPlate");
  if (pic == "H310M-K") {
    plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "PRIMEZ390-A") {
    plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "b85pro") {
    plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    plateHddNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  plateHddNode.setAttribute("ondrop", "drop(event)");
  plateHddNode.setAttribute("ondragover", "allowDrop(event)");
  currentNode.appendChild(plateHddNode);
  //POW
  var platePowNode = document.createElement("div");
  platePowNode.setAttribute("class", "MBPlatePow");
  platePowNode.setAttribute("id", pic + "PowPlate");
  if (pic == "H310M-K") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "PRIMEZ390-A") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "b85pro") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXB350-FGAMING") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
  }
  if (pic == "ROGSTRIXX470-FGAMING") {
    platePowNode.setAttribute("style", "top:445px;left:385px;z-index:2;width:135px;height:25px;");
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

function check(){
  var x = document.getElementById("content").childNodes;
  var ramCount = 1;
  var obj={CPU:'none', MB:'none', SSD:'none', HDD:'none', RAM1:'none', RAM2:'none', RAM3:'none', RAM4:'none',  VGA:'none', POW:'none'};
  for(var i=0;i<x.length;i++){
      if(x[i].nodeName=="IMG" && x[i].id!="trash")
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
                  obj.RAM1=t[j].id.slice(2,t[j].id.length);
                else if(ramCount==2)
                  obj.RAM2=t[j].id.slice(2,t[j].id.length);
                else if(ramCount==3)
                  obj.RAM3=t[j].id.slice(2,t[j].id.length);
                else if(ramCount==4)
                  obj.RAM4=t[j].id.slice(2,t[j].id.length);
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
  }//end load
  var text = "";
  text+="處理器: "+obj.CPU+"<br>";
  text+="主機板: "+obj.MB+"<br>";
  text+="固態硬碟: "+obj.SSD+"<br>";
  text+="機械硬碟: "+obj.HDD+"<br>";
  text+="記憶體: "+obj.RAM1;
  if(obj.RAM2!="none")
    text+="   "+obj.RAM2;
  if(obj.RAM3!="none")
    text+="   "+obj.RAM3;
  if(obj.RAM4!="none")
    text+="   "+obj.RAM4;
  text+="<br>獨立顯示卡: "+obj.VGA+"<br>";
  text+="電源供應器: "+obj.POW+"<br>";
  document.getElementById("explain2").innerHTML=text;
}

function deltag( tar ){
    localStorage.removeItem(tar);
    document.getElementById("savetag:"+tar).remove();
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
  for(var i=0;i<4;i++)
    ramPosition[i]=0;
  if(obj.CPU!="none")
    insert(10,20,2,obj.CPU,100,100);
  if(obj.MB!="none")
    insertmb(obj.MB);
  if(obj.SSD!="none")
    insert(150,750,2,obj.SSD,75,225)
  if(obj.HDD!="none")
    insert(10,20,2,obj.HDD,100,100);
  if(obj.RAM1!="none")
    insert(175,20,2,obj.RAM1,400,40);
  if(obj.RAM2!="none")
  insert(175,20,2,obj.RAM2,400,40);
  if(obj.RAM3!="none")
  insert(175,20,2,obj.RAM3,400,40);
  if(obj.RAM4!="none")
  insert(175,20,2,obj.RAM4,400,40);
  if(obj.VGA!="none")
  insert(250,750,2,obj.VGA,75,350);
  if(obj.POW!="none")
    insert(10,20,2,obj.CPU,100,100);
  document.getElementById("tag").value = tag;
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
        if(x[i].nodeName=="IMG" && x[i].id!="trash")
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
                    obj.RAM1=t[j].id.slice(2,t[j].id.length);
                  else if(ramCount==2)
                    obj.RAM2=t[j].id.slice(2,t[j].id.length);
                  else if(ramCount==3)
                    obj.RAM3=t[j].id.slice(2,t[j].id.length);
                  else if(ramCount==4)
                    obj.RAM4=t[j].id.slice(2,t[j].id.length);
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
    var btn = document.createElement("button");
    btn.innerHTML="刪除";
    btn.setAttribute("type", "button");
    btn.setAttribute("style", "width:40px;height:20px;");
    btn.setAttribute("onclick", "deltag('"+document.getElementById("tag").value+"')");
    var sbtn = document.createElement("button");
    sbtn.setAttribute("onclick", "show('"+document.getElementById('tag').value+"')");
    sbtn.innerHTML="讀取";
    sbtn.setAttribute("type", "button");
    sbtn.setAttribute("style", "width:40px;height:20px;");
    var newNode = document.createElement("li");
    newNode.setAttribute("id", "savetag:"+document.getElementById("tag").value);
    newNode.innerHTML = document.getElementById("tag").value;
    newNode.appendChild(sbtn);
    newNode.appendChild(btn);
    currentNode.appendChild(newNode);
    window.alert("成功儲存 tag:"+document.getElementById("tag").value)
}

function start(){
  setInterval("check()",300);
  currentNode = document.getElementById("saveList");
  for(var i=0;i<localStorage.length;i++){
    var btn = document.createElement("button");
    btn.innerHTML="刪除";
    btn.setAttribute("type", "button");
    btn.setAttribute("style", "width:40px;height:20px;");
    btn.setAttribute("onclick", "deltag('"+localStorage.key(i)+"')");
    var sbtn = document.createElement("button");
    sbtn.setAttribute("onclick", "show('"+localStorage.key(i)+"')");
    sbtn.innerHTML="讀取";
    sbtn.setAttribute("type", "button");
    sbtn.setAttribute("style", "width:40px;height:20px;");
    var newNode = document.createElement("li");
    newNode.setAttribute("id", "savetag:"+localStorage.key(i));
    newNode.innerHTML = localStorage.key(i);
    newNode.appendChild(sbtn);
    newNode.appendChild(btn);
    currentNode.appendChild(newNode);
  }
  console.log("fuck");
}

function boom(){

}

function boost(){
  //確認各零件
  var nodeList;
  var x = document.getElementById("content").childNodes;
  var mb ="";
  for(var i=0;i<x.length;i++){
    console.log(mb);
    if(whichType(x[i].id)==1){
      mb=x[i].id;
    } 
  }
  if(mb==""){//有無主機板
    boom();
    console.log("no");
    alert("沒有主機板");
    return;
  }
  if(!document.getElementById(mb+"CpuPlate").hasChildNodes()){//有無cpu
    boom();
    alert("沒有CPU");
    return;
  }
  else{//是cpu對嗎
    nodeList=document.getElementById(mb+"CpuPlate").childNodes;
    if(whichType(nodeList[0].id)!=0){
      boom();
      alert("cpu槽插錯了!");
      return;
    }
  }
  if(mb=="H310M-K"){//唯一ram插槽2個
    if(!(document.getElementById(mb+"Ram1Plate").hasChildNodes()||document.getElementById(mb+"Ram2Plate").hasChildNodes())){//有無記憶體
      boom();
      alert("沒有記憶體!");
      return;
    }
    else{//有無插錯
      nodeList=document.getElementById(mb+"Ram1Plate").childNodes;
      if(document.getElementById(mb+"Ram1Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
      nodeList=document.getElementById(mb+"Ram2Plate").childNodes;
      if(document.getElementById(mb+"Ram2Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
    }
  }
  else{//其他主板
    if(!(document.getElementById(mb+"Ram1Plate").hasChildNodes()||document.getElementById(mb+"Ram2Plate").hasChildNodes()||document.getElementById(mb+"Ram3Plate").hasChildNodes()||document.getElementById(mb+"Ram4Plate").hasChildNodes())){//有無記憶體
      boom();
      alert("沒有記憶體!");
      return;
    }
    else{//有無插錯
      nodeList=document.getElementById(mb+"Ram1Plate").childNodes;
      if(document.getElementById(mb+"Ram1Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
      nodeList=document.getElementById(mb+"Ram2Plate").childNodes;
      if(document.getElementById(mb+"Ram2Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
      nodeList=document.getElementById(mb+"Ram3Plate").childNodes;
      if(document.getElementById(mb+"Ram3Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
      nodeList=document.getElementById(mb+"Ram4Plate").childNodes;
      if(document.getElementById(mb+"Ram2Plate").hasChildNodes())
        if(whichType(nodeList[0].id)!=4){
          boom();
          alert("記憶體槽插錯了!");
          return;
        }
    }
  }
  if(!document.getElementById(mb+"PciePlate").hasChildNodes()&&!document.getElementById(mb+"HddPlate").hasChildNodes()){//有無開機碟
    boom();
    alert("沒有開機碟!");
    return;
  }
  else{//有開機碟
    nodeList=document.getElementById(mb+"HddPlate").childNodes;
    if(document.getElementById(mb+"HddPlate").hasChildNodes())
      if(whichType(nodeList[0].id)!=3){
        boom();
        alert("SATA3槽插錯了!");
        return;
      }
    nodeList=document.getElementById(mb+"PciePlate").childNodes;
    if(document.getElementById(mb+"PciePlate").hasChildNodes())
      if(whichType(nodeList[0].id)!=2){
        boom();
        alert("PCIE槽插錯了!");
        return;
      }
  }
  if(!document.getElementById(mb+"PowPlate").hasChildNodes()){//有無電源
    boom();
    alert("沒有電源!");
    return;
  }
  else{
    nodeList=document.getElementById(mb+"PowPlate").childNodes;
      if(whichType(nodeList[0].id)!=6){
        boom();
        alert("24pin槽插錯了!");
        return;
      }
  }
  if(!document.getElementById(mb+"VgaPlate").hasChildNodes()){//有無顯卡
    var x = document.getElementById(mb+"CpuPlate").childNodes;
    if(x=="R72700"){
      boom();
      alert("2700無內顯，需搭配獨立顯卡\n沒有顯示晶片!");
      return;
    }
  }
  else{
    nodeList=document.getElementById(mb+"VgaPlate").childNodes;
      if(whichType(nodeList[0].id)!=5){
        boom();
        alert("PCI槽插錯了!");
        return;
      }
  }
  
}//成功啟動  順序:cpu,mb,ssd,hdd,ram,vga,pow

function mouseOver( e )
{  
  var text="";
  if(e.target.id=="i38100k")
      text="產品名稱"
  
  document.getElementById("explain1").innerHTML=text;
} // end function mouseOver

document.addEventListener( "mouseover", mouseOver, false );