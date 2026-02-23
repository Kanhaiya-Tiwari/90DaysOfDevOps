FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY new.txt .

EXPOSE 8080

CMD ["cat", "new.txt"]
