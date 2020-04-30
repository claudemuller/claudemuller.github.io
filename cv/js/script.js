'use strict';

window.addEventListener('load', function click(event) {
  const storyModeSelectors = document.getElementsByClassName('story-mode-control'),
    downloadBtn = document.getElementById('download-btn');

  Array.from(storyModeSelectors).forEach(control => {
    initStoryControl(control, downloadBtn);
  });

  initDownloadButton(downloadBtn)
});

function initStoryControl(control, downloadBtn) {
  control.disabled = false;

  control.addEventListener('click', function click(event) {
    const selectedOption = this.value,
      isStoryMode = selectedOption === 'true',
      storyMode = isStoryMode ? 'block' : 'none',
      storyModeItems = document.getElementsByClassName('story-mode-item'),
      titleTag = document.getElementsByTagName('title')[0];

    if (isStoryMode) {
      titleTag.text = 'Cirriculum Vitae of Claude Müller';
      downloadBtn.href = 'files/Cirriculum Vitae of Claude Müller-30.04.2020_online.pdf';
    } else {
      titleTag.text = "Claude Müller's Resume";
      downloadBtn.href = "files/Claude Müller's Resume-30.04.2020_online.pdf";
    }

    Array.from(storyModeItems).forEach(item => {
      item.style.display = storyMode;
    });
  });
}

function initDownloadButton(button) {
  button.disabled = false;

  //button.addEventListener('click', function click(event) {
    //window.print();
  //});
}
