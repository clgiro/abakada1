function playAudio(letter) {
    const audioElement = document.getElementById(`audioPlayer${letter}`);
    audioElement.play(); 
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('modalImg');

    // Set the image source based on the letter clicked
    switch (letter) {
        case 'A':
            modalImg.src = 'photos2/a.jpg'; // Replace with image source for letter A
            break;
       case 'B':
              modalImg.src = 'photos2/b.jpg'; // Replace with image source for letter A
            break;
            case 'K':
              modalImg.src = 'photos2/k.jpg'; // Replace with image source for letter A
              break;
         case 'D':
                modalImg.src = 'photos2/d.jpg'; // Replace with image source for letter A
              break;   
              case 'E':
                modalImg.src = 'photos2/e.jpg'; // Replace with image source for letter A
                break;
           case 'G':
                  modalImg.src = 'photos2/g.jpg'; // Replace with image source for letter A
                break;
                case 'H':
                  modalImg.src = 'photos2/h.jpg'; // Replace with image source for letter A
                  break;
             case 'I':
                    modalImg.src = 'photos2/i.jpg'; // Replace with image source for letter A
                  break;   
                  
                  case 'L':
                    modalImg.src = 'photos2/l.jpg'; // Replace with image source for letter A
                    break;
               case 'M':
                      modalImg.src = 'photos2/m.jpg'; // Replace with image source for letter A
                    break;
                    case 'N':
                      modalImg.src = 'photos2/n.jpg'; // Replace with image source for letter A
                      break;
                 case 'Ng':
                        modalImg.src = 'photos2/ng.jpg'; // Replace with image source for letter A
                      break;   
                      case 'O':
                        modalImg.src = 'photos2/o.jpg'; // Replace with image source for letter A
                        break;
                   case 'P':
                          modalImg.src = 'photos2/p.jpg'; // Replace with image source for letter A
                        break;
                        case 'R':
                          modalImg.src = 'photos2/r.jpg'; // Replace with image source for letter A
                          break;
                     case 'S':
                            modalImg.src = 'photos2/s.jpg'; // Replace with image source for letter A
                          break;  
                          
                          case 'T':
                            modalImg.src = 'photos2/t.jpg'; // Replace with image source for letter A
                            break;
                       case 'U':
                              modalImg.src = 'photos2/u.jpg'; // Replace with image source for letter A
                            break;
                            case 'W':
                              modalImg.src = 'photos2/w.jpg'; // Replace with image source for letter A
                              break;
                         case 'Y':
                                modalImg.src = 'photos2/y.jpg'; // Replace with image source for letter A
                              break;   
                            s
        default:
            modalImg.src = ''; // Default image source if no match
    }

    modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


// Function to close the modal
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

async function checkLoggedIn() {
    try {
      const response = await fetch('http://localhost:3000/check-login');
      const data = await response.json();

      if (data.loggedIn) {
        // User is logged in, show lessons or other activities
        console.log('User is logged in:', data.user);
        // Update the lesson UI after checking login
      } else {
        // User is not logged in, redirect to login or handle accordingly
        console.log('User is not logged in');
        // You can redirect to the login page or show a login form
        window.location.href = '/login.html'; // Replace with your login page
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }


// ... (your existing code)

// Function to log out the user
