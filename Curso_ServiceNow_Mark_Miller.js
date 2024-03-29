// Curso Mark Miller - ServiceNow

// SEÇÃO 4 - GlideRecord

// Consulta todos os registros
var incidentGR = new GlideRecord('incident');
incidentGR.query();
while(incidentGR.next()){
	gs.print(incidentGR.number + " " + incidentGR.short_description);
}

// **********************************

// Consulta registros com filtro
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', '1');
incidentGR.query();
while(incidentGR.next()) {
	gs.print('Priority ' + incidentGR.priority + ' incident: ' + incidentGR.number + ' : '
		+ incidentGR.priority.getDisplayValue());
}

// ***************************************

// Consulta um registro específico pelo sys_id
var incidentGR = new GlideRecord('incident');
incidentGR.get('1c832706732023002728660c4cf6a7b9');
gs.print(incidentGR.number + ' has a sys_id of ' + incidentGR.sys_id);


// ***************************************

// Consulta codificada - encoded
var queryString = 'category=inquiry^active=true^opened_by=6816f79cc0a8016401c5a33be04be441';
var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery(queryString);
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number);
}


// *****************************************

// Inserindo um novo registro
var newIncident = new GlideRecord('incident');
newIncident.newRecord();
newIncident.short_description = "This incident was created from a background script";
newIncident.urgency = '2';
var newIncidentSysID = newIncident.insert();
gs.print(newIncidentSysID);


// *****************************************

// Inserindo múltiplos registros
var newIncidents = [];
var counter = 1;
var incidentGR = new GlideRecord('incident');
while(counter <= 5) {
	incidentGR.newRecord();
	if (counter % 2 == 0) {
		incidentGR.urgency = '2';
	} else {
		incidentGR.urgency = '3';
	}
	counter++;
	newIncidents.push(incidentGR.insert());
}

gs.print(newIncidents);


// ******************************************

// Deletando um registro
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('short_description', 'Incident #3');
incidentGR.query();
while(incidentGR.next()) {
	incidentGR.deleteRecord();
}



// ******************************************

// Ordenação ascendente
var incidentGR = new GlideRecord('incident');
incidentGR.orderBy('short_description');
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number + ' : ' + incidentGR.short_description);
}


// ******************************************

// Ordenação descendente
var incidentGR = new GlideRecord('incident');
incidentGR.orderByDesc('short_description');
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number + ' : ' + incidentGR.short_description);
}

// ******************************************

// Limitando registros:
var problemGR = new GlideRecord('problem');
problemGR.setLimit(5);
problemGR.query();
while(problemGR.next()) {
	gs.print(problemGR.number);
}

var problemGR = new GlideRecord('problem');
problemGR.orderBy('short_description');
problemGR.setLimit(5);
problemGR.query();
while(problemGR.next()) {
	gs.print(problemGR.short_description);
}

// ******************************************

// Métodos podeLer, podeEscrever, podeCriar e podeDeletar
var problemGR = new GlideRecord('problem');
problemGR.query();
if(problemGR.canCreate() && problemGR.canRead() && problemGR.canWrite() && problemGR.canDelete()) {
	gs.print('I have access to create, read, write an delete!');
}


// ******************************************

// Obter contagem de linhas getRowCount()
var incidentGR = new GlideRecord('incident');
incidentGR.query();
gs.print(incidentGR.getRowCount());

// ******************************************

// Metodo hasNext() retorna um boleano true, se exite o próximo elemento ou false se não existe
//   porém esse método não itera com o próximo objeto, como no método next();
var incidentGR = new GlideRecord('incident');
incidentGR.query();
if (incidentGR.hasNext()) {
	incidentGR.next();
	gs.print(incidentGR.number);
}

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', 0); // Retorna falso, pois não existe prioridade 0
incidentGR.query();
gs.print(incidentGR.hasNext());


// ******************************************

// Metodo get() 
var incidentGR = new GlideRecord('incident');
incidentGR.get('number', 'INC0009004');
gs.print(incidentGR.number);


// ******************************************

// Metodo getLink() 
var incidentGR = new GlideRecord('incident');
incidentGR.get('number', 'INC0009004');
gs.print(incidentGR.getLink());



// ******************************************

// Metodo deleteMultiple()
// Teste de busca
var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery('short_descriptionSTARTSWITHIncident #');
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.short_description);
}
// Metodo deleteMultiple aplicado
var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery('short_descriptionSTARTSWITHIncident #');
incidentGR.deleteMultiple();


// ******************************************

// Metodo update()
var incidentGR = new GlideRecord('incident');
incidentGR.get('number', 'INC0000019');
incidentGR.urgency = 2;
incidentGR.update();

// Atualizando vários registros - query de teste e update.
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('urgency', 2);
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number);
	// Update
	incidentGR.urgency = 3;
	incidentGR.update();
}


// ******************************************

// Metodo addNullQuery()
var incidentGR = new GlideRecord('incident');
incidentGR.addNullQuery('short_description');
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number);
}


// ******************************************

// Metodo addNotNullQuery()
var incidentGR = new GlideRecord('incident');
incidentGR.addNotNullQuery('short_description');
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number);
}


// ******************************************

// Metodo GlideRecordSecure()
var incidentGRS = new GlideRecordSecure('incident');
incidentGRS.query();
var count = 1;
while(incidentGRS.next()) {
	gs.print(incidentGRS.number + " " +  count);
        count++;
}


// ******************************************

// Metodo GlideAggregate()
var count = new GlideAggregate('incident');
count.addAggregate('COUNT');
count.query();
var incidents = 0;
if (count.next()) {
	incidents = count.getAggregate('COUNT');
        gs.print("Incidents: " + incidents);
}



// ****************************************************************************************


// SEÇÃO 5 - GlideSystem

// Get current user - obter o usuário atual
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('caller_id', gs.getUserID());
incidentGR.query();
while(incidentGR.next()) {
	gs.print(incidentGR.number + " user: " 
		+ incidentGR.caller_id.first_name + " " 
		+ incidentGR.caller_id.last_name);
}


// ***********************************

// Métodos: getUserDisplayName(), getHourOfDayLocalTime() e setTimeZone()
var greetingsMessage = '';
var gt = new GlideTime();
gt.setTimeZone('America/Sao_Paulo');
var currentHour = gt.getHourOfDayLocalTime();

if(currentHour >= 3 && currentHour < 11) {
	greetingsMessage = 'Good morning ';
} else if (currentHour >= 11 && currentHour < 17) {
	greetingsMessage = 'Good afternoon ';
} else {
	greetingsMessage = 'Good evening '
}

greetingsMessage += gs.getUserDisplayName();

gs.print(greetingsMessage + ", it is now " 
	+ currentHour  + "h:" 
	+ gt.getMinutesLocalTime() + "m.");


// *************************************
// Método log recebe dois argumentos, mensagem e a fonte de onde vem o log
gs.log('This is a log message', 'fonte_exemplo');

// Metodo error 
gs.error('This is an error message');

// Metodo warn
gs.warn('This is a warn message');

// Metodo addErrorMessage e addInfoMessage
gs.addInfoMessage('Welcome to ServiceNow 201: Development! This is an info message.');	
gs.addErrorMessage('Welcome to ServiceNow 201: Development! This is an error message.');


// Metodo beginningOfLastMonth
gs.print(gs.beginningOfLastMonth());

// Metodo generateGUID
gs.print(gs.generateGUID());

// Metodo getMessage -- Não consegui usar nos exercícios.
gs.getMessage('Sum');

// Metodo getProperty
gs.print('Hello ' + gs.getProperty('servicenow.201.hello.world'));

// Metodo setProperty
gs.setProperty('servicenow.201.hello.world', 'testing');

// Metodo getUser
gs.print(gs.getUser());

// Metodo getDisplayName
gs.print(gs.getUser().getDisplayName());

// Metodo getFirstName
gs.print(gs.getUser().getFirstName());

// Metodo getLocation
gs.print(gs.getUser().getLocation());

// Metodo getUserRoles
gs.print(gs.getUser().getUserRoles());

// Metodo getUserID
gs.print(gs.getUserID());

// Exemplo de uso do metodo getUserID
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('caller_id', gs.getUserID());
incidentGR.query();
while(incidentGR.next()) {
	gs.print('Incident ' + incidentGR.number);
}

// Metodo getEncodedQuery
var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('caller_id', gs.getUserID());
incidentGR.query();
gs.print(incidentGR.getEncodedQuery());


// Metodo hasRole
if(gs.hasRole('itil') || ga.hasRole('admin')) {
	gs.print('The current user has ITIL or Admin');
}

// Metodo getSession
gs.print(gs.getSession());

// Metodo isLoggedIn(está logado)
gs.print(gs.getSession().isLoggedIn());

// Metodo nil (checa se o valor é vazio)
var incidentGR = new GlideRecord('incident');
incidentGR.query();
while(incidentGR.next()){
		if(gs.nil(incidentGR.short_description)) {
			gs.print('The incident (' + incidentGR.number + 
				') has no short description' + incidentGR.short_description);
	}
}


// Metodo tableExists (verifica se a tabela informada existe)
gs.print(gs.tableExists('incident'));

// Metodo xmlToJSON
var xmlString = '<root><test>Some XML</test><test1>Some more XML</test1></root>';
var json = gs.xmlToJSON(xmlString);
gs.print(json.root.test);
gs.print(json.root.test1);

// eventQueue (fila de eventos)
gs.eventQueue('servicenow.201.hello.world');


// Pegando a hora local.

var gt = new GlideTime();
gt.setTimeZone('America/Sao_Paulo');

gs.print(gt.getLocalDate());
var today = new GlideDateTime(gt.getLocalDate()).getDate();
gs.print(today);
gs.print(today.getLocalTime().getByFormat('hh:mm:ss'));

// ****** Fim da seção 5 *********


// *************************************************************************

// SEÇÃO 6

// Para acessar o executor de código do lado cliente em Servicenow
// 		pressione Ctrl + Shift + J com o navegador aberto.

// Ao pressionar as telas acima em um formulário podemos executar o comando
// 		abaixo para imprimir no console algumas informações do form.
console.dir(g_form);

// Metodo getValue
var fieldValue = g_form.getValue('category');
alert(fieldValue);

// Metodo setValue(field, value)
g_form.setValue('category', 'software');

// Metodo clearValue(field)
g_form.clearValue('category');

// Metodo save
g_form.save();

// Metodo setDisabled(field, false/true)
g_form.setDisabled('category', true);

// Metodos hideRelatedLists() & showRelatedLists()
g_form.hideRelatedLists();

g_form.showRelatedLists();

// Metodo isMandatory(field) and setMandatory
g_form.setMandatory('category', true);
alert(g_form.isMandatory('category'));

// Metodo isNewRecord
var isNewRecord = g_form.isNewRecord();
alert('Is this a new record? ' + (isNewRecord ? 'Yes.' : 'No.'));

// Metodos addInfoMessage() & addErrorMessage()
g_form.addInfoMessage('Hello 201 students!');
g_form.addErrorMessage('Heeeeeeeelp!');

// Metodo clearMessages
g_form.clearMessages();

// Metodo getLabelOf(field)
alert(g_form.getLabelOf('category'));

// Metodo getTableName
var tableName = g_form.getTablaName();
alert('Table: ' + tableName);


// *******************************
// GlideUser Properties
// Metodo de acesso "g_user" -> client-side
alert('Hello ' + g_user.firstName + ' ' + g_user.lastName 
	+ '. Your user ID is: ' + g_user.userID);

// Metodo getFullName
alert('Hello ' + g_user.getFullName());

// Metodo hasRoles
alert('Do you have any roles? ' + g_user.hasRoles());

// Metodo hasRole
alert('Do you have the ITIL role? ' + g_user.hasRole('itil')); // Sempre retornando true - Verificar

// userName property
alert('Your username is: ' + g_user.userName);

// ******* Fim da seção 6 ***********

// *************************************************************
// Seção 7 GlideAjax

// Obs: Script Includes somente podem ser executadas se invocadas a partir de outra fonte.

// Script includes usadas para GlideAjax devem ser marcadas com a caixa de seleção de 
// 	callable do cliente definica como true.

// Usar sempre o parâmetro sysparm_name para chamar o primeiro método em um script include

function onLoad() {
   
   var ga = new GlideAjax('ServiceNow201GlideAjax');
   ga.addParam('sysparm_name', 'sayHello');
   ga.getXML(ajaxProcessor);
   
}


function ajaxProcessor(response) {
	var answer = response.responseXML.documentElement.getAttribute('answer');
	g_form.setValue('short_description', answer);
}

// *****************************************

var ServiceNow201GlideAjax = Class.create();
ServiceNow201GlideAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getIncidentStatus: function() {
		var incidentNumber = this.getParameter('sysparm_incident_number');
		if (!gs.nil(incidentNumber)) {
			var incidentGR = new GlideRecord('incident');
			incidentGR.get('number', incidentNumber);
			return incidentGR.state.getDisplayValue();
		} else {
			return 'No incident was found';
		}
	},

	getLatestIncidents: function() {
		var incidents = [];
		var limit = parseInt(this.getParameter('sysparm_limit'));
		if(!gs.nil(limit) && typeof limit == 'number') {
			var incidentGR = new GlideRecord('incident');
			incidentGR.orderByDesc('sys_created_on');
			incidentGR.setLimit(limit);
			incidentGR.query();
			while(incidentGR.next()) {
				var record = {};
				record.number = incidentGR.number.getDisplayValue();
				record.sysID = incidentGR.sys_id.getDisplayValue();
				record.shortDescription = incidentGR.short_description.getDisplayValue();
				incidents.push(record);
			}
			return new JSON().encode(incidents);
		} else {
			return 'Something \'t right...';
		}
	},


	sayHello: function() {
		return 'Hello world!';
	},
	
    type: 'ServiceNow201GlideAjax'
});


// *********************************************
// UI Page Scripts **********************

// Client script 1
var checkIncident = setInterval(function() {
	processRequest();
}, 5000);

function processRequest() {
	var ga = new GlideAjax('ServiceNow201GlideAjax');
	ga.addParam('sysparm_name', 'getIncidentStatus');
	ga.addParam('sysparm_incident_number', 'INC0010024');
	ga.getXML(ajaxProcessor);
}

function ajaxProcessor(response) {
	var answer = response.responseXML.documentElement.getAttribute('answer');
	console.log('Status: ' + answer);
}

// Client script 2
var ga = new GlideAjax('ServiceNow201GlideAjax');
ga.addParam('sysparm_name', 'getLatestIncidents');
ga.addParam('sysparm_limit', '5');
ga.getXML(ajaxProcessor);

function ajaxProcessor(response) {
	console.log('Response payload: ' + response);
	var answer = response.responseXML.documentElement.getAttribute('answer');
	console.log('Answer: ' + answer);
	var json = answer.evalJSON();
	console.log('JSON: ' + json);
	console.log(json[0].shortDescription);
}


// Função para validar usuário do departamento

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
	// Obtém a referência do usuário
    var usuarioref = g_form.getReference('responsavel_dependencia', comparaIds);
}

// Compara a refêrência do departamento do usuário com a dependência selecionada
function comparaIds(usuarioref) {
    if (!(usuarioref.department === g_form.getValue('unidade_vistoriada'))) {
        g_form.setValue('responsavel_dependencia', null);
        g_form.addErrorMessage('Por favor selecione um funcionário lotado na unidade vistoriada.');
    }
}