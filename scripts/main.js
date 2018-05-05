$(document).ready(function(){

    /* Document Elements */
    let cubesContainer = $(".cubesContainer");
    /* End Document Elements */

    /* Control Panel Elements */
    let cellAmount = $("#cellAmount");
    let draw = $("#draw");
    let colourise  = $("#colourise");
    let reset  = $("#reset");

    let cellAmountVal = 0;
    let rowCellAmount = 0;
    let rowCellAmountResidue = 0;
    let rowsAmountAdditional = 0;
    let rowMaxNum = 0;
    /* End Control Panel Elements */

    /* Validations */
    function validateCellAmount() {
        if(cellAmount.val() !== "" && $.isNumeric(cellAmount.val())) {
            return (parseInt(cellAmount.val(), 10) < 4 ||  parseInt(cellAmount.val(), 10) > 100);
        }else {
            return false;
        }
    }
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /* End Validations */

    cellAmount.on("change keyup paste", function() {
        draw.prop('disabled', false);
    });

    draw.click(function() {
        if(validateCellAmount()) {
            alert("Type correct number from 4 to 100");
            return false;
        }

        colourise.add(reset).prop('disabled', false);

        cellAmountVal = cellAmount.val();
        rowCellAmount = Math.floor(Math.sqrt(cellAmountVal));
        rowCellAmountResidue = cellAmountVal - Math.pow(rowCellAmount, 2);
        rowsAmountAdditional = (rowCellAmountResidue < rowCellAmount) ? 1 : Math.ceil(rowCellAmountResidue / rowCellAmount);

        /* Width of each cell */
        let cubesContainerWidth = cubesContainer.width();
        let rowCellWidth = cubesContainerWidth / rowCellAmount;
        let rowIndex = 0;
        let columnIndex = 0;
        /* End Width of each cell */

        /* Start draw */
        cubesContainer.empty();
        for(let i = 0; i < cellAmountVal; i++) {

            if( i % rowCellAmount === 0) {
                rowIndex++;
                columnIndex = 0;
                rowMaxNum = rowIndex;
            }
            columnIndex++;
            cubesContainer.append("<div class='cube index-" + rowIndex +"-"+ columnIndex +"' style='width:" + rowCellWidth +"px; height:" + rowCellWidth / 2 +"px;'></div>");
        }
        /* End drow */
    });

    colourise.click(function() {
        colourise.add(reset).add(draw).prop('disabled', true);
        let rowIndex = 1;
        let columnIndex = 1;
        let currentIndex = 1;
        let interval = setInterval(function(){
            if(columnIndex % (rowMaxNum + rowsAmountAdditional) === 0 ) {
                columnIndex = 1;
                rowIndex++;
            }
            $(".index-" + columnIndex + "-" + rowIndex).css({"background-color": getRandomColor()});
            columnIndex++;

            if(currentIndex > parseInt(cellAmountVal, 10) + 10 ) {
                clearInterval(interval);
                colourise.add(reset).add(draw).prop('disabled', false);
                return true;
            }
            currentIndex++;
        }, 150);
    });

    reset.click(function() {
        cellAmount.val("");
        cubesContainer.empty();
        colourise.add(reset).prop('disabled', true);
    })



});