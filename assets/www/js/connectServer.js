function login()
{	//alert("Login.......");
	//	ajax	get	cfrs	token
	$.ajax({
		dataType:	"json",
		url:	"http://truongnha.com/api/login/",
		type:	"GET",
		success:	function(data){// success get token
			var	myJSONText	=	JSON.stringify(data,	replacer);
			token=data.csrfmiddlewaretoken;
			//alert("OK");
			//******************
			
			var usern = document.getElementById("username").value;
			var pass = document.getElementById("password").value;
			
			
			$.ajax({//	cau	lenh	ajax	POST	vs	usernam	password
				dataType:	"json",
				url:	"http://truongnha.com/api/login/",
				type:	"POST",
				data:	{username:usern,password:pass,csrfmiddlewaretoken:token},
				success:	function(	data){
					var	myJSONText	=	JSON.stringify(data,	replacer);
					token2=	JSON.stringify(data,	replacer);
					console.log(token2);
					school=data.user.school;
					studentId=data.user.studentId;
					birth = data.user.birth;
					firstName = data.user.firstName;
					lastName = data.user.lastName;
					typeUser=data.user.type;
					userId=data.user.userId;
					classUser=data.user.class;
					
					console.log( "School: " + school + "  UserId: " + userId + " Student ID: " + studentId + " birth: " + birth + " classUser: " + classUser + 
					"Type: "  + typeUser );
					// read info user from json to location
					if( checkUser == 0)
						storeUserInfo(); 
				},
				error:	function(xhr,	textStatus,	error){
					$('#loading').hide();
					alert("Erorr user name or password. Try again");
					document.getElementById("username").value="";
					document.getElementById("password").value="";
					
				}
			});//	end	ajax	submit
			//******************
		},
		error:	function(xhr){
			var	myJSONText	=	JSON.stringify(xhr,	replacer);
			if(xhr.status == 401 )
			{
				$.ui.loadContent('div_dongbo',false,false,'up');
				console.log("ERROR: 401");
			}else{
				alert(	"Eror Login:	"	+xhr.status	);
			}
				
		}
	});//	end	ajax	get	token
		
}//	end	funciton	login	to	server


// function singout to app
function signout()
{
	//checkConnection();
	if( checkNetwork==1)
	{
		$.ui.clearHistory();
		console.log("clear histoty");
		$.ajax({
			url:"http://truongnha.com/api/logout",
			type:"GET",
						
			success: function(data)
			{
				
				console.log("logout");	
				
				deleteDataUser();// remove data user in location
				console.log("delete user");
				$.ui.clearHistory();
			},
			erorr: function()
			{
				alert("Erorr to logout");
			}
		});
	}
	else{
		alert("Khong co ket noi mang");
	}
}
/**
*	Function logout
*	Logout  app, comeback to screen login
**/
function logout()
{
	//window.location.reload(true);
	window.location.href = "#div_login";
	
	$.ajax({
		url:"http://truongnha.com/api/logout",
		type:"GET",
					
		success: function(data)
		{
			console.log("Logout success");
		},
		erorr: function()
		{
			console.log("Erorr to logout");
		}
		
	});
}
function exit(){
	navigator.app.exitApp();
}