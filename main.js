let btnProperties = document.getElementById("properties");
let btnCutSpaces = document.getElementById("cutSpaces");
let btnDelText = document.getElementById("delText");
let btnMesclarText = document.getElementById("mesclarText");
let btnUpper = document.getElementById("upper");
let btnLower = document.getElementById("lower");
let btnCopy = document.getElementById("copy");
let btnCifra = document.getElementById("cifra");

let textarea = document.getElementById("textVal");

let inputNumLetters = document.getElementById("numChar");
let inputNumSpaces = document.getElementById("numSpaces");
let inputNumWords = document.getElementById("numWords");

btnProperties.addEventListener("click", () => {
	getProps();
});

btnCutSpaces.addEventListener("click", () => {
	let text = textarea.value;
	textNoSpaces = cutSpaces(text);
	let num = numCharSpacesWords(textNoSpaces);

	inputNumSpaces.value = `N° de Espaços: ${num.numSpaces}`;
	inputNumWords.value = `N° de Palavras: ${num.numWords}`;

  textarea.value = textNoSpaces;
});

btnDelText.addEventListener("click", () => {
	delText();
});

btnUpper.addEventListener("click", () => {
	textarea.value = textarea.value.toUpperCase();
});

btnLower.addEventListener("click", () => {
	textarea.value = textarea.value.toLowerCase();
});

btnMesclarText.addEventListener("click", () => {
  let text = textarea.value;
  text = text.toUpperCase();

  text = text.replace(/O/g, '0');
  text = text.replace(/I/g, '1');
  text = text.replace(/E/g, '3');
  text = text.replace(/A/g, '4');
  text = text.replace(/S/g, '5');

  textarea.value = text;
});

btnCopy.addEventListener("click", () => {
  textarea.select();
  document.execCommand("Copy");

  let msg = document.querySelector("#msg-copy");
  msg.style.visibility = 'visible';

  setTimeout(function(){ 
    msg.style.visibility = 'hidden';
  }, 3000);
});

btnCifra.addEventListener("click", () => {
  let key_cifra = Number(document.querySelector("#chave").value);
  cifraCesar(key_cifra);
});


function getProps(){
  let text = textarea.value;
  let num = numCharSpacesWords(text);

  inputNumLetters.innerHTML = `${num.numChar}`;
  inputNumWords.innerHTML = `${num.numWords}`;
  inputNumSpaces.innerHTML = `${num.numSpaces}`;
}

function numCharSpacesWords(text){
	let palavras = text.split(' ');
	let numChar = 0;
	let numWords = 0;
	let words = [];
  let lenghtNome = 0;
  let cont = 0;

  palavras.forEach(palavra => {
  	palavra.replace(/ /g, '');

  	if(palavra == ''){
  		cont++;
  	}

  	words.push(palavra);
    numChar += palavra.length;
  });

  numWords = words.length - cont;

  numAllCharacters = text.length;
  let numSpaces = numAllCharacters - numChar;

  return {
  	numChar: numChar,
  	numSpaces: numSpaces,
  	numWords: numWords,
  }
}

function cutSpaces(text){
 	let palavra_s = text.replace(/ /g, '');

  return palavra_s;
}

function delText(){
	textarea.value = '';
}

$(document).ready(function(){

  $(window).scroll(function(){
    if($(this).scrollTop() > 40){
      $('#topBtn').fadeIn();
    } else{
      $('#topBtn').fadeOut();
    }
  });
});

function cifraCesar(key = 0){
  let alf = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let chave = key;
  let text = textarea.value;
  let newText = '';
  let letra;
  let newIndice;

  text = text.toLowerCase();
  text = text.replace(/ /g, '#');

  for(let n = 0; n < text.length; n++){
    if(text[n] == '#'){
      newText += ` `;
    }else{
      for(let i = 0; i < alf.length; i++){
      if(text[n] == alf[i]){
        newIndice = key + i;
        if(newIndice <= 25 && newIndice >= 0){
          newText += `${alf[newIndice]}`;
        }else if(newIndice < 0){
          newIndice = newIndice + 26;
          newText += `${alf[newIndice]}`;
        }else{
          newIndice = newIndice - 26;
          newText += `${alf[newIndice]}`;
        }
      }
    }
    }
  }
  
  textarea.value = newText;
}