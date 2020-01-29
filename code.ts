// 色を増減したらwindowの大きさを調整する必要あり
figma.showUI(__html__, { width: 280, height: 350 });

//ストロークの透明度
var strokeOpacity = 0.2;
//シャドウの透明度
let shadwOpacity = 0.5 ;
//cornerRadiusの値
var corner = 6;


figma.ui.onmessage = msg => {
  if (msg.type === 'Fill-change-color') {
    const color: String = msg.val;
    figma.currentPage.selection.forEach((node) => {
      Neumorphism(node, color);
    });
  }
  if (msg.type === 'changeOpacity') {
    const opacity: string = msg.Opacity;
    figma.currentPage.selection.forEach((node) => {
      changeOpacity(node, opacity);
    })
    
  }
  if (msg.type === 'dekobutton'){
    figma.currentPage.selection.forEach((node) => {
      dekoeffect(node);
    });
  }
  if (msg.type === 'bokobutton'){
    figma.currentPage.selection.forEach((node) => {
      bokoeffect(node);
    });
  }
  if (msg.type === 'changeOffset'){
    figma.currentPage.selection.forEach((node) => {
      const offsetX: string = msg.offsetX;
      const offsetY: string = msg.offsetY;
      changeOffset(node, offsetX, offsetY);
    });
  }
  else if (msg.type === 'create'){
    figma.closePlugin();
  }
};

function Neumorphism(node: SceneNode, color: String) {

  //入力された6桁をrgbに変換

  const rgbArray = [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)].map(function (str) {
    return parseInt(str, 16) / 255;
  });
  var Fill_r = rgbArray[0];
  var Fill_g = rgbArray[1];
  var Fill_b = rgbArray[2];

  if (node.type === "RECTANGLE" || node.type === "LINE" || node.type === "ELLIPSE" ||
  node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" ||
  node.type === "TEXT" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "BOOLEAN_OPERATION") {

  node.fills = [{type: "SOLID", color:{r: Fill_r,g: Fill_g,b: Fill_b}, opacity:1}];

  //nodeにドロップシャドウをつける1
  console.log(node.fills["0"].color.r);
  console.log(node.fills["0"].color.g);
  console.log(node.fills["0"].color.b);
  console.log(node.strokes["0"].color.r);
  var stroke_r = node.fills["0"].color.r + 0.06274509429;
  var stroke_g = node.fills["0"].color.g + 0.06274509429;
  var stroke_b = node.fills["0"].color.b + 0.06274509429;
  var red_1 = node.fills["0"].color.r  + 0.06274509429;
  var green_1 = node.fills["0"].color.g + 0.06666666269;
  var blue_1 = node.fills["0"].color.b + 0.06666666269;
  var red_2 = node.fills["0"].color.r - 0.11764705181;
  var green_2 = node.fills["0"].color.g - 0.12941175699;
  var blue_2 = node.fills["0"].color.b - 0.15294116735;
  
  if(red_1 > 1){red_1= 1}
  if(green_1 > 1){green_1= 1}
  if(blue_1 > 1){blue_1= 1}
  if(red_2 > 1){red_2= 1}
  if(green_2 > 1){green_2= 1}
  if(blue_2 > 1){blue_2= 1}
  if(red_2 < 0){red_2= 0}
  if(green_2 < 0){green_2= 0}
  if(blue_2 < 0){blue_2= 0}
  if(stroke_r > 1){stroke_r= 1}
  if(stroke_g > 1){stroke_g= 1}
  if(stroke_b > 1){stroke_b= 1}
  node.effects = [
    {type: 'DROP_SHADOW' , color: {r: red_1,g: green_1,b: blue_1,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:-6,y:-6}}, 
    {type: 'DROP_SHADOW', color: {r: red_2,g: green_2,b: blue_2,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:6,y:6}}
  ];

  node.strokes = [{type: "SOLID", color:{r: stroke_r,g: stroke_g,b: stroke_b}, opacity: strokeOpacity}] ;
  console.log(node.effects["0"].color.a);
  }
  //rectangleだったら角丸を調整できる
  if(node.type == "RECTANGLE"){
    node.cornerRadius = corner;
  }
}

function changeOpacity(node: SceneNode, opacity: string){
  if (node.type === "RECTANGLE" || node.type === "LINE" || node.type === "ELLIPSE" ||
  node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" ||
  node.type === "TEXT" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "BOOLEAN_OPERATION") {
     
    let shadwOpacity = parseFloat(opacity);
    var red_1 = node.fills["0"].color.r  + 0.06274509429;
    var green_1 = node.fills["0"].color.g + 0.06666666269;
    var blue_1 = node.fills["0"].color.b + 0.06666666269;
    var red_2 = node.fills["0"].color.r - 0.11764705181;
    var green_2 = node.fills["0"].color.g - 0.12941175699;
    var blue_2 = node.fills["0"].color.b - 0.15294116735;
    //effect[1](つまり凸凹を変化させてるやつ)を現在のタイプで固定する
    let Now = node.effects["1"].type
    if(red_1 > 1){red_1= 1}
    if(green_1 > 1){green_1= 1}
    if(blue_1 > 1){blue_1= 1}
    if(red_2 > 1){red_2= 1}
    if(green_2 > 1){green_2= 1}
    if(blue_2 > 1){blue_2= 1}
    if(red_2 < 0){red_2= 0}
    if(green_2 < 0){green_2= 0}
    if(blue_2 < 0){blue_2= 0}
    var Point1  = {x: -6,y: -6};
    var Point2  = {x: 6,y: 6};
    node.effects = [
      {type: 'DROP_SHADOW', color: {r: red_1,g: green_1,b: blue_1,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:Point1}, 
      {type: Now, color: {r: red_2,g: green_2,b: blue_2,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:Point2}
    ]
    
    console.log(node.effects["0"].color.a);
  }
}

function changeOffset(node: SceneNode, offsetX: string, offsetY: string){
  if (node.type === "RECTANGLE" || node.type === "LINE" || node.type === "ELLIPSE" ||
  node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" ||
  node.type === "TEXT" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "BOOLEAN_OPERATION") {
     
    let X = parseFloat(offsetX)/5;
    let Y = parseFloat(offsetY)/5;
    var red_1 = node.fills["0"].color.r  + 0.06274509429;
    var green_1 = node.fills["0"].color.g + 0.06666666269;
    var blue_1 = node.fills["0"].color.b + 0.06666666269;
    var red_2 = node.fills["0"].color.r - 0.11764705181;
    var green_2 = node.fills["0"].color.g - 0.12941175699;
    var blue_2 = node.fills["0"].color.b - 0.15294116735;
    //effect[1](つまり凸凹を変化させてるやつ)を現在のタイプで固定する
    let Now = node.effects["1"].type
    //現在のopacityにする
    let shadwOpacity = node.effects["0"].color.a;
    if(red_1 > 1){red_1= 1}
    if(green_1 > 1){green_1= 1}
    if(blue_1 > 1){blue_1= 1}
    if(red_2 > 1){red_2= 1}
    if(green_2 > 1){green_2= 1}
    if(blue_2 > 1){blue_2= 1}
    if(red_2 < 0){red_2= 0}
    if(green_2 < 0){green_2= 0}
    if(blue_2 < 0){blue_2= 0}
    var Point1  = {x: -X,y: -Y};
    var Point2  = {x: X,y: Y};
    node.effects = [
      {type: 'DROP_SHADOW', color: {r: red_1,g: green_1,b: blue_1,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:Point1}, 
      {type: Now, color: {r: red_2,g: green_2,b: blue_2,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:Point2}
    ]
    
    console.log(node.effects["0"].color.a);
  }
}

function dekoeffect(node:SceneNode){
  if (node.type === "RECTANGLE" || node.type === "LINE" || node.type === "ELLIPSE" ||
  node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" ||
  node.type === "TEXT" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "BOOLEAN_OPERATION") {
 
  var red_1 = node.fills["0"].color.r  + 0.06274509429;
  var green_1 = node.fills["0"].color.g + 0.06666666269;
  var blue_1 = node.fills["0"].color.b + 0.06666666269;
  var red_2 = node.fills["0"].color.r - 0.11764705181;
  var green_2 = node.fills["0"].color.g - 0.12941175699;
  var blue_2 = node.fills["0"].color.b - 0.15294116735;
  var shadwOpacity = node.effects["0"].color.a;
  if(red_1 > 1){red_1= 1}
  if(green_1 > 1){green_1= 1}
  if(blue_1 > 1){blue_1= 1}
  if(red_2 > 1){red_2= 1}
  if(green_2 > 1){green_2= 1}
  if(blue_2 > 1){blue_2= 1}
  if(red_2 < 0){red_2= 0}
  if(green_2 < 0){green_2= 0}
  if(blue_2 < 0){blue_2= 0}
    node.effects = [
      {type: 'DROP_SHADOW', color: {r: red_1,g: green_1,b: blue_1,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:-6,y:-6}}, 
      {type: 'DROP_SHADOW', color: {r: red_2,g: green_2,b: blue_2,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:6,y:6}}
    ]
  }
}

function bokoeffect(node:SceneNode){
  if (node.type === "RECTANGLE" || node.type === "LINE" || node.type === "ELLIPSE" ||
  node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" ||
  node.type === "TEXT" || node.type === "FRAME" || node.type === "INSTANCE" || node.type === "BOOLEAN_OPERATION") {
 
  var red_1 = node.fills["0"].color.r  + 0.06274509429;
  var green_1 = node.fills["0"].color.g + 0.06666666269;
  var blue_1 = node.fills["0"].color.b + 0.06666666269;
  var red_2 = node.fills["0"].color.r - 0.11764705181;
  var green_2 = node.fills["0"].color.g - 0.12941175699;
  var blue_2 = node.fills["0"].color.b - 0.15294116735;
  var shadwOpacity = node.effects["0"].color.a;
  if(red_1 > 1){red_1= 1}
  if(green_1 > 1){green_1= 1}
  if(blue_1 > 1){blue_1= 1}
  if(red_2 > 1){red_2= 1}
  if(green_2 > 1){green_2= 1}
  if(blue_2 > 1){blue_2= 1}
  if(red_2 < 0){red_2= 0}
  if(green_2 < 0){green_2= 0}
  if(blue_2 < 0){blue_2= 0}
    node.effects = [
      {type: 'DROP_SHADOW', color: {r: red_1,g: green_1,b: blue_1,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:-6,y:-6}}, 
      {type: 'INNER_SHADOW', color: {r: red_2,g: green_2,b: blue_2,a: shadwOpacity}, blendMode:"NORMAL", visible:true, radius:16, offset:{x:6,y:6}}
    ]
  }
};


 
function clone(val) {
  return JSON.parse(JSON.stringify(val))
}