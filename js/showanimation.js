function showNumberWithAnimatation(i,j,number) {
  var numberCell=$('#number-cell-'+i+'-'+j)
  numberCell.css({'background-color':getNumberBackgroundColor(number),'color':getNumberColor(number)})
  numberCell.text(number)
  numberCell.animate({
    'width':'100px',
    'height':'100px',
    'top':getPosTop(i,j),
    'left':getPosLeft(i,j)
  },50)
}


function showMoveAnimation(fromx,fromy,tox,toy){
  var numberCell=$('#number-cell-'+fromx+'-'+fromy)
  numberCell.animate({
    'left':getPosLeft(tox,toy),
    'top':getPosTop(tox,toy)
  },200)
}
