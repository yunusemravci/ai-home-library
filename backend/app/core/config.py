from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Home Library Management System"
    DATABASE_URL: str = "postgresql://yunusemreavci:mypassword@localhost:5432/ai_home_lib"

    class Config:
        env_file = ".env"

settings = Settings()