FROM nginx:latest
MAINTAINER sunjh
# 将dist文件中的内容复制到 /etc/nginx/html/ 这个目录下面
COPY dist/  /etc/nginx/html/
# 将配置文件中的内容复制到 /etc/nginx 这个目录下面(增加自己的代理及一些配置)
RUN rm -rf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

