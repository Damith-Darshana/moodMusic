# Music Streaming Service Backend

This project is the **Django backend** for the **Music Streaming Service**. It powers features like user authentication, song recommendations, playlist management, and mood-based song discovery using AI and machine learning models.

## Key Features

- **User Authentication:** Secure token-based authentication using Django Rest Framework (DRF).
- **Mood-Based Recommendations:** Recommends songs based on user-selected moods using a KNN model trained on song features.
- **Favorites-Based Recommendations:** Provides song recommendations based on the user's favorite tracks.
- **Playlist Management:** Supports creating, updating, and deleting user playlists.
- **Favorites Management:** Allows users to manage their favorite songs, albums, and artists.

## Technologies

- **Framework:** [Django](https://www.djangoproject.com/)
- **API Framework:** [Django Rest Framework (DRF)](https://www.django-rest-framework.org/)
- **Machine Learning:** K-Nearest Neighbors (KNN) with `scikit-learn`
- **Database:** sqlite3 (or any supported Django database backend)
- **Joblib:** For saving and loading machine learning models
- **Authentication:** Token-based using DRF's `rest_framework.authtoken`


## Models Overview

### 1. Track Model
Defines songs with various attributes like:
- `id`: Unique song ID
- `name`: Song name
- `artist`: Artist details
- `album`: Album information

### 2. Playlist Model
Allows users to create, update, and delete playlists:
- `user`: The user who owns the playlist
- `name`: Playlist name
- `description`: Playlist description
- `tracks`: List of track IDs in the playlist
- `type`: Playlist type (public or private)

### 3. Favorite Model
Allows users to favorite tracks, albums, or artists:
- `user`: The user who owns the favorite
- `track_id`: The ID of the favorite track
- `album_id`: The ID of the favorite album
- `artist_id`: The ID of the favorite artist

## API Endpoints

### Authentication
- **POST /auth/login/**: Logs in the user and returns an authentication token.
- **POST /auth/register/**: Registers a new user.

### Mood-Based Recommendations
- **GET /api/recommend/mood/{mood}/**: Recommends songs based on the selected mood.

### Favorites-Based Recommendations
- **GET /api/recommend/favorites/**: Recommends songs based on the user's current favorite tracks.

### Playlists
- **POST /api/playlists/**: Creates a new playlist.
- **GET /api/playlists/**: Retrieves all user playlists.
- **PUT /api/playlists/{id}/**: Updates a playlist.
- **DELETE /api/playlists/{id}/**: Deletes a playlist.

### Favorites
- **POST /api/favorites/**: Adds a song, album, or artist to the user's favorites.
- **GET /api/favorites/**: Retrieves all user favorites.
- **DELETE /api/favorites/{id}/**: Removes an item from the user's favorites.

## KNN Model

### Training the Model
The KNN model is trained using the song features stored in the dataset. The model calculates the nearest neighbors based on audio features like `danceability`, `energy`, `tempo`, and more.

## API Integration with Frontend

This backend works with the **Next.js** frontend project. The frontend interacts with this backend through API calls for authentication, playlist management, and song recommendations.

## Getting Started

### Prerequisites

- Python 3.8+

### Installation

1. Clone the repository:
	`git clone https://github.com/username/music-streaming-backend.git`
	`cd music-streaming-backend`
	
2. Create a virtual environment and activate it:
	 `python -m venv venv`
	`source venv/bin/activate  # On Windows: venv\Scripts\activate`
	
3. Install the dependencies:
	`pip install -r requirements.txt`
	
4. Set up the database:
	`python manage.py migrate`
	`python manage.py makemigrations`
	
5. Create a superuser for admin access:
	`python manage.py createsuperuser`
	
6. Run the development server:
	`python manage.py runserver`
	
7. Open the app in your browser at `http://localhost:8000`.
