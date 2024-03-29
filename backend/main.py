import firebase_admin
from firebase_admin import credentials, firestore
from gcp_creds import get_creds
from google_nlp import get_sentiment
from twilio_api import *
import googlemaps

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_lat_long(address: str):
    gmaps = googlemaps.Client(key="AIzaSyBB8bR22FPAkaeDEwexa1JXOX86zKFqPpo")

    geocode_result = gmaps.geocode(address)

    return geocode_result


@app.get("/")
async def root():
    return "hello world"


@app.get("/locations")
async def get_locations():

    creds_json = get_creds(local=True)

    creds = credentials.Certificate(creds_json)

    if not firebase_admin._apps:
        app = firebase_admin.initialize_app(creds)

    db = firestore.client()

    docs = db.collection("restrooms").stream()

    loc_dicts = {}
    for idx, doc in enumerate(docs):
        doc_info = doc.to_dict()
        loc_dicts[idx] = [
            doc_info["latitude"],
            doc_info["longitude"],
            doc_info["location"],
            doc_info["remarks"],
        ]

    return loc_dicts


@app.post("/form_submit")
async def submit_details(
    location,
    title,
    text,
    rating,
):

    creds_json = get_creds(local=True)

    creds = credentials.Certificate(creds_json)

    if not firebase_admin._apps:
        app = firebase_admin.initialize_app(creds)

    db = firestore.client()

    lat_lng = get_lat_long(location)[0]["geometry"]["location"]
    lat, lng = lat_lng["lat"], lat_lng["lng"]

    review_data = {
        "location": location,
        "latitude": lat,
        "longitude": lng,
        "reviewTitle": title,
        "remarks": text,
        "rating": rating,
        "sentiment": get_sentiment(text),
    }

    db.collection("restrooms").add(review_data)


@app.post("/send_verification")
async def send_verification(to_phone: str):

    client = init_twilio()

    send_ver_code(client, to_phone)

    return client


@app.post("/verify_code")
async def verify_code(client, code: str, to_phone: str):

    res = verify_code(client, to_phone, code)

    if res == "approved":
        return "phone approved!"
    else:
        return "code not approved"


@app.post("/send_mes")
async def send_mes(to_phone, name, loc, message=""):

    # code to find find nearest toilets

    message = f" Hey {name}! Nature calls? There are 10 toilets within 100m from your location!"

    send_message(to_phone, message)
