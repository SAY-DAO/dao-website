// voice-recorder-widget.js
// Drop this file on your server and include <script src="/js/voice-recorder-widget.js"></script> before </body>
// Optional config: window.voiceRecorderConfig = { uploadUrl: '/upload', position: 'right' };

(function () {
  if (window.__voiceRecorderWidgetLoaded) return;
  window.__voiceRecorderWidgetLoaded = true;

  const cfg = window.voiceRecorderConfig || {};
  const uploadUrl = cfg.uploadUrl || "/upload";
  const position = cfg.position === "left" ? "left" : "right";

  // Host container (outside page flow)
  const host = document.createElement("div");
  host.id = "vr-host-" + Math.random().toString(36).slice(2, 9);
  document.body.appendChild(host);

  // Attach Shadow DOM to isolate styles
  const shadow = host.attachShadow
    ? host.attachShadow({ mode: "closed" })
    : null;

  // We'll query against `root` which is the shadow root when available, otherwise the host.
  const root = shadow || host;

  // Template (styles + markup + JS all inside shadow if supported)
  // Template (styles + markup + JS all inside shadow if supported)
  const tpl = document.createElement("template");
  tpl.innerHTML = `
  <style>
    :host { all: initial; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }

    /* Theme variables */
    :host {
      --vr-accent-1: #beeeff; /* cool blue */
      --vr-accent-2: #faccc0; /* soft peach */
      --vr-accent-3: #fab28e; /* warm coral */
      --vr-bg:rgba(0, 0, 0, 0.95);
      --vr-ink:rgb(88, 126, 145);
      --vr-muted: #6b7a83;
      --vr-radius: 12px;
      --vr-fab-size: 56px;
    }

    /* FAB */
    .fab {
      position: fixed;
      ${position}: calc(20px + env(safe-area-inset-right, 0px));
      bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      z-index: 2147483647;
      width: var(--vr-fab-size);
      height: var(--vr-fab-size);
      border-radius: 50%;
      background: linear-gradient(135deg, var(--vr-accent-1), var(--vr-accent-3));
      color: var(--vr-ink);
      border: 1px solid rgba(7,36,51,0.06);
      box-shadow: 0 8px 30px rgba(11,18,32,0.12), 0 2px 6px rgba(190,238,255,0.08);
      display: flex;
      align-items:center;
      justify-content:center;
      cursor: pointer;
      transform: translateZ(0);
      transition: transform .12s ease, box-shadow .12s ease;
      outline: none;
    }
    .fab:focus { box-shadow: 0 10px 34px rgba(11,18,32,0.16), 0 4px 8px rgba(190,238,255,0.12); }
    .fab:hover { transform: translateY(-3px); }

    /* Panel */
    .panel {
      position: fixed;
      ${position}: calc(20px + env(safe-area-inset-right, 0px));
      bottom: calc(92px + env(safe-area-inset-bottom, 0px));
      z-index: 2147483646;
      width: 360px;
      max-width: calc(100% - 40px);
      background: var(--vr-bg);
      color: var(--vr-ink);
      border-radius: var(--vr-radius);
      padding: 12px;
      box-shadow: 0 12px 40px rgba(11,18,32,0.06);
      border: 1px solid rgba(250,204,192,0.08);
      display: none;
    }
    .panel.open { display: block; }
    /* expose panel to external styling where supported */
    .panel[part] { /* noop — part attr added on element itself */ }

    .panel h4 { margin: 0 0 6px; font-size: 15px; color: var(--vr-accent-1); font-weight:700; }
    .panel p { margin: 0 0 12px; color: var(--vr-muted); font-size: 13px; }

    .controls { display:flex; gap:8px; }
    .btn {
      flex:1;
      padding:8px 10px;
      border-radius:8px;
      border:1px solid rgba(7,36,51,0.06);
      background:transparent;
      color: var(--vr-accent-1);
      cursor:pointer;
      transition: transform .08s ease, filter .08s ease;
      font-weight:600;
    }
    .btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; filter:grayscale(.1); }
    .btn.primary {
      background: linear-gradient(90deg, rgba(190,238,255,0.22), rgba(250,178,142,0.09));
      border-color: rgba(250,178,142,0.12);
      color: var(--vr-ink);
    }

    audio { width:100%; margin-top:10px; background:linear-gradient(180deg,#fff,#fbfdff); border-radius:6px; border:1px solid rgba(190,238,255,0.08); padding:6px; }

    .status { font-size:13px; color: var(--vr-accent-3); margin-top:8px; }
    .hint { font-size:12px; color: var(--vr-muted); margin-top:8px; }

    .follow {
      margin-top:10px;
      padding:10px;
      border-radius:8px;
      background: linear-gradient(180deg, rgba(250,204,192,0.03), rgba(190,238,255,0.01));
      border:1px solid rgba(250,204,192,0.04);
    }
    .follow label { display:block; margin-bottom:6px; font-size:13px; color:var(--vr-ink); }
    .radio-row { display:flex; gap:8px; margin-bottom:8px; color:var(--vr-accent-1); align-items:center; }

    .input { width:100%; padding:8px; border-radius:6px; border:1px solid rgba(7,36,51,0.06); background:transparent; color:inherit; }

    .success {
      margin-top:10px;
      padding:10px;
      border-radius:8px;
      background: linear-gradient(90deg, rgba(190,238,255,0.06), rgba(250,204,192,0.03));
      color: var(--vr-ink);
      display:none;
    }
    .error { color:#b74124; font-size:13px; margin-top:6px; display:none; }

    /* Accessibility / hit area */
    .fab { padding:6px; box-sizing: content-box; }

    /* Responsive: center FAB on small screens and adapt panel */
    @media (max-width:420px) {
      .fab {
        width: 52px;
        height: 52px;
        bottom: calc(12px + env(safe-area-inset-bottom, 0px));
      }
      .panel {
        left: 12px !important;
        right: 12px !important;
        bottom: calc(80px + env(safe-area-inset-bottom, 0px));
        width: auto;
      }
    }
    @media (max-width:340px) {
      .fab { width:48px; height:48px; }
      .panel { padding:8px; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); }
    }
  </style>

  <button class="fab" part="fab" aria-label="Open voice recorder" title="Voice message">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <!-- add part="panel" so external CSS can style it via ::part(panel) if desired -->
  <div class="panel" part="panel" role="dialog" aria-hidden="true" aria-label="Voice recorder">
    <h4>Voice message</h4>
    <p>Record a short voice clip and upload it. After recording you'll be asked if you'd like follow-up contact (email or phone).</p>

    <div class="controls">
      <button class="btn primary" data-action="rec">Start</button>
      <button class="btn" data-action="stop" disabled>Stop</button>
      <button class="btn" data-action="play" disabled>Play</button>
    </div>

    <audio controls hidden></audio>
    <div class="status">Status: idle</div>
    <div class="hint">Tip: If permission doesn't appear, disable Brave Shields or check site microphone settings.</div>

    <div class="follow" hidden>
      <label>Do you want to be reached back?</label>
      <div class="radio-row">
        <label><input type="radio" name="vr-contact" value="none" checked> No response</label>
        <label><input type="radio" name="vr-contact" value="email"> Email</label>
        <label><input type="radio" name="vr-contact" value="phone"> Phone</label>
      </div>
      <div class="contact-inputs"></div>
      <div class="error" aria-live="polite"></div>
    </div>

    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn" data-action="download" disabled>Download</button>
      <button class="btn" data-action="upload" disabled>Upload</button>
    </div>

    <div class="success" role="status" aria-live="polite"></div>
  </div>
`;

  if (shadow) {
    shadow.appendChild(tpl.content.cloneNode(true));
  } else {
    // Fallback: no shadow DOM support (very old browsers) — inject into host directly
    host.appendChild(tpl.content.cloneNode(true));
  }

  // Helper to query inside the inserted nodes (works with both shadow and fallback)
  function $all(sel) {
    return root.querySelectorAll(sel);
  }
  function $(sel) {
    return root.querySelector(sel);
  }

  const fab = $(".fab");
  const panelEl = $(".panel");
  const recBtn = $('[data-action="rec"]');
  const stopBtn = $('[data-action="stop"]');
  const playBtn = $('[data-action="play"]');
  const downloadBtn = $('[data-action="download"]');
  const uploadBtn = $('[data-action="upload"]');
  const audioEl = $("audio");
  const statusEl = $(".status");
  const followEl = $(".follow");
  const contactInputs = $(".contact-inputs");
  const errorEl = $(".error");
  const successEl = $(".success");

  if (!fab || !panelEl || !recBtn || !stopBtn) return;

  let mediaRecorder = null;
  let audioChunks = [];
  let audioBlob = null;
  let audioURL = null;

  function setStatus(text) {
    if (statusEl) statusEl.textContent = "Status: " + text;
  }

  // Helpers
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  // <-- FIXED regex: hyphen placed last to avoid range issues
  function validPhone(v) {
    return /^[+0-9() \-]{7,20}$/.test(v);
  }

  fab.addEventListener("click", () => {
    const open = panelEl.classList.toggle("open");
    panelEl.setAttribute("aria-hidden", !open);
    if (open) recBtn.focus();
  });

  function showContactInput(type) {
    if (!contactInputs) return;
    contactInputs.innerHTML = "";
    if (type === "email") {
      const inp = document.createElement("input");
      inp.type = "email";
      inp.className = "input";
      inp.placeholder = "you@example.com";
      contactInputs.appendChild(inp);
      inp.focus();
    } else if (type === "phone") {
      const inp = document.createElement("input");
      inp.type = "tel";
      inp.className = "input";
      inp.placeholder = "+46 70 123 45 67";
      contactInputs.appendChild(inp);
      inp.focus();
    }
  }

  // follow radio handling
  followEl &&
    followEl.addEventListener &&
    followEl.addEventListener("change", () => {
      const r = root.querySelector('input[name="vr-contact"]:checked');
      const val = r ? r.value : null;
      if (val === "email") showContactInput("email");
      else if (val === "phone") showContactInput("phone");
      else {
        if (contactInputs) contactInputs.innerHTML = "";
        if (errorEl) errorEl.style.display = "none";
      }
    });

  recBtn.addEventListener("click", async () => {
    recBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.disabled = true;
    downloadBtn.disabled = true;
    uploadBtn.disabled = true;
    setStatus("requesting microphone...");
    successEl && (successEl.style.display = "none");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options =
        MediaRecorder.isTypeSupported &&
        MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? { mimeType: "audio/webm;codecs=opus" }
          : MediaRecorder.isTypeSupported &&
            MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? { mimeType: "audio/ogg;codecs=opus" }
          : {};
      mediaRecorder = new MediaRecorder(stream, options);
      audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (e) => {
        if (e.data && e.data.size) audioChunks.push(e.data);
      });
      mediaRecorder.addEventListener("start", () => setStatus("recording..."));
      mediaRecorder.addEventListener("stop", () => {
        audioBlob = new Blob(audioChunks, {
          type: mediaRecorder.mimeType || "audio/webm",
        });
        audioURL = URL.createObjectURL(audioBlob);
        audioEl.src = audioURL;
        audioEl.hidden = false;
        playBtn.disabled = false;
        downloadBtn.disabled = false;
        uploadBtn.disabled = false;
        setStatus("recording stopped");
        followEl && (followEl.hidden = false);
        followEl &&
          followEl.scrollIntoView &&
          followEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      mediaRecorder.start();
    } catch (err) {
      console.error("getUserMedia error", err);
      setStatus(
        err && err.message
          ? err.message
          : "permission denied or error" +
              " — check Brave Shields / site microphone / HTTPS"
      );
      recBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state === "recording")
      mediaRecorder.stop();
    stopBtn.disabled = true;
    recBtn.disabled = false;
  });

  playBtn.addEventListener("click", () => {
    if (audioURL) audioEl.play();
  });

  downloadBtn.addEventListener("click", () => {
    if (!audioBlob) return;
    const ext =
      mediaRecorder &&
      mediaRecorder.mimeType &&
      mediaRecorder.mimeType.includes("ogg")
        ? "ogg"
        : "webm";
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = `voice-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  uploadBtn.addEventListener("click", async () => {
    if (!audioBlob) return;
    const checked = root.querySelector('input[name="vr-contact"]:checked');
    const method = checked ? checked.value : null;
    let contactValue = "";
    if (method === "email") {
      const v = contactInputs.querySelector("input")
        ? contactInputs.querySelector("input").value.trim()
        : "";
      if (!validEmail(v)) {
        if (errorEl) {
          errorEl.textContent = "Please enter a valid email address.";
          errorEl.style.display = "block";
        }
        return;
      }
      contactValue = v;
    } else if (method === "phone") {
      const v = contactInputs.querySelector("input")
        ? contactInputs.querySelector("input").value.trim()
        : "";
      if (!validPhone(v)) {
        if (errorEl) {
          errorEl.textContent = "Please enter a valid phone number.";
          errorEl.style.display = "block";
        }
        return;
      }
      contactValue = v;
    }
    if (errorEl) errorEl.style.display = "none";
    setStatus("uploading...");
    uploadBtn.disabled = true;
    downloadBtn.disabled = true;
    try {
      const form = new FormData();
      const ext =
        mediaRecorder &&
        mediaRecorder.mimeType &&
        mediaRecorder.mimeType.includes("ogg")
          ? "ogg"
          : "webm";
      form.append("file", audioBlob, `voice-${Date.now()}.${ext}`);
      form.append("contact_method", method || "none");
      form.append("contact_value", contactValue || "");
      form.append("timestamp", Date.now());
      const res = await fetch(uploadUrl, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed: " + res.status);
      const json = await res.json();
      if (successEl) {
        successEl.style.display = "block";
        successEl.textContent =
          "Upload successful (" +
          (json && json.message ? json.message : "ok") +
          ")" +
          (method === "email"
            ? " — we will reach you at " + contactValue
            : method === "phone"
            ? " — we will call " + contactValue
            : " — no follow-up requested");
      }
      setStatus("complete");
      setTimeout(() => {
        if (followEl) {
          followEl.hidden = true;
          contactInputs.innerHTML = "";
        }
        uploadBtn.disabled = true;
        downloadBtn.disabled = true;
        playBtn.disabled = true;
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("upload failed");
      if (errorEl) {
        errorEl.textContent = "Upload failed — please try again.";
        errorEl.style.display = "block";
      }
      uploadBtn.disabled = false;
      downloadBtn.disabled = false;
    }
  });

  // Minimal feature detection
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
      setStatus("getUserMedia not available");
    else setStatus("ready");
  } catch (e) {}
})();
