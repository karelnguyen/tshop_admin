{
  "id": "3",
  "heading": "Migos swag",
  "shortText": "Very nice tshirt from USA",
  "longText": "Hello I am terrible...",
  "img": "migos.png",
  "color": "black",
  "size": "M",
  "price": "1300"
}

curl -i -X POST -H "Content-Type: application/json" -H "Authorization: Bearer exampleOfSecretTokenInAuthorizationHeaderForRequestsFromExternalServices" --data '{   "sourcePlatformProductId": "'$i'",   "productType": {     "id": "1066",     "name": "Bačkory"   },   "productOwner": "PD" }' http://tpmstage-tpm-app-01.ech.osdc1.mall.local:8093/api/v1/integration/platforms/1/products


curl -H "Content-Type: application/json" -X POST -d '{"id" : "'$i'", "heading" : "Migos swag", "shortText" : "Very nice tshirt from USA", "longText" : "Hello I am terrible...","img" : "migos.png", "color": "black", "size": "M", "price": "1200"}' https://mladejvlcak.herokuapp.com/p/create

# skript pro pridani produktu do databaze
for i in {1930..2010}

do

curl -H "Content-Type: application/json" -X POST -d '{"id" : "'$i'", "heading" : "Im so sad + '$i'", "shortText" : "Very nice tshirt from USA", "longText" : "Hello I am terrible...","img" : "migos.png", "color": "black", "size": "M", "price": "1200"}' https://mladejvlcak.herokuapp.com/product/create
done
