/* =========================================================
   PAGE 1 → PAGE 2
========================================================= */

const openInvitation =
  document.getElementById("openInvitation");

const page1 =
  document.getElementById("page1");

const page2 =
  document.getElementById("page2");


/* =========================================================
   BACK TO COVER
========================================================= */

const backToCover =
  document.getElementById("backToCover");


/* =========================================================
   WELCOME BACK MESSAGE
========================================================= */

const welcomeBackMessage =
  document.getElementById("welcomeBackMessage");


/* =========================================================
   MUSIC
========================================================= */

const page1Music =
  document.getElementById("page1Music");

const page2Music =
  document.getElementById("page2Music");

const musicToggle =
  document.getElementById("musicToggle");

let musicPlaying = false;


/* =========================================================
   START PAGE 1 MUSIC
   Browser-safe autoplay
========================================================= */

let page1MusicStarted = false;


function startPage1Music() {

  if (
    page1MusicStarted ||
    !page1Music ||
    !page1 ||
    page1.style.display === "none"
  ) {

    return;

  }


  page1Music.play()
    .then(() => {

      page1MusicStarted = true;

      musicPlaying = true;

      if (musicToggle) {

        musicToggle.textContent = "♫";

      }

    })
    .catch(() => {

      /*
        Browser may block autoplay.
        The music button can still be used manually.
      */

    });

}


/*
  A browser normally blocks sound before user interaction.
  Start Song 1 when the user first interacts with Page 1.
*/

document.addEventListener(
  "pointerdown",
  startPage1Music,
  {
    once: true,
    passive: true
  }
);


/* =========================================================
   OPEN INVITATION
========================================================= */

if (openInvitation) {

  openInvitation.addEventListener("click", () => {

    /* =====================================================
       HIDE PAGE 1
    ===================================================== */

    if (page1) {

      page1.style.display = "none";

    }


    /* =====================================================
       SHOW PAGE 2
    ===================================================== */

    if (page2) {

      page2.classList.remove("hidden");

    }


    /* =====================================================
       START PAGE 2 FROM TOP
    ===================================================== */

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });


    /* =====================================================
       START PAGE 2 ANIMATION
    ===================================================== */

    startPage2Animation();


    /* =====================================================
       STOP SONG 1
    ===================================================== */

    if (page1Music) {

      page1Music.pause();

      page1Music.currentTime = 0;

    }


    /* =====================================================
       START SONG 2
    ===================================================== */

    if (page2Music) {

      page2Music.currentTime = 0;

      page2Music.play()
        .then(() => {

          musicPlaying = true;

          if (musicToggle) {

            musicToggle.textContent = "♫";

          }

        })
        .catch(() => {

          /*
            Browser may block playback.
          */

        });

    }

  });

}


/* =========================================================
   BACK TO COVER → PAGE 1
========================================================= */

if (backToCover) {

  backToCover.addEventListener("click", () => {

    /* =====================================================
       HIDE PAGE 2
    ===================================================== */

    if (page2) {

      page2.classList.add("hidden");

    }


    /* =====================================================
       SHOW PAGE 1
    ===================================================== */

    if (page1) {

      page1.style.display = "block";

    }


    /* =====================================================
       RETURN TO TOP
    ===================================================== */

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });


    /* =====================================================
       STOP SONG 2
    ===================================================== */

    if (page2Music) {

      page2Music.pause();

      page2Music.currentTime = 0;

    }


    /* =====================================================
       RESET MUSIC STATE
    ===================================================== */

    musicPlaying = false;


    if (musicToggle) {

      musicToggle.textContent = "♪";

    }


    /* =====================================================
       SHOW WELCOME BACK MESSAGE
    ===================================================== */

    if (welcomeBackMessage) {

      welcomeBackMessage.classList.add("show");


      setTimeout(() => {

        welcomeBackMessage.classList.remove("show");

      }, 3500);

    }


    /* =====================================================
       RESTART SONG 1
    ===================================================== */

    if (page1Music) {

      page1Music.currentTime = 0;


      page1Music.play()
        .then(() => {

          page1MusicStarted = true;

          musicPlaying = true;


          if (musicToggle) {

            musicToggle.textContent = "♫";

          }

        })
        .catch(() => {

          /*
            Browser may block playback.
            User can press the music button manually.
          */

        });

    }

  });

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicToggle) {

  musicToggle.addEventListener("click", () => {

    /* =====================================================
       PAGE 2 MUSIC
    ===================================================== */

    if (
      page2 &&
      !page2.classList.contains("hidden")
    ) {

      if (!page2Music) return;


      if (page2Music.paused) {

        page2Music.play()
          .then(() => {

            musicPlaying = true;

            musicToggle.textContent = "♫";

          })
          .catch(() => {

            /* Browser may block playback */

          });

      }

      else {

        page2Music.pause();

        musicPlaying = false;

        musicToggle.textContent = "♪";

      }

      return;

    }


    /* =====================================================
       PAGE 1 MUSIC
    ===================================================== */

    if (!page1Music) return;


    if (page1Music.paused) {

      page1Music.play()
        .then(() => {

          musicPlaying = true;

          page1MusicStarted = true;

          musicToggle.textContent = "♫";

        })
        .catch(() => {

          /* Browser may block playback */

        });

    }

    else {

      page1Music.pause();

      musicPlaying = false;

      musicToggle.textContent = "♪";

    }

  });

}


/* =========================================================
   PAGE 2 ANIMATION
========================================================= */

let page2AnimationStarted = false;


function startPage2Animation() {

  if (page2AnimationStarted) {

    return;

  }


  page2AnimationStarted = true;


  const arrow =
    document.getElementById("cupidArrow");


  const hearts =
    document.getElementById("fallingHearts");


  /* =======================================================
     CUPID ARROW
  ======================================================= */

  if (arrow) {

    setTimeout(() => {

      arrow.classList.add("active");

    }, 500);

  }


  /* =======================================================
     FALLING HEARTS
  ======================================================= */

  if (hearts) {

    setTimeout(() => {

      hearts.classList.add("active");

      createFallingHearts();

    }, 2900);

  }

}


/* =========================================================
   FALLING HEART GENERATOR
========================================================= */

function createFallingHearts() {

  const container =
    document.getElementById("fallingHearts");


  if (!container) return;


  for (let i = 0; i < 24; i++) {

    setTimeout(() => {

      const heart =
        document.createElement("span");


      heart.className =
        "falling-heart";


      heart.textContent =
        Math.random() > 0.5
          ? "♡"
          : "♥";


      heart.style.left =
        Math.random() * 100 + "%";


      heart.style.fontSize =
        (12 + Math.random() * 18) + "px";


      heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


      heart.style.animationDelay =
        (Math.random() * 1.5) + "s";


      container.appendChild(heart);


      setTimeout(() => {

        heart.remove();

      }, 12000);


    }, i * 180);

  }

}


/* =========================================================
   SCROLL INSTRUCTION
========================================================= */

const scrollInstruction =
  document.getElementById("scrollInstruction");

let instructionHidden = false;


window.addEventListener(
  "scroll",
  () => {

    if (
      !instructionHidden &&
      window.scrollY > 40
    ) {

      instructionHidden = true;


      if (scrollInstruction) {

        scrollInstruction.classList.add(
          "hide"
        );

      }

    }

  },
  {
    passive: true
  }
);


/* =========================================================
   CONTAINER 2 → VIEW ON MAP
========================================================= */

const viewMapButton =
  document.getElementById("viewMapButton");


if (viewMapButton) {

  viewMapButton.addEventListener("click", () => {

    const mapURL =
      "https://maps.app.goo.gl/XWzyN7c7NVDbDc2Q6?g_st=iw";


    window.open(
      mapURL,
      "_blank"
    );

  });

}


/* =========================================================
   CONTAINER 3 → VIEW ON MAP
========================================================= */

const marriageMapButton =
  document.getElementById("marriageMapButton");


if (marriageMapButton) {

  marriageMapButton.addEventListener("click", () => {

    const marriageMapURL =
      "https://maps.app.goo.gl/q3JWeKiwPVyTvPUB7";


    window.open(
      marriageMapURL,
      "_blank"
    );

  });

}


/* =========================================================
   CONTAINER 4 → GROOM'S SIDE RECEPTION MAP
========================================================= */

const groomReceptionMapButton =
  document.getElementById(
    "groomReceptionMapButton"
  );


if (groomReceptionMapButton) {

  groomReceptionMapButton.addEventListener(
    "click",
    () => {

      const groomReceptionMapURL =
        "https://maps.app.goo.gl/tUeWZRM4EFZS6sGE6";


      window.open(
        groomReceptionMapURL,
        "_blank"
      );

    }
  );

}