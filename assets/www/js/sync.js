
// read data from table MARKSTUDENT to sync
function readDBTableMARKSTUDENT(tx) {
	tx.executeSql('SELECT * FROM MARKSTUDENT order by t desc', [], querySuccessMARKSTUDENT, errorCBMARKSTUDENT);
	
}

// read data from MARKSTUDENT, and set innerHTML, table-custom-2
function querySuccessMARKSTUDENT(tx, results) {
	var len = results.rows.length  ;
	console.log("MARKSTUDENT table: " + len + " rows found.");
	
	for (var i=0; i<len; i++){
		
	}
}

function sortDataJson()
{
	var arrayJson = new Array();
	var k = 0;
	for (var i in jsonMarkStudent){
		for( var j in jsonMarkStudent[i].mark)
		{
			arrayJson[k] = jsonMarkStudent[i];
			k++
		}
		k++;
	}// end for 
}