import pyrebase
from dotenv import load_dotenv
import os

load_dotenv()
GOOGLE_SERVICE_KEY = os.environ.get("FIREBASE_API_KEY")

config = {
    "apiKey": "AIzaSyBB8bR22FPAkaeDEwexa1JXOX86zKFqPpo",
    "authDomain": "public-washroom-f51ff.firebaseapp.com",
    "databaseURL": "https://public-washroom-f51ff-default-rtdb.firebaseio.com",
    "storageBucket": "public-washroom-f51ff.appspot.com",
    "serviceAccount": "./public-washroom-f51ff-firebase-adminsdk-e42dx-d6bc58f763.json",
}

firebase = pyrebase.initialize_app(config)

storage = firebase.storage()

# storage.child('gs://public-washroom-f51ff.appspot.com/geocoded_public_restrooms_sf.csv').download('restrooms.csv')
storage.child("geocoded_public_restrooms_sf.csv").download("./restrooms.csv")
