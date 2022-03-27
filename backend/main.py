from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from gcp_creds import get_creds
from google.cloud import language_v1
from google.oauth2 import service_account
from twilio_api import *

app = FastAPI()


@app.get("/")
async def root():
    return "hello world"


@app.get("/locations")
async def get_locations():

    creds_json = get_creds(local=True)

    creds = credentials.Certificate(creds_json)
    app = firebase_admin.initialize_app(creds)

    db = firestore.client()

    docs = db.collection("restrooms").stream()

    loc_dicts = {}
    for idx, doc in enumerate(docs):
        doc_info = doc.to_dict()
        loc_dicts[idx] = [doc_info["latitude"], doc_info["longitude"]]

    return loc_dicts


@app.get("/sentiment")
async def get_sentiment(review: str) -> str:

    creds_json = get_creds(local=True)

    creds = service_account.Credentials.from_service_account_info(creds_json)

    client = language_v1.LanguageServiceClient(credentials=creds)

    document = language_v1.Document(
        content=review, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    score = round(sentiment.score, 3)

    if score >= 0.25 <= 1.0:
        mood = "positive 😀"

    elif score >= -0.25 < 0.25:
        mood = "neutral 😐"
    else:
        mood = "negative 😡"

    return {mood, score}


@app.post("/form_submit")
async def submit_details(
    location,
    title,
    text,
    rating,
):

    creds_json = get_creds(local=True)

    creds = credentials.Certificate(creds_json)
    app = firebase_admin.initialize_app(creds)

    db = firestore.client()

    review_data = {
        "location": location,
        "reviewTitle": title,
        "reviewContent": text,
        "rating": rating,
        "sentiment": get_sentiment(text),
    }

    db.collection("reviews").add(review_data)


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


@app.post("/send_message")
async def send_message(to_phone, name, message):

    message = f" Hey {name}! Nature calls? There are 10 toilets within 100m from your location!"

    send_message(to_phone, message)
