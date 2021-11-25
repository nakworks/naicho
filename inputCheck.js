function hantei() {
    //絶縁良否判定
    const h1 = document.getElementsByName('zet');
    const h2 = document.getElementById('ins').value;
    const res1 = document.getElementById('zhantei');
    if((h1.item(0).checked && h2 >= 0.2) || (h1.item(1).checked && h2 <= 1 && h2 != '')) {
      res1.textContent = '絶縁良好';
    }else if(h1.item(0).checked && h2 >= 0.1 && h2 < 0.2) {
      res1.textContent = '対地電圧150V以下で絶縁良好';
    }else if(h2 != '') {
      res1.innerHTML = '<font color="Red">絶縁不良</font>';
    }else {
      res1.textContent = '';
    }

    //接地良否判定
    const sokutei = [document.getElementById('e1value').value,
         document.getElementById('e2value').value,
         document.getElementById('e3value').value];
    const shubetsu = [document.getElementById('e1').value,
          document.getElementById('e2').value,
          document.getElementById('e3').value];
    let e_res = [document.getElementById('e1hantei'),
     document.getElementById('e2hantei'),
     document.getElementById('e3hantei')];
    for (let i=0; i <=2; i++){
      e_res[i].innerHTML = judge(shubetsu[i], sokutei[i]);
    }
}

function judge(sw, val) { //接地抵抗値適否判定関数
  switch (sw){
    case 'A': //A種
      if(val <= 10 && val != '') {
        return '適合';
      }else if(val != '') {
        return '<font color="Red">不適</font>';
      }else {
        return '';
      }
      break;
    case 'B': //B種
      if(val != '') {
        return '判定せず（一線地絡電流から算出要）';
      }else {
        return '';
      }
      break;
    default: //1or4（D種・C種）の場合
      if(val <= 10 && val != '' || sw == 'D' && val <= 100 && val != '') {
        return '適合';
      }else if(val <= 500 && val != '') {
        return '0.5秒以内で動作するELB施設で適合';
      }else if(val != '') {
        return '<font color="Red">不適</font>';
      }else {
        return '';
      }
  }
}

function errorCheck(kakunin, result) {
  // 入力エラーチェック
  const zhan = document.getElementById('zhantei').textContent;
  const ehan1 = document.getElementById('e1hantei').textContent;
  const ehan2 = document.getElementById('e2hantei').textContent;
  const ehan3 = document.getElementById('e3hantei').textContent;
  const zetsuen = document.getElementById('ins').value;
  let err, warning, yesno;
  err = '';
  warning = '';
  yesno = true;
  if(kakunin != '目視点検' && zetsuen == "") {
    err = err + '絶縁確認：測定値を入力してください' + '\n';
  }

  // 不整合ワーニング表示
  if(zhan.match(/不適/) && result.item(0).checked) {
    warning = warning + '絶縁抵抗が規定値を超過しています。適合でよろしいですか？' + '\n';
  }else if(ehan1.match(/不適/) && result.item(0).checked) {
    warning = warning + '接地抵抗が規定値を超過しています。適合でよろしいですか？' + '\n';
  }else if(ehan2.match(/不適/) && result.item(0).checked) {
    warning = warning + '接地抵抗が規定値を超過しています。適合でよろしいですか？' + '\n';
  }

  if(err != '') {
    alert(err);
    err = '';
    return false;
  }else{
    if(warning != '') {
      yesno = confirm(warning);
      warning = '';
    }
    if(yesno) {
      return true;
    }else{
      return false;
      yesno = true;
    }
  }
}
