import express from "express";
import { coverPrintWidth as width } from "../../lib/utils";
import { launchPuppeteer } from "./utils";

const router = express.Router();

router.post("/cover", async (req, res) => {
  try {
    const { body } = req;
    const { url, height: _height = 2000 } = body;
    console.log(`Processing cover letter with height`, _height);
    const height = Number(_height) + 4;

    const browser = await launchPuppeteer();

    const page = await browser.newPage();

    await page.goto(url + "&pdf=true", { waitUntil: "networkidle2" });
    const path = "../../resumes/AhmedHabeilaCoverLetter.pdf";

    await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      path,
      width,
      height,
    });

    await browser.close();
    if (browser.process() != null) browser.process().kill("SIGINT");

    res.status(200).send({ message: "printed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
