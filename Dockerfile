# --------------------------------------------------------------------------
# STAGE 1: Build Frontend (ReactJS)
# Chúng ta sử dụng node:20-alpine để build ứng dụng React
# --------------------------------------------------------------------------
FROM node:20-alpine AS frontend_builder

WORKDIR /app/todo_list_fe

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
# Sao chép file package.json và package-lock.json để tận dụng cache Docker
COPY todo_list_fe/package.json ./
COPY todo_list_fe/package-lock.json ./

# Cài đặt dependencies (Giả định bạn sử dụng npm)
RUN npm install

# Sao chép toàn bộ mã nguồn Frontend
COPY todo_list_fe/ ./

# Build ứng dụng React thành các tệp tĩnh (đầu ra là thư mục 'build')
# Lệnh này phải tạo ra các tệp tĩnh (static files) cho Flask phục vụ.
RUN npm run build


# --------------------------------------------------------------------------
# STAGE 2: Build Backend (Flask) và Final Image
# Chúng ta sử dụng python:3.11-slim để chạy ứng dụng Flask
# --------------------------------------------------------------------------
FROM python:3.11-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# 1. Cài đặt Python Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Sao chép Mã nguồn Backend
# Sao chép các thư mục Backend và app.py
COPY core/ core/
COPY controller/ controller/
COPY infrastructure/ infrastructure/
COPY app.py .
COPY todo.db . # Sao chép cơ sở dữ liệu (nếu nó cần được đóng gói)

# 3. Tích hợp Frontend đã Build
# Lấy các tệp đã build từ Stage 1 và sao chép vào thư mục tĩnh của Flask
# GIẢ ĐỊNH: Flask sẽ phục vụ các tệp tĩnh từ thư mục 'static'
# Nếu Flask của bạn phục vụ từ thư mục khác, hãy thay đổi '/app/static'
COPY --from=frontend_builder /app/todo_list_fe/build /app/static

# 4. Cổng và Khởi động
# Mở cổng mặc định của Flask
EXPOSE 5000 

# Khởi động ứng dụng bằng Gunicorn hoặc Flask run. 
# Sử dụng Gunicorn là cách tốt hơn cho môi trường production.
# GIẢ ĐỊNH: app.py có một đối tượng tên là 'app'
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]