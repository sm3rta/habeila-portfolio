const sharp = require('sharp');

// console.log(`🚀 ~ sharp(/public/self.webp)`, sharp(`/public/self.webp`));
// console.log(`🚀 ~ sharp(/public/self.webp)-resize`, sharp(`/public/self.webp`).resize(140, 140));
sharp(`./public/self.webp`)
	.webp({
		// lossless: true,
		quality: 6,
		reductionEffort: 6,
		// alphaQuality: 100,
		smartSubsample: true,
		// nearLossless: true,
	})
	.toFile(`./public/self-smallz.webp`);
