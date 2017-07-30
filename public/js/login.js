$( document ).ready(function() {
    "use strict"; // Start of use strict

    // $("#login").validate({
    //     rules: {
    //         loginEmail: {
    //             required: true,
    //             email: true
    //         },
    //         loginPassword: {
    //             required: true,
    //             minlength: 8
    //         }
    //     },
    //     messages: {
    //         loginEmail: {
    //             required: "Please enter a valid email.",
    //             minlength: "Please enter a valid email."
    //         },
    //         loginPassword: {
    //             required: "Please enter a password",
    //             minlength: "Please enter at least 8 characters."
    //         }
    //     },
    //     submitHandler: function (form) {
    //         var data = $( form ).serializeArray();
    //         $.ajax({
    //             type: "POST",
    //             url: "/api/account/login",
    //             contentType: "application/json",
    //             data: JSON.stringify({
    //                 "email"     : data[0].value,
    //                 "pass"  : data[1].value,
    //                 "cookie" : true
    //             }),
    //             success: function(data) {
    //                 if(data["status"] == "OK") {
    //                     $("#login-modal-message").text("Success! Redirecting you shortly...");
    //                     localStorage.setItem("jwt", data.jwt);
    //                 } else {
    //                     $("#login-modal-message").text("Invalid login/password combination.");
    //                 }
    //                 console.log(data);
    //             }
    //         });
    //         $( form )[0].reset();
    //         return false;
    //     }
    // });
}); // End of use strict
