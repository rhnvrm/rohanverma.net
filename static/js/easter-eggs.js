// ==========================
// Easter Eggs for Developer's Notebook × Terminal Site
// ==========================

(function() {
  'use strict';

  // ========== GAME OF LIFE EASTER EGG ==========

  class GameOfLife {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.grid = [];
      this.cellSize = 12;
      this.running = false;
      this.generation = 0;
      this.theme = document.documentElement.getAttribute('data-theme') ||
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    initialize() {
      // Create full-screen overlay
      const overlay = document.createElement('div');
      overlay.id = 'game-of-life-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: ${this.theme === 'dark' ? '#000000' : '#f7f5f0'};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-in;
      `;

      // Create canvas
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      // Set canvas size
      const cols = Math.floor(window.innerWidth / this.cellSize);
      const rows = Math.floor((window.innerHeight - 100) / this.cellSize);
      this.canvas.width = cols * this.cellSize;
      this.canvas.height = rows * this.cellSize;
      this.cols = cols;
      this.rows = rows;

      // Style canvas
      this.canvas.style.cssText = `
        border: 2px solid ${this.theme === 'dark' ? '#ffb000' : '#1a4d7a'};
        box-shadow: ${this.theme === 'dark' ?
          '0 0 20px rgba(255, 176, 0, 0.3)' :
          '0 4px 12px rgba(0, 0, 0, 0.1)'};
      `;

      // Create controls
      const controls = this.createControls();

      overlay.appendChild(this.canvas);
      overlay.appendChild(controls);
      document.body.appendChild(overlay);

      // Initialize grid with random pattern
      this.initializeGrid();

      // Start animation
      this.running = true;
      this.animate();

      // Add keyboard shortcut to close (Escape)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      });

      // Add click to toggle cells
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
          this.grid[y][x] = !this.grid[y][x];
        }
      });
    }

    createControls() {
      const controls = document.createElement('div');
      controls.style.cssText = `
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        font-family: "IBM Plex Mono", "Courier Prime", monospace;
        font-size: 0.875rem;
        color: ${this.theme === 'dark' ? '#ffb000' : '#1a4d7a'};
        align-items: center;
      `;

      const buttonStyle = `
        background: ${this.theme === 'dark' ? '#0a0a00' : '#eae7df'};
        border: 1px solid ${this.theme === 'dark' ? '#ffb000' : '#1a4d7a'};
        color: ${this.theme === 'dark' ? '#ffb000' : '#1a4d7a'};
        padding: 0.5rem 1rem;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
      `;

      // Generation counter
      const counter = document.createElement('div');
      counter.id = 'generation-counter';
      counter.style.cssText = `
        padding: 0.5rem 1rem;
        border: 1px solid ${this.theme === 'dark' ? '#332800' : '#c7bfb0'};
        background: ${this.theme === 'dark' ? '#0a0a00' : '#eae7df'};
      `;
      counter.innerHTML = this.theme === 'dark' ?
        `<span style="color: #ff9500;">$</span> generation: <span style="color: #ffcc00;">0</span>` :
        `Generation: <span style="font-weight: 600;">0</span>`;

      // Play/Pause button
      const playPauseBtn = document.createElement('button');
      playPauseBtn.textContent = '⏸ Pause';
      playPauseBtn.style.cssText = buttonStyle;
      playPauseBtn.addEventListener('click', () => {
        this.running = !this.running;
        playPauseBtn.textContent = this.running ? '⏸ Pause' : '▶ Play';
        if (this.running) this.animate();
      });
      playPauseBtn.addEventListener('mouseenter', () => {
        playPauseBtn.style.background = this.theme === 'dark' ? '#141408' : '#d4cec0';
      });
      playPauseBtn.addEventListener('mouseleave', () => {
        playPauseBtn.style.background = this.theme === 'dark' ? '#0a0a00' : '#eae7df';
      });

      // Reset button
      const resetBtn = document.createElement('button');
      resetBtn.textContent = '↻ Reset';
      resetBtn.style.cssText = buttonStyle;
      resetBtn.addEventListener('click', () => {
        this.generation = 0;
        this.initializeGrid();
        this.updateCounter(counter);
      });
      resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.background = this.theme === 'dark' ? '#141408' : '#d4cec0';
      });
      resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.background = this.theme === 'dark' ? '#0a0a00' : '#eae7df';
      });

      // Clear button
      const clearBtn = document.createElement('button');
      clearBtn.textContent = '✕ Clear';
      clearBtn.style.cssText = buttonStyle;
      clearBtn.addEventListener('click', () => {
        this.generation = 0;
        this.clearGrid();
        this.updateCounter(counter);
      });
      clearBtn.addEventListener('mouseenter', () => {
        clearBtn.style.background = this.theme === 'dark' ? '#141408' : '#d4cec0';
      });
      clearBtn.addEventListener('mouseleave', () => {
        clearBtn.style.background = this.theme === 'dark' ? '#0a0a00' : '#eae7df';
      });

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '⌨ ESC to Close';
      closeBtn.style.cssText = buttonStyle;
      closeBtn.addEventListener('click', () => this.close());
      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = this.theme === 'dark' ? '#141408' : '#d4cec0';
      });
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = this.theme === 'dark' ? '#0a0a00' : '#eae7df';
      });

      controls.appendChild(counter);
      controls.appendChild(playPauseBtn);
      controls.appendChild(resetBtn);
      controls.appendChild(clearBtn);
      controls.appendChild(closeBtn);

      return controls;
    }

    initializeGrid() {
      this.grid = [];
      for (let y = 0; y < this.rows; y++) {
        this.grid[y] = [];
        for (let x = 0; x < this.cols; x++) {
          // Random initialization with ~25% alive
          this.grid[y][x] = Math.random() < 0.25;
        }
      }
      this.draw();
    }

    clearGrid() {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          this.grid[y][x] = false;
        }
      }
      this.draw();
    }

    updateCounter(counter) {
      counter.innerHTML = this.theme === 'dark' ?
        `<span style="color: #ff9500;">$</span> generation: <span style="color: #ffcc00;">${this.generation}</span>` :
        `Generation: <span style="font-weight: 600;">${this.generation}</span>`;
    }

    draw() {
      // Clear canvas
      this.ctx.fillStyle = this.theme === 'dark' ? '#000000' : '#f7f5f0';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.theme === 'dark') {
        // Terminal mode: ASCII-style with glow
        this.ctx.fillStyle = '#ffb000';
        this.ctx.font = `${this.cellSize - 2}px "IBM Plex Mono", monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Add glow effect
        this.ctx.shadowColor = 'rgba(255, 176, 0, 0.5)';
        this.ctx.shadowBlur = 4;

        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            if (this.grid[y][x]) {
              const chars = ['█', '▓', '▒', '●', '■'];
              const char = chars[Math.floor(Math.random() * chars.length)];
              this.ctx.fillText(
                char,
                x * this.cellSize + this.cellSize / 2,
                y * this.cellSize + this.cellSize / 2
              );
            }
          }
        }

        // Reset shadow
        this.ctx.shadowBlur = 0;

        // Draw faint grid
        this.ctx.strokeStyle = 'rgba(255, 176, 0, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.cols; x++) {
          this.ctx.beginPath();
          this.ctx.moveTo(x * this.cellSize, 0);
          this.ctx.lineTo(x * this.cellSize, this.canvas.height);
          this.ctx.stroke();
        }
        for (let y = 0; y <= this.rows; y++) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, y * this.cellSize);
          this.ctx.lineTo(this.canvas.width, y * this.cellSize);
          this.ctx.stroke();
        }
      } else {
        // Notebook mode: Ink dots on paper
        this.ctx.fillStyle = '#1a4d7a';

        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
            if (this.grid[y][x]) {
              // Draw ink blot style
              this.ctx.beginPath();
              this.ctx.arc(
                x * this.cellSize + this.cellSize / 2,
                y * this.cellSize + this.cellSize / 2,
                this.cellSize / 3,
                0,
                Math.PI * 2
              );
              this.ctx.fill();
            }
          }
        }

        // Draw subtle grid lines (ruled paper style)
        this.ctx.strokeStyle = 'rgba(180, 160, 140, 0.2)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.cols; x++) {
          this.ctx.beginPath();
          this.ctx.moveTo(x * this.cellSize, 0);
          this.ctx.lineTo(x * this.cellSize, this.canvas.height);
          this.ctx.stroke();
        }
        for (let y = 0; y <= this.rows; y++) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, y * this.cellSize);
          this.ctx.lineTo(this.canvas.width, y * this.cellSize);
          this.ctx.stroke();
        }
      }
    }

    update() {
      const newGrid = [];

      for (let y = 0; y < this.rows; y++) {
        newGrid[y] = [];
        for (let x = 0; x < this.cols; x++) {
          const neighbors = this.countNeighbors(x, y);
          const alive = this.grid[y][x];

          // Conway's rules
          if (alive) {
            newGrid[y][x] = neighbors === 2 || neighbors === 3;
          } else {
            newGrid[y][x] = neighbors === 3;
          }
        }
      }

      this.grid = newGrid;
      this.generation++;

      // Update counter
      const counter = document.getElementById('generation-counter');
      if (counter) {
        this.updateCounter(counter);
      }
    }

    countNeighbors(x, y) {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          const nx = (x + dx + this.cols) % this.cols;
          const ny = (y + dy + this.rows) % this.rows;

          if (this.grid[ny][nx]) count++;
        }
      }
      return count;
    }

    animate() {
      if (!this.running) return;

      this.update();
      this.draw();

      setTimeout(() => {
        requestAnimationFrame(() => this.animate());
      }, 100); // ~10 fps
    }

    close() {
      this.running = false;
      const overlay = document.getElementById('game-of-life-overlay');
      if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => overlay.remove(), 300);
      }
    }
  }

  // ========== CSS ANIMATIONS ==========
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  `;
  document.head.appendChild(style);

  // ========== INITIALIZE ==========
  // Easter eggs are automatically initialized via keydown listener for typed commands

  // Make GameOfLife available globally for debugging
  window.GameOfLife = GameOfLife;

  // ========== SECRET COMMAND PALETTE ==========

  let typedSequence = '';
  let sequenceTimer = null;

  document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input/textarea
    if (e.target.matches('input, textarea, [contenteditable]')) return;

    // Build typed sequence
    if (e.key.length === 1) {
      typedSequence += e.key.toLowerCase();

      clearTimeout(sequenceTimer);
      sequenceTimer = setTimeout(() => {
        typedSequence = '';
      }, 2000);

      // Check for secret commands
      if (typedSequence.includes('matrix')) {
        typedSequence = '';
        launchMatrixRain();
      } else if (typedSequence.includes('life')) {
        typedSequence = '';
        const game = new GameOfLife();
        game.initialize();
      } else if (typedSequence.includes('help')) {
        typedSequence = '';
        showCommandPalette();
      }
    }
  });

  // ========== MATRIX RAIN EASTER EGG ==========

  function launchMatrixRain() {
    const theme = document.documentElement.getAttribute('data-theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const overlay = document.createElement('div');
    overlay.id = 'matrix-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: ${theme === 'dark' ? '#000000' : '#f7f5f0'};
      animation: fadeIn 0.3s ease-in;
    `;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = 'display: block;';

    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    // Matrix rain characters
    const chars = theme === 'dark' ?
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' :
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId;
    const draw = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = theme === 'dark' ?
        'rgba(0, 0, 0, 0.05)' :
        'rgba(247, 245, 240, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = theme === 'dark' ? '#ffb000' : '#1a4d7a';
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;

      // Add glow in dark mode
      if (theme === 'dark') {
        ctx.shadowColor = 'rgba(255, 176, 0, 0.5)';
        ctx.shadowBlur = 8;
      }

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Close on click or Escape
    const close = () => {
      cancelAnimationFrame(animationId);
      overlay.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => overlay.remove(), 300);
    };

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // ========== SECRET COMMAND PALETTE ==========

  function showCommandPalette() {
    const theme = document.documentElement.getAttribute('data-theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const overlay = document.createElement('div');
    overlay.id = 'command-palette-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-in;
      backdrop-filter: blur(4px);
    `;

    const palette = document.createElement('div');
    palette.style.cssText = `
      background: ${theme === 'dark' ? '#0a0a00' : '#eae7df'};
      border: 2px solid ${theme === 'dark' ? '#ffb000' : '#1a4d7a'};
      padding: 2rem;
      border-radius: 4px;
      max-width: 500px;
      width: 90%;
      font-family: "IBM Plex Mono", monospace;
      color: ${theme === 'dark' ? '#ffb000' : '#1a4d7a'};
      box-shadow: ${theme === 'dark' ?
        '0 0 20px rgba(255, 176, 0, 0.3)' :
        '0 8px 24px rgba(0, 0, 0, 0.2)'};
    `;

    palette.innerHTML = `
      <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem; border-bottom: 2px solid ${theme === 'dark' ? '#332800' : '#c7bfb0'}; padding-bottom: 0.5rem;">
        ${theme === 'dark' ? '$ ' : ''}Secret Commands
      </h2>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
          <span style="position: absolute; left: 0; color: ${theme === 'dark' ? '#ff9500' : '#525252'};">&gt;</span>
          <strong>life</strong> — Launch Conway's Game of Life
        </li>
        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
          <span style="position: absolute; left: 0; color: ${theme === 'dark' ? '#ff9500' : '#525252'};">&gt;</span>
          <strong>matrix</strong> — Activate Matrix rain effect
        </li>
        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
          <span style="position: absolute; left: 0; color: ${theme === 'dark' ? '#ff9500' : '#525252'};">&gt;</span>
          <strong>ascii</strong> — Toggle ASCII art logo
        </li>
        <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
          <span style="position: absolute; left: 0; color: ${theme === 'dark' ? '#ff9500' : '#525252'};">&gt;</span>
          <strong>help</strong> — Show this command palette
        </li>
      </ul>
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid ${theme === 'dark' ? '#332800' : '#c7bfb0'}; font-size: 0.875rem; opacity: 0.8;">
        Type anywhere on the page (outside inputs) • Press ESC to close
      </div>
    `;

    overlay.appendChild(palette);
    document.body.appendChild(overlay);

    // Close handlers
    const close = () => {
      overlay.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => overlay.remove(), 300);
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // ========== CONSOLE EASTER EGG ==========

  // Fun console message for developers
  console.log(`
%c╔═══════════════════════════════════════════════════════════════╗
║  👋 Hey there, fellow developer!                            ║
║                                                               ║
║  You found the secret console message!                       ║
║                                                               ║
║  🎮 Easter Eggs - Type anywhere on the page:                 ║
║     • "life" → Conway's Game of Life                         ║
║     • "matrix" → Matrix rain effect                          ║
║     • "ascii" → Toggle ASCII art logo                        ║
║     • "help" → Show command palette                          ║
║                                                               ║
║  💻 This site is built with Zola (Rust) + Nix                ║
║     Design: Developer's Notebook × Vintage Terminal          ║
║                                                               ║
║  🔗 Source: github.com/rhnvrm/rohanverma.net                 ║
╚═══════════════════════════════════════════════════════════════╝
`,
    'font-family: "IBM Plex Mono", monospace; color: #ffb000; font-size: 12px; line-height: 1.5;'
  );

  // ========== ASCII ART LOGO EASTER EGG ==========

  function showAsciiLogo() {
    const brand = document.querySelector('.nav-brand, .nav-brand-enhanced');
    if (!brand) return;

    const originalText = brand.textContent;
    const asciiArt = `
 ██▀███   ██░ ██  ███▄    █ ██▒   █▓ ██▀███   ███▄ ▄███▓
▓██ ▒ ██▒▓██░ ██▒ ██ ▀█   █▓██░   █▒▓██ ▒ ██▒▓██▒▀█▀ ██▒
▓██ ░▄█ ▒▒██▀▀██░▓██  ▀█ ██▒▓██  █▒░▓██ ░▄█ ▒▓██    ▓██░
▒██▀▀█▄  ░▓█ ░██ ▓██▒  ▐▌██▒ ▒██ █░░▒██▀▀█▄  ▒██    ▒██
░██▓ ▒██▒░▓█▒░██▓▒██░   ▓██░  ▒▀█░  ░██▓ ▒██▒▒██▒   ░██▒
░ ▒▓ ░▒▓░ ▒ ░░▒░▒░ ▒░   ▒ ▒   ░ ▐░  ░ ▒▓ ░▒▓░░ ▒░   ░  ░
  ░▒ ░ ▒░ ▒ ░▒░ ░░ ░░   ░ ▒░  ░ ░░    ░▒ ░ ▒░░  ░      ░
  ░░   ░  ░  ░░ ░   ░   ░ ░     ░░    ░░   ░ ░      ░
   ░      ░  ░  ░         ░      ░     ░            ░
                                ░
`;

    // Toggle between ASCII and normal
    if (brand.classList.contains('ascii-mode')) {
      brand.innerHTML = originalText;
      brand.classList.remove('ascii-mode');
      brand.style.whiteSpace = 'normal';
      brand.style.fontSize = '';
      brand.style.lineHeight = '';
      brand.style.letterSpacing = '';
    } else {
      brand.innerHTML = `<pre style="margin: 0; font-size: 0.4rem; line-height: 1; letter-spacing: -1px;">${asciiArt}</pre>`;
      brand.classList.add('ascii-mode');
      brand.style.whiteSpace = 'pre';
    }
  }

  // Secret command for ASCII logo
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;

    if (e.key.length === 1) {
      typedSequence += e.key.toLowerCase();

      clearTimeout(sequenceTimer);
      sequenceTimer = setTimeout(() => {
        typedSequence = '';
      }, 2000);

      if (typedSequence.includes('ascii')) {
        typedSequence = '';
        showAsciiLogo();
      }
    }
  });

  // Make easter eggs accessible via window
  window.EasterEggs = {
    gameOfLife: () => {
      const game = new GameOfLife();
      game.initialize();
    },
    matrixRain: launchMatrixRain,
    commandPalette: showCommandPalette,
    help: showCommandPalette,
    asciiLogo: showAsciiLogo
  };

})();
