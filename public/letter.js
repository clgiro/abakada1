 // Function to play audio for a specific box
 function playAudio(letter) {
    const audioElement = document.getElementById(`audioPlayer${letter}`);
    audioElement.play();
}
// Assuming you use a function like this to complete a lesson on the client-side
fetch('/complete-lesson', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ lessonId }),
})
.then(response => response.json())
.then(data => {
  if (data.success) {
      console.log('Lesson completed successfully:', lessonId);
      // Handle success if needed
  } else {
      console.error('Failed to complete lesson. Server response:', data);
      // Handle error if needed
  }
})
.catch(error => {
  console.error('Error completing lesson:', error);
  // Handle error if needed
});

function showPhotoCollage(photos) {
  var modalBody = document.getElementById('aslModalBody');
  modalBody.innerHTML = ''; // Clear existing content

  photos.forEach(function (photo) {
    var img = document.createElement('img');
    img.src = photo;
    img.classList.add('img-fluid', 'mb-2');
    modalBody.appendChild(img);
  });

  // Show the modal
  var modal = new bootstrap.Modal(document.getElementById('aslModal'), {
    keyboard: true,
    focus: true
  });
  modal.show();
}