class TicTacToe {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
        this.winner = null;
        this.board = new Array(9).fill(null);
        this.winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]  // diagonals
        ];

        this.startNewGame()
    }

    startNewGame() {
        this.board.fill(null);
        this.currentPlayer = this.player1;
        this.winner = null;
        this.updateResult("");
        this.renderBoard();
        this.addActions()
    }

    checkWinner() {
        for (const [a, b, c] of this.winConditions) {
            if (this.board[a] !== null && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                this.updateResult("Winner is " + this.winner);
                return;
            }
        }

        // Check for a draw
        if (!this.board.includes(null)) {
            this.updateResult("It's a draw!");
        }
    }

    setNextPlayer() {
        this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    }

    markOnBoard(index) {
        if (this.board[index] === null) {
            this.board[index] = this.currentPlayer;
            this.setNextPlayer();
            this.renderBoard();
            this.checkWinner();
        } else {
            this.updateResult("Invalid move. Cell already taken.");
        }
    }

    renderBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let i = 0; i < this.board.length; i++) {
            gameBoard.innerHTML += `<div class="col">
                <span style="${this.board[i] == this.player1 ? 'color:white;' : ''}">
                    ${this.board[i] ? this.board[i] : ''}
                </span>
            </div>`;
        }

        const cols = document.getElementsByClassName('col');

        for (let i = 0; i < cols.length; i++) {
            cols[i].onclick = () => !this.winner ? this.markOnBoard(i) : null
        }
    }

    addActions() {
        const startBtn = document.getElementById('start');
        startBtn.onclick = () => this.startNewGame();
    }

    updateResult(message) {
        const result = document.getElementById('result');
        result.innerHTML = message;
    }
}

new TicTacToe('X', 'O');
