
var leftPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

leftPage.promise.then(async function(pdf) {
    let pageNum = 1;
    async function renderR (num) {
        pdf.getPage(num).then(function (page) {
            var scale = 1;
            var viewport = page.getViewport({scale: scale,});

            var canvas = document.getElementById('page1');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);
        });
    }

    async function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum = pageNum - 2;
        await renderR(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    async function onNextPage() {
        if (pageNum >= pdf.numPages) {
            return;
        }
        pageNum = pageNum + 2;
        await renderR(pageNum);
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

    await renderR(pageNum)
});

var rightPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

rightPage.promise.then(async function(pdf) {
    let pageNum = 2;
    async function renderR (num) {
        pdf.getPage(num).then(function (page) {
            var scale = 1;
            var viewport = page.getViewport({scale: scale,});

            var canvas = document.getElementById('page2');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);

        });
    }

    async function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum = pageNum - 2;
        await renderR(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage);

    /**
     * Displays next page.
     */
    async function onNextPage() {
        if (pageNum >= pdf.numPages) {
            return;
        }
        pageNum = pageNum + 2;
        await renderR(pageNum);
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

    await renderR(pageNum)
});

