class Offer {
    constructor(logo, url, duration, interest) {
        this.logo = logo;
        this.url = url;
        this.duration = duration;
        this.interest = interest;
    }
}

const moneySymbols = ["💵", "💰", "💸", "💳", "💶", "💷"];

// Динамически загружаем только те оферы, которые есть в массиве offerIdsArray
const offersData = {
    28: new Offer(logo="/images/banks/avafinpl.svg", url="{offer}&offer_id=28", duration="30 dni", interest="15.000 zł"),
    29: new Offer(logo="/images/banks/wandoopl.svg", url="{offer}&offer_id=29", duration="30 dni", interest="5.000 zł"),
    30: new Offer(logo="/images/banks/fenikopl.png", url="{offer}&offer_id=30", duration="60 dni", interest="5.000 zł"),
    31: new Offer(logo="/images/banks/solcreditopl.svg", url="{offer}&offer_id=31", duration="120 dni", interest="5.000 zł"),
    32: new Offer(logo="/images/banks/smart-pożyczka-logopl.svg", url="{offer}&offer_id=32", duration="30 dni", interest="15.000 zł"),
    33: new Offer(logo="/images/banks/pozychkapluspl.svg", url="{offer}&offer_id=33", duration="30 dni", interest="15.000 zł"),
    34: new Offer(logo="/images/banks/pankredytpl.svg", url="{offer}&offer_id=34", duration="60 m-cy", interest="150.000 zł"),
    
    35: new Offer(logo="/images/banks/CashBropl.svg", url="{offer}&offer_id=35", duration="24 m-cy", interest="15.000 zł"),
    36: new Offer(logo="/images/banks/Credy_PL_CPSpl.svg", url="{offer}&offer_id=36", duration="30 dni", interest="2.000 zł"),
    37: new Offer(logo="/images/banks/Finansowo_PL_CPLV_CPSpl.svg", url="{offer}&offer_id=37", duration="36 m-cy", interest="30.000 zł"),
    38: new Offer(logo="/images/banks/logo-BbqriXL3pl.svg", url="{offer}&offer_id=38", duration="24 m-cy", interest="30.000 zł")
};

document.addEventListener("DOMContentLoaded", function() {
    // Получаем список оферов из URL
    const urlParams = new URLSearchParams(window.location.search);
    var offersIds = urlParams.get("offers_ids");  // например, "zaimerkz,moneymankz,onecreditkz"
    if (!offersIds) {
        offersIds="28 29 31 32 33 34 38 35 30";
    }

    const offerIdsArray = offersIds.split(' ');
    const offersWrapper = document.querySelector("#offers_list");
    var idx = 0;
    offerIdsArray.forEach(offerId => {
        const offerData = offersData[offerId];
        if (offerData) {
            randomSymbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];

            if(idx == 0 || idx == 1) {
                labelDiv = `<div class="label red">Najlepsze dla Ciebie</div>`;
            } else if(idx == 2) {
                labelDiv = `<div class="label yellow">Wypłata w 10 minut</div>`;
            } else {
                labelDiv = '';
            }

            if(idx == 0) {
                color="#b8d8be"
            } else {
                color="#e5e5e5"
            }

            const offerElement = document.createElement("div");
            offerElement.setAttribute("id", `offer-${offerId}`);
            offerElement.classList.add("offer", "offer-block-new");
            offerElement.style.backgroundColor = color;
            offerElement.innerHTML = `
            <div class="offer-key" style="display: none;">${offerId}</div>
            ${labelDiv}
            <a class="body-card-logo" href="${offerData.url}" onclick="return goUrl(this, '${offerId}');" target="_blank">
                <img src="${offerData.logo}" class="offer-logo" alt="${offerId}">
            </a>
            <ul class="offer-info">
                <li>
                <span class="text">Okres do:</span>
                <span class="bold">${offerData.duration}</span>
                </li>
                <li>
                <span class="text">Kwota:</span>
                <span class="bold colored">${offerData.interest}</span>
                </li>
            </ul>
            <div class="general_button_wrapper">
                <div class="button">
                <a class="btn-main" target="_blank" href="${offerData.url}" onclick="return goUrl(this, '${offerId}');">
                    Odbierz ${randomSymbol}
                </a>
                </div>
            </div>
            `;
            offersWrapper.appendChild(offerElement);
            
            idx++;
        }
    });
});