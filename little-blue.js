document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#link-1').addEventListener('click', () => showPane1());
    document.querySelector('#link-2').addEventListener('click', () => showPane2());

});

function showPane1() {
    document.querySelector('#tab-2').className = '';
    document.querySelector('#tab-1').className = 'is-active';
    document.querySelector('#pane-2').style.display = 'none';
    document.querySelector('#pane-1').style.display = 'block';
}

function showPane2() {
    document.querySelector('#tab-1').className = '';
    document.querySelector('#tab-2').className = 'is-active';
    document.querySelector('#pane-1').style.display = 'none';
    document.querySelector('#pane-2').style.display = 'block';
}