$(document).ready(function() {

    let joueur = (name) => {
        this.name = name;
        const getName = () => name;

        return { getName };
    };

    const gameBoard = (function() {
        let tab = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
        let count = 0;
        let modifier_already_call = false;
        let display_player_already_call = false;
        let players = [];

        const afficher = () => {
            let table = document.getElementById("gameBoard");
            table.textContent = "";
            tab.forEach((Element, index) => {
                let grid = document.getElementById('gameBoard');
                let tr = document.createElement('tr');
                Element.forEach((item, index2) => {
                    let td = document.createElement('td');
                    let p = document.createElement("p");
                    p.textContent = item;
                    td.append(p);
                    td.setAttribute('id', `${index}${index2}`);
                    tr.append(td);
                })
                grid.append(tr);
            });

            if (count > 0 && !verifier_vainqueur()) {
                modifier();
            }


        }

        const modifier = () => {

            modifier_already_call = true
            $("td").click(function() {
                let id = $(this).attr("id");
                id = String(id);
                let index1 = Math.trunc(id / 10);
                let index2 = id % 10;
                let pion = "";
                if (tab[index1][index2] != " ") {
                    console.log(count + "v");
                    alert('impossible de jouer là');
                } else {
                    if (count % 2 == 0) {
                        pion = "X";
                        tab[index1][index2] = pion;
                    } else {
                        pion = "O";
                        tab[index1][index2] = pion;
                    }
                    count++;
                    afficher();
                }
            });
        }

        const name_player = () => {
            $(".player").click(function() {
                let id = $(this).attr('id');

                do {
                    let name = prompt("saisir le nom du joueur", "inconnu");
                    players.push(joueur(name));
                    id--;
                } while (id > 0);
                display_player(players);
            });
        }

        const display_player = (players) => {
            display_player_already_call = true;
            players.forEach((player, index) => {
                let myPlayer = "";
                if (index % 2 == 0) {
                    myPlayer = $('<h5></h5>').text(player.getName() + ": [X]");
                } else {
                    myPlayer = $('<h5></h5>').text(player.getName() + ": [O]");
                }
                $(".add_player").prepend(myPlayer);
            });
            $('.player').hide();
        }

        const start_button = () => {
            $(".start").click(() => {
                if (!modifier_already_call && display_player_already_call) {
                    modifier();
                }
            });
        }

        const restart = () => {
            $(".restart").click(() => {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        tab[i][j] = " ";
                    }
                }
                players = [];
                count = 0;
                display_player_already_call = false;
                modifier_already_call = false;
                $(".add_player").empty();
                $(".player").show();
                afficher();
            });

        }

        const verifier_vainqueur = () => {
            let txt = "";
            tab.forEach(element => {
                if ((element[0] == element[1] && element[1] == element[2]) && element[0] != " ") {
                    if (element[0] == "X") {
                        txt = $("<h2></h2>").text("victoire de " + players[0].getName());
                        $('.add_player').prepend(txt);
                    } else {
                        txt = $("<h2></h2>").text("victoire de " + players[1].getName());
                        $('.add_player').prepend(txt);
                    }
                    return true;
                }
            });

            for (j = 0; j < 3; j++) {
                if ((tab[0][j] == tab[1][j] && tab[1][j] == tab[2][j]) && tab[0][j] != " ") {
                    if (tab[0][j] === "X") {
                        txt = $("<h2></h2>").text("victoire de " + players[0].getName());
                        $('.add_player').prepend(txt);
                    } else {
                        txt = $("<h2></h2>").text("victoire de " + players[1].getName());
                        $('.add_player').prepend(txt);
                    }
                    return true;
                }
            }
            if ((tab[0][0] == tab[1][1] && tab[1][1] == tab[2][2] || tab[2][0] == tab[1][1] && tab[1][1] == tab[0][2]) && tab[1][1] != " ") {
                if (tab[0][0] === "X") {
                    txt = $("<h2></h2>").text("victoire de " + players[0].getName());
                    $('.add_player').prepend(txt);
                } else {
                    txt = $("<h2></h2>").text("victoire de " + players[1].getName());
                    $('.add_player').prepend(txt);

                    return true;
                }

            }
            return false;
        }
        return { afficher, restart, name_player, start_button };
    })();

    gameBoard.afficher();
    gameBoard.name_player();
    gameBoard.start_button();
    gameBoard.restart();
});