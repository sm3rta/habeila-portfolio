import express from "express";
import puppeteer from "puppeteer";
import { coverPrintWidth as width } from "../../portfolio/src/utils";

const router = express.Router();

router.post("/cover", async (req, res) => {
  try {
    const { body } = req;
    const { url, height: _height = 2000 } = body;
    const height = Number(_height) + 4;

    const browser = await puppeteer.launch({
      defaultViewport: {
        width,
        height,
      },
    });

    const page = await browser.newPage();

    await page.goto(url + "&pdf=true", { waitUntil: "networkidle2" });
    const path = "../../resumes/AhmedHabeilaCoverLetter.pdf";

    await page.pdf({
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
