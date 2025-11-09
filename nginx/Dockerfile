FROM nginx


COPY ./absolute.cinema.nomorepartiessbs.ru.conf /etc/nginx/conf.d/

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



