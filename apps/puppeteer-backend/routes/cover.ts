import express from "express";
import { coverPrintWidth } from "../../portfolio/src/utils";

const router = express.Router();

router.post("/cover", async (req, res) => {
  try {
    const puppeteer = require("puppeteer");
    const { body } = req;
    const { url, height = 2000 } = body;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url + "&pdf=true", { waitUntil: "networkidle2" });
    const path = "../portfolio/public/assets/AhmedHabeilaCoverLetter.pdf";

    await page.pdf({
      path,
      // printBackground: true,
      width: coverPrintWidth,
      height: Number(height) + 4,
    });

    await browser.close();

    res.status(200).send({ message: "printed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
