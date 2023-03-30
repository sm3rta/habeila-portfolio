const sharp = require('sharp');

// console.log(`🚀 ~ sharp(/public/self.webp)`, sharp(`/public/self.webp`));
// console.log(`🚀 ~ sharp(/public/self.webp)-resize`, sharp(`/public/self.webp`).resize(140, 140));
sharp(`./public/assets/self.webp`)
	// .resize(160, 160)
	.jpeg({
		// quality: 6,
		// reductionEffort: 6,
		// smartSubsample: true,
	})
	.toFile(`./public/assets/self-small.jpg`);
