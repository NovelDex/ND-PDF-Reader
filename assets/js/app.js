let leftPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

leftPage.promise.then(function(pdf) {
    let thePDF = pdf
    let pageNum = 1;

    function renderR (num) {
        pdf.getPage(num).then(handlePages);
    }
    renderR(pageNum)

    function handlePages(page)
    {
        //This gives us the page's dimensions at full scale
        let viewport = page.getViewport({scale: 1,});
        let element = document.getElementById("pdf-reader")

        //We'll create a canvas for each page to draw it on
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //Draw it on the canvas
        page.render({canvasContext: context, viewport: viewport});

        //Add it to the web page
        element.appendChild(canvas);

        function getCount(parent){
            var relevantChildren = 0;
            var children = parent.childNodes.length;
            for(var i=0; i < children; i++){
                if(parent.childNodes[i].nodeType != 3){
                    relevantChildren++;
                }
            }
            return relevantChildren;
        }

        //Move to next page
        if (getCount(element) < 2)
        {
            pageNum++;
            thePDF.getPage(pageNum).then(handlePages);
        }
    }

    function onPrevPage() {
        if (pageNum <= 3) {
            return;
        }
        pageNum = pageNum - 3;
        let myNode = document.getElementById("pdf-reader");
        myNode.innerHTML = '';

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
        pageNum = pageNum + 1;

        let myNode = document.getElementById("pdf-reader");
        myNode.innerHTML = '';

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
});