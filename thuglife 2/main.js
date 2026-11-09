(() => {
  const $ = id => document.getElementById(id);
  const enter = $('enter'), btn = $('enter-btn'), vLayer = $('video-layer'),
        video = $('intro-video'), main = $('main');
  let started = false, finished = false;
  video.muted = false; // the video carries its own soundtrack
  video.load();

  function showMain() {
    if (finished) return; finished = true;
    main.classList.add('show'); main.removeAttribute('aria-hidden');
    vLayer.classList.add('fade'); enter.classList.add('hide');
    setTimeout(() => { vLayer.style.display = 'none'; enter.style.display = 'none'; }, 1400);
  }

  async function start() {
    if (started) return; started = true; btn.disabled = true;
    video.addEventListener('ended', showMain, { once: true });
    video.addEventListener('error', showMain, { once: true });
    try {
      video.currentTime = 0;
      vLayer.classList.add('show');
      await video.play();
      enter.classList.add('hide');
    } catch (e) {
      try { video.muted = true; await video.play(); enter.classList.add('hide'); }
      catch (_) { showMain(); }
    }
  }
  btn.addEventListener('click', start);
})();
