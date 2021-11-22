/**
 * メーラーを起動してメールを送信するUncaught SyntaxError: missing )
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

    /**
   * メールに記載する情報を格納する変数
   */
    let subject, body, poleNumber, supply, phase;
    let keiyaku, u1, u2, u3, mae, ato, err;
    const sendmail = document.getElementById('mail');
    err = "";

    sendmail.onclick = function() {

        // メールに記載したい情報をhiddenタグから取得
        poleNumber = zenhan( document.getElementById('no').value );
	keiyaku = zenhan( document.getElementById('ks').value );
        supply = zenhan( document.getElementById('kw').value );
	u1 = document.getElementById('unit1').value;
	u2 = document.getElementById('unit2').value;
	u3 = document.getElementById('unit3').value;
	mae = zenhan( document.getElementById('mae').value );
	ato = zenhan( document.getElementById('ato').value );
        phase= document.getElementById('phase').value;

        subject = 'kksk_dafk_供給照会';
        body = poleNumber + ',' + keiyaku + ',' + supply + ',' + u1 + ',' + mae + ',' + u2 + ',' + ato + ',' + u3 + ',' + phase;

	const url = new URL( generate() );
	url.searchParams.set('subject', subject);
	url.searchParams.set('body', body);
	url.toString();

	// 入力エラーチェック
	if(poleNumber == "") {
	    err = err + '引込柱番号を入力してください' + '\n';
	}else if(poleNumber.length != 12) {
	    err = err + '引込柱番号が標準桁数ではありません' + '\n';
	}else if( String(poleNumber).match(/[^0-9]/g) ? true : false ) {
	    err = err + '数字以外の入力があります' + '\n';
	}

	if(supply == "" && (mae == "" || ato == "")){
	    err = err + '容量を入力してください' + '\n';
	}else if(supply != "" && (mae != "" || ato != "")){
	    err = err + '容量入力は新設か増加のいずれかのみにしてください' + '\n';
	}else if( String(supply).match(/[^0-9]/g) ? true : false ) {
	    err = err + '数字以外の入力があります' + '\n';
	}else if( String(mae).match(/[^0-9]/g) ? true : false ) {
	    err = err + '数字以外の入力があります' + '\n';
	}else if( String(ato).match(/[^0-9]/g) ? true : false ) {
	    err = err + '数字以外の入力があります' + '\n';
	}

	if(err != "") {
	    alert(err);
	    err = ""
	}else{
            location.href = url;
	}
    };
};

