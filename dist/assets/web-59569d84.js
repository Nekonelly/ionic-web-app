import{W as s}from"./index-f4e5a485.js";class i extends s{async isEnabled(){throw this.unavailable("This feature is not available in the browser.")}async speak(e){if(!("speechSynthesis"in window))throw this.unavailable("Browser does not support the SpeechSynthesis API");const a=new SpeechSynthesisUtterance(e.value);e.language&&(a.lang=e.language),speechSynthesis.speak(a)}}export{i as ScreenReaderWeb};
