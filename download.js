document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            chrome.storage.local.get(['blockedClassesIDs'], function (result) {
                const data = result.blockedClassesIDs || [];
                const textContent = data.join('\n');
                const blob = new Blob([textContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'blockedClassesIDs.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        });
    }

    // インポート機能
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');

    if (importBtn && importFile) {
        importBtn.addEventListener('click', function () {
            importFile.click();
        });

        importFile.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const content = e.target.result;
                    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

                    chrome.storage.local.set({ blockedClassesIDs: lines }, function () {
                        console.log('Data imported successfully:', lines);
                        // ページをリロードして表示を更新
                        location.reload();
                    });
                };
                reader.readAsText(file);
            }
        });
    }
});
