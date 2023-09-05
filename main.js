const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0;
let yValue = 0;
let rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${
      yValue * speedy
    }px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
      rotateDegree * rotateSpeed
    }deg)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;
  //No se pueden mover las imagenes cuando pasa el mouse, cuando la pantalla es menor o igual a 1125
  if (window.innerWidth <= 1125) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

// Responsive Height
// if (window.innerWidth >= 1058) {
//   main.style.maxHeight = `${window.innerWidth * 0.6}px`;
// } else {
//   main.style.maxHeight = `${window.innerWidth * 1.6}px`;
// }

// GSAP Animation
let timeline = gsap.timeline();
window.addEventListener("load", () => {
  Array.from(parallax_el)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
      timeline.from(
        el,
        {
          top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
          duration: 2,
          ease: "power.3.out",
        },
        "1"
      );
    });

  // ANIMATE THE TEXT FROM THE BUTTOM:
  timeline
    .from(
      ".text",
      {
        y:
          window.innerHeight -
          document.querySelector(".text").getBoundingClientRect().top,
        duration: 2,
      },
      "2.5"
    )
    .from(
      ".hide",
      {
        opacity: 0,
        duration: 1.5,
      },
      "2.5"
    );

  // ANIMATE THE TEXT FROM THE TOP:
  // timeline.from(
  //   ".text",
  //   {
  //     y: -150,
  //     opacity: 0,
  //     duration: 1.5,
  //   },
  //   "3"
  // );
});
