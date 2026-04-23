function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        let text = e.target.result;
        
        // Header Transformation
        let qboText = text
            .replace(/<SONRS>/g, '<SONRS><DTSERVER>20260423120000<LANGUAGE>ENG')
            .replace(/<\/SONRS>/g, '<FI><ORG>Financial Tool<FID>2102</FI></SONRS>');

        // Bank ID Injection
        if (!qboText.includes("<INTU.BID>")) {
            qboText = qboText.replace("<FID>", "<INTU.BID>2102\n<FID>");
        }

        // Create Download Link
        const blob = new Blob([qboText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        
        // Show Download Section and Update Button
        const downloadSection = document.getElementById('download-section');
        const downloadBtn = document.getElementById('download-btn');
        
        downloadSection.style.display = 'block';
        downloadBtn.href = url;
        downloadBtn.download = file.name.toLowerCase().replace(".ofx", ".qbo");
    };
    reader.readAsText(file);
}

// Drag & Drop visual feedback
const dropArea = document.getElementById('drop-area');
['dragenter', 'dragover'].forEach(name => {
    dropArea.addEventListener(name, () => dropArea.style.borderColor = '#000', false);
});
['dragleave', 'drop'].forEach(name => {
    dropArea.addEventListener(name, () => dropArea.style.borderColor = '#00b87c', false);
});