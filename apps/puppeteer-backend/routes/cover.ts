import express from "express";
import puppeteer from "puppeteer";
import { coverPrintWidth } from "../../portfolio/src/utils";

const router = express.Router();

router.post("/cover", async (req, res) => {
  try {
    const { body } = req;
    const { url, height = 2000 } = body;

    const browser = await puppeteer.launch({
      product: "firefox",
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.goto(url + "&pdf=true", { waitUntil: "load" });
    const path = "../../resumes/AhmedHabeilaCoverLetter.pdf";

    await page.pdf({
      path,
      width: coverPrintWidth,
      height: Number(height) + 4,
    });

    // await browser.close();
    if (browser.process() != null) browser.process().kill("SIGINT");

    res.status(200).send({ message: "printed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
