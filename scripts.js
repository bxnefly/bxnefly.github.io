const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");

const pixelSize = 20;
const gridSize = canvas.width / pixelSize;
let tool = "paint";

// desenha o grid
function drawGrid() {
  for (let x = 0; x < canvas.width; x += pixelSize) {
    for (let y = 0; y < canvas.height; y += pixelSize) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, pixelSize, pixelSize);
      ctx.strokeStyle = "#ddd";
      ctx.strokeRect(x, y, pixelSize, pixelSize);
    }
  }
}

drawGrid();

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
  const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

  ctx.fillStyle = tool === "erase" ? "#ffffff" : colorPicker.value;
  ctx.fillRect(x, y, pixelSize, pixelSize);
  ctx.strokeStyle = "#ddd";
  ctx.strokeRect(x, y, pixelSize, pixelSize);
});

function setTool(selectedTool) {
  tool = selectedTool;
}

function clearGrid() {
  drawGrid();
}

function saveImage() {
  const link = document.createElement("a");
  link.download = "pixel-art.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}