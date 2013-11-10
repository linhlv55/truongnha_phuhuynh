// đọc dữ liệu từ bảng MarkStudent theo môn học nhóm dữ liệu theo môn học
// mở cơ cở dữ liệu bảng MARKSTUDENT
function openCBMarkStudent() {
	var div = document.getElementById('color');
	div.style.display = 'block';
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 2000000);
	db.transaction(queryDBMarkStudent2, errorCBMarkStudent2);
}

function queryDBMarkStudent2(tx) {
	tx.executeSql('SELECT * FROM MARKSTUDENT order by t desc', [], querySuccessMarkStudent2, errorCBMarkStudent1);
	
}
function querySuccessMarkStudent2(tx, results) {
	
	console.log("MARKSTUDENT table: " + len + " rows found.");
	var value;
	var value="<thead>"+
    "<tr>"+
      "<th data-priority='1'>Môn</th>"+
      "<th data-priority='persist'>Điểm</th>"+
    "</tr></thead><tbody>";
	var lenNew = arrMarkSync.length;
	var len = results.rows.length;
	var Object= new Array();
	var Mark = new Array();
	var MarkType = new Array();
	var i,j;
	for(i=0;i < lenNew;i++){
		for(j = i+1; j<lenNew-1; j++){
			var time_i = arrMarkSync[i].t;
			var aTime_i = time_i.split('-');
			var date_i = new Date(aTime_i[0], aTime_i[1]-1, aTime_i[2], aTime_i[3], aTime_i[4]);
			var time_j = arrMarkSync[j].t;
			var aTime_j = time_j.split('-');
			var date_j = new Date(aTime_j[0], aTime_j[1]-1, aTime_j[2], aTime_j[3], aTime_j[4]);
			if(date_i <= date_j){
				var tg = arrMarkSync[i];
				arrMarkSync[i] = arrMarkSync[j];
				arrMarkSync[j] = tg;
				var tg1 = arrNameMarkSync[i];
				arrNameMarkSync[i] = arrNameMarkSync[j];
				arrNameMarkSync[j] = tg1;
				}
				}
				}
	for(i=0; i < lenNew; i++){
		Object[i] = arrNameMarkSync[i];
		Mark[i] =  arrMarkSync[i].m;
		MarkType[i] = arrMarkSync[i].n;
	}
	i=lenNew;
	j=0;
	while(i< len + lenNew){
		Object[i] = results.rows.item(j).nameObject;
		Mark[i] =  results.rows.item(j).m;
		MarkType[i] =  results.rows.item(j).n; 
		i++;
		j++;
		}
	var lenObject = Object.length;
	var check  = lenNew-1;
	for(var i=0; i <lenObject; i++ ){
		value+= "<tr><td>" +  Object[i] + "</td>";
		var diemMieng = "";
		var diem15 = "";
		var diem1Tiet = "";
		var diemThi = "";
		var diemTB = "";
		if(i<check){
			if( MarkType[i] <= 8 )
				diemMieng +="<span class='new-mark-bold'>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i] <=16)
				diem15 +="<span class='new-mark-bold'>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i]<=24)
				diem1Tiet +="<span class='new-mark-bold'>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i]==25)
				diemThi +="<span class='new-mark-bold'>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else
				diemTB +="<span class='new-mark-bold'>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			}
		else{
			if( MarkType[i] <= 8 )
				diemMieng +="<span>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i] <=16)
				diem15 +="<span >" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i]<=24)
				diem1Tiet +="<span >" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else if(MarkType[i]==25)
				diemThi +="<span>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			else
				diemTB +="<span>" + Mark[i]  + "&nbsp;&nbsp;</span>";
			}
		var j = i+1
		while(j< lenObject){
			if(Object[j] == Object[i]){
				if(i<check){
					if( MarkType[j] <= 8 )
						diemMieng +="<span class='new-mark-bold'>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j] <=16)
						diem15 +="<span class='new-mark-bold'>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j]<=24)
						diem1Tiet +="<span class='new-mark-bold'>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j]==25)
						diemThi +="<span class='new-mark-bold'>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else
						diemTB +="<span class='new-mark-bold'>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					check -- ;
					}
				else{
					if( MarkType[j] <= 8 )
						diemMieng +="<span>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j] <=16)
						diem15 +="<span >" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j]<=24)
						diem1Tiet +="<span >" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else if(MarkType[j]==25)
						diemThi +="<span>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					else
						diemTB +="<span>" + Mark[j]  + "&nbsp;&nbsp;</span>";
					}
			Object.splice(j,1);
			Mark.splice(j,1);
			MarkType.splice(j,1);
			j--;
			lenObject--;
			}
			j++;		
			}
		value += "<td>" + "<span style='color:#00CCFF;'>" + diemMieng + "</span><br/>" 
				+ "<span style='color:#00CC00;'>" + diem15 + "</span><br/>" 
				+ "<span style='color:#3333FF;'>" + diem1Tiet + "</span><br/>" 
				+ "<span style='color:#003300;'>" + diemThi + "</span><br/>" 
				+ "<span style='color:#FF0000;'>" + diemTB +  "</span></td></tr>";
		}
	
	document.getElementById("table-div-main").innerHTML=value;
	
}

function queryDBMarkStudentShow(tx) {
	tx.executeSql('SELECT * FROM MARKSTUDENT ', [], querySuccessMarkStudentShow, errorCBMarkStudent1);
        
}
function markTableShow() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBMarkStudentShow, errorCBMarkStudent2);
}

// read data from MARKSTUDENT, and set innerHTML, table-div-main
function querySuccessMarkStudentShow(tx, results) {
	var len = results.rows.length  ;
	for( var j = 0; j < len;  j++){
		console.log("id: " + results.rows.item(j).id + " n: " + results.rows.item(j).n + " nameObject: " + results.rows.item(j).nameObject + " m: " + results.rows.item(j).m + " time: " + results.rows.item(j).t);
	}
}