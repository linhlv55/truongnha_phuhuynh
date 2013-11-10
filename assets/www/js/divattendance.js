
// read data from ATEENDANCE, and set innerHTMK, conntent-tbody
//
function querySuccessAttendance(tx, results) {

	var len = results.rows.length;
	var lenNew = arrAttendaneSync.length;
	var duyet = 1;
	console.log("ATTENDANCE table: " + len + " rows found.");
	var value="<thead>"+
				"<tr>"+
					"<th>Stt</th>"+
					"<th>Ngày tháng</th>"+
					"<th>Kiểu</th>"+
				"</tr></thead><tbody>";
	for( var i = 0; i < lenNew; i++ ){
		
		var dates = arrAttendaneSync[i].time;
		var day = getDayAttendance( dates );
		value += "<tr><th>" + duyet + "</th>";
		value +="<td><span class='new-attendance-bold'>"+ day + ", " + arrAttendaneSync[i].time + "</span></td>";
		var kt = arrAttendaneSync[i].type;
		
		if( kt == "M" ){
			value +="<td style='color:#00CED1;'>" + "<span class='new-attendance-bold'>Muộn</span>" + "</td>";
		}
		else if(kt =="P"){
			value +="<td style='color:#008000;'>" + "Có phép" + "</td>";
		}
		else if(kt =="K"){
			value +="<td style='color:#DC143C;'>" + "Không phép" + "</td>";
		}
		value +="</tr>";
		duyet++;
	}
	for ( var i=1; i<=len; i++ ){
		var dates = results.rows.item(i-1).t;
		var day = getDayAttendance( dates );
			value += "<tr><th>" + duyet + "</th>";
		value +="<td>"+ day + " ngày " + results.rows.item(i-1).t + "</td>";
		var kt = results.rows.item(i-1).type;
		
		if( kt == "M" ){
			value +="<td style='color:#00CED1;'>" + "Muộn" + "</td>";
		}
		else if(kt =="P"){
			value +="<td style='color:#008000;'>" + "Có phép" + "</td>";
		}
		else if(kt =="K"){
			value +="<td style='color:#DC143C;'>" + "Không phép" + "</td>";
		}
		value +="</tr>";

		console.log(" type = " + results.rows.item(i-1).type + " time =  " + results.rows.item(i-1).t );
		duyet++;
	}
	value+="</tbody>";
	
	document.getElementById("table-attendance").innerHTML=value;
}

// Transaction error callback
//
function errorCBAttendance1(err) {
	console.log("Error processing SQL 1: "+err.code);
}
function errorCBAttendance2(err) {
	console.log("Error processing SQL 2: "+err.code);
}
//---------------------------------------------
function divAttendanceUnload()
{
	arrAttendaneSync = new Array();
	startCreateTableAttendance();
}


