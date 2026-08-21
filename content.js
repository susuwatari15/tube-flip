(function () {
  const INJECT_MARKER = "data-yt-rotate-ext";
  const VIDEO_SELECTOR = "video.video-stream.html5-main-video";
  const CONTROLS_SELECTOR = ".ytp-right-controls-left, .ytp-right-controls";

  let currentRotation = 0;
  let flipHorizontal = false;
  let flipVertical = false;
  let resizeObserver = null;
  let observedVideo = null;
  let appliedVideo = null;

  function hasActiveTransform() {
    return normalizeRotation(currentRotation) !== 0 || flipHorizontal || flipVertical;
  }

  function normalizeRotation(deg) {
    const r = ((deg % 360) + 360) % 360;
    return r;
  }

  function getVideo() {
    return document.querySelector(VIDEO_SELECTOR);
  }

  function getPlayerContainer(video) {
    return video?.closest(".html5-video-player") ?? document.getElementById("movie_player");
  }

  function buildVideoTransform() {
    const video = getVideo();
    const player = getPlayerContainer(video);
    const rot = normalizeRotation(currentRotation);
    const parts = [];

    if (rot === 90 || rot === 270) {
      const w = player?.clientWidth || video?.clientWidth || 1;
      const h = player?.clientHeight || video?.clientHeight || 1;
      const scale = h / w;
      parts.push(`rotate(${rot}deg) scale(${scale})`);
    } else {
      parts.push(`rotate(${rot}deg)`);
    }

    if (flipHorizontal) {
      parts.push("scaleX(-1)");
    }
    if (flipVertical) {
      parts.push("scaleY(-1)");
    }

    return parts.join(" ");
  }

  function applyRotationToVideo(animate = false) {
    const video = getVideo();
    if (!video) return;

    video.style.transformOrigin = "center center";
    video.style.transition = animate ? "transform 0.3s ease" : "";
    video.style.transform = buildVideoTransform();
    appliedVideo = video;

    syncFlipButtonPressed();
  }

  function syncFlipButtonPressed() {
    const hBtn = document.querySelector(`[${INJECT_MARKER}="flip-h"]`);
    const vBtn = document.querySelector(`[${INJECT_MARKER}="flip-v"]`);
    if (hBtn) {
      hBtn.setAttribute("aria-pressed", flipHorizontal ? "true" : "false");
    }
    if (vBtn) {
      vBtn.setAttribute("aria-pressed", flipVertical ? "true" : "false");
    }
  }

  function setupResizeObserver() {
    const video = getVideo();
    const player = getPlayerContainer(video);
    if (!video || !player) return;

    if (resizeObserver && observedVideo !== video) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        applyRotationToVideo();
      });
    }

    if (observedVideo !== video) {
      resizeObserver.disconnect();
      resizeObserver.observe(player);
      observedVideo = video;
    }
  }

  function resetRotation() {
    currentRotation = 0;
    flipHorizontal = false;
    flipVertical = false;
    appliedVideo = null;
    const video = getVideo();
    if (video) {
      video.style.transform = "";
      video.style.transition = "";
      video.style.transformOrigin = "";
    }
  }

  function rotateBy(delta) {
    currentRotation = normalizeRotation(currentRotation + delta);
    setupResizeObserver();
    applyRotationToVideo(true);
  }

  function createRotateRightButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ytp-button ytp-rotate-ext-button";
    btn.setAttribute(INJECT_MARKER, "rotate");
    btn.setAttribute("aria-label", "Rotate 90 degrees clockwise");
    btn.setAttribute("title", "Rotate 90°");
    btn.setAttribute("data-tooltip-title", "Rotate 90°");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.classList.add("lucide", "lucide-rotate-cw-icon", "lucide-rotate-cw");
    svg.style.color = "#fff";

    const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arc.setAttribute("d", "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8");
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute("d", "M21 3v5h-5");
    svg.appendChild(arc);
    svg.appendChild(arrow);
    btn.appendChild(svg);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      rotateBy(90);
    });

    return btn;
  }

  function createFlipButton(axis) {
    const isH = axis === "h";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ytp-button ytp-rotate-ext-button";
    btn.setAttribute(INJECT_MARKER, isH ? "flip-h" : "flip-v");
    btn.setAttribute("aria-label", isH ? "Flip horizontal" : "Flip vertical");
    btn.setAttribute("title", isH ? "Flip horizontal" : "Flip vertical");
    btn.setAttribute("data-tooltip-title", isH ? "Flip horizontal" : "Flip vertical");
    btn.setAttribute("aria-pressed", "false");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.style.color = "#fff";

    if (isH) {
      svg.classList.add("lucide", "lucide-flip-horizontal2-icon", "lucide-flip-horizontal-2");
      for (const d of [
        "m3 7 5 5-5 5V7",
        "m21 7-5 5 5 5V7",
        "M12 20v2",
        "M12 14v2",
        "M12 8v2",
        "M12 2v2",
      ]) {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", d);
        svg.appendChild(p);
      }
    } else {
      svg.classList.add("lucide", "lucide-flip-vertical2-icon", "lucide-flip-vertical-2");
      for (const d of [
        "m7 3 5 5 5-5",
        "m7 21 5-5 5 5",
        "M2 12h2",
        "M8 12h2",
        "M14 12h2",
        "M20 12h2",
      ]) {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", d);
        svg.appendChild(p);
      }
    }

    btn.appendChild(svg);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isH) {
        flipHorizontal = !flipHorizontal;
      } else {
        flipVertical = !flipVertical;
      }
      setupResizeObserver();
      applyRotationToVideo(true);
    });

    return btn;
  }

  function removeInjectedButtons() {
    for (const el of document.querySelectorAll(`[${INJECT_MARKER}]`)) {
      el.remove();
    }
  }

  function tryInject() {
    const host = document.querySelector(CONTROLS_SELECTOR);
    if (!host) {
      return false;
    }
    if (host.querySelector(`[${INJECT_MARKER}]`)) {
      return true;
    }

    const settingsBtn = host.querySelector(".ytp-settings-button");
    const rotateBtn = createRotateRightButton();
    const flipHBtn = createFlipButton("h");
    const flipVBtn = createFlipButton("v");

    if (settingsBtn) {
      settingsBtn.before(rotateBtn);
      settingsBtn.before(flipHBtn);
      settingsBtn.before(flipVBtn);
    } else {
      host.appendChild(rotateBtn);
      host.appendChild(flipHBtn);
      host.appendChild(flipVBtn);
    }

    setupResizeObserver();
    applyRotationToVideo();
    return true;
  }

  function onNavigateFinish() {
    removeInjectedButtons();
    resetRotation();
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
      observedVideo = null;
    }
    scheduleInject();
  }

  let injectTimer = null;
  function scheduleInject() {
    if (injectTimer) clearInterval(injectTimer);
    let attempts = 0;
    const maxAttempts = 120;
    injectTimer = setInterval(() => {
      attempts += 1;
      if (tryInject() || attempts >= maxAttempts) {
        clearInterval(injectTimer);
        injectTimer = null;
      }
    }, 250);
  }

  document.addEventListener("yt-navigate-finish", onNavigateFinish);

  function handleDomChange() {
    const host = document.querySelector(CONTROLS_SELECTOR);
    if (host && !host.querySelector(`[${INJECT_MARKER}]`)) {
      tryInject();
    }

    // YouTube swaps the <video> element (e.g. before/after ads) without firing
    // yt-navigate-finish, which silently drops the transform. Re-apply it to the
    // new element when we still have an active rotation/flip.
    if (hasActiveTransform()) {
      const video = getVideo();
      if (video && video !== appliedVideo) {
        setupResizeObserver();
        applyRotationToVideo(false);
      }
    }
  }

  let moTimer = null;
  const mo = new MutationObserver(() => {
    if (moTimer) return;
    moTimer = setTimeout(() => {
      moTimer = null;
      handleDomChange();
    }, 200);
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  scheduleInject();
})();
