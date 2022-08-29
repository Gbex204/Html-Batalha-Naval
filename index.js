var points; var lifes; var gameover;

var grid = [
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

var images = [
    'images/water.jpg',
    'images/boat.jpg'
];

function initGame(){
    if(gameover) {
    alert('Reinicie o jogo para jogar mais!\nClique no botão de REINICIAR');
    return};

    points = 0;
    var radios_result = document.forms[0];
    for(i = 0; i<3; i++){
        if(radios_result[i].checked) {
            lifes = Number.parseInt(radios_result[i].value);
            alert(`Vidas selecionadas: ${lifes}`);
        }   
    }
    gameover=false;
    update_points()
}

function lifes_selects() {
    lifes = document.getElementsByName("life_option").value;
    alert(`Vidas selecionadas: ${lifes}`);

}

function createTable() {
    document.write('<table id="tabuleiro">')
    for(var i=0; i<5; i++) {
        document.write('<tr>')
        for(var j=0; j<5; j++) {
            document.write(`<td><img src='images/png.png' id=${i}${j} onclick='atirar(${i},${j})'></td>`)
        }
        document.write('</tr>')
    }
}

/* Função contador, onde os if's verificam se onde o jogador clicou é um barco, ou é água, caso o tipo_grid seja 0,
significa que o jogador errou o barco, então é retirado 1 vida, caso o tipo_grid seja 1, o jogador não perde vidas e
recebe 5 pontos. */

function contador(lin, col){
    if(lifes > 0) {
        if(tipo_grid == 0){
            lifes--;
            grid[lin][col] = 333;

        }
        if(tipo_grid == 1){
            points += 5;
            grid[lin][col] = 333;
        }
        update_points();
    }
}

/* Função atirar recebe dois parâmetros, linha e coluna de onde foi chamada (i e j). Caso a vida do jogador seja
= a 0, não será mais possivel continuar jogando e a variável "gameover" receberá "true", para que assim, os comandos
após a verificação ( if (gameover) ) não sejam executados. */

function atirar(lin, col) {

    var linha_clicada = lin; 
    var coluna_clicada = col;
    var tiro_selecionado = change_weapon();

    if(lifes == 0) {
        alert("Game Over!");
        gameover = true;
    }

    if(gameover) return;

    tipo_grid = grid[lin][col];    

    if(tipo_grid != 333 && lifes > 0) {

        /* Quando o tiro Normal é selecionado (padrão), apenas 1 quadrado é usado, a troca de imagem 
        e a soma de pontos ou perda de vida ocorrem  */

        if(tiro_selecionado == '1'){
            quadrado = document.getElementById(`${lin}${col}`);
            quadrado.src = images[tipo_grid];
            contador(linha_clicada, coluna_clicada);
        }

        /* Quando Bomba Atômica é selecionada, os quadrados ao redor do central são alterados em forma de cruz*/

        if(tiro_selecionado == '2'){
            quadrado_topo = document.getElementById(`${lin-1}${col}`);
            quadrado_direita = document.getElementById(`${lin}${col+1}`);
            quadrado_central = document.getElementById(`${lin}${col}`);
            quadrado_esquerda = document.getElementById(`${lin}${col-1}`);
            quadrado_base = document.getElementById(`${lin+1}${col}`);

        /* No primeiro "if" é verificado se o quadrado que está no EM CIMA do central será alterado, caso o valor da
        linha seja menor que zero, essa linha não existe. Também é verificado se o quadrado já havia sido alterado por 
        meio do valor na lista [grid], então o código não será executado*/

            if(lin-1 >= 0 && grid[lin-1][col] != 333){
                quadrado_topo.src = images[grid[lin+1][col]];
                alert('Topo');
                grid[lin+1][col] = 333;
            }

        /* No segundo "if" é verificado se o quadrado que está À DIREITA do central será alterado, caso o valor da
        linha seja maior que 4, essa coluna não existe. Também é verificado se o quadrado já havia sido alterado por 
        meio do valor na lista [grid], então o código não será executado então o código não será executado.*/

            if(col+1 <= 4 && grid[lin][col+1] != 333){
            quadrado_direita.src = images[grid[lin][col+1]];
            alert('Direita');
            grid[lin][col+1] = 333;
            }

            quadrado_central.src = images[tipo_grid];
            
        /* No terceiro "if" é verificado se o quadrado que está À ESQUERDA do central será alterado, caso o valor da
        linha seja menor que 0, essa coluna não existe. Também é verificado se o quadrado já havia sido alterado por 
        meio do valor na lista [grid], então o código não será executado então o código não será executado.*/

            if(col-1 >= 0 && grid[lin][col-1] != 333){
                quadrado_esquerda.src = images[grid[lin][col-1]];
                alert('Esquerda');
                grid[lin][col-1] = 333;
            }

        /* No quarto "if" é verificado se o quadrado que está EMBAIXO do central será alterado, caso o valor da
        linha seja maior que 4, essa linha não existe. Também é verificado se o quadrado já havia sido alterado por 
        meio do valor na lista [grid], então o código não será executado então o código não será executado.*/

            if(lin+1 <= 4 && grid[lin+1][col] != 333){
                quadrado_base.src = images[grid[lin+1][col]];
                alert('Base');
                grid[lin+1][col] = 333;
            }
        }
    }
}

function update_points() {
                
    sb_points = document.getElementById("sb_points");
    sb_lifes = document.getElementById("sb_lifes");
    sb_points.innerHTML = `Pontos do jogador ${nome}: ${points}`;
    sb_lifes.innerHTML = `Vidas do jogador ${nome}: ${lifes}`;
}

/* Função chamada a partir da mudança de seleção no select weapon_selector, feito
 para mudar estilo de tiro, 1 = Normal, 2 = Bomba Atomica (Tiro em formato de cruz) */

function change_weapon() {
    var weapon = document.querySelector('#weapon_selector').value;
    return weapon;
}
