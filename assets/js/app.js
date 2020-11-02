var leftPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

leftPage.promise.then(function(pdf) {
    let pageNum = 1;
    function renderR (num) {
        pdf.getPage(num).then(function (page) {
            var scale = 1.5;
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

    renderR(pageNum)
});

var rightPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

rightPage.promise.then(function(pdf) {
    let pageNum = 2;
    function renderR (num) {
        pdf.getPage(num).then(function (page) {
            var scale = 1.5;
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

    renderR(pageNum)
});




