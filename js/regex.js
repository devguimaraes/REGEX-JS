/* eslint-disable no-underscore-dangle */
function executa(event) {
	event.preventDefault();

	limparResultados();
	const valores = pegaValoresDoForm();

	const resultados = executaRegex(valores);

	imprimeResultadoNoInput(resultados);
	highlightResultados(resultados, valores.target);
}

function executaRegex(valores) {
	const textoPattern = valores.pattern; // montaPatternDeDataMaisLegivel();
	const textoTarget = valores.target;
	const { mostraIndex } = valores;
	const { mostraGrupos } = valores;

	const resultados = [];
	let resultado = null;

	const objetoRegex = new RegExp(textoPattern, 'g');

	while ((resultado = objetoRegex.exec(textoTarget))) {
		if (resultado[0] === '') {
			throw Error('Regex retornou valor vazio.');
		}

		console.log(`Resultado: ${resultado[0]}`);

		resultados.push(
			geraResultado(
				mostraGrupos ? resultado.join(' ||| ') : resultado[0],
				resultado.index,
				objetoRegex.lastIndex,
				mostraIndex
			)
		);
	}

	logaTempoDeExecucao(textoPattern, textoTarget);

	return resultados;
}

function geraResultado(resultado, index, lastIndex, mostraIndex) {
	const textoIndex = mostraIndex ? ` [${index}-${lastIndex}]` : '';

	return {
		resultado: resultado + textoIndex,
		index,
		lastIndex,
	};
}

function logaTempoDeExecucao(textoPattern, textoTarget) {
	const pObjetoRegex = new RegExp(textoPattern, 'g');
	const ini = performance.now();
	pObjetoRegex.test(textoTarget);
	const fim = performance.now();
	console.log(`Tempo de execução (ms) ${fim - ini}`);
}

function imprimeResultadoNoInput(resultados) {
	const inputResultado = document.querySelector('#resultado');
	const labelResultado = document.querySelector('#labelResultados');

	labelResultado.innerHTML = `${resultados.length} Matches (resultados)`;

	const resultadosComoArray = resultados.map((item) => item.resultado);

	labelResultado.innerHTML = `${resultadosComoArray.length} Matches (resultados)`;

	if (resultadosComoArray.length > 0) {
		inputResultado.value = resultadosComoArray.join(' | ');
		inputResultado.style.borderStyle = 'solid';
		inputResultado.style.borderColor = 'lime'; // verde
	} else {
		inputResultado.placeholder = 'Sem matches (resultados)';
		inputResultado.value = '';
		inputResultado.style.borderStyle = 'solid';
		inputResultado.style.borderColor = 'red';
	}
}

function highlightResultados(resultados, texto) {
	let item = null;
	let indexBegin = 0;
	let conteudo = '';

	while ((item = resultados.shift()) != null) {
		conteudo += semHighlight(
			escapeHtml(texto.substring(indexBegin, item.index))
		);
		conteudo += comHighlight(
			escapeHtml(texto.substring(item.index, item.lastIndex))
		);
		indexBegin = item.lastIndex;
	}

	// sobrou algum texto?
	if (texto.length - indexBegin > 0) {
		conteudo += semHighlight(
			escapeHtml(texto.substring(indexBegin, texto.length))
		);
	}

	document.querySelector('#highlightText').innerHTML = conteudo;
}

function semHighlight(texto) {
	return texto;
	// return "<s>" + texto + "</s>";
}

function comHighlight(texto) {
	return `<span class='bg-primary'>${texto}</span>`;
}

function escapeHtml(string) {
	return string
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function pegaValoresDoForm() {
	const inputTarget = document.querySelector('#target');
	const inputPattern = document.querySelector('#pattern');
	inputPattern.focus();

	const checkboxIndex = document.querySelector('#mostraIndex');
	const checkboxGroups = document.querySelector('#mostraGrupos');

	_verifiqueInputs(inputTarget, inputPattern);

	console.log(`Target:  ${inputTarget.value}`);
	console.log(`Pattern: ${inputPattern.value.trim()}`);

	return {
		target: inputTarget.value.trim(),
		pattern: inputPattern.value,
		mostraIndex: checkboxIndex.checked,
		mostraGrupos: checkboxGroups.checked,
	};
}

function _verifiqueInputs(inputTarget, inputPattern) {
	if (!inputTarget.value) {
		inputTarget.placeholder = 'Digite um target';
	}

	if (!inputPattern.value) {
		inputPattern.placeholder = 'Digite um pattern';
	}

	if (!inputTarget.value || !inputPattern.value) {
		throw Error('Valores invalidos');
	}
}

const limparResultados = () => {
	console.clear();
	document.querySelector('#labelResultados').innerHTML =
		'0 Matches (resultados)';
	document.querySelector('#resultado').value = '';
	document.querySelector('#resultado').placeholder = 'sem resultado';
	document.querySelector('#highlightText').innerHTML = '<em>sem resultado</em>';
};

const montaPatternDeDataMaisLegivel = () => {
	const DIA = '[0123]?\\d';
	const _DE_ = '\\s+(de )?\\s*';
	const MES = '[A-Za-z][a-zç]{3,8}';
	const ANO = '[12]\\d{3}';
	return DIA + _DE_ + MES + _DE_ + ANO;
};
