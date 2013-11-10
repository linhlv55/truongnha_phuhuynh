function divMarkLoad()
{
	getInfo();
	setTimeout(function () {
		successCBMarkStudent();
		console.log("TU DONG");
	},1000);
}

function divMarkUnload()
{
	arrNameMarkSync = new Array();
	arrMarkSync = new Array();
	startCreateTableMarkStudent();
	
}
function sysnData()
{
	// dat trang thai man hinh dang xet la sync
	state_screen = 1;
}


function successCBMarkStudent() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBMarkStudent, errorCBMarkStudent2);
}
function queryDBMarkStudent(tx) {
	tx.executeSql('SELECT * FROM MARKSTUDENT order by t desc', [], querySuccessMarkStudent, errorCBMarkStudent1);
}
// read data from MARKSTUDENT, and set innerHTML, table-div-main
function querySuccessMarkStudent(tx, results) {
	var len = results.rows.length  ;
	var lenNew = arrMarkSync.length ;
	var duyet = 1;
	//console.log("MARKSTUDENT table: " + len + " rows found.");
	
	//tao bang
	var value="<thead>"+
		"<tr>"+
		  "<th>Ngày tháng</th>"+
		  "<th>Môn</th>"+
		  "<th>Điểm</th>"+
		"</tr></thead><tbody>";
		console.log("sys:", lenNew);
	if(lenNew>0){
	var i,j;
		for(i=0;i < lenNew;i++)
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
					
		
	var arrTimeNew = arrMarkSync[0].t;
			var pre_timeNew = arrTimeNew[6] + arrTimeNew[7]
						+ "/" + arrTimeNew[3] + arrTimeNew[4] + "/20" + arrTimeNew[0] + arrTimeNew[1];
	var p=0; // biến p lấy mốc giá trị của vòng lặp trước
	var l=0; // biến l đếm số điểm có trong 1 ngày
	while(l<lenNew){
		var arrTimeNew = arrMarkSync[l].t;
		var timeNew = arrTimeNew[6] + arrTimeNew[7]
						+ "/" + arrTimeNew[3] + arrTimeNew[4] + "/20" + arrTimeNew[0] + arrTimeNew[1];
		if( timeNew == pre_timeNew && l!=lenNew-1){
				l++;
		}
		else{
		//đoạn code gán tên môn học, điểm, và loại điểm trong 1 ngày thành 3 mảng khác nhau
			if(l == lenNew-1) l = l+1;
			var g = 0;
			var ObjectNew = new Array();
			var MarkNew = new Array();
			var MarkTypeNew = new Array();
			for ( var j=p; j<l; j++){       
							ObjectNew[g] = arrNameMarkSync[j];
							MarkNew[g] =  arrMarkSync[j].m;
							MarkTypeNew[g] = arrMarkSync[j].n;
							g++;                    
			}			
			//đoạn code gán tên môn học và điểm thành 1 mảng chứa tên môn học và 1 mảng chứa các điểm của môn học đó
			var ArrayLengNew = MarkNew.length;
			var n = 0;
			var ObjectSortNew = new Array();
			var MarkSortNew = new Array();
			var k=0;
			for(var k=0;k< ArrayLengNew;k++){
				var StringKt = "";
				ObjectSortNew[n] = ObjectNew[k];
				MarkSortNew[n] = "";
				if( MarkTypeNew[k] <= 8 )
						MarkSortNew[n] +="<span class='new-mark-bold' style='color:#00CCFF;'>" + MarkNew[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkTypeNew[k] <=16)
						MarkSortNew[n] +="<span class='new-mark-bold' style='color:#00CC00'>" + MarkNew[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkTypeNew[k]<=24)
						MarkSortNew[n] +="<span class='new-mark-bold' style='color:#3333FF;'>" + MarkNew[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkTypeNew[k]==25)
						MarkSortNew[n] +="<span class='new-mark-bold' style='color:#003300;'>" + MarkNew[k]  + "&nbsp;&nbsp;</span>";
				else
						StringKt +="<span class='new-mark-bold' style='color:#FF0000;'>" + MarkNew[k]  + "&nbsp;&nbsp;</span>";
				var h=k+1;
				while(h< ArrayLengNew){
					
					if( ObjectSortNew[n] == ObjectNew[h] ){
						if( MarkTypeNew[h] <= 8 )
								MarkSortNew[n] +="<span class='new-mark-bold' style='color:#00CCFF;'>" + MarkNew[h]  + "&nbsp;&nbsp;</span>";
						else if(MarkTypeNew[h] <=16)
								MarkSortNew[n] +="<span class='new-mark-bold' style='color:#00CC00'>" + MarkNew[h] + "&nbsp;&nbsp;</span>";
						else if(MarkTypeNew[h]<=24)
								MarkSortNew[n] +="<span class='new-mark-bold' style='color:#3333FF;'>" + MarkNew[h] + "&nbsp;&nbsp;</span>";
						else if(MarkTypeNew[h]==25)
								MarkSortNew[n] +="<span class='new-mark-bold' style='color:#003300;'>" + MarkNew[h] + "&nbsp;&nbsp;</span>";
						else
								StringKt +="<span class='new-mark-bold' style='color:#FF0000;'>" + MarkNew[h] + "&nbsp;&nbsp;</span>";
						ObjectNew.splice(h,1);
						MarkNew.splice(h,1);
						MarkTypeNew.splice(h,1);
						h--;
						ArrayLengNew--;
					}
					h++;
						
				}
				MarkSortNew[n] += StringKt;
				n++;
				//k++;
			}
     
			value += "<tr><td class='new-mark-bold' rowspan='" + ObjectSortNew.length + "'>" + pre_timeNew + "</td>";
			var ktFirst = 0;
			for( var dem=0; dem < ObjectSortNew.length; dem++){
				if (ktFirst ==0){
					value += "<td class='new-mark-bold'>"+  ObjectSortNew[dem] + "</td>" + "<td>" + MarkSortNew[dem] + "</td></tr>";    
					ktFirst =1 ;
				}else{
					value += "<tr><td class='new-mark-bold'>" + ObjectSortNew[dem] + "</td>" + "<td>" + MarkSortNew[dem] + "</td></tr>";        
				}
			}                                       
			value +="</tr>";
			p = l;
			pre_timeNew = timeNew ;
			l++;
		}
	}
	}
	if(len>0){
	var arrTime = results.rows.item(0).t;
		var pre_time = arrTime[6] + arrTime[7]
						+ "/" + arrTime[3] + arrTime[4] + "/20" + arrTime[0] + arrTime[1];
	var p=0; // biến p lấy mốc giá trị của vòng lặp trước
	var l=0; // biến l đếm số điểm có trong 1 ngày
	while(l<len){
		var arrTime = results.rows.item(l).t;
		var time = arrTime[6] + arrTime[7]
						+ "/" + arrTime[3] + arrTime[4] + "/20" + arrTime[0] + arrTime[1];
		if( time == pre_time && l!=len-1){
				l++;
		}
		else{
		//đoạn code gán tên môn học, điểm, và loại điểm trong 1 ngày thành 3 mảng khác nhau
			var g = 0;
			var Object = new Array();
			var Mark = new Array();
			var MarkType = new Array();
			for ( var j=p; j<l; j++){       
							Object[g] = results.rows.item(j).nameObject;
							Mark[g] =  results.rows.item(j).m;
							MarkType[g] = results.rows.item(j).n;
							g++;                    
			}			
			//đoạn code gán tên môn học và điểm thành 1 mảng chứa tên môn học và 1 mảng chứa các điểm của môn học đó
			var ArrayLeng = Object.length;
			var n = 0;
			var ObjectSort = new Array();
			var MarkSort = new Array();
			var k=0;
			for(var k=0;k< ArrayLeng;k++){
				var StringKt = "";
				ObjectSort[n] = Object[k];
				MarkSort[n] = "";
				if( MarkType[k] <= 8 )
						MarkSort[n] +="<span style='color:#00CCFF;'>" + Mark[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkType[k] <=16)
						MarkSort[n] +="<span style='color:#00CC00'>" + Mark[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkType[k]<=24)
						MarkSort[n] +="<span style='color:#3333FF;'>" + Mark[k]  + "&nbsp;&nbsp;</span>";
				else if(MarkType[k]==25)
						MarkSort[n] +="<span style='color:#003300;'>" + Mark[k]  + "&nbsp;&nbsp;</span>";
				else
						StringKt +="<span style='color:#FF0000;'>" + Mark[k]  + "&nbsp;&nbsp;</span>";
				var h=k+1;
				while(h< ArrayLeng){
					
					if( ObjectSort[n] == Object[h] ){
						if( MarkType[h] <= 8 )
								MarkSort[n] +="<span style='color:#00CCFF;'>" + Mark[h]  + "&nbsp;&nbsp;</span>";
						else if(MarkType[h] <=16)
								MarkSort[n] +="<span style='color:#00CC00'>" + Mark[h] + "&nbsp;&nbsp;</span>";
						else if(MarkType[h]<=24)
								MarkSort[n] +="<span style='color:#3333FF;'>" + Mark[h] + "&nbsp;&nbsp;</span>";
						else if(MarkType[h]==25)
								MarkSort[n] +="<span style='color:#003300;'>" + Mark[h] + "&nbsp;&nbsp;</span>";
						else
								StringKt +="<span style='color:#FF0000;'>" + Mark[h] + "&nbsp;&nbsp;</span>";
						Object.splice(h,1);
						Mark.splice(h,1);
						MarkType.splice(h,1);
						h--;
						ArrayLeng--;
					}
					h++;
						
				}
				MarkSort[n] += StringKt;
				n++;
				//k++;
			}
     
			value += "<tr><td rowspan='" + ObjectSort.length + "'>" + pre_time + "</td>";
			var ktFirst = 0;
			for( var dem=0; dem < ObjectSort.length; dem++){
				if (ktFirst ==0){
					value += "<td>"+  ObjectSort[dem] + "</td>" + "<td>" + MarkSort[dem] + "</td></tr>";    
					ktFirst =1 ;
				}else{
					value += "<tr><td>" + ObjectSort[dem] + "</td>" + "<td>" + MarkSort[dem] + "</td></tr>";        
				}
			}                                       
			value +="</tr>";
			p = l;
			pre_time = time ;
			l++;
		}
	}
	}
	value+="</tbody>";
	document.getElementById("table-div-main").innerHTML=value;
	//hideMask();
}

// Transaction error callback
//
function errorCBMarkStudent1(err) {
	console.log("Error processing SQL 1: "+err.code);
}
function errorCBMarkStudent2(err) {
	console.log("Error processing SQL 2: "+err.code);
}


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