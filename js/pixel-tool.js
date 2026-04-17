(function () {
  var EMPTY_COLOR = '#ffffff';
  var palette = ['#ffffff', '#2f2735', '#ff7f50', '#4db8ff', '#ffe066', '#69d5b1', '#ff5d8f', '#f49ac2', '#8fd3ff', '#ffb347', '#9bde7e', '#c9b6ff'];
  var currentColor = palette[2];
  var currentSize = 16;
  var lastGeneratedPattern = '';
  var lastPatternIndex = -1;

  var patternLibrary = [
    {
      label: '一朵像素小花',
      pixels: [
        { x: 3, y: 0, color: '#ff5d8f' },
        { x: 4, y: 0, color: '#ff5d8f' },
        { x: 2, y: 1, color: '#ff5d8f' },
        { x: 5, y: 1, color: '#ff5d8f' },
        { x: 2, y: 2, color: '#ff5d8f' },
        { x: 5, y: 2, color: '#ff5d8f' },
        { x: 3, y: 3, color: '#ff5d8f' },
        { x: 4, y: 3, color: '#ff5d8f' },
        { x: 3, y: 1, color: '#ffe066' },
        { x: 4, y: 1, color: '#ffe066' },
        { x: 3, y: 2, color: '#ffe066' },
        { x: 4, y: 2, color: '#ffe066' },
        { x: 3, y: 4, color: '#69d5b1' },
        { x: 4, y: 4, color: '#69d5b1' },
        { x: 3, y: 5, color: '#69d5b1' },
        { x: 4, y: 5, color: '#69d5b1' },
        { x: 2, y: 5, color: '#9bde7e' },
        { x: 5, y: 5, color: '#9bde7e' },
        { x: 3, y: 6, color: '#69d5b1' },
        { x: 4, y: 6, color: '#69d5b1' }
      ]
    },
    {
      label: '一颗像素太阳',
      pixels: [
        { x: 3, y: 0, color: '#ffb347' },
        { x: 4, y: 0, color: '#ffb347' },
        { x: 1, y: 1, color: '#ffb347' },
        { x: 3, y: 1, color: '#ffb347' },
        { x: 4, y: 1, color: '#ffb347' },
        { x: 6, y: 1, color: '#ffb347' },
        { x: 0, y: 3, color: '#ffb347' },
        { x: 1, y: 3, color: '#ffb347' },
        { x: 6, y: 3, color: '#ffb347' },
        { x: 7, y: 3, color: '#ffb347' },
        { x: 0, y: 4, color: '#ffb347' },
        { x: 1, y: 4, color: '#ffb347' },
        { x: 6, y: 4, color: '#ffb347' },
        { x: 7, y: 4, color: '#ffb347' },
        { x: 1, y: 6, color: '#ffb347' },
        { x: 3, y: 6, color: '#ffb347' },
        { x: 4, y: 6, color: '#ffb347' },
        { x: 6, y: 6, color: '#ffb347' },
        { x: 3, y: 7, color: '#ffb347' },
        { x: 4, y: 7, color: '#ffb347' },
        { x: 2, y: 2, color: '#ffe066' },
        { x: 3, y: 2, color: '#ffe066' },
        { x: 4, y: 2, color: '#ffe066' },
        { x: 5, y: 2, color: '#ffe066' },
        { x: 2, y: 3, color: '#ffe066' },
        { x: 3, y: 3, color: '#ffe066' },
        { x: 4, y: 3, color: '#ffe066' },
        { x: 5, y: 3, color: '#ffe066' },
        { x: 2, y: 4, color: '#ffe066' },
        { x: 3, y: 4, color: '#ffe066' },
        { x: 4, y: 4, color: '#ffe066' },
        { x: 5, y: 4, color: '#ffe066' },
        { x: 2, y: 5, color: '#ffe066' },
        { x: 3, y: 5, color: '#ffe066' },
        { x: 4, y: 5, color: '#ffe066' },
        { x: 5, y: 5, color: '#ffe066' }
      ]
    },
    {
      label: '一颗像素爱心',
      pixels: [
        { x: 2, y: 1, color: '#ff5d8f' },
        { x: 3, y: 1, color: '#ff5d8f' },
        { x: 4, y: 1, color: '#ff5d8f' },
        { x: 5, y: 1, color: '#ff5d8f' },
        { x: 1, y: 2, color: '#ff5d8f' },
        { x: 2, y: 2, color: '#ff5d8f' },
        { x: 3, y: 2, color: '#f49ac2' },
        { x: 4, y: 2, color: '#f49ac2' },
        { x: 5, y: 2, color: '#ff5d8f' },
        { x: 6, y: 2, color: '#ff5d8f' },
        { x: 1, y: 3, color: '#ff5d8f' },
        { x: 2, y: 3, color: '#ff5d8f' },
        { x: 3, y: 3, color: '#ff5d8f' },
        { x: 4, y: 3, color: '#ff5d8f' },
        { x: 5, y: 3, color: '#ff5d8f' },
        { x: 6, y: 3, color: '#ff5d8f' },
        { x: 2, y: 4, color: '#ff5d8f' },
        { x: 3, y: 4, color: '#ff5d8f' },
        { x: 4, y: 4, color: '#ff5d8f' },
        { x: 5, y: 4, color: '#ff5d8f' },
        { x: 3, y: 5, color: '#ff5d8f' },
        { x: 4, y: 5, color: '#ff5d8f' },
        { x: 3, y: 6, color: '#ff5d8f' },
        { x: 4, y: 6, color: '#ff5d8f' }
      ]
    },
    {
      label: '一枚像素星星',
      pixels: [
        { x: 3, y: 0, color: '#ffe066' },
        { x: 4, y: 0, color: '#ffe066' },
        { x: 3, y: 1, color: '#ffe066' },
        { x: 4, y: 1, color: '#ffe066' },
        { x: 0, y: 2, color: '#ffb347' },
        { x: 1, y: 2, color: '#ffb347' },
        { x: 2, y: 2, color: '#ffe066' },
        { x: 3, y: 2, color: '#ffe066' },
        { x: 4, y: 2, color: '#ffe066' },
        { x: 5, y: 2, color: '#ffe066' },
        { x: 6, y: 2, color: '#ffb347' },
        { x: 7, y: 2, color: '#ffb347' },
        { x: 1, y: 3, color: '#ffb347' },
        { x: 2, y: 3, color: '#ffe066' },
        { x: 3, y: 3, color: '#ffe066' },
        { x: 4, y: 3, color: '#ffe066' },
        { x: 5, y: 3, color: '#ffe066' },
        { x: 6, y: 3, color: '#ffb347' },
        { x: 2, y: 4, color: '#ffe066' },
        { x: 3, y: 4, color: '#ffe066' },
        { x: 4, y: 4, color: '#ffe066' },
        { x: 5, y: 4, color: '#ffe066' },
        { x: 2, y: 5, color: '#ffb347' },
        { x: 3, y: 5, color: '#ffe066' },
        { x: 4, y: 5, color: '#ffe066' },
        { x: 5, y: 5, color: '#ffb347' },
        { x: 1, y: 6, color: '#ffb347' },
        { x: 2, y: 6, color: '#ffe066' },
        { x: 5, y: 6, color: '#ffe066' },
        { x: 6, y: 6, color: '#ffb347' }
      ]
    }
  ];

  /**
   * Create one pixel cell button.
   * @returns {HTMLButtonElement} Pixel cell element.
   */
  function createCell() {
    var cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'pixel-cell';
    cell.dataset.color = EMPTY_COLOR;
    cell.setAttribute('aria-label', '像素格');
    return cell;
  }

  /**
   * Mark the selected swatch button.
   * @param {HTMLElement} container Swatch container.
   * @param {HTMLElement} swatch Active swatch element.
   * @returns {void}
   */
  function setActiveSwatch(container, swatch) {
    container.querySelectorAll('.swatch').forEach(function (item) {
      item.classList.toggle('is-active', item === swatch);
    });
  }

  /**
   * Mark the selected grid size button.
   * @param {HTMLElement} container Size button container.
   * @param {HTMLElement} button Active button.
   * @returns {void}
   */
  function setActiveGridButton(container, button) {
    container.querySelectorAll('.grid-toggle').forEach(function (item) {
      item.classList.toggle('is-active', item === button);
    });
  }

  /**
   * Build the drawing board with the selected size.
   * @param {HTMLElement} board Pixel board element.
   * @param {number} size Grid size.
   * @returns {void}
   */
  function renderBoard(board, size) {
    board.innerHTML = '';
    board.style.setProperty('--pixel-grid-columns', String(size));
    currentSize = size;
    lastGeneratedPattern = '';
    for (var index = 0; index < size * size; index += 1) {
      board.appendChild(createCell());
    }
  }

  /**
   * Paint one cell by coordinates.
   * @param {HTMLElement} board Pixel board element.
   * @param {number} size Grid size.
   * @param {number} x Horizontal coordinate.
   * @param {number} y Vertical coordinate.
   * @param {string} color Hex color value.
   * @returns {void}
   */
  function paintCell(board, size, x, y, color) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    var cell = board.children[y * size + x];
    if (!cell) return;
    cell.style.backgroundColor = color;
    cell.dataset.color = color;
  }

  /**
   * Reset the board to blank white cells.
   * @param {HTMLElement} board Pixel board element.
   * @returns {void}
   */
  function clearBoard(board) {
    board.querySelectorAll('.pixel-cell').forEach(function (cell) {
      cell.style.backgroundColor = EMPTY_COLOR;
      cell.dataset.color = EMPTY_COLOR;
    });
    lastGeneratedPattern = '';
  }

  /**
   * Collect used colors from the current board.
   * @param {HTMLElement} board Pixel board element.
   * @returns {number} Number of unique non-white colors used.
   */
  function countUsedColors(board) {
    var colorMap = Object.create(null);
    board.querySelectorAll('.pixel-cell').forEach(function (cell) {
      var color = cell.dataset.color;
      if (color && color !== EMPTY_COLOR) {
        colorMap[color] = true;
      }
    });
    return Object.keys(colorMap).length;
  }

  /**
   * Draw one pattern on the board.
   * @param {HTMLElement} board Pixel board element.
   * @param {{ label: string, pixels: Array<{x:number, y:number, color:string}> }} pattern Pattern config.
   * @returns {void}
   */
  function drawPattern(board, pattern) {
    var scale = currentSize / 8;
    clearBoard(board);

    pattern.pixels.forEach(function (pixel) {
      for (var offsetY = 0; offsetY < scale; offsetY += 1) {
        for (var offsetX = 0; offsetX < scale; offsetX += 1) {
          paintCell(board, currentSize, pixel.x * scale + offsetX, pixel.y * scale + offsetY, pixel.color);
        }
      }
    });

    lastGeneratedPattern = pattern.label;
  }

  /**
   * Pick one pattern at random and avoid immediate repeats when possible.
   * @returns {{ label: string, pixels: Array<{x:number, y:number, color:string}> }} One pattern item.
   */
  function getRandomPattern() {
    var nextIndex = Math.floor(Math.random() * patternLibrary.length);
    if (patternLibrary.length > 1 && nextIndex === lastPatternIndex) {
      nextIndex = (nextIndex + 1) % patternLibrary.length;
    }
    lastPatternIndex = nextIndex;
    return patternLibrary[nextIndex];
  }

  /**
   * Show export modal with the generated share text.
   * @param {HTMLElement} modal Modal element.
   * @param {HTMLElement} board Pixel board element.
   * @returns {void}
   */
  function openExportModal(modal, board) {
    var result = modal.querySelector('[data-export-text]');
    var usedColors = countUsedColors(board);
    var message = '我用[' + usedColors + ']种颜色画了一幅' + currentSize + '×' + currentSize + '的像素画！';
    if (lastGeneratedPattern) {
      message = '我用[' + usedColors + ']种颜色拼出' + lastGeneratedPattern + '，画板尺寸是' + currentSize + '×' + currentSize + '！';
    }
    result.textContent = message;
    modal.classList.add('is-visible');
  }

  /**
   * Hide export modal.
   * @param {HTMLElement} modal Modal element.
   * @returns {void}
   */
  function closeExportModal(modal) {
    modal.classList.remove('is-visible');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var board = document.querySelector('[data-pixel-board]');
    var paletteBox = document.querySelector('[data-pixel-palette]');
    var sizeBox = document.querySelector('[data-grid-switcher]');
    var modal = document.querySelector('[data-export-modal]');

    if (!board || !paletteBox || !sizeBox || !modal) return;

    renderBoard(board, 16);

    palette.forEach(function (color, index) {
      var swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'swatch';
      swatch.style.backgroundColor = color;
      swatch.dataset.color = color;
      swatch.setAttribute('aria-label', '选择颜色 ' + color);
      if (index === 2) {
        swatch.classList.add('is-active');
      }
      paletteBox.appendChild(swatch);
    });

    paletteBox.addEventListener('click', function (event) {
      var swatch = event.target.closest('.swatch');
      if (!swatch) return;
      currentColor = swatch.dataset.color;
      setActiveSwatch(paletteBox, swatch);
    });

    board.addEventListener('click', function (event) {
      var cell = event.target.closest('.pixel-cell');
      if (!cell) return;
      cell.style.backgroundColor = currentColor;
      cell.dataset.color = currentColor;
      lastGeneratedPattern = '';
    });

    sizeBox.addEventListener('click', function (event) {
      var button = event.target.closest('.grid-toggle');
      if (!button) return;
      var size = Number(button.dataset.gridSize || 16);
      setActiveGridButton(sizeBox, button);
      renderBoard(board, size);
    });

    var clearButton = document.querySelector('[data-tool-clear]');
    var randomButton = document.querySelector('[data-tool-random]');
    var exportButton = document.querySelector('[data-tool-export]');
    var closeButton = document.querySelector('[data-export-close]');

    if (clearButton) {
      clearButton.addEventListener('click', function () {
        clearBoard(board);
      });
    }

    if (randomButton) {
      randomButton.addEventListener('click', function () {
        drawPattern(board, getRandomPattern());
      });
    }

    if (exportButton) {
      exportButton.addEventListener('click', function () {
        openExportModal(modal, board);
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        closeExportModal(modal);
      });
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeExportModal(modal);
      }
    });
  });
})();
