server {
        listen 80;
        server_name absolute.cinema.nomorepartiessbs.ru;
        root /frontend;
        location / {
          try_files $uri $uri/ /index.html;
        } 
}