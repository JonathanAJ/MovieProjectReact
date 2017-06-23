'use-strict';

export const formatDate = (dateStrig) => {

	if (dateStrig === null || dateStrig === undefined)
		return "";

	const d = new Date(Date.parse(dateStrig));
	
	/* Format DATE*/
	
	let mes = String(d.getMonth() + 1);
	let dia = String(d.getDate());
	let horas = String(d.getHours());
	let minutos = String(d.getMinutes());
	const ano = String(d.getFullYear()).slice(2);

	if (mes.length < 2) mes = '0' + mes;
	if (dia.length < 2) dia = '0' + dia;
	if (horas.length < 2) horas = '0' + horas;
	if (minutos.length < 2) minutos = '0' + minutos;

	/* Create Dates Compare*/

	const hoje = new Date();
	hoje.setHours(0, 0);

	const ontem = new Date();
	ontem.setDate(hoje.getDate() - 1);
	ontem.setHours(0, 0);

	/* Init Compare*/

	let dateFormat;

	//console.log("hoje", hoje);
	//console.log("ontem", ontem);
	//console.log("d", d);

	if(d < ontem)
		dateFormat = dia + "/" + mes + "/" + ano;
	else if(d < hoje)
		dateFormat = 'ONTEM';
	else
		dateFormat = horas + ":" + minutos;

	return dateFormat;
};