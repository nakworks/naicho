/**
 * メーラーを起動してメールを送信する
 */

// 全角数字を半角に変換
function zenhan(str) {
  return str.replace(/[０-９]/g,
  	function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  	}
  );
}

// 宛先生成
function generate() {
  const ma = String.fromCharCode(107,95,103,106,114,109,56,70,48,46,46,51,46,46,55,62,99,110,107,95,103,106,44,102,99,110,97,109,44,97,109,44,104,110);
  let char_ma = "", str_ma = "";
  for(let i=0;i<ma.length;i++) {
  	char_ma = ma.charCodeAt(i);
  	str_ma += String.fromCharCode(char_ma + 2);
  }
  return str_ma;
}

window.onload = function() {
  //本文に記載する情報を格納する変数
  let subject, body, zetsuen, kakunin, sechi;
  let e1, e2, e3, e1s, e2s, e3s;
  let result, han, yesno;
  const nametag = 'お客さまA（仮）'
  const sendmail = document.getElementById('mail');
  sechi = '';
  yesno = true;

  sendmail.onclick = function() {
    zetsuen = zenhan( document.getElementById('ins').value );
	　e1 = zenhan( document.getElementById('e1value').value );
    e2 = zenhan( document.getElementById('e2value').value );
    e3 = zenhan( document.getElementById('e3value').value );
	　kakunin = document.getElementsByName('zet');
    if(kakunin.item(0).checked){
      kakunin = '絶縁抵抗：' + zetsuen + 'MΩ';
    }else if (kakunin.item(1).checked) {
      kakunin = '漏れ電流：' + zetsuen + 'mA';
    }else if (kakunin.item(2).checked) {
      kakunin = '目視点検';
    }

    e1s = document.getElementById('e1').value;
    e2s = document.getElementById('e2').value;
    e3s = document.getElementById('e3').value;
    if(e1 != '') {
      sechi = e1s + ':' + e1;
    }
    if(e2 != '') {
      sechi = sechi + ',' + e2s + ':' + e2;
    }
    if(e3 != '') {
      sechi = sechi + ',' + e3s + ':' + e3;
    }
    if(sechi == '') {
      sechi = '接地測定不要';
    }

    result = document.getElementsByName('kekka');
    if(result.item(0).checked){
      han = '適合';
    }else if (result.item(1).checked) {
      han = '不適合（理由コード：' + document.getElementById('futekigoRiyu').value + '）';
    }else if (result.item(2).checked) {
      han = '調査不能（理由コード：' + document.getElementById('fuchoRiyu').value + '）';
    }

    const kosakuSyubetsu = ['','一般用','特定','受託'];
    const kosaku = kosakuSyubetsu[document.getElementById('kosaku').value];
    const renraku = document.getElementById('renraku').value;

    subject = 'skcs_しゅん工調査結果：' + nametag;
    body = nametag + '\n' + kakunin + '\n' + sechi + '\n' + han + '\n' + kosaku + '\n' + renraku

  	const url = new URL( generate() );
  	url.searchParams.set('subject', subject);
  	url.searchParams.set('body', body);
  	url.toString();

    if(errorCheck(kakunin, result)) {
      location.href = url;
    }
  };
};
