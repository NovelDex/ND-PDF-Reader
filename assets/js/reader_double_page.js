let leftPage = pdfjsLib.getDocument('./[MS] Chapitre 1 FR.pdf');

leftPage.promise.then(function(pdf) {
    let thePDF = pdf
    let pageNum = 1;
    let vPage = 2;
    let winHeight;
    let winWidht;
    let res;


    function renderR (num) {
        pdf.getPage(num).then(function (page) { handlePages(page) });
    }
    renderR(pageNum)

    function handlePages(page)
    {
        //This gives us the page's dimensions at full scale
        let viewport = page.getViewport({scale: 1,});
        viewport = page.getViewport({scale: window.innerHeight/viewport.height})
        let element = document.getElementById("pdf-reader")

        //We'll create a canvas for each page to draw it on
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;


        /*if (canvas.width > canvas.height) {
            vPage = 1;
            page.render({canvasContext: context, viewport: viewport});
            return element.appendChild(canvas);
        }*/

        //Draw it on the canvas
        page.render({canvasContext: context, viewport: viewport});

        //Add it to the web page
        element.appendChild(canvas);

        function getCount(parent){
            let relevantChildren = 0;
            let children = parent.childNodes.length;
            for(let i=0; i < children; i++){
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
        if (pageNum <= 3 && vPage === 2) {
            return;
        } else if (pageNum <= 1 && vPage === 1) {
            return;
        }

        //(vPage === 2) ? pageNum = pageNum - 3 : pageNum = pageNum - 2;

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

        let element = document.getElementById("pdf-reader");
        element.innerHTML = '';

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