server {
        listen 80;
        server_name absolute.cinema.nomorepartiessbs.ru;
        root /usr/src/app;
        location / {
          try_files $uri $uri/ /index.html;
        } 
}