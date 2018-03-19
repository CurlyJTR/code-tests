/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups.

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
- Use the add_user function to submit the user's data.
- If the ajax request returns an error, display the error message in red.
- Display the newly added user in the users list when the request was successful.
- Do not use any libraries e.g. bootstrap

Nice to have:
- no jQuery or completely rewrite in jQuery
- add some CSS3 properties
- code cleanup/format
- explain or propose improvements in comments
- remove inline code/styles

*/

var errorDiv;
var emailInput;
var nameInput;
var usersList;

function showError(message) {
    errorDiv.innerText = message;
    errorDiv.style.display = '';
}

function clearError() {
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
}

// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var response,
        success = (!!Math.round(Math.random()));

    if(!success){
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });
    }

    $.ajax({
        url: '/echo/json/',
        type: "post",
        data: {
            json: response
        },
        success: callback
    });
};

window.addEventListener('load', function () {
    errorDiv = document.getElementById('errors');
    emailInput = document.getElementById('email');
    nameInput = document.getElementById('name');
    usersList = document.getElementById('users');

    emailInput.addEventListener('change', function () {

        if (emailInput.checkValidity())
        {
            clearError();
        }
        else
        {
            showError('Please enter a valid email address');
        }

    });

    document.getElementById('btn').addEventListener('click',function () {

        if (!emailInput.checkValidity()) return;

        clearError();

        addUser(nameInput.value, emailInput.value, function (data) {
            if(data.success)
            {
                var item = document.createElement('li');
                item.innerText = data.user.username + ' (' + data.user.email + ')';
                usersList.appendChild(item);
                nameInput.value = '';
                emailInput.value = '';
            }
            else
            {
                showError(data.error);
            }

        });

    });

});
