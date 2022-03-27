from firebase_admin import firestore
import firebase_admin
import json
from gcp_init import init_gcp

# upload data to firestore
def upload_json(file_path, collection_name):

    cred = init_gcp(local=True)

    app = firebase_admin.initialize_app(cred)

    store = firestore.client()

    with open(file_path, "r") as f:
        data = json.load(f)
        for _, item in enumerate(data):
            store.collection(collection_name).add(item)


def main():

    file_path = "./restrooms.json"
    collection_name = "restrooms"

    upload_json(file_path, collection_name)
