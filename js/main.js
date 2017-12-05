var board = new Array()
var score = 0
var $doc = $(document)
var hasConflicted = new Array()
newgame()

function newgame() {
    //初始化分数
    score=0
    updateScroe()
    // 初始化格子
    init()
    // 随机格子生成数字
    generateOneNumber()
    generateOneNumber()
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array()
        hasConflicted[i] = new Array()
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0
            hasConflicted[i][j] = false
        }
    }
    updateBoardView()
}

function updateBoardView() {
    $('.number-cell').remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-wrap').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var thisNumberCell = $('#number-cell-' + i + '-' + j)
            if (board[i][j] === 0) {
                thisNumberCell.css({
                    'width': 0,
                    'height': 0,
                    'top': getPosTop(i, j) + 50,
                    'left': getPosLeft(i, j) + 50
                })
            } else {
                thisNumberCell.css({
                    'width': 100,
                    'height': 100,
                    'top': getPosTop(i, j),
                    'left': getPosLeft(i, j),
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                }).text(board[i][j])
            }
            hasConflicted[i][j] = false
        }
    }
}

function generateOneNumber() {
    if (nospace()) {
        return false
    }
    // 随机一个位置
    var randx = Math.floor(Math.random() * 4)
    var randy = Math.floor(Math.random() * 4)
    while (true) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = Math.floor(Math.random() * 4)
        randy = Math.floor(Math.random() * 4)
    }
    // 随机一个数字
    // var randNumber=Math.floor(Math.random()*2+1)*2
    var randNumber = Math.random() < 0.5 ? 2 : 4
    // 在生成位置显示生成数字
    board[randx][randy] = randNumber
    showNumberWithAnimatation(randx, randy, randNumber)
    return true
}


$doc.on('keydown', function(e) {
    switch (e.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)

            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
            }
            break;
        default:
            break;
    }
})

function isgameover() {
    if (nospace() && nomove()) {
        gameover()
    }
}

function gameover() {
    alert('游戏结束')
}

function moveLeft() {
    if (!canMoveLeft()) {
        return false
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        // add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score+= board[i][k]
                        updateScroe()
                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout(function() {
        updateBoardView()
    }, 200)
    return true
}

function moveUp() {
    if (!canMoveUp()) {
        return false
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockVertical(j, k, i) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i)) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        // add
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score+= board[k][j]
                        updateScroe()
                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout(function() {
        updateBoardView()
    }, 200)
    return true
}

function moveRight() {
    if (!canMoveRight()) {
        return false
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >=0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        // add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score+= board[i][k]
                        updateScroe()
                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout(function() {
        updateBoardView()
    }, 200)
    return true
}

function moveDown() {
    if (!canMoveDown()) {
        return false
    }

    for (var i = 2; i >=0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockVertical(j, i, k) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k)) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        // add
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score+= board[k][j]
                        updateScroe()
                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }

    }
    setTimeout(function() {
        updateBoardView()
    }, 200)
    return true
}
