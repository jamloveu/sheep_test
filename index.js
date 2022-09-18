const axios = require("axios");

const maximum = 10; // 最大次数
const jamToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1OTA1NDgsIm5iZiI6MTY2MzQ4ODM0OCwiaWF0IjoxNjYzNDg2NTQ4LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjoyMTk3NzExNTMsImRlYnVnIjoiIiwibGFuZyI6IiJ9.loYR7hvy8I2cQFrtkeAXvr50ZhmUeIO1qXhsKhmni4M"; // 第三方的token
let successNumber = 0; // 成功次数
let errorNumber = 0; // 失败次数

init();

async function init() {
  const uid = process.argv[2];
  const wxOpenid = await getWxOpenId(uid)
  const token = await getToken(wxOpenid)
  setInterval(()=>{
    if(successNumber<maximum){
        gameOver(token)
    }
  },1000)
}

async function getWxOpenId(uid) {
  const response = await axios.get(
    `https://cat-match.easygame2021.com/sheep/v1/game/user_info?uid=${uid}`,
    {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip,compress,br,deflate",
        Connection: "keep-alive",
        "content-type": "application/json",
        Referer:
          "https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
        t: jamToken,
      },
    }
  );
  return response.data.data.wx_open_id;
}

async function getToken(wxOpenid) {
  const response = await axios.post(
    `https://cat-match.easygame2021.com/sheep/v1/user/login_tourist`,
    { uuid: wxOpenid },
    {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip,compress,br,deflate",
        Connection: "keep-alive",
        "content-type": "application/json",
        Referer:
          "https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
        t: jamToken,
      },
    }
  );
  return response.data.data.token;
}

function gameOver(token) {
  const rank_time = Math.floor(Math.random() * 20000);
  axios
    .get(
      `https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=${rank_time}&rank_role=1&skin=1`,
      {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip,compress,br,deflate",
          Connection: "keep-alive",
          "content-type": "application/json",
          Referer:
            "https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
          t: token,
        },
      }
    )
    .then(() => {
      successNumber++
    })
    .catch(() => {
      errorNumber++;
    })
    .finally(()=>{
        console.log(`总:${maximum}次，成功${successNumber}次, 失败${errorNumber}次`);
    })
}
