var canvas, contexto, ALTURA, LARGURA, frames = 0, maxPulos = 3,

        chao = {
            y: 550,
            altura: 50,
            cor: "#ffdf70",

            desenhar: function() {
                contexto.fillStyle = this.cor//pega a cor definida no objeto
                contexto.fillRect(0, this.y, LARGURA, this.altura)//cria o objeto a partir do x e y definidos
            }
        },

        bloco = {
            x: 50,
            y: 0,
            altura: 50,
            largura: 50,
            cor: "#ff4e4e",
            gravidade: 2,
            velocidade: 0,
            forcaDoPulo: 25,
            qntPulos: 0,

            atualizar: function() {
                this.velocidade += this.gravidade
                this.y += this.velocidade

                if (this.y > chao.y - this.altura){// esse if faz com que o bloco não passe do chão
                this.y = chao.y - this.altura
                this.qntPulos = 0//zera os pulos quando o personagem encosta no chão
                }
            },

            pula: function() {

                if(this.qntPulos < maxPulos){
                this.velocidade = -this.forcaDoPulo;
                this.qntPulos ++
                }
            },

            desenhar: function() {
                contexto.fillStyle = this.cor//define a cor do bloco
                contexto.fillRect(this.x, this.y, this.altura, this.largura)// cria o objeto a partir doas informações do bloco
            }
        }

        function main(){
            //função principal
            ALTURA = innerHeight
            LARGURA = innerWidth

            if (LARGURA >= 800){
                LARGURA = 800
                ALTURA = 600
            }
            canvas = document.createElement("canvas")//cria a tela do jogo
            canvas.width = LARGURA
            canvas.height = ALTURA
            canvas.style.border = "1px solid #000"

            contexto = canvas.getContext("2d")
            document.body.appendChild(canvas)

            document.addEventListener("mousedown",clique)

            executar()
        }
        function clique(event){
            bloco.pula()
        }
        function executar(){
            atualizar()
            desenhar()

            requestAnimationFrame(executar)
        }
        function atualizar(){
            frames++
            bloco.atualizar()

            
        }
        function desenhar(){
            contexto.fillStyle = "#50beff"
            contexto.fillRect(0, 0, LARGURA, ALTURA)
            chao.desenhar()
            bloco.desenhar()
        }

        main()