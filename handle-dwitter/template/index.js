const c = document.querySelector(`canvas`);
c.width = window.innerWidth;
c.height = window.innerHeight;
const S = Math.sin;
const C = Math.cos;
const T = Math.tan;
function R(r, g, b, a) {
  a = a === undefined ? 1 : a;
  return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a + ")";
}

const x = c.getContext("2d");
let time = 0;
let frame = 0;
function u(t) {
  {
    {
      // POSTED CODE
    }
  }
}
function loop() {
  requestAnimationFrame(loop);

  time = frame / 60;
  if ((time * 60) | (0 == frame - 1)) {
    time += 0.000001;
  }
  frame++;
  u(time);
}
loop();
