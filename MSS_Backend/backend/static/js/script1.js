const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

// const songs = [
//   {
//     title: "Redemption",
//     name: "Besomorph & Coopex",
//     source:
//       "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Besomorph-Coopex-Redemption.mp3",
//     cover:
//       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/398875d0-9b9e-494a-8906-210aa3f777e0",
//   },
//   {
//     title: "What's The Problem?",
//     name: "OSKI",
//     source:
//       "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/OSKI-Whats-The-Problem.mp3",
//     cover:
//       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/810d1ddc-1168-4990-8d43-a0ffee21fb8c",
//   },
//   {
//     title: "Control",
//     name: "Unknown Brain x Rival",
//     source:
//       "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Unknown-BrainxRival-Control.mp3",
//     cover:
//       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
//   },
// ];

// let currentSongIndex = 0;

// function startRotation() {
//   if (!rotating) {
//     rotating = true;
//     rotationInterval = setInterval(rotateImage, 50);
//   }
// }

// function pauseRotation() {
//   clearInterval(rotationInterval);
//   rotating = false;
// }

// function rotateImage() {
//   currentRotation += 1;
//   rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
// }

// function updateSongInfo() {
//   songName.textContent = songs[currentSongIndex].title;
//   artistName.textContent = songs[currentSongIndex].name;
//   song.src = songs[currentSongIndex].source;
//   rotatingImage.src = songs[currentSongIndex].cover;

//   song.addEventListener("loadeddata", function () {});
// }

// song.addEventListener("loadedmetadata", function () {
//   progress.max = song.duration;
//   progress.value = song.currentTime;
// });

// song.addEventListener("ended", function () {
//   currentSongIndex = (currentSongIndex + 1) % songs.length;
//   updateSongInfo();
//   playPause();
// });

// song.addEventListener("timeupdate", function () {
//   if (!song.paused) {
//     progress.value = song.currentTime;
//   }
// });

// function playPause() {
//   if (song.paused) {
//     song.play();
//     controlIcon.classList.add("fa-pause");
//     controlIcon.classList.remove("fa-play");
//     // startRotation();
//   } else {
//     song.pause();
//     controlIcon.classList.remove("fa-pause");
//     controlIcon.classList.add("fa-play");
//     // pauseRotation();
//   }
// }

// playPauseButton.addEventListener("click", playPause);

// progress.addEventListener("input", function () {
//   song.currentTime = progress.value;
// });

// progress.addEventListener("change", function () {
//   song.play();
//   controlIcon.classList.add("fa-pause");
//   controlIcon.classList.remove("fa-play");
//   startRotation();
// });

// forwardButton.addEventListener("click", function () {
//   currentSongIndex = (currentSongIndex + 1) % songs.length;
//   updateSongInfo();
//   playPause();
// });

// backwardButton.addEventListener("click", function () {
//   currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
//   updateSongInfo();
//   playPause();
// });

// updateSongInfo();


var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
   on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});









      //  // Add event listeners to the "Listen Now" buttons
      //  document.querySelectorAll('.listen-now-btn').forEach(button => {
      //   button.addEventListener('click', (event) => {
      //     event.preventDefault();  // Prevent default link behavior

      //     const trackId = button.getAttribute('data-track-id');
      //     console.log(`Button clicked. Track ID: ${trackId}`);
      //     if (trackId) {
      //       fetch(`/music/${trackId}/`)
      //         .then(response => {
      //           console.log(`Fetch response status: ${response.status}`);
      //           return response.json();
      //         })
      //         .then(data => {
      //           console.log('Fetched data:', data);
      //           if (!data.error) {
      //             audioPlayer.src = data.audio_url;
      //             rotatingImage.src = data.track_image;
      //             trackName.textContent = data.track_name;
      //             artistName.textContent = data.artist_name;

        
      //             song.load();
      //             song.play();
      //             controlIcon.classList.remove('fa-play');
      //             controlIcon.classList.add('fa-pause');
      //           } else {
      //             console.error('Error from server:', data.error);
      //           }
      //         })
      //         .catch(error => console.error('Error:', error));
      //     } else {
      //       console.error('Track ID is null or undefined');
      //     }
      //   });
      // }); 




      // <script>

      // $(document).ready(function() {
      //   $('.listen-now-btn').click(function(e) {
      //       e.preventDefault();  // Prevent default form submission
      //       var trackId = $(this).data('track-id');
      //       $.ajax({
      //           url: '/pll/'+ trackId,  // Replace with your URL
      //           type: 'GET',
      //           success: function(data) {
      //               $('#single-track-container').html(data);  // Update the container with returned HTML
      //           },
      //           error: function(xhr, status, error) {
      //               console.error('Error:', error);
      //           }
      //       });
      //   });
      // });
      
      //     </script>  








  //     <script>
  //     document.addEventListener('DOMContentLoaded', () => {
  //         const playPauseButton = document.getElementById('play-pause');
  //         const controlIcon = document.getElementById('controlIcon');
  //         const song = document.getElementById('song');
  //         const progressBar = document.getElementById('progress');
  //         const audioPlayer = document.getElementById('audio-player');
  //         const trackName = document.getElementById('track-name');
  //         const artistName = document.getElementById('artist-name');
  //         const rotatingImage = document.getElementById('rotatingImage');
  
  //         let isPlaying = false;
  
  //         playPauseButton.addEventListener('click', () => {
  //             if (isPlaying) {
  //                 song.pause();
  //                 controlIcon.classList.remove('fa-pause');
  //                 controlIcon.classList.add('fa-play');
  //                 isPlaying = false;
  //                 console.log('Song paused.');
  //             } else {
  //                 song.play();
  //                 controlIcon.classList.remove('fa-play');
  //                 controlIcon.classList.add('fa-pause');
  //                 isPlaying = true;
  //                 console.log('Song played.');
  //             }
  //         });
  
  //         // Event delegation for dynamically loaded songs
  //         document.body.addEventListener('click', (event) => {
  //             if (event.target.closest('.song')) {
  //                 event.preventDefault(); // Prevent default link behavior
  
  //                 const songElement = event.target.closest('.song');
  //                 const trackId = songElement.getAttribute('data-track-id');
  //                 console.log('Song clicked. Track ID:', trackId);
  
  //                 if (trackId) {
  //                     fetch(`/music/${trackId}/`)
  //                         .then(response => {
  //                             if (!response.ok) {
  //                                 throw new Error('Network response was not ok');
  //                             }
  //                             return response.json();
  //                         })
  //                         .then(data => {
  //                             console.log('Received data:', data);
  
  //                             if (!data.error) {
  //                                 audioPlayer.src = data.audio_url;
  //                                 rotatingImage.src = data.track_image;
  //                                 trackName.textContent = data.track_name;
  //                                 artistName.textContent = data.artist_name;
  
  //                                 song.load();
  //                                 song.play();
  //                                 controlIcon.classList.remove('fa-play');
  //                                 controlIcon.classList.add('fa-pause');
  //                                 isPlaying = true;
  //                                 console.log('Song loaded and played.');
  //                             } else {
  //                                 console.error('Error:', data.error);
  //                             }
  //                         })
  //                         .catch(error => console.error('Fetch error:', error));
  //                 } else {
  //                     console.error('Track ID is null or undefined');
  //                 }
  //             }
  //         });
  
  //         // Update progress bar as audio plays
  //         song.addEventListener('timeupdate', () => {
  //             const currentTime = song.currentTime;
  //             const duration = song.duration;
  //             const progress = (currentTime / duration) * 100;
  //             console.log('Current time:', currentTime);
  //             console.log('Duration:', duration);
  //             console.log('Progress:', progress);
  
  //             progressBar.value = progress;
  //         });
  
  //         // Handle seeking in the progress bar
  //         progressBar.addEventListener('input', () => {
  //             const seekTime = progressBar.value * song.duration / 100;
  //             console.log('Seek time:', seekTime);
  //             song.currentTime = seekTime;
  //         });
  
  //         console.log('Document is ready.');
  //     });
  // </script>








  
//  <script>

//  document.addEventListener('DOMContentLoaded', () => {
//    const playPauseButton = document.getElementById('play-pause');
//    const controlIcon = document.getElementById('controlIcon');
//    const song = document.getElementById('song');
//    const audioPlayer = document.getElementById('audio-player');
//    const trackName = document.getElementById('track-name');
//    const artistName = document.getElementById('artist-name');
//    const rotatingImage = document.getElementById('rotatingImage');
//    const progressBar = document.getElementById('progress');
 
//    // Set default values if variables are null
//    if (!trackName.textContent.trim()) {
//      trackName.textContent = 'Select a Track to Play';
//    }
 
//    if (!artistName.textContent.trim()) {
//      artistName.textContent = 'Currently Not Playing';
//    }

 
//    playPauseButton.addEventListener('click', () => {
//      if (song.paused) {
//        song.play();
//        controlIcon.classList.remove('fa-play');
//        controlIcon.classList.add('fa-pause');
//      } else {
//        song.pause();
//        controlIcon.classList.remove('fa-pause');
//        controlIcon.classList.add('fa-play');
//      }
//    });
 
//    document.querySelectorAll('.listen-now-btn').forEach(item => {
//      item.addEventListener('click', (event) => {
//        event.preventDefault();  // Prevent default link behavior
 
//        const trackId = item.getAttribute('data-track-id');
//        if (trackId) {
//          fetch(`/music/${trackId}/`)
//            .then(response => response.json())
//            .then(data => {
//              if (!data.error) {
//                audioPlayer.src = data.audio_url;
//                rotatingImage.src = data.track_image;
//                trackName.textContent = data.track_name;
//                artistName.textContent = data.artist_name;
 
//                song.load();
//                song.play();
//                controlIcon.classList.remove('fa-play');
//                controlIcon.classList.add('fa-pause');
//              } else {
//                console.error(data.error);
//              }
//            })
//            .catch(error => console.error('Error:', error));
//        } else {
//          console.error('Track ID is null or undefined');
//        }
//      });
//    });

//       // Add event listeners to the "Listen Now" buttons
//       document.querySelectorAll('.song').forEach(button => {
//        button.addEventListener('click', (event) => {
//          event.preventDefault();  // Prevent default link behavior

//          const trackId = button.getAttribute('data-track-id');
//          console.log(`Button clicked. Track ID: ${trackId}`);
//          if (trackId) {
//            fetch(`/music/${trackId}/`)
//              .then(response => {
//                console.log(`Fetch response status: ${response.status}`);
//                return response.json();
//              })
//              .then(data => {
//                console.log('Fetched data:', data);
//                if (!data.error) {
//                  audioPlayer.src = data.audio_url;
//                  rotatingImage.src = data.track_image;
//                  trackName.textContent = data.track_name;
//                  artistName.textContent = data.artist_name;

       
//                  song.load();
//                  song.play();
//                  controlIcon.classList.remove('fa-play');
//                  controlIcon.classList.add('fa-pause');
//                } else {
//                  console.error('Error from server:', data.error);
//                }
//              })
//              .catch(error => console.error('Error:', error));
//          } else {
//            console.error('Track ID is null or undefined');
//          }
//        });
//      });
 
//    // Update progress bar as audio plays
//    song.addEventListener('timeupdate', () => {
//      const currentTime = song.currentTime;
//      const duration = song.duration;
//      const progress = (currentTime / duration) * 100;
 
//      progressBar.value = progress;
//    });
 
//    // Handle seeking in the progress bar
//    progressBar.addEventListener('input', () => {
//      const seekTime = progressBar.value * song.duration / 100;
//      song.currentTime = seekTime;
//    });
//  });
 

// </script> 










// <script> 
    
//     document.addEventListener('DOMContentLoaded', () => {
//       const playPauseButton = document.getElementById('play-pause');
//       const controlIcon = document.getElementById('controlIcon');
//       const song = document.getElementById('song');
//       const progressBar = document.getElementById('progress');
//       const audioPlayer = document.getElementById('audio-player');
//       const trackName = document.getElementById('track-name');
//       const artistName = document.getElementById('artist-name');
//       const rotatingImage = document.getElementById('rotatingImage');
//       const loadPlaylistButton = document.getElementById('load-playlist');
  
//       let currentIndex = 0;
//       let isPlaying = false;
//       let songs = []; // Array to hold all song elements
  
//       // Function to initialize player for a track
//       const initializePlayer = (trackId) => {
//           fetch(`/music/${trackId}/`)
//               .then(response => {
//                   if (!response.ok) {
//                       throw new Error('Network response was not ok');
//                   }
//                   return response.json();
//               })
//               .then(data => {
//                   console.log('Received data:', data);
  
//                   if (!data.error) {
//                       audioPlayer.src = data.audio_url;
//                       rotatingImage.src = data.track_image;
//                       trackName.textContent = data.track_name;
//                       artistName.textContent = data.artist_name;
  
//                       song.load();
//                       song.play();
//                       controlIcon.classList.remove('fa-play');
//                       controlIcon.classList.add('fa-pause');
//                       isPlaying = true;
//                       console.log('Song loaded and played.');
//                   } else {
//                       console.error('Error:', data.error);
//                   }
//               })
//               .catch(error => console.error('Fetch error:', error));
//       };
  
//       // Event delegation for dynamically loaded songs
//       document.body.addEventListener('click', (event) => {
//           if (event.target.closest('.song')) {
//               event.preventDefault(); // Prevent default link behavior
  
//               const songElement = event.target.closest('.song');
//               const trackId = songElement.getAttribute('data-track-id');
//               console.log('Song clicked. Track ID:', trackId);
  
//               if (trackId) {
//                   currentIndex = Array.from(songs).indexOf(songElement);
//                   initializePlayer(trackId);
//               } else {
//                   console.error('Track ID is null or undefined');
//               }
//           }
//       });
  
//       // Function to play next track in sequence
//       const playNextTrack = () => {
//           if (songs.length === 0) {
//               console.error('No songs available to play.');
//               return;
//           }
  
//           if (currentIndex < songs.length - 1) {
//               currentIndex++;
//           } else {
//               console.log('End of playlist. Resetting to first track.');
//               currentIndex = 0; // Reset index for loop play
//           }
          
//           const nextSong = songs[currentIndex];
//           if (nextSong) {
//               const trackId = nextSong.getAttribute('data-track-id');
//               console.log(`Playing next track with ID: ${trackId} at index ${currentIndex}`);
//               initializePlayer(trackId);
//           } else {
//               console.error('Next song element is undefined.');
//           }
//       };
  
//       // Fetch all song elements and prepare for autoplay
//       const updateSongs = () => {
//           const songsContainer = document.querySelector('.songs-container');
//           if (songsContainer) {
//               songs = songsContainer.querySelectorAll('.song');
//               console.log(`Found ${songs.length} songs in container.`);
//           } else {
//               console.error('Songs container not found.');
//           }
//       };
  
//       // Event listener for play/pause button
//       playPauseButton.addEventListener('click', () => {
//           if (isPlaying) {
//               song.pause();
//               controlIcon.classList.remove('fa-pause');
//               controlIcon.classList.add('fa-play');
//               isPlaying = false;
//               console.log('Song paused.');
//           } else {
//               song.play();
//               controlIcon.classList.remove('fa-play');
//               controlIcon.classList.add('fa-pause');
//               isPlaying = true;
//               console.log('Song played.');
//           }
//       });
  
//       // Update progress bar as audio plays
//       song.addEventListener('timeupdate', () => {
//           const currentTime = song.currentTime;
//           const duration = song.duration;
//           const progress = (currentTime / duration) * 100;
//           progressBar.value = progress;
//       });
  
//       // Handle seeking in the progress bar
//       progressBar.addEventListener('input', () => {
//           const seekTime = progressBar.value * song.duration / 100;
//           song.currentTime = seekTime;
//       });
  
//       // Event listener for ended event to play next track
//       song.addEventListener('ended', () => {
//           console.log('Song ended. Playing next track...');
//           playNextTrack();
//       });
  

//       $(document).ready(function() {
//         $('.listen-now-btn').click(function(e) {
//             e.preventDefault();  // Prevent default form submission
//             var trackId = $(this).data('track-id');
//             $.ajax({
//                 url: '/pll/'+ trackId,  // Replace with your URL
//                 type: 'GET',
//                 success: function(data) {
//                     $('#single-track-container').html(data);  // Update the container with returned HTML
//                     updateSongs();
//                 },
//                 error: function(xhr, status, error) {
//                     console.error('Error:', error);
//                 }
//             });
//         });
//       });
  
      
//       // Initial songs update
//       updateSongs();
//   });
  
  

//   </script> 




















// <script>
//   document.addEventListener('DOMContentLoaded', () => {
//     const playPauseButton = document.getElementById('play-pause');
//     const controlIcon = document.getElementById('controlIcon');
//     const song = document.getElementById('song');
//     const progressBar = document.getElementById('progress');
//     const audioPlayer = document.getElementById('audio-player');
//     const trackName = document.getElementById('track-name');
//     const artistName = document.getElementById('artist-name');
//     const rotatingImage = document.getElementById('rotatingImage');
//     const loadPlaylistButton = document.getElementById('load-playlist');
//     const forwardButton = document.querySelector('.forward');
//     const backwardButton = document.querySelector('.backward');

//     if (!rotatingImage.src.trim()) {
//       rotatingImage.src = ''; 
//       albumCover.style.display = 'none';
//     }

//     let currentIndex = 0;
//     let isPlaying = false;
//     let songs = []; // Array to hold all song elements

//     // Function to initialize player for a track
//     const initializePlayer = (trackId) => {
//       fetch(`/music/${trackId}/`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log('Received data:', data);

//           if (!data.error) {
//             audioPlayer.src = data.audio_url;
//             rotatingImage.src = data.track_image;
//             trackName.textContent = data.track_name;
//             artistName.textContent = data.artist_name;

//             song.load();
//             song.play();
//             controlIcon.classList.remove('fa-play');
//             controlIcon.classList.add('fa-pause');
//             isPlaying = true;
//             console.log('Song loaded and played.');
//           } else {
//             console.error('Error:', data.error);
//           }
//         })
//         .catch(error => console.error('Fetch error:', error));
//     };

//     // Event delegation for dynamically loaded songs
//     document.body.addEventListener('click', (event) => {
//       if (event.target.closest('.song')) {
//         event.preventDefault(); // Prevent default link behavior

//         const songElement = event.target.closest('.song');
//         const trackId = songElement.getAttribute('data-track-id');
//         console.log('Song clicked. Track ID:', trackId);

//         if (trackId) {
//           currentIndex = Array.from(songs).indexOf(songElement);
//           initializePlayer(trackId);
//         } else {
//           console.error('Track ID is null or undefined');
//         }
//       }
//     });

//     // Function to play next track in sequence
//     const playNextTrack = () => {
//       if (songs.length === 0) {
//         console.error('No songs available to play.');
//         return;
//       }

//       if (currentIndex < songs.length - 1) {
//         currentIndex++;
//       } else {
//         console.log('End of playlist. Resetting to first track.');
//         currentIndex = 0; // Reset index for loop play
//       }

//       const nextSong = songs[currentIndex];
//       if (nextSong) {
//         const trackId = nextSong.getAttribute('data-track-id');
//         console.log(`Playing next track with ID: ${trackId} at index ${currentIndex}`);
//         initializePlayer(trackId);
//       } else {
//         console.error('Next song element is undefined.');
//       }
//     };

//     // Function to play previous track in sequence
//     const playPreviousTrack = () => {
//       if (songs.length === 0) {
//         console.error('No songs available to play.');
//         return;
//       }

//       if (currentIndex > 0) {
//         currentIndex--;
//       } else {
//         console.log('Start of playlist. Setting to last track.');
//         currentIndex = songs.length - 1; // Set index to last track for loop play
//       }

//       const previousSong = songs[currentIndex];
//       if (previousSong) {
//         const trackId = previousSong.getAttribute('data-track-id');
//         console.log(`Playing previous track with ID: ${trackId} at index ${currentIndex}`);
//         initializePlayer(trackId);
//       } else {
//         console.error('Previous song element is undefined.');
//       }
//     };

//     // Fetch all song elements and prepare for autoplay
//     const updateSongs = () => {
//       const songsContainer = document.querySelector('.songs-container');
//       if (songsContainer) {
//         songs = songsContainer.querySelectorAll('.song');
//         console.log(`Found ${songs.length} songs in container.`);
//       } else {
//         console.error('Songs container not found.');
//       }
//     };

//     // Event listener for play/pause button
//     playPauseButton.addEventListener('click', () => {
//       if (isPlaying) {
//         song.pause();
//         controlIcon.classList.remove('fa-pause');
//         controlIcon.classList.add('fa-play');
//         isPlaying = false;
//         console.log('Song paused.');
//       } else {
//         song.play();
//         controlIcon.classList.remove('fa-play');
//         controlIcon.classList.add('fa-pause');
//         isPlaying = true;
//         console.log('Song played.');
//       }
//     });

//     // Update progress bar as audio plays
//     song.addEventListener('timeupdate', () => {
//       const currentTime = song.currentTime;
//       const duration = song.duration;
//       const progress = (currentTime / duration) * 100;
//       progressBar.value = progress;
//     });

//     // Handle seeking in the progress bar
//     progressBar.addEventListener('input', () => {
//       const seekTime = progressBar.value * song.duration / 100;
//       song.currentTime = seekTime;
//     });

//     // Event listener for ended event to play next track
//     song.addEventListener('ended', () => {
//       console.log('Song ended. Playing next track...');
//       playNextTrack();
//     });

//     // Event listener for forward button
//     forwardButton.addEventListener('click', () => {
//       playNextTrack();
//     });

//     // Event listener for backward button
//     backwardButton.addEventListener('click', () => {
//       playPreviousTrack();
//     });

//     $(document).ready(function () {
//       $('.listen-now-btn').click(function (e) {
//         e.preventDefault(); // Prevent default form submission
//         var trackId = $(this).data('track-id');
//         $.ajax({
//           url: '/pll/' + trackId, // Replace with your URL
//           type: 'GET',
//           success: function (data) {
//             $('#single-track-container').html(data); // Update the container with returned HTML
//             updateSongs();
//             // Play the first song in the updated playlist
//           if (songs.length > 0) {
//             const firstTrackId = songs[0].getAttribute('data-track-id');
//             currentIndex = 0; // Reset index to the first song
//             initializePlayer(firstTrackId);
//           }
//           },
//           error: function (xhr, status, error) {
//             console.error('Error:', error);
//           }
//         });
//       });
//     });

//     // Initial songs update
//     updateSongs();
//   }); 

  
// </script>