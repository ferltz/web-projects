/*Creation Date:28th of september of 2017
		Modification date: 9th of November of 2017
		Created by: Fernando La Torre Zurita
		Purpose: Tasty Bakery website-->*/
//Code in base as done in lab class 


var attempt = 3; //Cariable to count number of attemprs
//Below function executes on click if login button

function validate() {


    //getting username and password from logonEmplees.html
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    // Checking if box name is empty
    if (username == "") {
        window.alert("Please enter your name.");
        username.focus();
        return false;
    }



    if ((username == "admin" && password == "password") ||
        (username == "Fernando" && password == "010101")) {
        alert("Login Succesfully");
        setCookieEmployee(username, password);
        getCookieEmployee();
        window.location = "employees.html"; //Redirecting to other page
        return false;

    } //end if
    else {
        attempt--; //Decrementing by one
        alert("You have left" + attempt + " attempt;");
        document.getElementById("username").value = "";
        document.getElementById("username").focus();
        //Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    } //end Else



} //end function




function setCookieEmployee(username, password) {


    var name = username;

    var passwordLocal = password;

    document.cookie = name + "," + password;

    alert("Cookie created");

}

function getCookieEmployee() {

    var cookieArray = document.cookie.split(",");

    var name = cookieArray[0];

    var password = cookieArray[1];

    if (cookieArray.length != 0) {
        alert("Cookie= " + name);
    } else {
        alert("There is no any cookie captured");
    }



}