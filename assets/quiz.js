/* ============================================================
   Reusable quiz widget for The Art of Learning lessons.
   Usage in a lesson:
     <div class="quiz" data-quiz='[ ...JSON... ]'></div>
     <script src="../assets/quiz.js"></script>
   Each quiz item:
     { "q": "question (HTML ok)",
       "options": ["A","B","C","D"],   // keep options equal-length on purpose
       "answer": 2,                      // index of correct option
       "why": "explanation shown after answering (HTML ok)" }
   Gives immediate, automatic feedback — the tight loop that builds
   storage strength through retrieval practice.
   ============================================================ */
(function () {
  var css = `
  .quiz{font-family:var(--sans);margin:1.6rem 0;}
  .quiz-card{border:1px solid var(--rule);border-radius:8px;background:#fff;padding:1rem 1.1rem;margin:0.9rem 0;}
  .quiz-q{font-weight:600;color:var(--ink);margin:0 0 .7rem;line-height:1.45;}
  .quiz-q .n{color:var(--accent);margin-right:.4rem;}
  .quiz-opt{display:block;width:100%;text-align:left;border:1px solid var(--rule);background:#fdfcf8;
    border-radius:6px;padding:.6rem .8rem;margin:.4rem 0;cursor:pointer;font-size:.95rem;color:var(--ink);
    transition:background .12s,border-color .12s;font-family:var(--sans);}
  .quiz-opt:hover{border-color:var(--accent-2);}
  .quiz-opt.correct{background:#e7f1ec;border-color:#2f5d50;color:#1d3d34;}
  .quiz-opt.wrong{background:#f7e7e7;border-color:#8a2b2b;color:#5e1c1c;}
  .quiz-opt.dim{opacity:.55;}
  .quiz-opt:disabled{cursor:default;}
  .quiz-why{margin:.6rem 0 0;padding:.6rem .8rem;border-radius:6px;background:var(--highlight);
    font-size:.9rem;line-height:1.5;color:var(--ink-soft);display:none;}
  .quiz-why.show{display:block;}
  .quiz-why .tag{font-weight:700;color:var(--accent);}
  .quiz-score{font-weight:600;color:var(--accent-2);margin:.4rem 0 0;}
  .quiz-reset{font-family:var(--sans);font-size:.8rem;background:none;border:1px solid var(--rule);
    border-radius:6px;padding:.35rem .7rem;cursor:pointer;color:var(--ink-soft);margin-top:.6rem;}
  `;
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  document.querySelectorAll('.quiz').forEach(function (root) {
    var items;
    try { items = JSON.parse(root.getAttribute('data-quiz')); }
    catch (e) { root.textContent = 'Quiz failed to load.'; return; }

    var answered = 0, correct = 0;
    var scoreEl = document.createElement('p'); scoreEl.className = 'quiz-score';

    function render() {
      root.innerHTML = '';
      answered = 0; correct = 0;
      items.forEach(function (it, qi) {
        var card = document.createElement('div'); card.className = 'quiz-card';
        var q = document.createElement('p'); q.className = 'quiz-q';
        q.innerHTML = '<span class="n">' + (qi + 1) + '.</span>' + it.q;
        card.appendChild(q);

        var why = document.createElement('div'); why.className = 'quiz-why';
        why.innerHTML = '<span class="tag">为什么 / Why:</span> ' + it.why;

        var btns = [];
        it.options.forEach(function (opt, oi) {
          var b = document.createElement('button');
          b.className = 'quiz-opt'; b.type = 'button'; b.innerHTML = opt;
          b.addEventListener('click', function () {
            btns.forEach(function (x) { x.disabled = true; x.classList.add('dim'); });
            if (oi === it.answer) { b.classList.add('correct'); b.classList.remove('dim'); correct++; }
            else {
              b.classList.add('wrong'); b.classList.remove('dim');
              btns[it.answer].classList.add('correct'); btns[it.answer].classList.remove('dim');
            }
            why.classList.add('show');
            answered++;
            scoreEl.textContent = '已答 ' + answered + '/' + items.length + ' · 正确 ' + correct;
          });
          btns.push(b); card.appendChild(b);
        });
        card.appendChild(why);
        root.appendChild(card);
      });
      root.appendChild(scoreEl);
      var reset = document.createElement('button');
      reset.className = 'quiz-reset'; reset.textContent = '重做 / Reset';
      reset.addEventListener('click', render);
      root.appendChild(reset);
      scoreEl.textContent = '已答 0/' + items.length + ' · 正确 0';
    }
    render();
  });
})();
