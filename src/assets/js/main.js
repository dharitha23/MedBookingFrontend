/** Code taken from https://codepen.io/BuiltBySam/pen/merjWp.
 * Changed styles for the navbar and the number of pixels
 * when the style changes
 * **/
$(document).ready(function () {
    var scrollTop = 0;
    $(window).scroll(function () {
        scrollTop = $(window).scrollTop();
        $('.counter').html(scrollTop);

        if (scrollTop >= 500) {
            $('#main-nav').addClass('navbar-scrolled');
        } else if (scrollTop < 500) {
            $('#main-nav').removeClass('navbar-scrolled');
        }
    });

    /** Code snippet taken from https://stackoverflow.com/questions/24356629/adjust-top-margin-in-layout-file-depending-on-navbar-height **/
    var navbarHeight = $('.navbar').height();
    $('.margin_from_navbar').css({marginTop: navbarHeight + 50 + 'px', marginBottom: navbarHeight + 'px'});

    /**Script to change the doctor picture with the correspondent doctor pic **/
    if (document.getElementById("doctor_result_profile_pic") != null) {
        document.getElementById("doctor_result_profile_pic").style.backgroundImage = "url('assets/images/achievement-adult-care-1323864.jpg')";
    }


});

/** Code snippet taken from https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_tooltip_pos&stacked=h **/
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


/****************************************** SEARCH DOCTORS BY LOCATION *************************************************/
/** Taken from Lab2- Advanced Web Development course**/
function autofill_address() {
    var address = new google.maps.places.Autocomplete(
        (document.getElementById('address')),
        {types: ['geocode']});
}


/****************************************** SIGN IN VALIDATION FORM *************************************************/
/**Based on https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_js **/
var signin_mail = document.getElementById('signin-mail')
var signin_password = document.getElementById('signin-password')


function validateSignInForm() {
    var email = document.forms["sign-in-form"]["email"].value;
    var password = document.forms["sign-in-form"]["password"].value;

    //Initialize to remove previous error messages
    signin_mail.className = "error-message hide";
    signin_password.className = "error-message hide";

    //Check if email is empty
    if (email == "") {
        signin_mail.className = "error-message active";
        return false;
    }

    //Check if password is empty
    if (password == "") {
        signin_password.className = "error-message active";
        return false;

    }
}

/****************************************** SIGN UP VALIDATION FORM *************************************************/
var signup_mail = document.getElementById('signup-mail-error');
var su_password = document.getElementById('signup-password-error');
var su_confirm_password = document.getElementById('signup-confirm-password-error');
var usertype_error = document.getElementById('usertype-error');
var password_match_error = document.getElementById('password-match-error');

function validateSignUpForm() {
    var email = document.forms["sign-up-form"]["su-email"].value;
    var password = document.forms["sign-up-form"]["su-password"].value;
    var confirm_password = document.forms["sign-up-form"]["confirm-password"].value;

    var radio_patient = document.getElementById('radio-patient');
    var radio_doctor = document.getElementById('radio-doctor');

    //Initialize to remove previous error messages
    signup_mail.className = "error-message hide";
    su_password.className = "error-message hide";
    su_confirm_password.className = "error-message hide";
    usertype_error.className = "error-message hide";
    password_match_error.className = "error-message hide";

    if (!radio_patient.checked && !radio_doctor.checked) {
        usertype_error.className = "error-message active";
        return false;
    }

    //Check if email is empty
    if (email == "") {
        signup_mail.className = "error-message active";
        return false;
    }

    //Check if password is empty
    if (password == "") {
        su_password.className = "error-message active";
        return false;
    }

    if (confirm_password == "") {
        su_confirm_password.className = "error-message active";
        return false;
    }


    /** Based on https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/localeCompare **/
    if (password.localeCompare(confirm_password) != 0) {
        password_match_error.className = "error-message active";
        return false;
    }


}

/****************************************** SEARCH VALIDATION FORM *************************************************/
function validateSearchForm() {
    var address = document.forms["search-form"]["address"].value;
    var speciality = document.forms["search-form"]["speciality"].value;
    var search = document.forms["search-form"]["search-text"].value
    var search_error = document.getElementById('search-error');

    if ((address == "") && (speciality == "") && (search == "")) {
        search_error.className = "error-message active";
        return false;
    }

}
