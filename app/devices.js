let phones = [
  {
    deviceName: "iPhone 8 Plus",
    width: 414,
    height: 736,
    deviceScaleFactor: 3,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
    touch: true,
    mobile: true
  },
  {
    deviceName: "iPhone X",
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
    touch: true,
    mobile: true
  },
 
];

let tablets = [
  {
    deviceName: "iPad",
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
  {
    deviceName: "iPad Pro",
    width: 1024,
    height: 1366,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
    touch: true,
    mobile: true
  },
  
];

let notebooks = [
 
  {
    deviceName: "Laptop with HiDPI screen",
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    userAgent: "",
    touch: false,
    mobile: false
  },
  {
    deviceName: "Laptop with MDPI screen",
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    userAgent: "",
    touch: false,
    mobile: false
  }
];

module.exports = [].concat(phones, tablets, notebooks);
