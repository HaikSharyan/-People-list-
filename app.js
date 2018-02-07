var container = document.getElementById("names-container");
var dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {

}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {

    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl != this) {
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin',dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);
    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

}

function get_random_color() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb("+ r + "," + g + ","  + b +")";
}

function getValue() {
    var value = document.getElementById("select-name").value;
    var name = document.createElement("LI");
    name.innerHTML = value;
    name.setAttribute("class", "column");
    name.setAttribute("draggable","true");
    name.style.backgroundColor = get_random_color();
    container.appendChild(name);
    var cols = document.querySelectorAll('#names-container .column');
    if(cols.length > 0  && cols.length < 7){
        document.getElementById("names-container").classList.add("opacity");
    } else {
        document.getElementById("names-container").classList.remove("opacity");
        [].forEach.call(cols, addDnDHandlers);
    }
    document.getElementById("select-name").value = "";
}

