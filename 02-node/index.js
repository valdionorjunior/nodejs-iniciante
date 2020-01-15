/**
 * Obter um Usuario
 * Obter numero de telefone de usuario apartir do id
 * Obter endereço do usuario pelo ID
 */

 function obterUsuario(){
     return new Promise( function resolvePromise(resolve, reject){
         setTimeout(function () {
             return resolve({
                 id: 1,
                 nome: "Senna",
                 dataNascimento: new Date()
             })
         },1000)
     })
 }

 function obterTelefone (idUsuario){
    return new Promise( function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                ddd: 11,
                numero: '962484091'
            })
        }, 2000)

    })
 }

 function obterEndereco(idUsuario){
    return new Promise( function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                rua: 'Rua dos calangos',
                numero: '233',
                bairro: 'paraguaia'
            })
        }, 3000)
    })
 }

async function main (){
    try {
        console.time('Medindo tempo de exução de função') //capturando tempo de execução da função
      const usuario = await obterUsuario()  
    //   const telefone = await obterTelefone(usuario.id)
    //   const endereco = await obterEndereco(usuario.id)
    const result = await Promise.all([
        obterTelefone(usuario.id),
        obterEndereco(usuario.id)
    ])
      const telefone = result[0];
      const endereco = result[1];

      console.log(`
        Nome: ${usuario.nome}
        ID: ${usuario.id}
        Telefone:(${telefone.ddd})${telefone.numero}
        Endereco: ${endereco.rua} ${endereco.numero} ${endereco.bairro}
      `)

      console.timeEnd('Medindo tempo de exução de função')

    } catch (error) {
        console.log('DEU RUIM MANO', error)
    }
}

main()
//mnipular quando dá sucesso e qunado da erro
//  const usuarioPromise = obterUsuario()
     
//  usuarioPromise
//  .then(usuario =>{
//     return obterTelefone(usuario.id)
//     .then( function resolverTelefone(result){
//         usuario: {
//             id: usuario.id,
//             nome: usuario.nome
//         },
//         telefone: {
//             telefone : result
//         }
//     })
//  })
//  .then(resultado =>{
//     console.log('resultado: ', resultado)
//  })
//  .catch(error => {
//      console.error('Deu erro jovem', error)
//  })

// obterUsuario(function resolverUsuario(error, usuario){
//     if(error){
//         console.log('DEU RUIM EM USUARIO', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(idUsuario, telefone){
//         if(error){
//             console.log('DEU RUIM EM TELEFONE', error1)
//             return
//         }

//         obterEndereco(usuario.id, function resolverEndereco(idUsuario, endereco){
//             if(error){
//                 console.log('DEU RUIM EM ENDERECO', error2)
//                 return
//             }

//             console.log(`
//             Nome: ${usuario.nome},
//             Endereço: ${endereco.rua}, ${endereco.numero},
//             Telefone: ${telefone.ddd}${telefone.numero}
//             `)
//         })
//     })

// })