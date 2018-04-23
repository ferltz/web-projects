/* This part of code was done using assistance from:
http://www.plus2net.com/javascript_tutorial/array-display.php*/

// To show shop car list and total amount to pay

// Function that allows to calculate subtotal amount to pay for each specific item



function calculateItemTotal(aux) {
    var itemTotal, quantity, price, productIndex, total;


    productIndex = parseInt(aux.substr(9, 2));

    //	alert('Total '+productIndex);

    quantity = parseInt(document.getElementById("quantity_" + productIndex).value);

    price = parseFloat(document.getElementById("price_" + productIndex).textContent);

    itemTotal = quantity * price;


    document.getElementById("subtotal_" + productIndex).innerHTML = itemTotal;

    //If we are changing a main course quantity
    if (productIndex < 7) {
        subtotal();
    }
    //<!--If we are changing a dessert quantity-->
    else if (productIndex > 6 && productIndex < 10) {

        subtotalDessert();
    }
    //<!--If we are changing a dessert quantity-->
    else {
        subtotalExtra();
    }


    total = 0;

    for (var i = 1; i < 16; i++) {

        /*alert('item Total '+subtotal+' '+i);	*/

        total = total + parseInt(document.getElementById("subtotal_" + i).textContent);

    }



    //		alert('Total '+total);

    document.getElementById("basket-subtotal-sum").innerHTML = total;



}


//	<!-- Function that allows to calculate subtotal fort main courses addition-->
function subtotal() {
    var subtotal;

    subtotal = 0;

    for (var i = 1; i < 7; i++) {

        /*alert('item Total '+subtotal+' '+i);	*/

        subtotal = subtotal + parseInt(document.getElementById("subtotal_" + i).textContent);

    }

    document.getElementById("basket-subtotal").innerHTML = subtotal;


}


//	<!-- Function that allows to calculate subtotal for desserts addition-->
function subtotalDessert() {
    var subtotal;

    subtotal = 0;

    for (var i = 7; i < 10; i++) {

        /*alert('item Total '+subtotal+' '+i);	*/

        subtotal = subtotal + parseInt(document.getElementById("subtotal_" + i).textContent);

    }

    document.getElementById("basket-subtotalDessert").innerHTML = subtotal;


}

function subtotalExtra() {
    var subtotal;

    subtotal = 0;

    for (var i = 10; i < 16; i++) {



        subtotal = subtotal + parseInt(document.getElementById("subtotal_" + i).textContent);



    }

    document.getElementById("basket-subtotalExtra").innerHTML = subtotal;


}

/* Function that delete item from the basket*/
function itemRemove(id) {

    productIndex = parseInt(id.substr(4, 1));
    /*alert('item Total '+id);*/
    if (confirm("Do you want to remove this Item from your shop cart")) {

        document.getElementById("subtotal_" + productIndex).innerHTML = "0";
        document.getElementById("quantity_" + productIndex).value = "0";

    } else {

    }
    //If we are changing a main course quantity
    if (productIndex < 7) {
        subtotal();
    }
    /*If we are changing a dessert quantity*/
    else if (productIndex > 6 && productIndex < 10) {

        subtotalDessert();
    }
    /*If we are changing a dessert quantity*/
    else { /* if(productIndex>9 && productIndex<16){*/

        subtotalExtra();
    }

}



/* ----------------------  List of Shop Cart----------------------------*/


/*Sum of all products that have been selected to build check-out page 
		      build array for which products are will picked and its amounts 
			  to calculate final bill */

function createCheckOut() {


    var pickedProducts = new Array(); //array that will contain which products where selected
    var quantityOfProducts = new Array(); //array that will contain quantity of products where selected
    var unitPriceProducts = new Array();
    var priceOfProducts = new Array(); // array that will storage the subtotal price for each product		
    var test = document.getElementById("basket-subtotal-sum").textContent;

    if (test == "0.00" || test == "0") {

        alert("You must to select at least one product ");
        document.getElementById("quantity_1").focus();
        return;
    }

    // alert("You must to select at least one product " + test);

    for (var i = 1; i < 16; i++) {


        if (document.getElementById("quantity_" + i).value != ("0")) {

            pickedProducts.push(document.getElementById("product_" + i).textContent);

            quantityOfProducts.push(document.getElementById("quantity_" + i).value);

            unitPriceProducts.push(document.getElementById("price_" + i).textContent)

            priceOfProducts.push(document.getElementById("subtotal_" + i).textContent);

        }
    }




    //Storing arrays in local memory as a JSON file format
    localStorage.pickedProducts = JSON.stringify(pickedProducts);

    localStorage.quantityOfProducts = JSON.stringify(quantityOfProducts);

    localStorage.unitPriceProducts = JSON.stringify(unitPriceProducts);

    localStorage.priceOfProducts = JSON.stringify(priceOfProducts);



    JSON.parse(localStorage.pickedProducts);

    JSON.parse(localStorage.quantityOfProducts);

    JSON.parse(localStorage.unitPriceProducts);

    JSON.parse(localStorage.priceOfProducts);


    window.location.assign("orderCheckOut.html"); //Redirecting to other page

    //Retrieving arrays



}

function shopCartLoad() {

    var e = "<br/>";

    //declaring arrays that come from Ordering.html page
    var arraypickedProducts = localStorage.pickedProducts.split(",");

    var arrayQuantityOfProducts = localStorage.quantityOfProducts.split(",");

    var arrayUnitPriceProducts = localStorage.unitPriceProducts.split(",");

    var arrayPriceOfProducts = localStorage.priceOfProducts.split(",");

    //replacing " by spaces ans [ , ] by spaces or each array

    for (var i = 0; i < arraypickedProducts.length; i++) {

        arraypickedProducts[i] = arraypickedProducts[i].replace(/"/g, "");
        arrayQuantityOfProducts[i] = arrayQuantityOfProducts[i].replace(/"/g, "");
        arrayUnitPriceProducts[i] = arrayUnitPriceProducts[i].replace(/"/g, "");
        arrayPriceOfProducts[i] = arrayPriceOfProducts[i].replace(/"/g, "");

        if (i == 0) {

            arraypickedProducts[i] = arraypickedProducts[i].replace("[", "");
            arrayQuantityOfProducts[i] = arrayQuantityOfProducts[i].replace("[", "");
            arrayUnitPriceProducts[i] = arrayUnitPriceProducts[i].replace("[", "");
            arrayPriceOfProducts[i] = arrayPriceOfProducts[i].replace("[", "");
        } else if (i == (arraypickedProducts.length - 1)) {

            arraypickedProducts[i] = arraypickedProducts[i].replace(/]/g, "");
            arrayQuantityOfProducts[i] = arrayQuantityOfProducts[i].replace(/]/g, "");
            arrayUnitPriceProducts[i] = arrayUnitPriceProducts[i].replace(/]/g, "");
            arrayPriceOfProducts[i] = arrayPriceOfProducts[i].replace(/]/g, "");
        }

    }

    if (arraypickedProducts.length == 1) {

        arraypickedProducts[0] = arraypickedProducts[0].replace(/]/g, " ");
        arrayQuantityOfProducts[0] = arrayQuantityOfProducts[0].replace(/]/g, " ");
        arrayUnitPriceProducts[0] = arrayUnitPriceProducts[0].replace(/]/g, " ");
        arrayPriceOfProducts[0] = arrayPriceOfProducts[0].replace(/]/g, " ");
    }
    localStorage.arrayQuantityOfProducts = arrayQuantityOfProducts;
    localStorage.arraypickedProducts = arraypickedProducts;
    localStorage.arrayPriceOfProducts = arrayPriceOfProducts;





    for (i = 0; i < arraypickedProducts.length; i++) {

        e += "<tr>" + "<td class=&quot;product-details&quot;>" + arraypickedProducts[i] + "</td>" +
            "<td class=&quot;quantity&quot;>" +
            arrayQuantityOfProducts[i] + "</td>" +
            "<td class=&quot;price&quot;>" + arrayUnitPriceProducts[i] + "</td>" + "<td>" +
            arrayPriceOfProducts[i] + "</td>" + "</tr>";


    }


    document.getElementById("Products Ordered").innerHTML = e;

    document.getElementById("Buy").disabled = false;



} //end function 	


//*************************password validation******************	
var attempt = 3; //variable to count number of attempts


function validate() {


    //getting username and password from loginEmplees.html

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Checking if box name is empty
    if (username.value == "") {
        window.alert("Please enter your name.");
        username.focus();
        return false;
    }
    if (username == "admin" && password == "password") {
        alert("Login Succesfully");
        window.location = "employees.html"; //Redirecting to other page
        return false;

    } //end if
    else {
        attempt--; //Decrementing by one
        alert("You have left" + attempt + " attempt;");
        //Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    } //end Else


} //end function	



//********************* Cookies for Employee Access Page**************************


function clearAll() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("submit").value = "";


}



//Function to get price for delivery service
function deliveryPrice() {



    var priceDelivery;
    var optionList = document.getElementById("deliveryList").options;
    var index = document.getElementById("deliveryList").selectedIndex;
    var textSelected = optionList[index].text;

    switch (index) {
        case 0:
            priceDelivery = 0;
            break;
        case 1:
            priceDelivery = 5;
            break;
        case 2:
            priceDelivery = 20;
    }

    if (priceDelivery == 0) {
        alert("Please select a delivery option");
        document.getElementById("Buy").disabled = true;
        return;
    } else {
        document.getElementById("BillSubtotal").innerHTML = priceDelivery;

        calculateTotal(priceDelivery);


    }
}

function calculateTotal(priceDelivery) {

    var total = 0;
    var arrayForTotal = localStorage.arrayPriceOfProducts;
    arrayForTotal = arrayForTotal.split(",");

    for (var i = 0; i < arrayForTotal.length; i++) {
        total = total + parseInt(arrayForTotal[i]);

    }
    total = total + priceDelivery;

    document.getElementById("totalbill").innerHTML = total;

}



//********************Card data validation******* */

function cardNumberValidation() {
    //Pattern of visa card number as Regular expression
    var visaNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    //Pattern of  mastercard number as Regular expression
    var mastercardNumber = /^(?:5[1-5][0-9]{14}?)$/;

    //Obtaining the value of the input text id="cc-num"
    var number = document.getElementById("cc-num").value;





    //Case when Visa radioButton is activated
    if (document.getElementById("visaCard").checked == true) {
        //Verifying the visa pattern with introduced number
        var testResult = visaNumber.test(number);
        if (testResult == true) {
            alert("Your card number is correct");
            document.getElementById("Buy").disabled = false;
            return;
        }
        ////Verifying the masterCard pattern with introduced number        
        else if (testResult == false) {
            alert("Your card number is no valid\n The format is: 4XXX XXXX XXXX XXXX");
            document.getElementById("cc-num").focus();
            document.getElementById("Buy").disabled = true;
            return;

        }
    }
    //Case when MasterCard radioButton is activated    
    else if (document.getElementById("MasterCard").checked == true) {

        var testResult = mastercardNumber.test(number);

        if (testResult == true) {
            alert("Your card number is correct");
            document.getElementById("Buy").disabled = false;
            return;
        } else if (testResult == false) {
            alert("Your card number is no valid\n The format is: 5XXX XXXX XXXX XXXX");
            document.getElementById("cc-num").focus();
            document.getElementById("Buy").disabled = true;
            return;
        }
    }

}
/*Validation of expiration date format*/
function expirationDateValidation() {
    // Verifying that there is some data in date expires textbox
    if (document.getElementById("cc-exp").value == "") {
        alert("Please fill your card expiration date");
        document.getElementById("cc-exp").focus();
        document.getElementById("Buy").disabled = true;
        return
    }
    //Creation of variables that will be used dividing in month and year
    var expDate = document.getElementById("cc-exp").value;

    var month = expDate.substr(0, 2);

    var monthInt = parseInt(month);

    var year = expDate.substr(3, 2);

    var yearInt = parseInt(year);

    //Checking for integer numbers in date input
    var datePattern = /^[0-9/]+$/;
    //Obtaining the value of the input text id="cc-exp"

    var result = datePattern.test(expDate);

    //    alert("patron " + result);

    //In case user introduce characters differents than numbers
    if (result == false) {
        alert("Insert just numbers in this field");
        document.getElementById("cc-exp").focus();
        document.getElementById("Buy").disabled = true;
        return;
    }

    //Validating that values of month are between 1 and 12

    if (monthInt > 0 && monthInt <= 12) {
        var controlMonth = true;
    } else {
        var controlMonth = false;
    }
    //Validating that values of year are between 1 and 12
    if (yearInt >= 18 && yearInt <= 30) {
        var controlYear = true;
    } else {
        var controlYear = false;
    }
    //Verifying that month and year conditions are accomplished
    if (controlMonth == true && controlYear == true) {
        alert("Expiration date is valid");
        return;
    } else {
        alert("Expiration date is not valid\n Change it please");
        document.getElementById("cc-exp").focus();
        document.getElementById("Buy").disabled = true;
        return;
    }


}



//Validation of CVC code
function cvcValidation() {
    // Verifying that there is some data in CVC textbox
    if (document.getElementById("cc-cvc").value == "") {
        alert("Please fill your card CVC code");
        document.getElementById("cc-cvc").focus();
        document.getElementById("Buy").disabled = true;
        return;
    }

    //Checking for integer numbers in date input
    var cvcNumber = document.getElementById("cc-cvc").value;

    var cvcPattern = /^[0-9]+$/;

    var result = cvcPattern.test(cvcNumber);

    alert("Your CVC number is valid ");

    //In case user introduce characters differents than numbers
    if (result == false) {
        alert("Insert just numbers in this field");
        document.getElementById("cc-cvc").focus();
        document.getElementById("Buy").disabled = true;
        return;
    }

}


/********** Listener for buy button ********************/


document.getElementById("Buy").addEventListener("click", deliverVal);

/*********************Delivery data validation****************** */
// Text area validation


function deliverValidation() {

    var errors = new Array();



    errors = emptyNameCheck(errors);
    //alert("Vamos que se puede"+errors.length);
    // Validation of address line 1, address line2, area, postcode and town selection
    errors = emptyaddress2Check(errors);

    errors = emptyaddress1Check(errors);

    errors = areaValidation(errors);

    errors = townSelectionCheck(errors);

    errors = postCodeValidation(errors);





    var listErrors;

    if (errors.length != 0) {

        for (var i = 0; i < errors.length; i++) {

            listErrors += "\n" + (i + 1) + ".- " + errors[i] + "\n";

        }
        alert("Correct this fields\n" + listErrors + "\n ");
    }
    if (errors.length == 0) {

        confirmation();
    }


}



function areaValidation(errors) {


    // Verifying that there is some data in area textbox

    if (document.getElementById("area").value == "") {

        errors.push(String("Please fill your area"));

        return errors;
    } else {
        //Checking for integer numbers in date input

        var areaData = document.getElementById("area").value;

        var areaPattern = /^[a-zA-z0-9 ]+$/;

        result = areaPattern.test(areaData);


        //In case user introduce characters different than numbers
        if (result == false) {

            errors.push(String("Insert just letters and numbers in area field"));

            return errors;
        }

        return errors;
    }

}



function postCodeValidation(errors) {
    // Verifying that there is some data in postcode textbox
    if (document.getElementById("postcode").value == "") {

        errors.push(String("Please fill your postcode"));

        return errors;
    } else {
        // alert("checking  2");
        //Checking for integer numbers in date input
        var postCodeData = document.getElementById("postcode").value;

        var postcodePattern = /^[a-zA-z0-9]+$/;

        var result = postcodePattern.test(postCodeData);


        //In case user introduce characters different than numbers
        if (result == false) {

            errors.push(String("Insert just letters and numbers in this field"));

            return errors;
        }


        return errors;

    }

}

//Checking if address line 1 field is empty
function emptyNameCheck(errors) {

    if (document.getElementById("customerName").value == "") {

        errors.push(String("Please fill Customer Name field"));

        return errors;
    } else {
        return errors;
    }
}

//Checking if address line 1 field is empty
function emptyaddress1Check(errors) {

    if (document.getElementById("address1").value == "") {

        errors.push(String("Please fill address 1 field"));

        return errors;
    } else {
        return errors;
    }
}

//Checking if address line 1 field is empty
function emptyaddress2Check(errors) {

    if (document.getElementById("address2").value == "") {

        errors.push(String("Please fill address 2 field"));

        return errors;

    } else {
        return errors;
    }
}

//Checking if name field is empty
function emptyareaCheck(errors) {

    if (document.getElementById("area").value == "") {

        errors.push(String("Please fill this field"));
        return errors;
    } else {
        return errors;
    }

}

function townSelectionCheck(errors) {



    if (document.getElementById("towns").value == "empty") {

        errors.push(String("Please select a town from the list"));
        return errors;
    } else {
        return errors;
    }

}
//Function that set an order and advise customer about it

function confirmation() {
    var releaseOrder;

    if (document.getElementById("totalbill").textContent != "") {

        var releaseOrder = confirm("If you press Ok we will prepare and send your food");
        if (releaseOrder == true) {
            alert("Thank you for your order!");
        } else {
            return;
        }
    } else {
        alert("Please make sure you selected a delivery option!");


    }
}

function dataRestore() {

    var arraypickedProducts = [];

    var arraypickedProducts = [];

    var arrayPriceOfProducts = [];

    window.location = "Ordering.html";

    arrayQuantityOfProducts = localStorage.arrayQuantityOfProducts;
    arraypickedProducts = localStorage.arraypickedProducts;
    arrayPriceOfProducts = localStorage.arrayPriceOfProducts;

    arrayQuantityOfProducts = arrayQuantityOfProducts.split(",");
    arraypickedProducts = arraypickedProducts.split(",");
    arrayPriceOfProducts = arrayPriceOfProducts.split(",");

    alert("Cantidad " + arraypickedProducts.length);

    for (var i = 0; i < arrayQuantityOfProducts.length; i++) {

        for (var j = 1; j < 16; j++) {

            if (document.getElementbyId("product_" + String(j)).textContent == String(arraypickedProducts[i])) {

                document.getElementById("quantity_" + String(j)).value = arrayQuantityOfProducts[i];

            }
        }


    }

}