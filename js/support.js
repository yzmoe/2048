function getPosTop(i,j){
  return 20+i*120
}
function getPosLeft(i,j){
  return 20+j*120
}
function getNumberBackgroundColor(number){
  switch(number){
    case 2:return '#eee4da';
case 4:return '#ede0c8';
case 8:return '#f2b179';
case 16:return '#f59563';
case 32:return '#f67c5f';
case 64:return '#f65e3b';
case 128:return '#edcf72';
case 256:return '#edcc61';
case 512:return '#9c0';
case 1024:return '#33b5e5';
case 2048:return '#09c';
}
}
function getNumberColor(number){
  if(number<=4){
    return '#776e65'
  }else{
    return '#fff'
  }
}
function nospace(){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]===0){
        return false
      }
    }
  }
  return true
}
function nomove(){
  if(canMoveLeft()||canMoveUp()||canMoveRight()||canMoveDown()){
    return false
  }
  return true
}
function canMoveLeft(){
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(board[i][j]!==0){
        if(board[i][j-1]===0 || board[i][j-1]===board[i][j] ){return true}
      }
    }
  }
  return false
}
function canMoveUp(){
  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]!==0){
        if(board[i-1][j]===0 || board[i-1][j]===board[i][j] ){return true}
      }
    }
  }
  return false
}
function canMoveRight(){
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){
      if(board[i][j]!==0){
        if(board[i][j+1]===0 || board[i][j+1]===board[i][j] ){return true}
      }
    }
  }
  return false
}
function canMoveDown(){
  for(var i=2;i>=0;i--){
    for(var j=0;j<4;j++){
      if(board[i][j]!==0){
        if(board[i+1][j]===0 || board[i+1][j]===board[i][j] ){return true}
      }
    }
  }
  return false
}
function noBlockHorizontal(row,col1,col2){
  for(var i=col1+1;i<col2;i++){
    if(board[row][i]!==0){
      return false
    }
  }
  return true
}
function noBlockVertical(col,row1,row2){
  for(var i=row1+1;i<row2;i++){
    if(board[i][col]!==0){
      return false
    }
  }
  return true
}
function updateScroe(){
  console.log(score)
  $('#score').text(score)
}
