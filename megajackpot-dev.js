const megajackpot = 
{
    elements: {},
    optin: false,
    config: {},
    currencyPrefix: "",
    currencySuffix: "",

    currencyFormatter: function(number, prefix, suffix, grouping, decimal, precision) 
    {
        const p2l = 
        {
            1: 0,
            100: 2,
            100000: 5
        };
        const isNegative = number < 0;
        const internalNumber = Math.abs(number).toString();
        const showKilo = (precision === 100000 && internalNumber.length >= 6);
        const prec = showKilo ? p2l[precision] : 2;
        const str = internalNumber.substring(0, internalNumber.length - prec);
        const decimals = internalNumber.substr(internalNumber.length - prec, 2);
        let i = str.length;
        let result = '';
        while ((i -= 3) > 0) 
        {
            result = `${grouping}${str.substr(i, 3)}${result}`;
        }
        return `${ isNegative ? '-' : '' }${ prefix }${ str.substr(0, i + 3) }${ result }${ decimals === '00' ? '' : decimal + decimals }${ showKilo ? 'k' : '' }${ suffix }`;
    },

    unicodeToChar: function(text) 
    {
        return text.replace(/\\u([\dA-F]{4})/gi, (_, charCode) => String.fromCharCode(parseInt(charCode, 16)));
    },
    
    /*
    
    console.log(currencyFormatter(balance, currency.prefix, currency.suffix, currency.grouping, currency.decimal, currency.precision));
    
    console.assert(currencyFormatter(12345600000, "$", "", ",", ".", 1) === "$123,456,000", "$123,456,000");
    console.assert(currencyFormatter(12345600000, "€", "", ",", ".", 1) === "€123,456,000", "€123,456,000");
    console.assert(currencyFormatter(12345600789, "€", "", ",", ".", 1) === "€123,456,007.89", "€123,456,007.89");
    console.assert(currencyFormatter(12345600000, "", "kr", ",", ".", 100) === "123,456,000kr", "123,456,000kr");
    console.assert(currencyFormatter(12345600000, "", "D", ",", ".", 100000) === "123,456kD", "123,456kD");
    console.assert(currencyFormatter(12345600789, "", "D", ",", ".", 100000) === "123,456kD", "123,456kD");
    
    console.assert(currencyFormatter(-12345600000, "$", "", ",", ".", 1) === "-$123,456,000", "-$123,456,000");
    console.assert(currencyFormatter(-12345600000, "€", "", ",", ".", 1) === "-€123,456,000", "-€123,456,000");
    console.assert(currencyFormatter(-12345600000, "", "kr", ",", ".", 100) === "-123,456,000kr", "-123,456,000kr");
    console.assert(currencyFormatter(-12345600000, "", "D", ",", ".", 100000) === "-123,456kD", "-123,456kD");
    console.assert(currencyFormatter(53658718, "V", "", ",", ".", 100000) === "V536.58k", "V536.58k");
    
    console.assert(currencyFormatter(123456789, "$", "", ",", ".", 1) === "$1,234,567.89", "$1,234,567.89");
    
    */    

    updateValues: function(mini, minor, major, mega) 
    {
        megajackpot.elements.miniValueLabel.innerText = megajackpot.currencyFormatter(mini, megajackpot.currencyPrefix, megajackpot.currencySuffix, megajackpot.config.currencyDetails.grouping, megajackpot.config.currencyDetails.decimal, megajackpot.config.currencyDetails.precision);
        megajackpot.elements.minorValueLabel.innerText = megajackpot.currencyFormatter(minor, megajackpot.currencyPrefix, megajackpot.currencySuffix, megajackpot.config.currencyDetails.grouping, megajackpot.config.currencyDetails.decimal, megajackpot.config.currencyDetails.precision);
        megajackpot.elements.majorValueLabel.innerText = megajackpot.currencyFormatter(major, megajackpot.currencyPrefix, megajackpot.currencySuffix, megajackpot.config.currencyDetails.grouping, megajackpot.config.currencyDetails.decimal, megajackpot.config.currencyDetails.precision);
        megajackpot.elements.megaValueLabel.innerText = megajackpot.currencyFormatter(mega, megajackpot.currencyPrefix, megajackpot.currencySuffix, megajackpot.config.currencyDetails.grouping, megajackpot.config.currencyDetails.decimal, megajackpot.config.currencyDetails.precision);
    },

    applyStyling: function(bool) 
    {
        megajackpot.elements.optinImage.src = bool ? megajackpot.config.assetsUrl + "/mjp-opt-out-graphic.png" : megajackpot.config.assetsUrl + "/mjp-opt-in-graphic.png";
        megajackpot.elements.optinBar.style.backgroundImage = bool ? "url(" + megajackpot.config.assetsUrl + "/mjp-opt-out-base.png)" : "url(" + megajackpot.config.assetsUrl + "/mjp-opt-in-base.png)";
        megajackpot.elements.optinBar.style.alignItems = bool ? "end" : "start";
        megajackpot.elements.optinButtonImage.src = bool ? megajackpot.config.assetsUrl + "/mjp-opt-out-text-en.png" : megajackpot.config.assetsUrl + "/mjp-opt-in-text-en.png";
    },

    constructMegaJackpotBar: function()
    {
        const megaJackpotBar = document.createElement("div");
        megaJackpotBar.style.position = "absolute";
        megaJackpotBar.style.bottom = "0";
        megaJackpotBar.style.height = "35px";
        megaJackpotBar.style.width = "100%";
        megaJackpotBar.style.maxWidth = "100vw";
        megaJackpotBar.style.zIndex = 2;
        megaJackpotBar.style.display = "flex";
        megaJackpotBar.style.justifyContent = "space-between";
        megaJackpotBar.style.overflow = "hidden";
        megaJackpotBar.style.fontFamily = "sans-serif";
        megaJackpotBar.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.4)";
        megaJackpotBar.style.fontSize = "16px";

        megajackpot.config.containerElement.appendChild(megaJackpotBar);
        megajackpot.elements.optinBar = megaJackpotBar;

        const optGraphicImage = document.createElement("img");
        optGraphicImage.style.minWidth = "0";
        optGraphicImage.style.minHeight = "0";
        optGraphicImage.style.maxHeight = "35px";
        optGraphicImage.style.objectFit = "contain";
        megaJackpotBar.appendChild(optGraphicImage);
        megajackpot.elements.optinImage = optGraphicImage;

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
        miniJackpotLabel.style.width = minorJackpotLabel.style.width = majorJackpotLabel.style.width = megaJackpotLabel.style.width = "100%";
        miniJackpotLabel.style.height = minorJackpotLabel.style.height = majorJackpotLabel.style.height = megaJackpotLabel.style.height = "100%";
        miniJackpotLabel.style.textAlign = minorJackpotLabel.style.textAlign = majorJackpotLabel.style.textAlign = megaJackpotLabel.style.textAlign = "center";
        miniJackpotLabel.style.display = minorJackpotLabel.style.display = majorJackpotLabel.style.display = megaJackpotLabel.style.display = "flex";
        miniJackpotLabel.style.alignItems = minorJackpotLabel.style.alignItems = majorJackpotLabel.style.alignItems = megaJackpotLabel.style.alignItems = "center";
        miniJackpotLabel.style.justifyContent = minorJackpotLabel.style.justifyContent = majorJackpotLabel.style.justifyContent = megaJackpotLabel.style.justifyContent = "center";
        miniJackpotLabel.style.fontSize = minorJackpotLabel.style.fontSize = majorJackpotLabel.style.fontSize = megaJackpotLabel.style.fontSize = "16px";

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

        megajackpot.elements.miniValueLabel = miniJackpotValueLabel;
        megajackpot.elements.minorValueLabel = minorJackpotValueLabel;
        megajackpot.elements.majorValueLabel = majorJackpotValueLabel;
        megajackpot.elements.megaValueLabel = megaJackpotValueLabel;

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

        const optInOutButtonInfoIcon = document.createElement("img");
        optInOutButtonInfoIcon.src = megajackpot.config.assetsUrl + "/mjp-info-icon.png";
        optInOutButtonInfoIcon.style.marginRight = "5px";
        optInOutButtonInfoIcon.style.height = "13px";

        optInOutButton.appendChild(optInOutButtonInfoIcon);
        megajackpot.elements.optinButton = optInOutButton;

        const optInOutButtonLabelImage = document.createElement("img");
        optInOutButtonLabelImage.style.height = "13px";

        optInOutButton.appendChild(optInOutButtonLabelImage);
        megajackpot.elements.optinButtonImage = optInOutButtonLabelImage;
    },

    fetchNewJackpotData: async function()
    {
        try 
        {
            const url = megajackpot.config.apiUrl + "/feed/jackpotdata?operator=" + megajackpot.config.operator + "&player=" + megajackpot.config.player + "&hash=" + megajackpot.config.hash;
            const response = await fetch(url);
            const json = await response.json();

            let { MINI_VALUE: miniValue, MINOR_VALUE: minorValue, MAJOR_VALUE: majorValue, MEGA_VALUE: megaValue } = json.jackpots;
            megajackpot.updateValues(miniValue, minorValue, majorValue, megaValue);

            let i = 0;
            const interval = setInterval(() => 
            {
                if (++i > 14) clearInterval(interval);

                miniValue += json.jackpots.MINI_VELOCITY;
                minorValue += json.jackpots.MINOR_VELOCITY;
                majorValue += json.jackpots.MAJOR_VELOCITY;
                megaValue += json.jackpots.MEGA_VELOCITY;

                megajackpot.updateValues(miniValue, minorValue, majorValue, megaValue);
            }, 1000);
        } catch (error) 
        {
            console.error("Error fetching jackpot data:", error);
        }
    },

    init: async function(configArg) 
    {
        megajackpot.config = configArg;
        try 
        {
            const url = megajackpot.config.apiUrl + "/feed/jackpotdata?operator=" + megajackpot.config.operator + "&player=" + megajackpot.config.player + "&hash=" + megajackpot.config.hash;
            const response = await fetch(url);
            const json = await response.json();

            megajackpot.currencyPrefix = megajackpot.unicodeToChar(megajackpot.config.currencyDetails.prefix);
            megajackpot.currencySuffix = megajackpot.unicodeToChar(megajackpot.config.currencyDetails.suffix);

            optin = json.player.optinstatus;
            megajackpot.constructMegaJackpotBar();
            megajackpot.applyStyling(optin);

            megajackpot.elements.optinButton.addEventListener("click", async () => 
            {
                const url = megajackpot.config.apiUrl + (optin ? "/api/optout?operator=" : "/api/optin?operator=") + megajackpot.config.operator + "&player=" + megajackpot.config.player + "&hash=" + megajackpot.config.hash;
                try 
                {
                    const response = await fetch(url);
                    if (response.status === 200) 
                    {
                        optin = !optin;
                        megajackpot.applyStyling(optin);
                    }
                } catch (error) 
                {
                    console.error("Error opting in/out:", error);
                };
            });

            let { MINI_VALUE: miniValue, MINOR_VALUE: minorValue, MAJOR_VALUE: majorValue, MEGA_VALUE: megaValue } = json.jackpots;
            megajackpot.updateValues(miniValue, minorValue, majorValue, megaValue);

            let i = 0;
            const interval = setInterval(() => 
            {
                if (++i > 14) clearInterval(interval);

                miniValue += json.jackpots.MINI_VELOCITY;
                minorValue += json.jackpots.MINOR_VELOCITY;
                majorValue += json.jackpots.MAJOR_VELOCITY;
                megaValue += json.jackpots.MEGA_VELOCITY;

                megajackpot.updateValues(miniValue, minorValue, majorValue, megaValue);
            }, 1000);
        } catch (error) 
        {
            console.error("Error fetching jackpot data:", error);
        }
        
        setInterval(() => 
        {
            megajackpot.fetchNewJackpotData(config);
        }, 15000); 
    }
}