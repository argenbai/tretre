document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const sliderUl = slider.querySelector('ul');
    const slides = sliderUl.querySelectorAll('li');
    let currentIndex = 0;
    let isFullScreenActivated = false;

    function showSlide(index) {
        sliderUl.style.transform = `translateX(-${index * 100}%)`;
    }

    function requestFullScreen() {
        if (slider.requestFullscreen) {
            slider.requestFullscreen();
        } else if (slider.mozRequestFullScreen) { // Firefox
            slider.mozRequestFullScreen();
        } else if (slider.webkitRequestFullscreen) { // Chrome, Safari and Opera
            slider.webkitRequestFullscreen();
        } else if (slider.msRequestFullscreen) { // IE/Edge
            slider.msRequestFullscreen();
        }
    }

    function handleFirstClick(event) {
        if (!isFullScreenActivated) {
            requestFullScreen();
            isFullScreenActivated = true;
        } else {
            const sliderWidth = slider.offsetWidth;
            const clickX = event.clientX;

            if (clickX > sliderWidth / 2) {
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            showSlide(currentIndex);
        }
    }

    slider.addEventListener('click', handleFirstClick);

    slider.addEventListener('mousemove', function(event) {
        const sliderWidth = slider.offsetWidth;
        const mouseX = event.clientX;

        if (mouseX > sliderWidth / 2) {
            slider.classList.add('cursor-right');
            slider.classList.remove('cursor-left');
        } else {
            slider.classList.add('cursor-left');
            slider.classList.remove('cursor-right');
        }
    });

    window.addEventListener('resize', function() {
        showSlide(currentIndex);
    });

    // Show first slide initially
    showSlide(currentIndex);
});
