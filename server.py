from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import smtplib
from email.message import EmailMessage
import base64

app = FastAPI()
app.mount("/src", StaticFiles(directory="src"), name="src")

class ChartEmailRequest(BaseModel):
	imageData: str
	username: str
	email: str

# New endpoint for dummy monthly data
@app.get("/monthly-data")
async def get_monthly_data():
	# Dummy data for income and expenses
	income = [900, 850, 800, 750, 700, 650, 600, 550, 500, 1000, 950, 900]
	expenses = [600, 500, 400, 350, 300, 250, 220, 210, 200, 800, 700, 650]
	return {"income": income, "expenses": expenses}

@app.post("/send-chart-email")
async def send_chart_email(request: ChartEmailRequest):
	image_data = request.imageData
	username = request.username
	email = request.email
	# Remove the data URL prefix
	base64_data = image_data.replace("data:image/png;base64,", "")
	print(f"Received request to send email to: {email}")

	# Configure SMTP (use a test SMTP service like Ethereal for development)
	SMTP_HOST = "smtp.ethereal.email"
	SMTP_PORT = 587
	SMTP_USER = "YOUR_ETHEREAL_USER"
	SMTP_PASS = "YOUR_ETHEREAL_PASS"

	msg = EmailMessage()
	msg["Subject"] = f"{username}'s Chart"
	msg["From"] = "Bucks2Bar <no-reply@bucks2bar.com>"
	msg["To"] = email
	msg.set_content("Attached is your chart image.")
	msg.add_attachment(base64.b64decode(base64_data), maintype="image", subtype="png", filename="chart.png")

	try:
		with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
			server.starttls()
			server.login(SMTP_USER, SMTP_PASS)
			server.send_message(msg)
		return JSONResponse(status_code=200, content={"message": "Email sent"})
	except Exception as e:
		print(f"Failed to send email: {e}")
		return JSONResponse(status_code=500, content={"message": "Failed to send email"})

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=3010)
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import smtplib
from email.message import EmailMessage
import base64

app = FastAPI()
app.mount("/src", StaticFiles(directory="src"), name="src")

class ChartEmailRequest(BaseModel):
	imageData: str
	username: str
	email: str

@app.post("/send-chart-email")
async def send_chart_email(request: ChartEmailRequest):
	image_data = request.imageData
	username = request.username
	email = request.email
	# Remove the data URL prefix
	base64_data = image_data.replace("data:image/png;base64,", "")
	print(f"Received request to send email to: {email}")

	# Configure SMTP (use a test SMTP service like Ethereal for development)
	SMTP_HOST = "smtp.ethereal.email"
	SMTP_PORT = 587
	SMTP_USER = "YOUR_ETHEREAL_USER"
	SMTP_PASS = "YOUR_ETHEREAL_PASS"

	msg = EmailMessage()
	msg["Subject"] = f"{username}'s Chart"
	msg["From"] = "Bucks2Bar <no-reply@bucks2bar.com>"
	msg["To"] = email
	msg.set_content("Attached is your chart image.")
	msg.add_attachment(base64.b64decode(base64_data), maintype="image", subtype="png", filename="chart.png")

	try:
		with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
			server.starttls()
			server.login(SMTP_USER, SMTP_PASS)
			server.send_message(msg)
		return JSONResponse(status_code=200, content={"message": "Email sent"})
	except Exception as e:
		print(f"Failed to send email: {e}")
		return JSONResponse(status_code=500, content={"message": "Failed to send email"})

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=3010)
