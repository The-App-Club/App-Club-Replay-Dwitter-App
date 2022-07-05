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
      for (
        i = c.width |= 0;
        i--;
        x.fillRect(
          960 +
            S((p = 0.9 * i + ((S(t) * 3e3) / i) * S(t))) * (d = (i * i) / 1e3) -
            i * C(t),
          540 + C(p) * d - i * S(t),
          s,
          s
        )
      )
        x.fillStyle = R((Z = (t * i) % 255), (s = i / 5), 255 - Z);
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
  gcc.capture(c);
}
loop();

gcc.setOptions({
  scale: 0.5,
  durationSec: 0.8,
  keyCode: 67, // 'C'
  capturingFps: 60,
  appFps: 60,
  isAppendingImgElement: true,
  quality: 10,
  downloadFileName: 'index.gif',
  isSmoothingEnabled: true
});