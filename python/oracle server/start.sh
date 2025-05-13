#!/bin/bash
source /home/ubuntu/venv/bin/activate
exec gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:8000
