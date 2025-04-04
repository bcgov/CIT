FROM python:3.12 AS compile

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libproj-dev \
    libgdal-dev \
    gdal-bin \
    libgeos-dev \
    libpq-dev \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Clean up data directory (assuming this is intentional)
RUN rm -rf data/import/datafiles/*

# Collect static files
RUN python manage.py collectstatic --noinput

# Default command
CMD ["./entrypoint.prod.sh"]