
  var quill = new Quill('#body', {
    theme: 'snow'
  });

  // Optional: sync Quill content to a hidden input for form submission
  var form = document.querySelector('form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'body');
  form.appendChild(hiddenInput);

  form.onsubmit = function() {
    hiddenInput.value = quill.root.innerHTML;
  };
