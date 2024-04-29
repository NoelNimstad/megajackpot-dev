let elements = {};
let optin = false;

// document.addEventListener("DOMContentLoaded", () => 
// {
//     elements = 
//     {
//         optinImage: document.getElementById("optin-image"),
//         optinBar: document.getElementById("optin-bar"),
//         optinButton: document.getElementById("optin"),
//         optinButtonImage: document.getElementById("optin-button-image"),
//         optinPanel: document.getElementById("optin-panel"),
//         optButton: document.getElementById("opt-button"),
//         main: document.getElementById("main"),
//         miniValueLabel: document.getElementById("mini-value"),
//         minorValueLabel: document.getElementById("minor-value"),
//         majorValueLabel: document.getElementById("major-value"),
//         megaValueLabel: document.getElementById("mega-value")
//     };

//     let toggle = false;
//     elements.optinButton.addEventListener("click", () => 
//     {
//         toggle = !toggle;
//         elements.main.style.filter = toggle ? "brightness(75%)" : "none";
//         elements.optinPanel.style.bottom = toggle ? "0px" : "-500px";
//     });

//     elements.optButton.addEventListener("click", async () => 
//     {
//         const url = megajackpotConfig.endpoint + (optin ? "/api/optout?operator=" : "/api/optin?operator=") + megajackpotConfig.operator + "&player=" + megajackpotConfig.player + "&hash=" + megajackpotConfig.hash;
//         try 
//         {
//             const response = await fetch(url);
//             if (response.status === 200) 
//             {
//                 optin = !optin;
//                 applyStyling(optin);
//             }
//         } catch (error) 
//         {
//             console.error("Error opting in/out:", error);
//         }
//     });
// });

function updateValues(mini, minor, major, mega) 
{
    elements.miniValueLabel.innerText = mini.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.minorValueLabel.innerText = minor.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.majorValueLabel.innerText = major.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
    elements.megaValueLabel.innerText = mega.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function applyStyling(bool) 
{
    elements.optinImage.src = bool ? "mjp-assets/mjp-opt-out-graphic.png" : "mjp-assets/mjp-opt-in-graphic.png";
    // elements.optButton.innerText = bool ? "opt out" : "opt in";
    elements.optinBar.style.backgroundImage = bool ? "url(mjp-assets/mjp-opt-out-base.png)" : "url(mjp-assets/mjp-opt-in-base.png)";
    elements.optinBar.style.alignItems = bool ? "end" : "start";
    // elements.optinPanel.style.backgroundImage = bool ? "url(mjp-assets/mjp-opt-out-base.png)" : "url(mjp-assets/mjp-opt-in-base.png)";
    elements.optinButtonImage.src = bool ? "mjp-assets/mjp-opt-out-text-en.png" : "mjp-assets/mjp-opt-in-text-en.png";
}

function constructMegaJackpotBar()
{
    const megaJackpotBar = document.getElementById("vision-megajackpot-bar");
    megaJackpotBar.style.height = "35px";
    megaJackpotBar.style.width = "100%";
    megaJackpotBar.style.maxWidth = "100vw";
    megaJackpotBar.style.zIndex = 2;
    megaJackpotBar.style.position = "relative";
    megaJackpotBar.style.display = "flex";
    megaJackpotBar.style.justifyContent = "space-between";
    megaJackpotBar.style.overflow = "hidden";
    megaJackpotBar.style.fontFamily = "sans-serif";
    megaJackpotBar.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.4)";

    elements.optinBar = megaJackpotBar;

    const optGraphicImage = document.createElement("img");
    optGraphicImage.style.minWidth = "0";
    optGraphicImage.style.minHeight = "0";
    optGraphicImage.style.maxHeight = "35px";
    optGraphicImage.style.objectFit = "contain";
    megaJackpotBar.appendChild(optGraphicImage);
    elements.optinImage = optGraphicImage;

    const dataSection = document.createElement("section");
    dataSection.style.width = "fit-content";
    dataSection.style.height = "35px";
    dataSection.style.paddingLeft = "10px";
    dataSection.style.color = "white";

    const dataSectionAnimationKeyframes = 
    [
        { transform: "translateY(0px)", offset: 0, easing: "cubic-bezier(.9,0,.1,1)" },
        { transform: "translateY(-35px)", offset: 0.25, easing: "cubic-bezier(.9,0,.1,1)" },
        { transform: "translateY(-70px)", offset: 0.5, easing: "cubic-bezier(.9,0,.1,1)", },
        { transform: "translateY(-105px)", offset: 0.75, easing: "cubic-bezier(.9,0,.1,1)" },
        { transform: "translateY(-140px)", offset: 1, easing: "cubic-bezier(.9,0,.1,1)" }
    ];

    const dataSectionAnimationTiming = 
    {
        duration: 10000,
        iterations: Infinity
    };

    dataSection.animate(dataSectionAnimationKeyframes, dataSectionAnimationTiming);
    megaJackpotBar.appendChild(dataSection);

    const miniJackpotLabel = document.createElement("div");
    const minorJackpotLabel = document.createElement("div");
    const majorJackpotLabel = document.createElement("div");
    const megaJackpotLabel = document.createElement("div");
    miniJackpotLabel.style.maxWidth = minorJackpotLabel.style.maxWidth = majorJackpotLabel.style.maxWidth = megaJackpotLabel.style.maxWidth = "max-content";
    miniJackpotLabel.style.width = minorJackpotLabel.style.width = majorJackpotLabel.style.width = megaJackpotLabel.style.width = "100%";
    miniJackpotLabel.style.height = minorJackpotLabel.style.height = majorJackpotLabel.style.height = megaJackpotLabel.style.height = "100%";
    miniJackpotLabel.style.textAlign = minorJackpotLabel.style.textAlign = majorJackpotLabel.style.textAlign = megaJackpotLabel.style.textAlign = "center";
    miniJackpotLabel.style.display = minorJackpotLabel.style.display = majorJackpotLabel.style.display = megaJackpotLabel.style.display = "flex";
    miniJackpotLabel.style.alignItems = minorJackpotLabel.style.alignItems = majorJackpotLabel.style.alignItems = megaJackpotLabel.style.alignItems = "center";
    miniJackpotLabel.style.justifyContent = minorJackpotLabel.style.justifyContent = majorJackpotLabel.style.justifyContent = megaJackpotLabel.style.justifyContent = "center";
    miniJackpotLabel.style.fontSize = minorJackpotLabel.style.fontSize = majorJackpotLabel.style.fontSize = megaJackpotLabel.style.fontSize = "1rem";

    dataSection.appendChild(miniJackpotLabel);
    dataSection.appendChild(minorJackpotLabel);
    dataSection.appendChild(majorJackpotLabel);
    dataSection.appendChild(megaJackpotLabel);

    const miniJackpotLabelText = document.createElement("b");
    miniJackpotLabelText.textContent = "MINI";
    const miniJackpotValueLabel = document.createElement("span");
    
    const minorJackpotLabelText = document.createElement("b");
    minorJackpotLabelText.textContent = "MINOR";
    const minorJackpotValueLabel = document.createElement("span");
    
    const majorJackpotLabelText = document.createElement("b");
    majorJackpotLabelText.textContent = "MAJOR";
    const majorJackpotValueLabel = document.createElement("span");
    
    const megaJackpotLabelText = document.createElement("b");
    megaJackpotLabelText.textContent = "MEGA";
    const megaJackpotValueLabel = document.createElement("span");

    miniJackpotLabelText.style.marginRight = minorJackpotLabelText.style.marginRight = majorJackpotLabelText.style.marginRight = megaJackpotLabelText.style.marginRight = "5px";

    const miniJackpotLabelTextAnimationKeyframes = 
    [
        { opacity: 1, transform: "translateY(0px)", easing: "cubic-bezier(.9,0,.1,1)" },
        { opacity: 1, transform: "translateY(0px)", offset: 0.5, easing: "cubic-bezier(.9,0,.1,1)" },
        { opacity: 0, offset: 0.51, easing: "cubic-bezier(.9,0,.1,1)" },
        { opacity: 0, transform: "translateY(140px)", offset: 0.6, easing: "cubic-bezier(.9,0,.1,1)" },
        { opacity: 1, offset: 0.61, easing: "cubic-bezier(.9,0,.1,1)" },
        { transform: "translateY(140px)", easing: "cubic-bezier(.9,0,.1,1)" }
    ];
      
    const miniJackpotLabelTextAnimationTiming = 
    {
        duration: 10000,
        iterations: Infinity
    };

    miniJackpotLabel.animate(miniJackpotLabelTextAnimationKeyframes, miniJackpotLabelTextAnimationTiming);
    
    miniJackpotLabel.appendChild(miniJackpotLabelText);
    miniJackpotLabel.appendChild(miniJackpotValueLabel);
    minorJackpotLabel.appendChild(minorJackpotLabelText);
    minorJackpotLabel.appendChild(minorJackpotValueLabel);
    majorJackpotLabel.appendChild(majorJackpotLabelText);
    majorJackpotLabel.appendChild(majorJackpotValueLabel);
    megaJackpotLabel.appendChild(megaJackpotLabelText);
    megaJackpotLabel.appendChild(megaJackpotValueLabel);

    elements.miniValueLabel = miniJackpotValueLabel;
    elements.minorValueLabel = minorJackpotValueLabel;
    elements.majorValueLabel = majorJackpotValueLabel;
    elements.megaValueLabel = megaJackpotValueLabel;

    const optInOutButton = document.createElement("button");
    optInOutButton.style.background = "none";
    optInOutButton.style.display = "flex";
    optInOutButton.style.alignItems = "center";
    optInOutButton.style.height = "100%";
    optInOutButton.style.border = "none";
    optInOutButton.style.padding = "0px 10px";
    optInOutButton.style.fontWeight = "bold";
    optInOutButton.style.cursor = "pointer";

    megaJackpotBar.appendChild(optInOutButton);

    // const optinPanelContainer = document.createElement("section");
    // optinPanelContainer.style.width = "100%";
    // optinPanelContainer.style.height = "500px";
    // optinPanelContainer.style.backgroundImage = "url('mjp-assets/mjp-opt-in-base.png')";
    // optinPanelContainer.style.position = "absolute";
    // optinPanelContainer.style.top = "0";

    // megaJackpotBar.append(optinPanelContainer);

    const optInOutButtonInfoIcon = document.createElement("img");
    optInOutButtonInfoIcon.src = "mjp-assets/mjp-info-icon.png";
    optInOutButtonInfoIcon.style.marginRight = "5px";
    optInOutButtonInfoIcon.style.height = "13px";

    optInOutButton.appendChild(optInOutButtonInfoIcon);
    elements.optinButton = optInOutButton;

    const optInOutButtonLabelImage = document.createElement("img");
    optInOutButtonLabelImage.style.height = "13px";

    optInOutButton.appendChild(optInOutButtonLabelImage);
    elements.optinButtonImage = optInOutButtonLabelImage;
}

async function megaJackpot(config) 
{
    try 
    {
        const url = config.endpoint + "/feed/jackpotdata?operator=" + config.operator + "&player=" + config.player + "&hash=" + config.hash;
        const response = await fetch(url);
        const json = await response.json();

        optin = json.player.optinstatus;
        constructMegaJackpotBar();
        applyStyling(optin);

        elements.optinButton.addEventListener("click", async () => 
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
                
            };
        });

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