let Reader = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

Reader.promise.then(function (pdf) {
    let pageNum = 1;
    function renderR(num) {
        pdf.getPage(num).then(function (page) {
            let viewport = page.getViewport({scale: 1,});
            viewport = page.getViewport({scale: document.getElementById("pdfReader").clientHeight / viewport.height})
            let element = document.getElementById("pdf-reader")
            element.innerHTML = '';

            //We'll create a canvas for each page to draw it on
            let canvas = document.createElement("canvas");
            let context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            //Draw it on the canvas
            page.render({canvasContext: context, viewport: viewport});
            document.getElementById("progressRead").style.width = `${(page._pageIndex + 1) * 100 / pdf._pdfInfo.numPages}%`

            //Add it to the web page
            element.appendChild(canvas);
        });
    }

    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum = pageNum - 1;

        let myNode = document.getElementById("pdf-reader");
        myNode.innerHTML = '';

        renderR(pageNum);
    }

    //document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    function onNextPage() {
        if (pageNum >= pdf.numPages) {
            return;
        }
        pageNum = pageNum + 1;

        let myNode = document.getElementById("pdf-reader");
        myNode.innerHTML = '';

        renderR(pageNum);
    }

    //document.getElementById('next').addEventListener('click', onNextPage);

    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        switch (key) {
            case "ArrowLeft":
                onPrevPage()
                break;
            case "ArrowRight":
                onNextPage()
                break
        }
    });

    renderR(pageNum)

    /*let pageList = document.getElementById("page-list")
    for (let i = 0; i < pdf._pdfInfo.numPages; i++) {
        let pages = document.createElement('div')
        pages.style.textAlign = "center"
        pages.style.backgroundColor = "red"
        pages.style.border = "solid 1px green"
        pages.style.flex = "1"
        pages.innerHTML = `${i + 1}`
        pages.onclick = function () {
            pageNum = i + 1
            renderR(pageNum)
        }
        pageList.appendChild(pages)
    }*/
});
