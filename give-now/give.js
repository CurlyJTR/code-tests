var goal = 500;
var given = 25;

var amountInput;
var progressDiv;
var modalDiv;

function updateProgress() {
    var percent = Math.round(given/goal*100);
    if (percent > 100) percent = 100;
    progressDiv.style.width = percent + '%';
}

function showModal() {
    modalDiv.style.display = '';
}

window.addEventListener('load', function () {

    amountInput =  document.getElementById('give-amount');
    progressDiv = document.getElementById('progress-value');
    modalDiv = document.getElementById('modal');

    document.getElementById('give-now').addEventListener('click', function () {
        given += Number(amountInput.value);
        amountInput.value = '';
        updateProgress();
    });

    document.getElementById('why').addEventListener('click', showModal);
    document.getElementById('save-later').addEventListener('click', showModal);
    document.getElementById('tell-friends').addEventListener('click', showModal);

    document.getElementById('close-modal').addEventListener('click', function () {
        modalDiv.style.display = 'none';
    });

    amountInput.onkeypress = function (e) {
        return "1234567890.".indexOf(String.fromCharCode(e.which)) >= 0;
    };

    updateProgress();

});


