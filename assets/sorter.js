/* ============================================================
   Two-bucket sorter — reusable classification drill.
   Built for The Art of Learning lessons, but topic-agnostic:
   any "which of two categories is this?" drill can use it.

   Usage in a lesson:
     <div class="sorter" data-sorter='{ ...JSON... }'></div>
     <script src="../assets/sorter.js"></script>

   Shape:
     { "buckets": ["Bucket A", "Bucket B"],       // exactly two, keep equal-length
       "items": [ { "t": "statement (HTML ok)",
                    "b": 0,                        // index of correct bucket
                    "why": "feedback (HTML ok)" } ] }

   Every item shows both bucket buttons in the same order, so button
   position and length never leak the answer. Feedback is immediate —
   the tight loop that turns a definition into a usable discrimination.
   ============================================================ */
(function () {
  var css = `
  .sorter{font-family:var(--sans);margin:1.6rem 0;}
  .sort-item{border:1px solid var(--rule);border-radius:8px;background:#fff;padding:.9rem 1rem;margin:.8rem 0;}
  .sort-t{font-weight:600;color:var(--ink);margin:0 0 .6rem;line-height:1.5;}
  .sort-t .n{color:var(--accent);margin-right:.4rem;font-weight:700;}
  .sort-btns{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}
  .sort-b{border:1px solid var(--rule);background:#fdfcf8;border-radius:6px;padding:.55rem .6rem;
    cursor:pointer;font-size:.9rem;color:var(--ink);font-family:var(--sans);text-align:center;
    transition:background .12s,border-color .12s;}
  .sort-b:hover{border-color:var(--accent-2);}
  .sort-b.correct{background:#e7f1ec;border-color:#2f5d50;color:#1d3d34;font-weight:600;}
  .sort-b.wrong{background:#f7e7e7;border-color:#8a2b2b;color:#5e1c1c;font-weight:600;}
  .sort-b.dim{opacity:.5;}
  .sort-b:disabled{cursor:default;}
  .sort-why{margin:.6rem 0 0;padding:.55rem .8rem;border-radius:6px;background:var(--highlight);
    font-size:.88rem;line-height:1.5;color:var(--ink-soft);display:none;}
  .sort-why.show{display:block;}
  .sort-why .tag{font-weight:700;color:var(--accent);}
  .sort-score{font-weight:600;color:var(--accent-2);margin:.5rem 0 0;}
  .sort-reset{font-family:var(--sans);font-size:.8rem;background:none;border:1px solid var(--rule);
    border-radius:6px;padding:.35rem .7rem;cursor:pointer;color:var(--ink-soft);margin-top:.6rem;}
  `;
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  document.querySelectorAll('.sorter').forEach(function (root) {
    var cfg;
    try { cfg = JSON.parse(root.getAttribute('data-sorter')); }
    catch (e) { root.textContent = 'Sorter failed to load.'; return; }

    var scoreEl = document.createElement('p'); scoreEl.className = 'sort-score';

    function render() {
      root.innerHTML = '';
      var answered = 0, correct = 0;

      cfg.items.forEach(function (it, i) {
        var card = document.createElement('div'); card.className = 'sort-item';

        var t = document.createElement('p'); t.className = 'sort-t';
        t.innerHTML = '<span class="n">' + (i + 1) + '.</span>' + it.t;
        card.appendChild(t);

        var row = document.createElement('div'); row.className = 'sort-btns';
        var why = document.createElement('div'); why.className = 'sort-why';
        why.innerHTML = '<span class="tag">为什么 / Why:</span> ' + it.why;

        var btns = [];
        cfg.buckets.forEach(function (name, bi) {
          var b = document.createElement('button');
          b.className = 'sort-b'; b.type = 'button'; b.innerHTML = name;
          b.addEventListener('click', function () {
            btns.forEach(function (x) { x.disabled = true; x.classList.add('dim'); });
            if (bi === it.b) { b.classList.add('correct'); b.classList.remove('dim'); correct++; }
            else {
              b.classList.add('wrong'); b.classList.remove('dim');
              btns[it.b].classList.add('correct'); btns[it.b].classList.remove('dim');
            }
            why.classList.add('show');
            answered++;
            scoreEl.textContent = '已分类 ' + answered + '/' + cfg.items.length + ' · 正确 ' + correct;
          });
          btns.push(b); row.appendChild(b);
        });

        card.appendChild(row);
        card.appendChild(why);
        root.appendChild(card);
      });

      root.appendChild(scoreEl);
      var reset = document.createElement('button');
      reset.className = 'sort-reset'; reset.textContent = '重做 / Reset';
      reset.addEventListener('click', render);
      root.appendChild(reset);
      scoreEl.textContent = '已分类 0/' + cfg.items.length + ' · 正确 0';
    }
    render();
  });
})();
