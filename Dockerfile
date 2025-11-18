# --------------------------------------------------------------------------
# STAGE 1: Build Frontend (ReactJS)
# --------------------------------------------------------------------------
FROM node:20-alpine AS frontend_builder

WORKDIR /app/todo_list_fe

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY todo_list_fe/package.json ./
COPY todo_list_fe/package-lock.json ./


RUN npm install

COPY todo_list_fe/ ./

RUN npm run build


# --------------------------------------------------------------------------
# STAGE 2: Build Backend (Flask) và Final Image
# --------------------------------------------------------------------------
FROM python:3.11-slim


WORKDIR /app


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY core/ core/
COPY controller/ controller/
COPY infrastructure/ infrastructure/
COPY app.py .
COPY todo.db .

COPY --from=frontend_builder /app/todo_list_fe/dist /app/static

EXPOSE 5000 

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]