// 削除対象のIDとClassの文字列
const targetStrings = [
    "gn_delivery",
    "mntad",
    "google_ads_iframe",
    "gpt_unit_",
    "fluct-pc-sticky-ad",
    "ad_pr_ranking",
    "bnc_ad_",
    "ad_jack_right",
    "ad_jack_left",
    "ob-smartfeed",
    "mf-col-custom-ad"];

// onloadとその後５秒後に広告削除実行
window.onload = function () {
    deleteAdd();

    setTimeout(function () {
        console.log("5 seconds after onload deleteAdd");
        deleteAdd();
    }, 5000);
};

// スクロール後にdeleteAddを実行（100ms後に1回だけ）
let scrollTimeout;
window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        console.log("scroll deleteAdd");
        deleteAdd();
    }, 100);
});

// 関数：広告を削除する
function deleteAdd() {
    // 配列内の各文字列について、idまたはclassに含まれる要素をすべて取得して削除
    targetStrings.forEach(function (str) {
        var targets = Array.from(document.querySelectorAll(`[id*="${str}"], [class*="${str}"]`));
        targets.forEach(function (element) {
            var deletedMsg = document.createElement("span");
            deletedMsg.style.color = "red";
            deletedMsg.textContent = "Ads ";
            element.parentNode.insertBefore(deletedMsg, element);
            element.remove();
            console.log("deleted ads");
        });
    });

    //さすがにやりすぎたので一時コメントアウト
    // すべてのiframe要素を取得して削除＋赤文字
    // var iframes = document.getElementsByTagName("iframe");
    // const iframeArray = Array.prototype.slice.call(iframes);
    // iframeArray.forEach(function (element) {
    //     var deletedMsg = document.createElement("span");
    //     deletedMsg.style.color = "blue";
    //     deletedMsg.textContent = "iFrames ";
    //     element.parentNode.insertBefore(deletedMsg, element);
    //     element.remove();
    //     console.log("deleted iframes");
    // });
}