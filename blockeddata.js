//urlの保存用
let blockedClassesIDs = [];

//blockedClassesIDsを取得して、なければ空っぽで作る
chrome.storage.local.get(['blockedClassesIDs'], function (result) {
    blockedClassesIDs = result.blockedClassesIDs || [];

    //データ表示を更新
    displayURLs();

});

// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    //データ表示を更新
    displayURLs();

    // +ボタンでブロックするURLを追加
    if (document.getElementById('addbutton') === null) {
        return;
    }
    document.getElementById('addbutton').onclick = () => {
        const url = document.getElementById('rejectURL').value;
        if (url) {
            addURL(url);
            // テキストボックスをクリア
            document.getElementById('rejectURL').value = '';
        }
        //データを表示更新
        displayURLs();
    };
});



//データの表示を更新する
function displayURLs() {
    //id="blockedurls"の子要素をすべて削除
    const blockedURLsElement = document.getElementById('blockedurls');
    console.log("blockedURLsElement");
    console.log(blockedURLsElement);
    if (blockedURLsElement === null) {
        return;
    }
    while (blockedURLsElement.firstChild) {
        blockedURLsElement.removeChild(blockedURLsElement.firstChild);
    }

    // テキストボックスと×ボタンを作成して、blockedURLsElementに追加する
    blockedClassesIDs.forEach(url => {
        const container = document.createElement('div');
        container.classList.add('url-container');

        const input = document.createElement('input');
        input.classList.add('textbox');
        input.type = 'text';
        input.value = url;
        input.disabled = true;
        container.appendChild(input);

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('del');
        closeButton.addEventListener('click', () => {
            removeURL(url);
            container.remove();
        });
        container.appendChild(closeButton);

        blockedURLsElement.appendChild(container);
    });
}

// URLをblockedClassesIDsに追加し、localStorageに保存する
function addURL(url) {
    if (!blockedClassesIDs.includes(url)) {
        blockedClassesIDs.push(url);

        chrome.storage.local.set({ "blockedClassesIDs": blockedClassesIDs }, function () {
            console.log("blockedClassesIDs set");
        });
    }
    //表示を更新
    displayURLs();
}

// URLをblockedClassesIDsから削除し、localStorageに保存する関数
function removeURL(url) {
    blockedClassesIDs = blockedClassesIDs.filter(u => u !== url);
    chrome.storage.local.set({ "blockedClassesIDs": blockedClassesIDs }, function () {
        console.log("blockedClassesIDs set");
    });

    //表示を更新
    displayURLs();
}

