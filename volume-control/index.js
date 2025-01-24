const AudioPlayer = (() => {
  const audio = new Audio();
  let isPlaying = false;

  const play = async (src) => {
    if (!isPlaying) {
      audio.src = src;
      console.log('Playing for the first time');
      await audio.play();
      isPlaying = true;
    }
  };

  const setVolume = (level) => {
    audio.volume = level;
  };

  return {
    play,
    setVolume
  };
})();

const VolumeControl = (() => {
  let draggable = false;
  let percent = 50;
  let volumeMeterBase,
    volumeMeterTop,
    meterLen,
    thumb,
    volumePanel,
    volumeLevel,
    volumeMeter,
    volumeControl,
    announcement;

  const init = (
    volumePanelSelector,
    volumeLevelSelector,
    volumeMeterSelector,
    thumbSelector
  ) => {
    thumb = document.querySelector(thumbSelector);
    volumePanel = document.querySelector(volumePanelSelector);
    volumeLevel = document.querySelector(volumeLevelSelector);
    volumeMeter = document.querySelector(volumeMeterSelector);
    volumeControl = document.getElementById('volume-control');
    announcement = document.getElementById('live-announcement');

    const { bottom, top } = volumeMeter.getBoundingClientRect();
    volumeMeterBase = bottom;
    volumeMeterTop = top;
    meterLen = bottom - top;

    setPercent();

    volumePanel.addEventListener('mousedown', onMouseDown);
    volumePanel.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const setAudioLevel = () => {
    const audioLevel = percent / 100;
    updateVolume(audioLevel);
    volumeControl.setAttribute('aria-valuenow', audioLevel);
    AudioPlayer.setVolume(audioLevel);
  };

  const setPercent = () => {
    setAudioLevel();
    volumeLevel.style.transform = `scaleY(${percent / 100})`;
    thumb.style.transform = `translateX(-50%) translateY(50%) translateY(${
      (percent / 100) * volumeMeter.offsetHeight
    }px)`;
  };

  const calculatePercent = (evt) => {
    const meterCoordinate = Math.abs(evt.clientY - volumeMeterBase);
    percent = Math.round((meterCoordinate / meterLen) * 100);
  };

  const handleDragging = (evt) => {
    if (draggable) {
      calculatePercent(evt);
      setPercent();
    }
  };

  const setRangeBoundaries = (evt) => {
    const clickedArea = evt.clientY;
    if (clickedArea < volumeMeterTop) {
      console.log("Outside meter's range! Setting to 100%");
      return { outsideRange: true, setPercentTo: 100 };
    } else if (clickedArea > volumeMeterBase) {
      console.log("Outside meter's range! Setting to 0%");
      return { outsideRange: true, setPercentTo: 0 };
    }
    console.log('Within range!');
    return { outsideRange: false };
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();
    draggable = true;
    const rangeInfo = setRangeBoundaries(evt);

    if (!rangeInfo.outsideRange) {
      calculatePercent(evt);
    } else {
      percent = rangeInfo.setPercentTo;
    }
    setPercent();
  };

  const onMouseMove = (evt) => {
    if (draggable) {
      const rangeInfo = setRangeBoundaries(evt);
      if (!rangeInfo.outsideRange) {
        handleDragging(evt);
      }
    }
  };

  function updateVolume(newVolume) {
    volumeValue = newVolume;
    // Announce the new volume value for screen readers
    volumeControl.setAttribute('aria-valuenow', volumeValue);
    announcement.textContent = `Volume is now ${volumeValue}%`;
  }

  const onMouseUp = () => {
    draggable = false;
  };

  return {
    init
  };
})();

(() => {
  // Init audio player
  const playButtons = document.querySelectorAll('button');
  playButtons.forEach((button) => {
    button.addEventListener('click', async (evt) => {
      await AudioPlayer.play(button.previousElementSibling.src);
    });
  });

  // Init volume control
  VolumeControl.init(
    '.volume-panel',
    '.volume__level',
    '.volume__meter',
    '.thumb'
  );
})();
