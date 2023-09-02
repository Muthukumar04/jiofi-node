import notifier from "node-notifier";
import fetch from "node-fetch";
import { load } from "cheerio";

const INTERVAL = 1000 * 60 * 10; //TEN MIN

async function checkStatus() {
  console.log("ran at", new Date().toTimeString());
  console.log("Getting Html");
  try {
    const html = await fetch("http://192.168.225.1/", {
      insecureHTTPParser: true,
    });
    const body = await html.text();

    if (html) {
      console.log("Got html");
      const $ = load(body);
      const batteryLevel = parseInt($("#batterylevel").val());
      console.log("value of charging", batteryLevel);
      if (batteryLevel < 25) {
        notifier.notify({
          title: `Jio Fi battery status - ${$("#batterylevel").val()}`,
          message: "🛑🛑 Please charge your jiofi🛑🛑 ",
        });
      }
    } else throw new Error("No html doc found");
  } catch (e) {
    console.error(e);
  }
}

function run() {
  checkStatus();
  setInterval(checkStatus, INTERVAL);
}

run();
