import { Zohal } from "../src/index";

const x = new Zohal("YOUR-API_KEY");

// (async () => {
//   const res = await x.shahkarInquiry("+989038710334", "0926432060");
//   console.log(res);
// })();

(async () => {
  console.log("Lets begin");
  const res = await x.checkIbanWithNationalCode("IR684798335581874941578218", "0923456789", "1990-09-09");
  console.log(res);
})();
