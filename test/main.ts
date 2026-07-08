import { Zohal } from "../src/index";

const x = new Zohal("YOUR_TOKEN_IN_HERE");

(async () => {
  const res = await x.shahkarInquiry("09038710334", "0926432060");
  console.log(res);
})();
