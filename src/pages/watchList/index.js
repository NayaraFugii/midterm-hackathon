import { Navigation } from '../../components/navigation.js';

export const WatchList = () => {
  const auth = firebase.auth().currentUser;
  const user = auth.uid;

  const nav = Navigation();
  const rootElement = document.createElement('div');

  rootElement.appendChild(nav);

  const contentElement = () => {
    const boxElement = document.createElement('div');

    const docRef = firebase.firestore().collection('users').doc(user);

    docRef.get().then((doc) => {
      if (doc.exists) {

        const listwatched = doc.data().listwatched;

        let movie = ''

        listwatched.forEach((listwatched) => {
          boxElement.classList.add('bgList')
          boxElement.innerHTML =
            movie += `
          <div class = "backgroundPoster" id = "${listwatched}">
            <img class = "poster"  src = "https://image.tmdb.org/t/p/original/${listwatched}">
            <div class = "btnAdd">
              <button id ="delet">Apagar</button>
            </div>
          </div>
        </div>`;
          const buttonDelet = boxElement.querySelectorAll("#delet")
          buttonDelet.forEach((button) => {
            button.addEventListener('click', (e) => {
              e.target.parentNode;
              const idMove = listwatched
              const watched = doc.data().listwatched;
              console.log(idMove, watched)

              movieWatched(idMove, watched);

            })
          })

        });
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });



    return boxElement
  }
  rootElement.appendChild(contentElement())

  return rootElement;
};

export const movieWatched = (idMove, watched) => {
  const auth = firebase.auth().currentUser;
  const user = auth.uid;
  console.log(idMove)

  const docs = firebase.firestore().collection("users").doc(user)

  if (watched.includes(idMove)) {
    let indice = watched.indexOf(idMove);
    while (indice >= 0) {
      watched.splice(indice, 1);
      indice = watched.indexOf(idMove);
    }
    docs.update({
      listwatched : watched
    })
  }

  console.log(watched);
}