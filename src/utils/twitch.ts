export function getChannelNameFromUrl(url: string): string {
  const match = url.match(/twitch.tv\/(.*)/);
  if (match) {
    return match[1];
  }
  return "";
}

export function getOpenLootName(): Promise<any> {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      initTwitch();
      let config = initTwitch();

      resolve(config.openLootUsername.toString() || "");
    }, 1000);
  });
  return promise;
}

export function getAmbassadorCode(): Promise<any> {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let config = initTwitch();

      resolve(config.ambassadorCode.toString() || "");
    }, 1000);
  });
  return promise;
}

function initTwitch() {
  //@ts-ignore
  const twitch = window.Twitch.ext;
  const broadcaster = twitch.configuration.broadcaster;
  var config = JSON.parse(broadcaster.content);
  return config;
}
