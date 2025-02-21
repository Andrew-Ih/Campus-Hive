
        let currentIndex = 0;
        function moveSlide(direction) {
            const slides = document.querySelectorAll(".slide");
            slides[currentIndex].style.opacity = 0;
            setTimeout(() => {
                slides[currentIndex].style.display = "none";
                currentIndex = (currentIndex + direction + slides.length) % slides.length;
                slides[currentIndex].style.display = "flex";
                setTimeout(() => {
                    slides[currentIndex].style.opacity = 1;
                }, 50);
            }, 500);
        }

        function autoSlide() {
            moveSlide(1); /* Move to the next slide */
        }

        document.addEventListener("DOMContentLoaded", () => {
            const slides = document.querySelectorAll(".slide");
            slides.forEach((slide, index) => {
                slide.style.display = index === 0 ? "flex" : "none";
                slide.style.opacity = index === 0 ? 1 : 0;
                slide.style.transition = "opacity 0.5s ease-in-out";
            });
            setInterval(autoSlide, 4000); /* Automatically transition every 5 seconds */
        });

