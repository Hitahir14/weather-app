const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homefile = fs.readFileSync("home.html", "utf-8");
const relpaceval = (tempva, orval) => {
  let temprechar = tempva.replace("{%tempval%}", orval.main.temp);
  temprechar = temprechar.replace("{%tempvalmin%}", orval.main.temp_min);
  temprechar = temprechar.replace("{%tempvalmax%}", orval.main.temp_max);
  temprechar = temprechar.replace("{%loction%}", orval.name);
  temprechar = temprechar.replace("{%country%}", orval.sys.country);
  temprechar = temprechar.replace("{{tempstatus}", orval.weather[0].main);
  // console.log(temprechar);
  return temprechar;
};
const serval = http.createServer((req, respo) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=339d40bb76c4f3ef608929c90c2a372e"
    )
      .on("data", (chunk) => {
        let con = JSON.parse(chunk);
        let arry = [con];
        // console.log(arry[0].name);
        const realtimedat = arry
          .map((val) => relpaceval(homefile, val))
          .join("");
        respo.write(realtimedat);
        // console.log(realtimedat);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);

        // console.log("end");
        respo.end();
      });
    // console.log("ready");
  }
});
serval.listen(1000, "127.0.0.1", () => {
  console.log("ready");
});
