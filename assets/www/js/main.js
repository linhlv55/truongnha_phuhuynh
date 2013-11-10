checkNetwork=1;// check state connect network
arrayTimeAttend="";
arrayTypeAttend="";
checkUser="";
token="";
school="";
studentId="";
birth="";
firstName="";
lastName="";
typeUser=""
userId="";;
classUser="";
jsonMarkStudent="";
jsonAttendance="";

state_screen="";
stateTabShow=0;
// function conver object json to string
function replacer(key, value) {
	if (typeof value === 'number' && !isFinite(value)) {
		return String(value);
	}
	return value;
}

//-------------------------------------------------------------------------------------
/**
**      // Cac ham xu ly tao co so du lieu
**/
//--------------------------------------------------------------------------------------
function storeUserInfo() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(populateUserInfo, errorUserInfo, successUserInfo);
}
function errorUserInfo(err) {
	console.log("Error processing SQL: "+err.code);
}
// Query the success callback

// create table USER
function populateUserInfo(tx) {
	tx.executeSql('DROP TABLE IF EXISTS USER');
	tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, school text,studentId text, birth text, firstName text, lastName text , typeUser text, userId text,classUser text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MARKSTUDENT (id int,isComment text, nameObject text,m text, t DATETIME,n int)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ATTENDANCE (type text,t text)');
	tx.executeSql('INSERT INTO USER (id, school,studentId,birth, firstName, lastName,typeUser, userId,classUser) VALUES (1, "' + school+'","' + studentId + '","' + birth +'","'+ firstName + '","'+ 
	lastName + '","' + typeUser + '","' + userId+ '","' + classUser+ '")');
}

function successUserInfo() {	
	console.log("Succeess: create User")
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryUser, errorOpenUser);
}

function errorOpenUser()
{
	console.log("Error while save info user");
}
// Query the database
//
function queryUser(tx) {
	tx.executeSql('SELECT * FROM USER', [], querySuccessUser, errorOpenUser);
}
// Transaction error callback
//

function querySuccessUser(tx, results) {
	var len = results.rows.length;
	console.log("USER table: " + len + " rows found.");
	for (var i=0; i<len; i++){
		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " School =  " + results.rows.item(i).school + 
		" User ID: " + results.rows.item(i).userId + " Student Id = " + results.rows.item(i).studentId + " User class = " 
		+ results.rows.item(i).userId + " Type = " + results.rows.item(i).type);
	}
	$.ui.loadContent('div_dongbo',false,false,'up');
}

// Display profile user in 
function displayProfileUser()
{
	window.location.assign("profile.html");
}

//---------
// Hiển thị progess
 function showMask(text) {

	$.ui.showMask(text);
	window.setTimeout(function () {
			$.ui.hideMask();
	}, 800);
}
      
/*
*    Create table store data in json markfordent and read data from table data set data in content
*/
function startCreateTableMarkStudent() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(createTableMarkStudent, errorCBMarkStudent1 );
}
// create table MARKSTUDENT
function createTableMarkStudent(tx) {
	tx.executeSql('DROP TABLE IF EXISTS MARKSTUDENT');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MARKSTUDENT (id int,isComment text, nameObject text,m text, t DATETIME,n int)');
	
	// loop to read data from jsonObject to create table
	for (var i in jsonMarkStudent){
		for( var j in jsonMarkStudent[i].mark)
		{
			tx.executeSql('INSERT INTO MARKSTUDENT (id, isComment,nameObject,m,t,n) VALUES ('+jsonMarkStudent[i].id+',"'+jsonMarkStudent[i].isComment+'","'+jsonMarkStudent[i].name+'","'+jsonMarkStudent[i].mark[j].m+'","'+jsonMarkStudent[i].mark[j].t+'",'+jsonMarkStudent[i].mark[j].n+')');
		}
	}// end for 
        
}// end create table MARKSTUDENT

/*------------------------------------------------------------------------------------------------------------------------
*	read data to TABLE ATTENDANCE
*/
function startCreateTableAttendance() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(createTableAttendance, errorCBAttendance1);
}
// create table ATTENDANCE
function createTableAttendance(tx) {
	tx.executeSql('DROP TABLE IF EXISTS ATTENDANCE');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ATTENDANCE (type text,t text)');
	
	// loop to read data from jsonObject to create table
	for (var i in jsonAttendance){
		tx.executeSql('INSERT INTO ATTENDANCE (type, t) VALUES ("'+jsonAttendance[i].type+'","'+jsonAttendance[i].time+'")');
	}// end for 
        
}// end create table ATTENDANCE

// Transaction success callback
//
function successCBAttendance() {
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBAttendance, errorCBAttendance2);
}//

function queryDBAttendance(tx) {
	tx.executeSql('SELECT * FROM ATTENDANCE', [], querySuccessAttendance, errorCBAttendance1);
}


function Attendance()
{
	var div = document.getElementById('color');
    div.style.display = 'none';
	showMask('Đang tải dữ liệu...');
	if(checkNetwork == true)
		getAttendanceJson();
	else
		successCBAttendance();
}

//===========================================================================================
// Check data user
// lấy dữ liệu bảng  USER

function getInfo()
{
	console.log("start get info");
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(queryDBDemo, errorCBDemo);
}

function queryDBDemo(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, school text,userId text, studentId text,classUser text, type text)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MARKSTUDENT (id int,isComment text, nameObject text,m text, t DATETIME,n int)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ATTENDANCE (type text,t text)');
	tx.executeSql('SELECT * FROM USER', [], querySuccessDemo, errorCBDemo1);
}

function errorCBDemo(err)
{
	console.log("Error processing USER : "+err.code);
}
function errorCBDemo1()
{
	console.log("Error  open DB demo getData");
	checkUser = 0;
}

function querySuccessDemo(tx, results)
{
	var len = results.rows.length;
	if(len>0){
		checkUser = 1;
		console.log("Check user: ",checkUser);
		school=results.rows.item(0).school;
		userId=results.rows.item(0).userId;
		studentId=results.rows.item(0).studentId;
		classUser=results.rows.item(0).classUser;
		typeUser=results.rows.item(0).type;
	}
	else{
		checkUser = 0;
		console.log("Not exist user");
	}
}

//-----------------
function displayInfo()
{
	console.log("School: " + school + "  UserId: " + userId + " Student ID: " + studentId + " classUser: " + classUser + " Type: " + typeUser );
}
/**
*    Xóa dữ liệu người dùng
**/
function deleteDataUser()
{
	var db = window.openDatabase("Database", "1.0", "Truong nha", 200000);
	db.transaction(deleteDb, errorDeleteInfo, successDeleteInfo);
}

function deleteDb(tx) {
	tx.executeSql('DROP TABLE IF EXISTS USER');
	tx.executeSql('DROP TABLE IF EXISTS MARKSTUDENT');
	tx.executeSql('DROP TABLE IF EXISTS ATTENDANCE');
}
        
function errorDeleteInfo(err)
{
	console.log("Error delete info user" + err.code);
	// khong co du lieu sinh vien trong bang chuyen toi 
	window.location.assign("#div_login");
	window.location.reload(true);
}
function successDeleteInfo()
{       
	//      go to div div_login
	window.location.assign("#div_login");
	window.location.reload(true);
	console.log("OK");
}

/**
*    Kiểm tra kết nối mạng
**/

function checkConnection() {
        
	var networkState = navigator.network.connection.type;
	if(networkState == Connection.NONE)
	{
		checkNetwork = 0;
		console.log("Check type connect: " + networkState);
	}else{
		checkNetwork = 1;
		console.log("Check type connect: " + networkState);
	}
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	console.log('Connection type: ' + states[networkState]);
        
}

//-----------------------------------------------------
// show information student
function readProfile(tx)
{
	tx.executeSql('Select * from USER',[],display,errorDB);
}

function display(tx, results)
{
	var len = results.rows.length;
	console.log("USER table: " + len + " rows found.");
	for (var i=0; i<len; i++){
		school = results.rows.item(i).school;
		userId= results.rows.item(i).userId;
		birth= results.rows.item(i).birth;
		classUser = results.rows.item(i).classUser;
		firstName = results.rows.item(i).firstName;
		lastName = results.rows.item(i).lastName;
		typeUser = results.rows.item(i).type;
		console.log(" School =  " + school + " User ID: " + userId + " Student Id = " + studentId + " User class = " 
		+classUser + " Type = " + typeUser);
	}
	var value = 
		"<tr>" + 
			"<td>" + "Trường học" + "</td>" + "<td>"+school+"</td>" + 
		"</tr>" + 
		"<tr>" + 
			"<td>" + "Họ tên" + "</td>" + "<td>"+firstName+" "+lastName+"</td>" + 
		"</tr>" +
		"<tr>" +
			"<td>" + "Ngày Sinh" + "</td>" + "<td>"+birth+"</td>"+
		"</tr>"+
		"<tr>"+
				"<td>" + "Lớp" + "</td>" + "<td>"+classUser+"</td>"+
		"</tr>";
	document.getElementById("content-table").innerHTML=value;
}
function errorDB(err )
{
	console.log("Error processing SQL: " + err.code);
}
function displayProfile()
{
	var db = window.openDatabase("Database","1.0","Truong nha","200000");
	db.transaction(readProfile,errorDB);
}

function getDayAttendance( stringDate)
{	
	var arrD = new Array();
	arrD = stringDate.split('/');
	var d = new Date(arrD[2],arrD[1],arrD[0]);
	var weekday=new Array(7);
	weekday[0]="C.Nhật";
	weekday[1]="Thứ 2";
	weekday[2]="Thứ 3";
	weekday[3]="Thứ 4";
	weekday[4]="Thứ 5";
	weekday[5]="Thứ 6";
	weekday[6]="Thứ 7";

	var n = weekday[d.getDay()];
	return n;
}
