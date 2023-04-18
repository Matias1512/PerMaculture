sudo docker build -t plantera-api:1.0.0 backend/.
sudo docker tag plantera-api:1.0.0 kroyoda/plantera-api:latest
sudo docker push kroyoda/plantera-api:latest
