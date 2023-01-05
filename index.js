var CELLS = document.querySelectorAll(".inner-cell")
var TIME = document.querySelector("#time")
var WIN = document.querySelector("#win")
var PLAY_AGAIN = document.querySelector("#again")
var PLAYER_TURN = document.querySelector(".turn h1")

var GAME_TITLE = document.querySelector("#game-title")
var MODE_SELECT = document.querySelectorAll(".mode_select")
var MENU = document.querySelector("#menu")

var PLAYER_CLICKS = 0
var GAME_OVER = false
var mode


WIN.style.display = "none"
GAME_TITLE.textContent = ""
PLAYER_TURN.textContent = ""

MODE_SELECT.forEach((mode_game) => {
    mode_game.addEventListener("click", () => {
        mode = mode_game.id
        console.log(mode)
        GAME_START(mode)
    })
})
var PLAYER_TURNS = {
    PLAYER_1: true,
    PLAYER_2: false
}
var BOARD = []
var WINNING_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const gameReset = () => {
    PLAYER_CLICKS = 0
    GAME_OVER = false
    WIN.style.display = "none"
    PLAYER_TURNS.PLAYER_1 = true
    PLAYER_TURNS.PLAYER_2 = false
    CELLS.forEach((cell, index) => {
        cell.textContent = []
        BOARD = []
    });
}
PLAY_AGAIN.addEventListener("click", () => {
    gameReset()
})

const GAME_START = (mode) => {
    MENU.style.display = "none"
    GAME_TITLE.textContent = "TIC TAC TOE"
    PLAYER_TURN.textContent = "PLAYER 1 TURN"
    if(mode == "pvp") {
        pvp()
    }else if("pv_ai") {
        play_with_ai()
    }
}
const play_with_ai = () => {
    CELLS.forEach((cell, key) => {
        cell.addEventListener("click", (e) => {
            if (typeof BOARD[key] == "undefined" && PLAYER_CLICKS <= 9) {
                const cellTurn = PLAYER_TURNS.PLAYER_1 ? "X" : "O"
                BOARD[key] = cellTurn
                cell.textContent = cellTurn
                audio = new Audio("pick.mp3")
                audio.play()
                if(CheckWins(cellTurn) && !PLAYER_CLICKS <= 8) {
                    audio = new Audio("win.mp3")
                    audio.play()

                    GAME_OVER = true
                    WIN.textContent = `Winner ${cellTurn}`
                    WIN.style.display = "flex"
                    WIN.appendChild(PLAY_AGAIN)
                }else if(!CheckWins(cellTurn) && PLAYER_CLICKS == 8) {
                    GAME_OVER = true
                    WIN.textContent = `Draw`
                    WIN.style.display = "flex"
                    WIN.appendChild(PLAY_AGAIN)
                }else {
                    PLAYER_TURNS.PLAYER_1 = false
                    PLAYER_TURNS.PLAYER_2 = true
                    PLAYER_CLICKS++
                    setTimeout(() => {
                        AiMove()
                    }, 300);
                }
            }
        })
    })
    const AiMove = async () => {
        if (PLAYER_TURNS.PLAYER_2) {
            let status = 0
            while (status == 0) {
                let key = Math.floor(Math.random() * 8);
                if (typeof BOARD[key] == "undefined") {
                    const cellTurn = PLAYER_TURNS.PLAYER_2 ? "O" : "X"
                    BOARD[key] = cellTurn
                    CELLS[key].textContent = cellTurn
                    if(CheckWins(cellTurn)) {
                        audio = new Audio("lose.mp3")
                        audio.play()

                        GAME_OVER = true
                        status = 1
                        WIN.textContent = `Winner ${cellTurn}`
                        WIN.style.display = "flex"
                        WIN.appendChild(PLAY_AGAIN)
                    }else if(!CheckWins(cellTurn) && PLAYER_CLICKS == 8) {
                        GAME_OVER = true
                        WIN.textContent = `Draw`
                        WIN.style.display = "flex"
                        WIN.appendChild(PLAY_AGAIN)
                    }else {
                        PLAYER_TURNS.PLAYER_1 = true
                        PLAYER_TURNS.PLAYER_2 = false
                        PLAYER_TURN.textContent = "PLAYER 1 TURN"
                        status = 1
                        PLAYER_CLICKS++
                    }
                }
            }
        }
    }
}
const pvp = () => {
    CELLS.forEach((cell, key) => {
        cell.addEventListener("click", (e) => {
            if (typeof BOARD[key] == "undefined" && PLAYER_CLICKS <= 9) {
                const cellTurn = PLAYER_TURNS.PLAYER_1 ? "X" : "O"
                BOARD[key] = cellTurn
                cell.textContent = cellTurn
                audio = new Audio("pick.mp3")
                audio.play()
                if(CheckWins(cellTurn) && !PLAYER_CLICKS <= 8) {
                    audio = new Audio("win.mp3")
                    audio.play()

                    GAME_OVER = true
                    WIN.textContent = `Winner ${cellTurn}`
                    WIN.style.display = "flex"
                    WIN.appendChild(PLAY_AGAIN)
                }else if(!CheckWins(cellTurn) && PLAYER_CLICKS == 8) {
                    audio = new Audio("lose.mp3")
                    audio.play()

                    GAME_OVER = true
                    WIN.textContent = `Draw`
                    WIN.style.display = "flex"
                    WIN.appendChild(PLAY_AGAIN)
                }else {
                    PLAYER_TURNS.PLAYER_1 = !PLAYER_TURNS.PLAYER_1
                    PLAYER_TURN.textContent = `PLAYER ${PLAYER_TURNS.PLAYER_1 ? 1 : 2} TURN`
                    PLAYER_CLICKS++
                }
            }
        })
    })
}

const CheckWins = (cell) => {
    return WINNING_CONDITION.some((win_condition, index) => {
        return win_condition.every((key) => {
            return BOARD[key] == cell
        })
    })
}
