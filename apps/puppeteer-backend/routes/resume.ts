import express from "express";
import puppeteer from "puppeteer";
import { Params, paramsDefaultValues, stringifyArray } from "../../portfolio/src/pages/resume-raw/utils";
import { printWidth } from "../../portfolio/src/utils";

const router = express.Router();

const jobTypesMap: Record<Params["jobType"], string> = {
  "full-stack": "Fullstack",
  "front-end": "Frontend",
  softwareEngineer: "SoftwareEngineer",
  react: "React",
};

// const jobTypes: Array<Params["jobType"]> = ["full-stack", "front-end", "softwareEngineer", "react"];
const jobTypes: Array<Params["jobType"]> = ["full-stack", "front-end"];

/* GET home page. */
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { url, height = 2000 } = body;

    const browser = await puppeteer.launch({
      // headless: false,
    });

    const promises: Array<() => Promise<unknown>> = jobTypes.map((jobType) => async () => {
      const page = await browser.newPage();
      const modifiedUrl = new URL(url);

      modifiedUrl.searchParams.set("jobType", jobType);
      modifiedUrl.searchParams.set("senior", paramsDefaultValues.senior.toString());
      modifiedUrl.searchParams.set("adjective", paramsDefaultValues.adjective);
      modifiedUrl.searchParams.set("skills", stringifyArray(paramsDefaultValues.skills));

      await page.goto(modifiedUrl.href, { waitUntil: "networkidle0" });

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
    });

    promises.push(async () => {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0" });
      const fileName = `AhmedHabeilaResume.pdf`;
      const path = `../../resumes/${fileName}`;
      await page.pdf({
        path,
        printBackground: true,
        width: printWidth,
        height: Number(height) + 4,
      });
    });

    await Promise.all(promises.map((p) => p()));

    await browser.close();
    // if (browser.process() != null) browser.process().kill("SIGINT");

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
