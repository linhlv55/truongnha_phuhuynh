var tabNewUpdate = 0;
var stateLogin = 0;
var arrMarkSync = new Array(); // array store new mark
var arrNameMarkSync = new Array();
var arrAttendaneSync = new Array(); // array store new attendance

//--------------------------------------

function divSyncLoad()
{
	if(stateLogin == 0 ){
		getDataToDB();
		stateLogin = 1;
	}else
	{
		countUpdate();
	}
}

/**
*  Connect server get mark, attendance
**/

function getDataToDB()
{   
	// lay ra thong tin sinh vien vao cac bien
	getInfo();
	setTimeout( function(){
		var div = document.getElementById('color');
		div.style.display = 'block';
		showMask('Đang tải dữ liệu...');
		if(checkNetwork == 1 ){// co mang thuc hien lay du lieu tu sever
			getMarkJSON();
			console.log("Check network:" + checkNetwork);
		}
		else{
			//successCBMarkStudent();
		}
	},1000);
	
}
/*
* Get json mark, create table MARK STUDENT,read data from table MARK STUDENT  set data html in content
*/
function getMarkJSON()
{
	getInfo();
	var urls= "http://truongnha.com/api/markForAStudent/"+studentId;
	console.log("url: " + urls + "student id:" + studentId);
	$.ajax({// cau lenh ajax POST vs usernam password
		dataType: "json",
		url: urls,
		type: "GET",
		success: function( data){ // get read data from json to database with nameTable MARKSTUDENT
			var myJSONText =  JSON.stringify(data,replacer);
			//console.log( myJSONText);
			jsonMarkStudent=data;
			getAttendanceJson();
		},
		error: function(xhr, textStatus, error){
			alert("Không lấy được dữ liệu, vui lòng kiểm tra kết nối mạng của bạn.");
		}
	});// end ajax
        
}
/*
* Get json attendance from server
*/
function getAttendanceJson()
{
	var urls= "http://truongnha.com/api/getAttendanceForStudent/allYear";
		
		$.ajax({// cau lenh ajax POST vs usernam password
		dataType: "json",
		url: urls,
		type: "GET",
		success: function( data){ 
			var myJSONText = JSON.stringify(data,replacer);
			//console.log(myJSONText);
			jsonAttendance=data;
			syncData();
		},
		error: function(xhr, textStatus, error){
			alert("Erorr get attendance");
		}
	});// end ajax
        
}
// end connect server get data
function syncData()
{
	readDBMarkSync()
}

//----------------------------------------------
// function sysn data in TABLE MARKSTUDENT and TABLE ATTENDANCE results 2 arrays store new data
function readDBMarkSync()
{
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBMarkSync, errorDBMarkSync);
}

function queryDBMarkSync(tx) {
	tx.executeSql('SELECT * FROM MARKSTUDENT ', [], querySuccessMarkSync, errorDBMarkSync);
}

function querySuccessMarkSync(tx, results)
{
	arrMarkSync = new Array();
	var len = results.rows.length;
	var dem = 0;// tang cac gia tri cho mang luu
	var demDB = 0;//  bien dem duyet cac phan tu trong results
	if( len > 0)
	{
		for( var i in jsonMarkStudent )
		{
			// duyet diem cua tung mon
			for( var j in jsonMarkStudent[i].mark)
			{
				if(results.rows.item(demDB).n != jsonMarkStudent[i].mark[j].n){
					arrMarkSync[dem] = jsonMarkStudent[i].mark[j];
					arrNameMarkSync[dem] = jsonMarkStudent[i].name;
					
					dem++;
				}else{
					demDB++;
				}
			}	
		}
	}
	else
	{
		for( var i in jsonMarkStudent )
		{
			for( var j in jsonMarkStudent[i].mark)
			{
				arrMarkSync[dem] = jsonMarkStudent[i].mark[j];
				arrNameMarkSync[dem] = jsonMarkStudent[i].name;
				dem++;
			}	
		}
	}
	//console.log("Khac nhau mark: " + arrMarkSync.length );
	for( var i = 0; i < arrMarkSync.length; i++ )
		console.log( arrNameMarkSync[i] + "  " + arrMarkSync[i].t + "  " + arrMarkSync[i].m);
	//------------------------
	readDBAtendance();
}
function errorDBMarkSync()
{
	console.log("Sync Mark error" );
}
//---------------------------------------------------------------------
function readDBAtendance()
{
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBAttendanceSync, errorDBAttendanceSync);
}

function queryDBAttendanceSync(tx) {
	tx.executeSql('SELECT * FROM ATTENDANCE ', [], querySuccessAttendanceSync, errorDBAttendanceSync);
}

function querySuccessAttendanceSync(tx, results)
{
	console.log("Do dai: " + jsonAttendance.length );
	arrAttendaneSync = new Array();
	var newA = jsonAttendance.length - results.rows.length;
	var dem = 0;
	for( var i = 0; i < newA; i++ )
	{
		arrAttendaneSync[i] = jsonAttendance[i];
	}
	console.log("Khac nhau attendance: " + arrMarkSync.length );
	countUpdate();
}

function errorDBAttendanceSync( err)
{
	console.log("Sync Attendance error: " + err.code );
}
//------------------------------------------
// funciton update UI, total new update to thong tin moi
function countUpdate()
{
	// cap nhat du lieu moi len phan tin moi
	document.getElementById("count_new_mark").innerHTML = arrMarkSync.length;
	document.getElementById("count_new_attendance").innerHTML = arrAttendaneSync.length;
}





