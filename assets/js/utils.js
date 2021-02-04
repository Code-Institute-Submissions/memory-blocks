// Home page tagline animation

/* Credit for text animation - Tobias Ahlin
   (https://tobiasahlin.com/moving-letters/#9)
*/
// Wrap every letter in a span
let textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline()
    .add({
        targets: '.ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
    }).add({
        targets: '.ml9',
        // opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

function sendMail(contactForm) {
    emailjs.send("service_ra2u0qi", "john_morgan", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value
    })
        .then(function (response) {
            $("#contact").modal("hide");
        },
            function (error) {
                consoloe.log("Failed", error);
            });
    return false; // To block from loading a new page
}

$('#contact').on('hidden.bs.modal', function (e) {
    $(this)
        .find("#name").val("").end()
        .find("#email").val("").end()
        .find("#message").val("").end();
})