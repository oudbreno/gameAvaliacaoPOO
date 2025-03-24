const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')


const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};
document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       if (teclasPressionadas.hasOwnProperty(e.code)) {
           teclasPressionadas[tecla] = false;
       }
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});


class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x
       this.y = y
       this.largura = largura
       this.altura = altura
   }
   desenhar (){
       ctx.fillStyle = 'black'
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
}


class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   atualizar() {
       if (teclasPressionadas.KeyW) {
           this.y -= 7
       } else if (teclasPressionadas.KeyS) {
           this.y += 7
       } else if (teclasPressionadas.KeyA) {
           this.x -= 7
       } else if (teclasPressionadas.KeyD) {
           this.x += 7
       }
   }
   verificarColisao(comida){
       if(
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ){ 
           this.#houveColisao(comida)
       }
   }
   #houveColisao(comida){
       comida.x = Math.random()*canvas.width-10
       comida.y = Math.random()*canvas.height-10
   }
}
class Comida extends Entidade {
   constructor() {
       super(Math.random()*canvas.width-10,Math.random*canvas.height - 10, 20, 20)
   }
}


const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()


function loop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   cobra.desenhar()
   cobra.atualizar()
   comida.desenhar()
   cobra.verificarColisao(comida)
   requestAnimationFrame(loop)
}
loop()
