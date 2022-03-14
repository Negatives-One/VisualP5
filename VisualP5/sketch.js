let usage = []
let nomes = []
let imagens = []
let colunas = []

let json = 0
let fontLight;
let fontSemiBold;
let logo;

class coluna {
  constructor(_usage, _thickness, _pos, _nome) {
    this.usage = _usage
    this.thickness = _thickness
    this.pos = _pos;
    this.nome = _nome

    this.usage = float(_usage) / 100.0
    this.free = 1.0 - this.usage
    this.colorFree = color(214, 237, 255)
    this.colorUsed = color(78,176,255)
    this.colorCritical = color(235, 77, 77)
    this.colorWarning = color(255, 242, 99)
  }

  update() {
    //stroke(0)
    //strokeWeight(2)
    //used space
    fill(this.colorUsed)
    if(this.free <= 0.2){
      fill(this.colorWarning)
    }
    if(this.free <= 0.1){
      fill(this.colorCritical)
    }
    rect(this.pos, height, this.thickness, -height * this.usage)

    //free space
    fill(this.colorFree)
    rect(this.pos, height - height * this.usage, this.thickness, -height * this.free)
    
    //text
    var txt = this.nome + "\nLivre: " + str(round(this.free * 100)) + "%\nEm uso: " + str(round(this.usage * 100)) + "%"
    noStroke()
    fill(0)
    text(txt, this.pos - width*0.08, height / 2 + imagens[2].height*0.75)
  }
}

function preload() {
  json = loadJSON("file.json")
  //fontLight = loadFont('Montserrat-Light.ttf');
  //fontSemiBold = loadFont('Montserrat-SemiBold.ttf');
  logo = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e9/Jangadeiro_logo_2020.svg")
  imagens[0] = loadImage("https://upload.wikimedia.org/wikipedia/commons/5/56/FUTEBOLES.png")
  imagens[1] = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/08/JJ_logo.png")
  imagens[2] = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/ef/TMA_logo.png")
}

function Legenda() {
  var colorFree = color(214, 237, 255)
  var colorNormal = color(78,176,255)
  var colorCritical = color(235, 77, 77)
  var colorWarning = color(255, 242, 99)
  
  var windowSize = createVector(width*0.2, height*0.4)
  var windowPos = createVector(width - width*0.22, height - height*0.42)
  var colorSize = createVector(windowSize.x*0.115, windowSize.x*0.115)

  //TEXTO LEGENDA
  textSize(width*0.015)
  text("Legenda", windowPos.x, windowPos.y - windowPos.y*0.05)

  textSize(width*0.01)

  //CAIXA LEGENDA
  rectMode(CORNER)
  fill(13,137,205)
  //fill(255)
  rect(windowPos.x, windowPos.y, windowSize.x, windowSize.y, width*0.01)

  //ESPAÇO LIVRE
  var multiplierX = 0.11
  var multiplierY = 0.15
  rectMode(CENTER)
  fill(colorFree)
  noStroke(255)
  rect(windowPos.x + windowSize.x * multiplierX, windowPos.y + windowSize.y*multiplierY, colorSize.x, colorSize.y)
  fill(255)
  noStroke()
  text("Espaço Livre", windowPos.x + windowSize.x * multiplierX + colorSize.x, windowPos.y + windowSize.y*multiplierY)

  //EM USO TEXTO
  multiplierX = 0.05
  multiplierY = 0.3
  fill(0)
  text("Em uso:", windowPos.x + windowSize.x * multiplierX, windowPos.y + windowSize.y*multiplierY)

  //OK
  multiplierX = 0.11
  multiplierY = 0.45
  fill(colorNormal)
  noStroke(255)
  rect(windowPos.x + windowSize.x * multiplierX, windowPos.y + windowSize.y*multiplierY, colorSize.x, colorSize.y)
  fill(255)
  noStroke()
  text("Estado Normal", windowPos.x + windowSize.x * multiplierX + colorSize.x, windowPos.y + windowSize.y*multiplierY)

  //WARNING
  multiplierX = 0.11
  multiplierY = 0.65
  fill(colorWarning)
  noStroke(255)
  rect(windowPos.x + windowSize.x * multiplierX, windowPos.y + windowSize.y*multiplierY, colorSize.x, colorSize.y)
  fill(255)
  noStroke()
  text("Estado de Alerta", windowPos.x + windowSize.x * multiplierX + colorSize.x, windowPos.y + windowSize.y*multiplierY)

  //CRITICO
  multiplierX = 0.11
  multiplierY = 0.85
  fill(colorCritical)
  noStroke(255)
  rect(windowPos.x + windowSize.x * multiplierX, windowPos.y + windowSize.y*multiplierY, colorSize.x, colorSize.y)
  fill(255)
  noStroke()
  text("Estado Crítico", windowPos.x + windowSize.x * multiplierX + colorSize.x, windowPos.y + windowSize.y*multiplierY)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  textAlign(LEFT, CENTER)
  rectMode(CORNER)
  imageMode(CENTER)
  
  usage = [json.Futeboles, json.DailyServer, json.TMA, json.ASUS, json.Alfred]
  nomes = ["ESPORTE", "DAILY", "IMAX", "ASUS", "ALFRED"]
  for (let i = 0; i < usage.length; i++) {
    colunas.push(new coluna(usage[i], width*0.05, width*0.05 * i*3 + width*0.1, nomes[i]))
  }
}

function draw() {
  //textFont(fontLight)
  background(255)
  textSize(width*0.01)
  rectMode(CORNER)
  for (let i = 0; i < usage.length; i++) {
    colunas[i].update()
  }

  imagens[0].resize(width * 0.085, 0)
  image(imagens[0], width - width*0.95, height /2)

  imagens[1].resize(width * 0.09, 0)
  image(imagens[1], width - width*0.8, height /2)

  imagens[2].resize(width * 0.08, 0)
  image(imagens[2], width - width*0.65, height /2)

  logo.resize(width * 0.2, 0)
  image(logo, width - width*0.13, height - height*0.9)

  //textFont(fontSemiBold)
  strokeWeight(1)
  Legenda();
}
