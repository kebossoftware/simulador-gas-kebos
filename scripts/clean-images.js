const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../assets");
const outputDir = path.join(__dirname, "../cleaned-assets");

function processDir(dir, subPath = "") {
  const fullDir = path.join(dir, subPath);
  fs.readdirSync(fullDir).forEach(file => {
    const fullPath = path.join(fullDir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDir(dir, path.join(subPath, file));
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const relativePath = path.join(subPath, file);
      const outPath = path.join(outputDir, relativePath);

      // cria diretório de saída se não existir
      fs.mkdirSync(path.dirname(outPath), { recursive: true });

      sharp(fullPath)
        .toFile(outPath, (err) => {
          if (err) console.error("❌ Erro:", err);
          else console.log("✅ Limpo:", outPath);
        });
    }
  });
}

processDir(inputDir);
