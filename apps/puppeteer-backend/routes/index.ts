import express from "express";
import { printWidth } from "../../portfolio/src/utils";

const router = express.Router();

/* GET home page. */
router.post("/", async (req, res, next) => {
  try {
    const puppeteer = require("puppeteer");
    const { body } = req;
    const { url, params, height = 2000 } = body;
    const { skill1, skill2, skill3, senior, jobType, orgType } = params;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const fileName = `AhmedHabeilaResume_${skill1}_${skill2}_${skill3}_${
      senior ? "senior" : "junior"
    }_${jobType}_${orgType}.pdf`.replace("/", "_");

    await page.pdf({
      path: `../../resumes/${fileName}`,
      // format: '',
      printBackground: true,
      width: printWidth,
      height: Number(height) + 16,
      // scale
    });

    await browser.close();
    res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
