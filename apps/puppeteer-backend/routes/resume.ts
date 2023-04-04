import express from "express";
import { Params } from "../../portfolio/src/pages/resume-raw";
import { printWidth } from "../../portfolio/src/utils";

const router = express.Router();

const jobTypesMap: Record<Params["jobType"], string> = {
  "full-stack": "Fullstack",
  "front-end": "Frontend",
  softwareEngineer: "SoftwareEngineer",
};

const jobTypes: Array<Params["jobType"]> = ["full-stack", "front-end", "softwareEngineer"];

/* GET home page. */
router.post("/", async (req, res) => {
  try {
    const puppeteer = require("puppeteer");
    const { body } = req;
    const { url, baseUrl, height = 2000 } = body;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const fileName = `AhmedHabeilaResume.pdf`;
    const path = `../../resumes/${fileName}`;
    await page.pdf({
      path,
      printBackground: true,
      width: printWidth,
      height: Number(height) + 4,
    });

    const promises: Array<() => Promise<any>> = jobTypes.map((jobType) => {
      return async () => {
        const page = await browser.newPage();
        const url = `${baseUrl}?jobType=${jobType}`;
        await page.goto(url, { waitUntil: "networkidle2" });

        const fileName = `AhmedHabeilaResume_${jobTypesMap[jobType]}.pdf`;
        const path = `../../resumes/${fileName}`;

        await page.pdf({
          path,
          printBackground: true,
          width: printWidth,
          height: Number(height) + 4,
        });

        if (jobType === "front-end") {
          await page.pdf({
            path: "../portfolio/public/assets/AhmedHabeilaResume.pdf",
            printBackground: true,
            width: printWidth,
            height: Number(height) + 4,
          });
        }
      };
    });

    await Promise.all(promises.map((p) => p()));
    await browser.close();

    // var readStream = new stream.PassThrough();
    // readStream.end(file);

    // res.set("Content-disposition", "attachment; filename=" + fileName);
    // res.set("Content-Type", "application/pdf");
    res.status(200).send({ message: "printed successfully" });
    // readStream.pipe(res);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
