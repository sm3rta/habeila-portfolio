import express from "express";
import os from "os";
import path from "path";
import { paramsDefaultValues, stringifyArray } from "../../common/params";
import { printWidth as width } from "../../common/printWidth";
import { launchPuppeteer } from "./utils";

const router = express.Router();

/* GET home page. */
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { url, height: _height = 2000 } = body;
    console.log(`Processing resume with height`, _height);

    const height = Number(_height) + 2;

    const browser = await launchPuppeteer();

    const pdfArgs = {
      printBackground: true,
      preferCSSPageSize: true,
      width,
      height,
    };

    const promises: Array<() => Promise<unknown>> = [
      // Public-facing resume linked from the portfolio site, always uses default params
      async () => {
        const page = await browser.newPage();
        const defaultUrl = new URL(url);

        defaultUrl.searchParams.set("jobType", paramsDefaultValues.jobType);
        defaultUrl.searchParams.set("senior", paramsDefaultValues.senior.toString());
        defaultUrl.searchParams.set("adjective", paramsDefaultValues.adjective);
        defaultUrl.searchParams.set("skills", stringifyArray(paramsDefaultValues.skills));
        defaultUrl.searchParams.set("includeLocation", paramsDefaultValues.includeLocation.toString());

        await page.goto(defaultUrl.href, { waitUntil: "networkidle0" });
        await page.pdf({ path: "../portfolio/public/assets/AhmedHabeilaResume.pdf", ...pdfArgs });
      },
      // Customized resume (current drawer params) saved to the desktop, outside the repo
      async () => {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        const outPath = path.join(os.homedir(), "Desktop", "AhmedHabeilaResume.pdf");
        await page.pdf({ path: outPath, ...pdfArgs });
      },
    ];

    await Promise.all(promises.map((p) => p()));

    await browser.close();
    if (browser.process() != null) browser.process().kill("SIGINT");

    res.status(200).send({ message: "printed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error happened" });
  }
});

export default router;
