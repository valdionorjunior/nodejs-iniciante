const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}

const meuEvento = new MeuEmissor()
const evento = 'click:muquitinho'

meuEvento.on(evento, function (click){
    console.log('foi clicado', click)
})


// meuEvento.emit(evento, 'aaaaaa click')

// meuEvento.emit(evento, 'aaaaaa click monster')

// setInterval(()=>{ // funcção executa algo dentro dela de tempos em tempos 
//     meuEvento.emit(evento, 'click ...')
//     const aux = 1
//     if(aux > 5){
        
//     }

// }, 2000) //vai excutar acada 2 sec a função para emitir um eve

const stdin = process.openStdin()

stdin.addListener('data', (value)=>{
    console.log(`você digitou: ${value.toString().trim()}`)
})