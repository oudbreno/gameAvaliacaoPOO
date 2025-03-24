const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gameOver = false;
let pontos = 0;


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
   desenhar (cor){
       ctx.fillStyle = cor
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
   desenharPontuacao(){
    ctx.fillStyle = 'white';
    ctx.font = '50 px Arial';
    ctx.fillText('Pontuação: ' + pontos ,20,30);
   }
}


class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   atualizar() {

       if(gameOver) return;
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
       pontos ++;
       comida.x = Math.random()*canvas.width-20;
       comida.y = Math.random()*canvas.height-20;
   }
   desenhar (){
    ctx.fillStyle = 'greenyellow'
    ctx.fillRect(this.x, this.y, this.largura, this.altura)
}
colisaoParede(){
    if(this.x + this.largura >= canvas.width || this.y + this.altura >= canvas.height || this.x <= 0 || this.y <= 0){
        gameOver = true;
        alert("Você Morreu");
    }
}


}


class Comida extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura,Math.random()*canvas.width-10,Math.random*canvas.height - 10, 20, 20)
   }
   desenhar (){
    ctx.fillStyle = 'Red'
    ctx.fillRect(this.x, this.y, this.largura, this.altura)
}
}


const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida(100,200,20,20)


function loop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   cobra.desenhar();
   cobra.atualizar();
   comida.desenhar();
   cobra.desenharPontuacao();
   cobra.verificarColisao(comida);
   cobra.colisaoParede();
   
   if(!gameOver){
    requestAnimationFrame(loop)
   }
}
loop()
