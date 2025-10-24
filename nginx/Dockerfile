FROM nginx

WORKDIR /etc/nginx/sites-available

COPY absolute.cinema.nomorepartiessbs.ru .

RUN sudo ln -s /etc/nginx/sites-available/absolute.cinema.nomorepartiessbs.ru /etc/nginx/sites-enabled/absolute.cinema.nomorepartiessbs.ru

COPY api.absolute.cinema.nomorepartiessbs.ru .

RUN sudo ln -s /etc/nginx/sites-available/api.absolute.cinema.nomorepartiessbs.ru /etc/nginx/sites-enabled/api.absolute.cinema.nomorepartiessbs.ru

CMD ["sudo", "systemctl", "enable", "--now", "nginx" ]



