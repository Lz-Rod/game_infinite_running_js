var canvas, contexto, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 6,

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
            gravidade: 1.6,
            velocidade: 0,
            forcaDoPulo: 23.6,
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
                this.velocidade = -this.forcaDoPulo
                this.qntPulos ++
                }
            },

            desenhar: function() {
                contexto.fillStyle = this.cor//define a cor do bloco
                contexto.fillRect(this.x, this.y, this.altura, this.largura)// cria o objeto a partir doas informações do bloco
            }
        },
        
        obstaculos = {
            _obs: [],
            cores: ["$ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
            tempoInsere: 0,

            insere: function() {// essa função inserirá os obstáculos na tela
                this._obs.push({
                    x: LARGURA,
                    largura: 30 + Math.floor(21 * Math.random()),//aqui fará com que a largura dele seja aleatória que varia de 30 a 50 pixels
                    altura: 30 + Math.floor(120 * Math.random()),//já aqui definirá uma altura entre 30 e 120 pixels
                    cor: this.cores[Math.floor(5 * Math.random())]//aqui ele sortea a cor de uma das cinco definidas na variavel cores
                })

                this.tempoInsere = 30 + Math.floor(20 * Math.random())// faz o jogo gerar os espaços entre os obstaculos de forma randomica
            },

            atualizar: function() {//faz os obstaculos andar pela tela.
                if(this.tempoInsere == 0)// faz ele inserir um novo obstaculo somente quando o tempoo for igual a 0
                    this.insere()
                else
                    this.tempoInsere--

                for (var i = 0, tam = this._obs.length; i < tam; i++){
                    var obs = this._obs[i]

                    obs.x -= velocidade

                    if(obs.x <= -obs.largura){
                        this._obs.splice(i, 1)// faz o obstaculo sumir ao chegar a borda esquerda da tela
                        tam--//corrige o erro do for tentar acessar um elemento que foi removido
                        i--
                    }
                }
            },

            desenhar: function() {//essa função desenhará os obstaculos sorteando as cores e medidas.
                for (var i = 0, tam = this._obs.length; i < tam; i++){
                    var obs = this._obs[i]
                    contexto.fillStyle = obs.cor
                    contexto.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura)
                }
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
            obstaculos.atualizar()

            
        }
        function desenhar(){
            contexto.fillStyle = "#50beff"
            contexto.fillRect(0, 0, LARGURA, ALTURA)
            chao.desenhar()
            obstaculos.desenhar()
            bloco.desenhar()
        }

        main()