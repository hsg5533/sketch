function hexToRgb(e) {
  e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, a) {
    return t + t + n + n + a + a;
  });
  let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t
    ? `${parseInt(t[1], 16)}, ${parseInt(t[2], 16)}, ${parseInt(t[3], 16)}`
    : null;
}
const canvas = document.querySelector("#drawArea"),
  ctx = canvas.getContext("2d"),
  colors = document.querySelectorAll(".color"),
  selectedColorDisplay = document.querySelector("#selectedColor"),
  clearButton = document.querySelector("#clearButton"),
  brushThicknessSlider = document.querySelector("#thickness"),
  brushOpacitySlider = document.querySelector("#opacity");
let selectedColor = "black",
  drawing = !1,
  brushThickness = 5,
  brushOpacity = 1;
function draw(e) {
  if (!drawing) return;
  let t = getMousePos(canvas, e);
  (ctx.strokeStyle = `rgba(${hexToRgb(selectedColor)}, ${brushOpacity})`),
    (ctx.lineWidth = brushThickness),
    (ctx.lineCap = "round"),
    ctx.lineTo(t.x, t.y),
    ctx.stroke(),
    ctx.beginPath(),
    ctx.moveTo(t.x, t.y);
}
function touchdraw(e) {
  if (!drawing) return;
  let t = getTouchPos(canvas, e);
  (ctx.strokeStyle = `rgba(${hexToRgb(selectedColor)}, ${brushOpacity})`),
    (ctx.lineWidth = brushThickness),
    (ctx.lineCap = "round"),
    ctx.lineTo(t.x, t.y),
    ctx.stroke(),
    ctx.beginPath(),
    ctx.moveTo(t.x, t.y);
}
function selectColor(e) {
  colors.forEach((e) => e.classList.remove("selected")),
    (selectedColor = e.target.dataset.color),
    (selectedColorDisplay.textContent = `Selected Color: ${e.target.dataset.name}`),
    e.target.classList.add("selected");
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function stopDrawing() {
  (drawing = !1), ctx.closePath();
}
brushThicknessSlider.addEventListener("input", (e) => {
  brushThickness = e.target.value;
}),
  brushOpacitySlider.addEventListener("input", (e) => {
    brushOpacity = e.target.value;
  }),
  canvas.addEventListener(
    "touchstart",
    (e) => {
      (drawing = !0), ctx.beginPath();
      let t = getTouchPos(canvas, e);
      ctx.moveTo(t.x, t.y);
    },
    !1
  ),
  canvas.addEventListener("touchmove", touchdraw, !1),
  canvas.addEventListener("touchend", stopDrawing, !1),
  canvas.addEventListener("mousedown", (e) => {
    (drawing = !0), ctx.beginPath();
    let t = getMousePos(canvas, e);
    ctx.moveTo(t.x, t.y);
  }),
  canvas.addEventListener("mousemove", draw),
  canvas.addEventListener("mouseup", stopDrawing),
  colors.forEach((e) => {
    e.addEventListener("click", selectColor);
  }),
  clearButton.addEventListener("click", clearCanvas);
const canvasContainer = document.querySelector("#canvasContainer");
function resizeCanvas() {
  (canvas.width = canvasContainer.clientWidth),
    (canvas.height = canvasContainer.clientHeight);
}
function getMousePos(e, t) {
  var n = e.getBoundingClientRect();
  return { x: t.clientX - n.left, y: t.clientY - n.top };
}
function getTouchPos(e, t) {
  var n = e.getBoundingClientRect();
  return {
    x: t.touches[0].clientX - n.left,
    y: t.touches[0].clientY - n.top,
  };
}
window.addEventListener("resize", resizeCanvas), resizeCanvas();
const downloadButton = document.querySelector("#downloadButton");
function downloadImage() {
  let e = document.createElement("a");
  (e.href = canvas.toDataURL()), (e.download = "myPicture.png"), e.click();
}
downloadButton.addEventListener("click", downloadImage);
document.oncontextmenu = function () {
  return !1;
};
var omitformtags = ["input", "textarea", "select"];
function disableselect(t) {
  if (-1 == omitformtags.indexOf(t.target.tagName.toLowerCase())) return !1;
}
function reEnable() {
  return !0;
}
(omitformtags = omitformtags.join("|")),
  void 0 !== document.onselectstart
    ? (document.onselectstart = Function("return false"))
    : ((document.onmousedown = disableselect), (document.onmouseup = reEnable));
