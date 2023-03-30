import express from "express";
import stream from "stream";
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

    const fileName = `AhmedHabeilaResume_${jobType}pdf`;

    const path = `../../resumes/${fileName}`;

    const file = await page.pdf({
      path,
      // format: '',
      printBackground: true,
      width: printWidth,
      height: Number(height) + 16,
      // scale
    });

    await browser.close();

    var readStream = new stream.PassThrough();
    readStream.end(file);

    res.set("Content-disposition", "attachment; filename=" + fileName);
    res.set("Content-Type", "application/pdf");
    res.status(200);
    readStream.pipe(res);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
