FROM nginx:latest
MAINTAINER sunjh
# 将dist文件中的内容复制到 /etc/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
RUN chmod 777 /usr/share/nginx/html/
# 将配置文件中的内容复制到 /etc/nginx 这个目录下面(增加自己的代理及一些配置)
COPY nginx /etc/nginx


#FROM nginx:latest
#MAINTAINER sunjh
#COPY dist/  /etc/nginx/html/
#RUN rm -rf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/nginx.conf

