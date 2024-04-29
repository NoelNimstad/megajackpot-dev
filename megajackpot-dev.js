let optinImage;
let optinBar;
let optinButton;
let optinButtonImage;
let optinPanel;
let optButton;
let main;
let miniValueLabel;
let minorValueLabel;
let majorValueLabel;
let megaValueLabel;

let optin = false;
document.addEventListener("DOMContentLoaded", () => 
{
    optinImage = document.getElementById("optin-image");
    optinBar = document.getElementById("optin-bar");
    optinButton = document.getElementById("optin");
    optinButtonImage = document.getElementById("optin-button-image");
    optinPanel = document.getElementById("optin-panel");
    optButton = document.getElementById("opt-button");
    main = document.getElementById("main");
    miniValueLabel = document.getElementById("mini-value");
    minorValueLabel = document.getElementById("minor-value");
    majorValueLabel = document.getElementById("major-value");
    megaValueLabel = document.getElementById("mega-value");

    let toggle = false;
    optinButton.addEventListener("click", () => 
    {
        toggle = !toggle;
        if (toggle) 
        {
            main.style.filter = "brightness(75%)";
            optinPanel.style.bottom = "0px";
            return;
        }
        main.style.filter = "none";
        optinPanel.style.bottom = "-500px";
    });

    optButton.addEventListener("click", async () => 
    {
        const url = megajackpotConfig.endpoint + (optin ? "/api/optout?operator=" : "/api/optin?operator=") + megajackpotConfig.operator + "&player=" + megajackpotConfig.player + "&hash=" + megajackpotConfig.hash;
        try 
        {
            const response = await fetch(url);
            if(response.status === 200)
            {
                optin = !optin;
                applyStyling(optin);
            }
        } catch(error)
        {
            console.error("Error opting in/out:", error);
        }
    });
});

function updateValues(mini, minor, major, mega) 
{
    miniValueLabel.innerText = mini.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    minorValueLabel.innerText = minor.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    majorValueLabel.innerText = major.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    megaValueLabel.innerText = mega.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function applyStyling(bool) 
{
    if (bool) 
    {
        optButton.innerText = "opt out";
        optinImage.src = "mjp-assets/mjp-opt-out-graphic.png";
        optinBar.style.backgroundImage = "url(mjp-assets/mjp-opt-out-base.png)";
        optinBar.style.alignItems = "end";
        optinPanel.style.backgroundImage = "url(mjp-assets/mjp-opt-out-base.png)";
        optinButtonImage.src = "mjp-assets/mjp-opt-out-text-en.png";
    } else 
    {
        optButton.innerText = "opt in";
        optinImage.src = "mjp-assets/mjp-opt-in-graphic.png";
        optinBar.style.backgroundImage = "url(mjp-assets/mjp-opt-in-base.png)";
        optinBar.style.alignItems = "start";
        optinPanel.style.backgroundImage = "url(mjp-assets/mjp-opt-in-base.png)";
        optinButtonImage.src = "mjp-assets/mjp-opt-in-text-en.png";
    }
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

        let miniValue = json.jackpots.MINI_VALUE;
        let minorValue = json.jackpots.MINOR_VALUE;
        let majorValue = json.jackpots.MAJOR_VALUE;
        let megaValue = json.jackpots.MEGA_VALUE;

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
