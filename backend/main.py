from fastapi import FastAPI, Form

app = FastAPI()


@app.get("/")
async def root():
    return "hello world"


@app.post("/submit/")
async def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}
