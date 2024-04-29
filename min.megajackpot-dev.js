const megajackpot={elements:{},optin:!1,updateValues:function(e,t,n,a){megajackpot.elements.miniValueLabel.innerText=e.toLocaleString("ja-JP",{style:"currency",currency:"JPY"}),megajackpot.elements.minorValueLabel.innerText=t.toLocaleString("ja-JP",{style:"currency",currency:"JPY"}),megajackpot.elements.majorValueLabel.innerText=n.toLocaleString("ja-JP",{style:"currency",currency:"JPY"}),megajackpot.elements.megaValueLabel.innerText=a.toLocaleString("ja-JP",{style:"currency",currency:"JPY"})},applyStyling:function(e){megajackpot.elements.optinImage.src=e?"mjp-assets/mjp-opt-out-graphic.png":"mjp-assets/mjp-opt-in-graphic.png",megajackpot.elements.optinBar.style.backgroundImage=e?"url(mjp-assets/mjp-opt-out-base.png)":"url(mjp-assets/mjp-opt-in-base.png)",megajackpot.elements.optinBar.style.alignItems=e?"end":"start",megajackpot.elements.optinButtonImage.src=e?"mjp-assets/mjp-opt-out-text-en.png":"mjp-assets/mjp-opt-in-text-en.png"},constructMegaJackpotBar:function(){const e=document.getElementById("vision-megajackpot-bar");e.style.height="35px",e.style.width="100%",e.style.maxWidth="100vw",e.style.zIndex=2,e.style.position="relative",e.style.display="flex",e.style.justifyContent="space-between",e.style.overflow="hidden",e.style.fontFamily="sans-serif",e.style.boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.4)",megajackpot.elements.optinBar=e;const t=document.createElement("img");t.style.minWidth="0",t.style.minHeight="0",t.style.maxHeight="35px",t.style.objectFit="contain",e.appendChild(t),megajackpot.elements.optinImage=t;const n=document.createElement("section");n.style.width="fit-content",n.style.height="35px",n.style.paddingLeft="10px",n.style.color="white";const a={duration:1e4,iterations:1/0};n.animate([{transform:"translateY(0px)",offset:0,easing:"cubic-bezier(.9,0,.1,1)"},{transform:"translateY(-35px)",offset:.25,easing:"cubic-bezier(.9,0,.1,1)"},{transform:"translateY(-70px)",offset:.5,easing:"cubic-bezier(.9,0,.1,1)"},{transform:"translateY(-105px)",offset:.75,easing:"cubic-bezier(.9,0,.1,1)"},{transform:"translateY(-140px)",offset:1,easing:"cubic-bezier(.9,0,.1,1)"}],a),e.appendChild(n);const s=document.createElement("div"),o=document.createElement("div"),i=document.createElement("div"),l=document.createElement("div");s.style.maxWidth=o.style.maxWidth=i.style.maxWidth=l.style.maxWidth="max-content",s.style.width=o.style.width=i.style.width=l.style.width="100%",s.style.height=o.style.height=i.style.height=l.style.height="100%",s.style.textAlign=o.style.textAlign=i.style.textAlign=l.style.textAlign="center",s.style.display=o.style.display=i.style.display=l.style.display="flex",s.style.alignItems=o.style.alignItems=i.style.alignItems=l.style.alignItems="center",s.style.justifyContent=o.style.justifyContent=i.style.justifyContent=l.style.justifyContent="center",s.style.fontSize=o.style.fontSize=i.style.fontSize=l.style.fontSize="1rem",n.appendChild(s),n.appendChild(o),n.appendChild(i),n.appendChild(l);const c=document.createElement("b");c.textContent="MINI";const p=document.createElement("span"),r=document.createElement("b");r.textContent="MINOR";const m=document.createElement("span"),g=document.createElement("b");g.textContent="MAJOR";const y=document.createElement("span"),d=document.createElement("b");d.textContent="MEGA";const u=document.createElement("span");c.style.marginRight=r.style.marginRight=g.style.marginRight=d.style.marginRight="5px";const h={duration:1e4,iterations:1/0};s.animate([{opacity:1,transform:"translateY(0px)",easing:"cubic-bezier(.9,0,.1,1)"},{opacity:1,transform:"translateY(0px)",offset:.5,easing:"cubic-bezier(.9,0,.1,1)"},{opacity:0,offset:.51,easing:"cubic-bezier(.9,0,.1,1)"},{opacity:0,transform:"translateY(140px)",offset:.6,easing:"cubic-bezier(.9,0,.1,1)"},{opacity:1,offset:.61,easing:"cubic-bezier(.9,0,.1,1)"},{transform:"translateY(140px)",easing:"cubic-bezier(.9,0,.1,1)"}],h),s.appendChild(c),s.appendChild(p),o.appendChild(r),o.appendChild(m),i.appendChild(g),i.appendChild(y),l.appendChild(d),l.appendChild(u),megajackpot.elements.miniValueLabel=p,megajackpot.elements.minorValueLabel=m,megajackpot.elements.majorValueLabel=y,megajackpot.elements.megaValueLabel=u;const f=document.createElement("button");f.style.background="none",f.style.display="flex",f.style.alignItems="center",f.style.height="100%",f.style.border="none",f.style.padding="0px 10px",f.style.fontWeight="bold",f.style.cursor="pointer",e.appendChild(f);const j=document.createElement("img");j.src="mjp-assets/mjp-info-icon.png",j.style.marginRight="5px",j.style.height="13px",f.appendChild(j),megajackpot.elements.optinButton=f;const b=document.createElement("img");b.style.height="13px",f.appendChild(b),megajackpot.elements.optinButtonImage=b},fetchNewData:async function(){try{const e=config.endpoint+"/feed/jackpotdata?operator="+config.operator+"&player="+config.player+"&hash="+config.hash,t=await fetch(e),n=await t.json();optin=n.player.optinstatus,megajackpot.constructMegaJackpotBar(),megajackpot.applyStyling(optin),megajackpot.elements.optinButton.addEventListener("click",(async()=>{const e=config.endpoint+(optin?"/api/optout?operator=":"/api/optin?operator=")+config.operator+"&player="+config.player+"&hash="+config.hash;try{200===(await fetch(e)).status&&(optin=!optin,megajackpot.applyStyling(optin))}catch(e){console.error("Error opting in/out:",e)}}));let{MINI_VALUE:a,MINOR_VALUE:s,MAJOR_VALUE:o,MEGA_VALUE:i}=n.jackpots;megajackpot.updateValues(a,s,o,i);let l=0;const c=setInterval((()=>{++l>14&&clearInterval(c),a+=n.jackpots.MINI_VELOCITY,s+=n.jackpots.MINOR_VELOCITY,o+=n.jackpots.MAJOR_VELOCITY,i+=n.jackpots.MEGA_VELOCITY,megajackpot.updateValues(a,s,o,i)}),1e3)}catch(e){console.error("Error fetching jackpot data:",e)}},init:function(e){megajackpot.fetchNewData(),setInterval((()=>{megajackpot.fetchNewData()}),15e3)}};