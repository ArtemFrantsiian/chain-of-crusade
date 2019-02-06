
export const createLink = ({ game }:{ game : any }) => {
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(game))}`;
    const downloadLink = document.createElement("a");
    downloadLink.download = "game.json";
    downloadLink.innerHTML = "Download File";

    // downloadLink.href = window.URL.createObjectURL(pkcs12AsBlob);
    downloadLink.href = data;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
};

const destroyClickedElement = (event: any) => {
    document.body.removeChild(event.target);
};
