FROM python:3.11-slim

WORKDIR /app

# Install system dependencies if any are needed for torch
# RUN apt-get update && apt-get install -y --no-install-recommends ...

COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Expose port
EXPOSE 8000

# Start server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
