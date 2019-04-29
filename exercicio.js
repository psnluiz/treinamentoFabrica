//Exercícios propostos 
//Escrever uma array que armazena os dias da semana (SeGuNdA, TeRcA,… ) onde as letras alternam entre maiúscula e minúscula.
//Criar função que recebe como argumento, uma String com no máximo 3 letras e imprime o índice do dia que começa com o argumento informado. A busca deve ser case-insensitive.
//Criar função que não receba argumento, e retorna um array com os valores dos dias que começam com “S”.



var dias = ["domingo","segunda feira", "terça feira", "quarta feira", "quinta feira", "sexta feira", "sabado"];


var alternar = function (s){
    var chars = s.toLowerCase().split("");
    for(var i=0; i < chars.length; i+=2){
        chars[i] = chars[i].toUpperCase();
    }
    return chars.join("");
}

for (var i=0; i<dias.length; i++){
    // console.log(dias[i]);
    dias[i] = alternar(dias[i]);
    // console.log(dias[i]);
}


// var buscarIndice = function(arg){ //refatorar usando find
//     for (var i=0; i<dias.length; i++){
//         if ( dias[i].toLowerCase().includes(arg.toLowerCase()) ){
//             console.log("O indíce do dia " + dias[i] + " é : " + (i+1));
//         }
//     }
// }

//refatoração usando find
var buscarIndice = function(arg){
    dias.find(function(element, index){
        if(element.toLowerCase().includes(arg.toLowerCase())){console.log("O indíce do dia " + element + " é :" + (index+1))} 
    });
} 




// var diasComS = function(){ 
//     for(var i=0; i<dias.length; i++){
//         if(dias[i].toLowerCase().charAt(0) == 's'){
//             console.log(dias[i]);
//         }
//     }
// }

//refatoração usando FILTER
var diasComS = dias.filter(dia => dia.toLowerCase().charAt(0) == 's');


//execução 
console.log("\n Busca de Índice")
buscarIndice("qua");

console.log("\n\n Dias com S: " + diasComS);


// for(var i=0; i<dias.length; i++){
//     buscarIndice(dias[i]);
// }


// console.log("\n\n\n\n\n")

// diasComS();
