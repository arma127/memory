document.querySelector(".control-buttons span").onclick = function() {
    document.getElementById('song').play();

    // Спрашиваем имя юзера
    let userName = prompt("Enter your name");
    if (userName == null || userName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".name span").innerHTML = userName;
    }
    // Убираем кнопку Start
    document.querySelector(".control-buttons").remove();
};

// Тайм в 1000 милисекундах
let duration = 1000;

// Объявляем переменную blocksContainer, где memory-game-blocks равен селектору CSS
let blocksContainer = document.querySelector(".memory-game-blocks");

// Массив детей элементов контейнера blocksContainer(в нашем случае memory-game-blocks)
let blocks = Array.from(blocksContainer.children);


// let orderRange = [...Array(blocks.length).keys()];

// Создаем массив от 0 до blocks.lenght - 1
let orderRange = Array.from(Array(blocks.length).keys());


// console.log(orderRange);
shuffle(orderRange)
    // console.log(orderRange);

// Добавляем ордер CSS к блокам

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Добавляем клик эвент

    block.addEventListener('click', function() {
        flipBlock(block);
    });

});

// Функция флип

function flipBlock(selectedBlock) {

    // Добавляем класс is-flipped
    selectedBlock.classList.add('is-flipped');

    // Добаволяем все первернутые блоки через фильтр
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // Если два блока выбраны
    if (allFlippedBlocks.length === 2) {


        // console.log('Two Flipped Blocks Selected');

        // Функция Стоп
        stopClicking();

        // Чекаем выбранные блоки
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Функция Стоп

function stopClicking() {
    // Добавляем класс ноу кликинг

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        //  Убираем класс ноу кликинг после таймаута

        blocksContainer.classList.remove('no-clicking');
    }, duration);
}


// Проверка блоков
function checkMatchedBlocks(firstBlock, secondBlock) {;
    let triesElement = document.querySelector('.tries span');
    // Если первый блок равен второму
    if (firstBlock.dataset.image === secondBlock.dataset.image) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');



    } else {
        // Добавляем count попыток
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
    const unmatchedBlocks = blocks.filter(block => !block.classList.contains('has-match'));
    if (unmatchedBlocks.length === 0) {
        document.querySelector('.restart-button').style.display = 'block';
    }
}


// Функция перемешки
function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Объявляем рандом число
        random = Math.floor(Math.random() * current);


        current--;

        // Бабл сорт
        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }

    return array;
}

// function restartGame() {
//     // Reset block positions and classes
//     restartGame.addEventListener('click', function()) {
//         orderRange = Array.from(Array(blocks.length).keys());
//         shuffle(orderRange);
//         blocks.forEach((block, index) => {
//             block.style.order = orderRange[index];
//             block.classList.remove('is-flipped', 'has-match');
//             document.querySelector('.tries span').textContent = 0;
//             document.querySelector('.restart-button').style.display = 'none';
//         });
//     };