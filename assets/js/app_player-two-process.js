
let leftPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

leftPage.promise.then(function(pdf) {
    let pageNum = 1;
    function renderR (num) {
        pdf.getPage(num).then(function (page) {
            let scale = 1;
            let viewport = page.getViewport({scale: scale,});

            let canvas = document.getElementById('page1');
            let context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            let renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);
        });
    }

    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum = pageNum - 2;
        renderR(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    function onNextPage() {
        if (pageNum >= pdf.numPages) {
            return;
        }
        pageNum = pageNum + 2;
        renderR(pageNum);
    }
    document.getElementById('next').addEventListener('click', onNextPage);

    document.body.addEventListener('keydown', function(event)
    {
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
});

let rightPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

rightPage.promise.then(function(pdf) {
    let pageNum = 2;
    function renderR (num) {
        pdf.getPage(num).then(function (page) {
            let scale = 1;
            let viewport = page.getViewport({scale: scale,});

            let canvas = document.getElementById('page2');
            let context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            let renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);

        });
    }

    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum = pageNum - 2;
        renderR(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    function onNextPage() {
        if (pageNum >= pdf.numPages) {
            return;
        }
        pageNum = pageNum + 2;
        renderR(pageNum);
    }
    document.getElementById('next').addEventListener('click', onNextPage);

    document.body.addEventListener('keydown', function(event)
    {
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
});

