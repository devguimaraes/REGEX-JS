/*

Alura Udemy - Sobre Regex

Flags REGEX
g - global (encontra todas as ocorrëncias)
i - insensitive (Não busca letras maiusculas)
() - Grupos
$1 - referencia a grupos, o número representa instacia do grupo
| - Ou

Quantificadores

Quantifier

{n}  -  exatamente n vezes
{n, }  -  no minimo n vezes
{n, m}   -   no minimo n+1 vezes, no máximo m vezes


*  -  Zero ou mais vezes
+  - Uma ou mais vezes
?  -  Zero ou uma vez
\ Caracter de escape

[^] - Negacão

*/

const { ips, cpfs, cpfs2 } = require('./base');

const regExp = /[,;-]/;
const arquivo = '100,200-150,200;20';
console.log(arquivo.split(regExp)[0]);
/* console.log(cpfs.match(/(\d{3}[-,.]?){3}[- .]+\d{2}/g)); */

/* const ipRegexExp = /^(\d{1,9}.){3}/g;

for (let i = 0; i <= 255; i += 1) {
	const numeroIps = `${i}.${i}.${i}.${i}`;
	console.log(numeroIps, numeroIps.match(ipRegexExp));
} */

/*
console.log(html.match(/<.+>.+<\/.+>/gi)); // Guloso
console.log(html.match(/<.+?>.+?<\/.+?>/gi)); // Não Guloso */

/* const regexExp2 = /(\.(JPG|jpe?g|png))/gi;
for (const arquivinho of arquivos) {
	if (arquivinho.match(regexExp2)) {
		console.log(arquivinho);
	}
} */

// Exemplo de como fazer referëncia a grupos
/* console.log(
	texto.replace(/(João|Maria|Luiz)/gi, (expRege) => expRege.toUpperCase())
); */
