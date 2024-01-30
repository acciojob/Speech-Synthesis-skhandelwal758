// Your script here.
let toSpeak;
  const msg = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Update the voices when the 'voiceschanged' event is fired
  synth.addEventListener(
    "voiceschanged",
    function(){
      voices = synth.getVoices();
      populateVoices();
    }
  );

  // Populate the voices dropdown with available voices
  function populateVoices() {
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.lang}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Initial population of voices
  populateVoices();

  console.log(voices);
  console.log(`Lang=${voicesDropdown.value}`);
  console.log(`Rate=${options[0].value}`);
  console.log(`Pitch=${options[1].value}`);
  console.log(`Text=${options[2].value}`);

  speakButton.addEventListener(
    "click",
    function () {
      toSpeak = new SpeechSynthesisUtterance(options[2].value);
      toSpeak.lang = voicesDropdown.value;
      toSpeak.rate = options[0].value;
      toSpeak.pitch = options[1].value;

      synth.speak(toSpeak);
    }
  );