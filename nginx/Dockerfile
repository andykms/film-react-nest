FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./absolute.cinema.nomorepartiessbs.ru.conf /etc/nginx/conf.d/


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]



