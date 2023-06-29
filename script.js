const creationZone = document.getElementById('creationZone');
const moveZone = document.getElementById('moveZone');
const deleteZone = document.getElementById('deleteZone');
const addButton = document.getElementById('addButton');

let draggableCount = 0;

addButton.addEventListener('click', function () { //Agrega un div para arrastrar
    const newDiv = document.createElement('div');
    const newId = 'draggable_' + draggableCount++;
    newDiv.classList.add('draggable');
    newDiv.id = newId;
    newDiv.textContent = 'Arrastrado ' + draggableCount;
    creationZone.appendChild(newDiv);

    newDiv.draggable = true;
    newDiv.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.effectAllowed = 'move';
    });
});

moveZone.addEventListener('dragover', function (event) {
    event.preventDefault();
});

moveZone.addEventListener('drop', function (event) { //Recibir el div de arrastrado en la zona para mover.
    event.preventDefault();
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    if (draggedElement.parentNode === creationZone || draggedElement.parentNode === deleteZone) {
        moveZone.appendChild(draggedElement);
    }
});

deleteZone.addEventListener('dragover', function (event) {
    event.preventDefault();
});

deleteZone.addEventListener('drop', function (event) { //Borra el div que es arrastrado hasta aca.
    event.preventDefault();
    const draggedElementId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    if (draggedElement.parentNode === creationZone || draggedElement.parentNode === moveZone) {
        draggedElement.remove();
    }
});
