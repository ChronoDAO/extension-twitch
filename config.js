var token, userId;
var options = [];

// so we don't have to write this out everytime
const twitch = window.Twitch.ext;

// onContext callback called when context of an extension is fired
twitch.onContext((context) => {
  //console.log(context);
});

// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication
  userId = auth.userId; //opaque userID
});

// when the config changes, save the new changes!
twitch.configuration.onChanged(function () {
  if (twitch.configuration.broadcaster) {
    console.log("config exists");
    var config = JSON.parse(twitch.configuration.broadcaster.content);

    console.log("config", config);

    updateCurrentOpenLootUsername(config.openLootUsername);
    updateAmbassadorCode(config.ambassadorCode);
  }
});

function updateConfig() {
  if (twitch.configuration.broadcaster) {
    console.log("config exists");
    var config = JSON.parse(twitch.configuration.broadcaster.content);

    console.log("config", config);

    updateCurrentOpenLootUsername(config.openLootUsername);
    updateAmbassadorCode(config.ambassadorCode);
  }
  console.log("in updateConfig");
  console.log("form value", document.getElementById("openLootUsername").value);

  console.log(
    "twitch.configuration.broadcaster",
    twitch.configuration.broadcaster
  );

  let broadcaster = {
    openLootUsername: document.getElementById("openLootUsername").value,
    ambassadorCode: document.getElementById("ambassadorCode").value,
  };

  twitch.configuration.set("broadcaster", "1", JSON.stringify(broadcaster));
  console.log("exit updateConfig", twitch.configuration.broadcaster);
}

function updateCurrentOpenLootUsername(openLootUsername) {
  document.getElementById("openLootUsername").value = openLootUsername;
}
function updateAmbassadorCode(ambassadorCode) {
  document.getElementById("ambassadorCode").value = ambassadorCode;
}
