from fastapi import FastAPI
from app.database import Base, engine
from app.endpoints import router as endpoints_router
from app.load_records import load_records
from app.database import SessionLocal
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Automax API")
app.include_router(endpoints_router)


# Scheduler para atualização periódica
scheduler = BackgroundScheduler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # endereço do front React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def scheduled_load():
    db = SessionLocal()
    try:
        result = load_records(db)
        print("Carga periódica realizada:", result["summary"])
        print("Resultado completo do scheduled_load:", result)
    finally:
        db.close()

# Agendando a cada 10 minutos
scheduler.add_job(scheduled_load, 'interval', minutes=10)

# Inicia o scheduler
@app.on_event("startup")
def start_scheduler():
    scheduler.start()
    print("Scheduler iniciado: carga periódica ativada.")

# Finaliza o scheduler
@app.on_event("shutdown")
def shutdown_scheduler():
    scheduler.shutdown()
    print("Scheduler finalizado.")
