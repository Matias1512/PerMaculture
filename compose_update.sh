echo "This script will update the latest docker image of the plantera-api rust backend."
echo "It will also update the docker image on dockerhub."

echo "Do you wish to continue? (y/N)"
read answer
if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    sudo docker build -t plantera-api:latest backend/.
    sudo docker tag plantera-api:latest kroyoda/plantera-api:latest
    sudo docker push kroyoda/plantera-api:latest
else
    echo "Aborted."
fi