# Modulo de estudos de REGEX com JavaScript

Uma expressão regular, ou Regex, são padrões utilizados para identificar determinadas combinações ou cadeias de caracteres em uma string. Ela faz parte do dia a dia de todos os programadores e administradores de infra. Por meio dela, podemos validar a entrada de usuários ou encontrar alguma informação em logs, documentação ou saída de comando.

<h2>REGEX</h2>

Quantifier

{ n } - exatamente n vezes <br>
{ n, } - no minimo n vezes <br>
{ n, m } - no minimo n+1 vezes, no máximo m vezes<br>

( ? ) - Zero ou uma vez

( - ) - Zero ou mais vezes

( \* ) - Uma uma ou mais vezes

<h2>Classes de Char</h2>

[A-Z] - Letras de A até Z<br>
[123] - 12, ou 3<br>
\d - Todos os digitos [0,9]<br>
\s - Whitespace<br>
\w - Wordchar [A-Za-z0-9]<br>

<h2>Ancoras</h2>
^ - pega o inicio da expressão. <br>
ˋˋˋ
exe:
file://caminhorelativo;
const regex = ^file (o retorno será apenas file)

ˋˋˋ

$ - pega o final de uma exressão <br>

\b expressaao \b - pega a expressao que está entre as ancoras de b
