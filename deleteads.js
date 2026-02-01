// 消したいIDとクラスの例
// "gn_delivery",
// "mntad",
// "google_ads_iframe",
// "gpt_unit_",
// "fluct-pc-sticky-ad",
// "ad_pr_ranking",
// "bnc_ad_",
// "ad_jack_right",
// "ad_jack_left",
// "ob-smartfeed",
// "mf-col-custom-ad",
// "ats-glia-wrapper",
// "ats-overlay-bottom-wrapper-rendered",
// "pfx_interstitial",
// "overlay_ad_pc",
// "trv-player-container",
// "ad_under_table_of_contents"


// 削除対象のIDとClassの文字列をchrome.storage.localから取得する
let targetStrings = [];

chrome.storage.local.get(['blockedClassesIDs'], function (result) {
    if (result.blockedClassesIDs && Array.isArray(result.blockedClassesIDs)) {
        targetStrings = result.blockedClassesIDs;
        // console.log("blockedClassesIDs loaded:", targetStrings);
    } else {
        targetStrings = [];
        // console.log("No blockedClassesIDs found in chrome.storage.local");
    }
});

// onloadとその後５秒後に広告削除実行
window.onload = function () {
    deleteAdd();

    setTimeout(function () {
        // console.log("5 seconds after onload deleteAdd");
        deleteAdd();
    }, 5000);


    // onload 以降、10秒ごとに広告削除を実行
    // 途中で止めたい場合は window.deleteAdsIntervalId を clearInterval してください
    const intervalId = setInterval(function () {
        // console.log("interval deleteAdd");
        deleteAdd();
    }, 10000);
    // 外部から停止できるように参照を保存
    window.deleteAdsIntervalId = intervalId;

};

// スクロール後にdeleteAddを実行（100ms後に1回だけ）
let scrollTimeout;
window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        // console.log("scroll deleteAdd");
        deleteAdd();
    }, 100);
});

// 関数：広告を削除する
function deleteAdd() {
    // localStorageから最新のターゲット文字列を取得
    // 配列内の各文字列について、idまたはclassに含まれる要素をすべて取得して削除
    targetStrings.forEach(function (str) {
        var targets = Array.from(document.querySelectorAll(`[id*="${str}"], [class*="${str}"]`));
        targets.forEach(function (element) {
            // var deletedMsg = document.createElement("span");
            // deletedMsg.style.color = "red";
            // deletedMsg.textContent = "Ads ";
            // element.parentNode.insertBefore(deletedMsg, element);
            element.remove();
            console.log("deleted ads");
        });
    });
}