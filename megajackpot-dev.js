let elements = {};
let optin = false;

document.addEventListener("DOMContentLoaded", () => 
{
    elements = 
    {
        optinImage: document.getElementById("optin-image"),
        optinBar: document.getElementById("optin-bar"),
        optinButton: document.getElementById("optin"),
        optinButtonImage: document.getElementById("optin-button-image"),
        optinPanel: document.getElementById("optin-panel"),
        optButton: document.getElementById("opt-button"),
        main: document.getElementById("main"),
        miniValueLabel: document.getElementById("mini-value"),
        minorValueLabel: document.getElementById("minor-value"),
        majorValueLabel: document.getElementById("major-value"),
        megaValueLabel: document.getElementById("mega-value")
    };

    let toggle = false;
    elements.optinButton.addEventListener("click", () => 
    {
        toggle = !toggle;
        elements.main.style.filter = toggle ? "brightness(75%)" : "none";
        elements.optinPanel.style.bottom = toggle ? "0px" : "-500px";
    });

    elements.optButton.addEventListener("click", async () => 
    {
        const url = megajackpotConfig.endpoint + (optin ? "/api/optout?operator=" : "/api/optin?operator=") + megajackpotConfig.operator + "&player=" + megajackpotConfig.player + "&hash=" + megajackpotConfig.hash;
        try 
        {
            const response = await fetch(url);
            if (response.status === 200) 
            {
                optin = !optin;
                applyStyling(optin);
            }
        } catch (error) 
        {
            console.error("Error opting in/out:", error);
        }
    });
});

function updateValues(mini, minor, major, mega) 
{
    elements.miniValueLabel.innerText = mini.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.minorValueLabel.innerText = minor.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.majorValueLabel.innerText = major.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.megaValueLabel.innerText = mega.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function applyStyling(bool) 
{
    elements.optButton.innerText = bool ? "opt out" : "opt in";
    elements.optinImage.src = bool ? "mjp-assets/mjp-opt-out-graphic.png" : "mjp-assets/mjp-opt-in-graphic.png";
    elements.optinBar.style.backgroundImage = bool ? "url(mjp-assets/mjp-opt-out-base.png)" : "url(mjp-assets/mjp-opt-in-base.png)";
    elements.optinBar.style.alignItems = bool ? "end" : "start";
    elements.optinPanel.style.backgroundImage = bool ? "url(mjp-assets/mjp-opt-out-base.png)" : "url(mjp-assets/mjp-opt-in-base.png)";
    elements.optinButtonImage.src = bool ? "mjp-assets/mjp-opt-out-text-en.png" : "mjp-assets/mjp-opt-in-text-en.png";
}

async function megaJackpot(config) 
{
    try 
    {
        const url = config.endpoint + "/feed/jackpotdata?operator=" + config.operator + "&player=" + config.player + "&hash=" + config.hash;
        const response = await fetch(url);
        const json = await response.json();

        optin = json.player.optinstatus;
        applyStyling(optin);

        let { MINI_VALUE: miniValue, MINOR_VALUE: minorValue, MAJOR_VALUE: majorValue, MEGA_VALUE: megaValue } = json.jackpots;

        updateValues(miniValue, minorValue, majorValue, megaValue);

        let i = 0;
        const interval = setInterval(() => 
        {
            if (++i > 14) clearInterval(interval);

            miniValue += json.jackpots.MINI_VELOCITY;
            minorValue += json.jackpots.MINOR_VELOCITY;
            majorValue += json.jackpots.MAJOR_VELOCITY;
            megaValue += json.jackpots.MEGA_VELOCITY;

            updateValues(miniValue, minorValue, majorValue, megaValue);
        }, 1000);
    } catch (error) 
    {
        console.error("Error fetching jackpot data:", error);
    }
}