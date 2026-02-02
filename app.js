const jsQR = require("jsqr");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const sharp = require("sharp");

async function decodeQRCode(imagePath) {
  try {
    const processedBuffer = await sharp(imagePath)
      .grayscale()
      .normalize()
      .sharpen()
      .toBuffer();

    const image = await loadImage(processedBuffer);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");

    context.drawImage(image, 0, 0, image.width, image.height);
    const imageData = context.getImageData(0, 0, image.width, image.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      console.log("QR Code Data:", code.data);
    } else {
      console.log("No QR code found.");
    }
  } catch (error) {
    console.error("Error loading image:", error);
  }
}

// Example usage
const imagePath = "assets/qr4.png";
decodeQRCode(imagePath);
