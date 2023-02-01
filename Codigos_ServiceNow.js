// inserir registro no ServiceNow

var incidentGR = new GlideRecord('incident');
incidentGR.query();
incidentGR.newRecord();
incidentGR.short_description = 'Test 123 - Aldecir';
incidentGR.insert();


// Consultar registro no ServiceNow

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', '1');
incidentGR.query();
while(incidentGR.next()) {
	// Ler registros
	gs.print(incidentGR.number);
}


// Atualizando um registro

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('priority', '1');
incidentGR.query();
while(incidentGR.next()) {
	// Update records
	if (incidentGR.short_description = 'Test 123 - Aldecir') {
		incidentGR.priority = '2';
		incidentGR.update();	
	}
	
}

// Deletando registro

var incidentGR = new GlideRecord('incident');
incidentGR.addQuery('number', 'INC0010002');
incidentGR.query();
while(incidentGR.next()) {
	incidentGR.deleteRecord();
}


