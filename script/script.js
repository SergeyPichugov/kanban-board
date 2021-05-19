'use strict';

let movingTask = null;

function startDragging(e) {
   this.classList.add('dragging');
   movingTask = this;
   e.dataTransfer.effectAllowed = 'move';
   e.dataTransfer.setData('text/html', this.innerHTML);
}

function stopDragging(e) {
   movingTask.classList.remove('dragging');
   movingTask = null;
}

function doneItems() {
   const numDone = document.querySelectorAll('.done .board-item'),
      zInd = 1,
      top = 25,
      left = 25;

   let tmp = 1;

   if (numDone) {
      numDone.forEach((item, i) => {
         if (i % 5 === 0) {
            tmp = 0;
         } else {
            tmp++;
         }

         item.classList.add('task-done');
         item.style.zIndex = `${i * zInd}`;
         item.style.top = `${i * top}px`;
         item.style.left = `${tmp * left}px`;
      });
   }
}

function drop(e) {
   if (e.stopPropagation) {
      e.stopPropagation();
   }
   this.append(movingTask);

   doneItems();
   return false;
}

function dragWithin(e) {
   if (e.preventDefault) {
      e.preventDefault();
   }
   e.dataTransfer.dropEffect = 'move';
   return false;
}

function dragInto(e) {
   if (this.closest('.done')) {
      movingTask.classList.add('task-done');
   }
}

function dragOut(e) {
   movingTask.classList.remove('task-done');
}

doneItems();

let cards = document.querySelectorAll('.board-item');

[].forEach.call(cards, function (card) {
   card.addEventListener('dragstart', startDragging, false);
   card.addEventListener('dragend', stopDragging, false);
});

let columns = document.querySelectorAll('.board-column-content');
[].forEach.call(columns, function (column) {
   column.addEventListener('dragenter', dragInto, false);   
   column.addEventListener('dragover', dragWithin, false);
   column.addEventListener('dragleave', dragOut, false);   
   column.addEventListener('drop', drop, false);
});



