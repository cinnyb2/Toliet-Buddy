import json
import base64

from dotenv import load_dotenv
import os


def get_creds(local=False):

    if local == True:
        load_dotenv()
        GOOGLE_SERVICE_KEY = os.environ.get("GOOGLE_SERVICE_KEY")

    # TODO
    # direct to deployed env secrets

    encoded_creds = base64.b64decode(GOOGLE_SERVICE_KEY)
    creds_json = json.loads(encoded_creds)

    return creds_json
