const fileElem = document.getElementById('file-elem');
const dropArea = document.getElementById('drop-area');
const uploadedFileDisplay = document.getElementById('uploadedFileDisplay');

const uploadedFiles = [];

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];

dragEvents.forEach((eventName) => {
  console.log(eventName);
  dropArea.addEventListener(eventName, preventDefaults, false);
  switch (eventName) {
    case 'dragenter':
    case 'dragover':
      dropArea.addEventListener(eventName, highlight, false);
      break;
    case 'drop':
      dropArea.addEventListener(eventName, handleFileDrop, false)
    case 'dragleave':
      dropArea.addEventListener(eventName, unhighlight, false);
      break;
    default:
      break;
  }
});

function handleFileDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
  uploadedFiles.push(file);

  updateFileDisplay();
}

function updateFileDisplay() {
  let html = '<ul>';

  uploadedFiles.forEach((file) => {
    let name = 'Unnamed Image';
    let size = 'Unspecified Size';

    if ('name' in file) {
      name = file.name;
    }
    if ('size' in file) {
      size = file.size;
    }

    html += `<li>${name}: ${size}</li>`;
  });
  uploadedFileDisplay.innerHTML = `${html}</ul>`;
}
