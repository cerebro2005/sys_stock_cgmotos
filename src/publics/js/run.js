/* WOW.js init */
new WOW().init();

// Tooltips Initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').material_select();
});

 // SideNav Initialization
$(".button-collapse").sideNav();
